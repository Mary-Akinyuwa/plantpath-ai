import axios from "axios";
import "dotenv/config";

const base = process.env.SERVICENOW_INSTANCE;
const auth = {
  username: process.env.SERVICENOW_USER,
  password: process.env.SERVICENOW_PASSWORD,
};

// Report a new plant disease case in ServiceNow
export async function reportDiseaseCase({ crop, symptoms, location, suspected_disease, severity }) {
  const short_description = `[Plant Disease] ${crop} — ${suspected_disease || "Unknown pathogen"}`;
  const description =
    `Crop: ${crop}\n` +
    `Location: ${location || "Not specified"}\n` +
    `Symptoms: ${symptoms}\n` +
    `Suspected Disease: ${suspected_disease || "Pending diagnosis"}\n` +
    `Severity: ${severity || "Unknown"}`;

  const urgencyMap = { high: "1", medium: "2", low: "3" };
  const urgency = urgencyMap[(severity || "medium").toLowerCase()] || "2";

  const res = await axios.post(
    `${base}/api/now/table/incident`,
    { short_description, description, urgency, category: "Plant Pathology" },
    { auth, headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  const r = res.data.result;
  return {
    case_number: r.number,
    sys_id: r.sys_id,
    crop,
    suspected_disease,
    severity,
    created: r.sys_created_on,
  };
}

// Get the status of an existing disease case
export async function getCaseStatus(case_number) {
  const res = await axios.get(
    `${base}/api/now/table/incident?sysparm_query=number=${case_number}&sysparm_limit=1`,
    { auth, headers: { Accept: "application/json" } }
  );
  const r = res.data.result[0] || null;
  if (!r) return { error: "Case not found" };
  return {
    case_number: r.number,
    short_description: r.short_description,
    state: r.state,
    urgency: r.urgency,
    assigned_to: r.assigned_to?.display_value || "Unassigned",
    updated: r.sys_updated_on,
  };
}

// List active disease cases
export async function listActiveCases() {
  const res = await axios.get(
    `${base}/api/now/table/incident?sysparm_query=category=Plant Pathology^state!=7&sysparm_limit=10&sysparm_fields=number,short_description,urgency,state,sys_created_on`,
    { auth, headers: { Accept: "application/json" } }
  );
  return res.data.result;
}
