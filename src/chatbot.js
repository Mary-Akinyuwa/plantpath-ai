import Anthropic from "@anthropic-ai/sdk";
import readline from "readline";
import "dotenv/config";
import { reportDiseaseCase, getCaseStatus, listActiveCases } from "./servicenow_client.js";

const client = new Anthropic();

const tools = [
  {
    name: "report_disease_case",
    description: "Log a suspected plant disease outbreak as a case in ServiceNow for tracking and follow-up",
    input_schema: {
      type: "object",
      properties: {
        crop: { type: "string", description: "The affected crop or plant species (e.g. maize, tomato, cassava)" },
        symptoms: { type: "string", description: "Detailed description of observed symptoms" },
        location: { type: "string", description: "Farm location, region, or country if provided" },
        suspected_disease: { type: "string", description: "The suspected disease or pathogen based on diagnosis" },
        severity: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Outbreak severity: low (isolated), medium (spreading), high (widespread/critical)",
        },
      },
      required: ["crop", "symptoms"],
    },
  },
  {
    name: "get_case_status",
    description: "Check the status of a previously reported disease case by its case number",
    input_schema: {
      type: "object",
      properties: {
        case_number: { type: "string", description: "Case number e.g. INC0000001" },
      },
      required: ["case_number"],
    },
  },
  {
    name: "list_active_cases",
    description: "List all currently active plant disease cases being tracked in the system",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

async function executeTool(name, input) {
  if (name === "report_disease_case") return await reportDiseaseCase(input);
  if (name === "get_case_status") return await getCaseStatus(input.case_number);
  if (name === "list_active_cases") return await listActiveCases();
  return { error: "Unknown tool" };
}

async function chat(conversationHistory) {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    tools,
    system: `You are PlantPath AI — an intelligent plant disease diagnostic assistant built for agronomists, plant pathologists, and food systems professionals.

Your capabilities:
1. DIAGNOSE: When a user describes crop symptoms, use your knowledge of plant pathology to suggest the most likely disease(s), causal organism (fungal, bacterial, viral, nematode, etc.), and differential diagnoses.
2. ADVISE: Provide evidence-based management recommendations — cultural, biological, and chemical controls where appropriate.
3. LOG: Offer to log the case in the disease tracking system (ServiceNow) for outbreak monitoring and follow-up.
4. TRACK: Look up or list active disease cases in the system.

Be scientifically precise but accessible. Use proper nomenclature (e.g. Phytophthora infestans, Fusarium wilt) while explaining in plain language. Ask clarifying questions when symptoms are ambiguous — growth stage, geographic region, and weather conditions are often diagnostically important.

Always confirm case details before logging to the system.`,
    messages: conversationHistory,
  });

  if (response.stop_reason === "tool_use") {
    const toolUseBlock = response.content.find((b) => b.type === "tool_use");
    const toolResult = await executeTool(toolUseBlock.name, toolUseBlock.input);

    const updatedHistory = [
      ...conversationHistory,
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUseBlock.id,
            content: JSON.stringify(toolResult),
          },
        ],
      },
    ];

    return await chat(updatedHistory);
  }

  return response.content.find((b) => b.type === "text")?.text || "";
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const history = [];

  console.log("\n========================================");
  console.log("  PlantPath AI — Disease Diagnostic Bot ");
  console.log("  Powered by Claude + ServiceNow        ");
  console.log("========================================");
  console.log("Describe your crop symptoms, ask for a diagnosis,");
  console.log("or type 'list cases' to see active outbreak reports.");
  console.log("Type 'exit' to quit.\n");

  const ask = () => {
    rl.question("You: ", async (input) => {
      if (input.trim().toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }

      history.push({ role: "user", content: input });
      try {
        const reply = await chat(history);
        history.push({ role: "assistant", content: reply });
        console.log(`\nPlantPath AI: ${reply}\n`);
      } catch (err) {
        console.error("Error:", err.message);
      }

      ask();
    });
  };

  ask();
}

main();
