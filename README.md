# PlantPath AI — Plant Disease Diagnostic Chatbot

An AI-powered plant disease diagnostic assistant that combines **Claude AI** (Anthropic) with **ServiceNow** for outbreak case management. Built for agronomists, plant pathologists, and food systems professionals.

---

## What It Does

- **Diagnoses** plant diseases from symptom descriptions using AI (causal organism, differential diagnoses)
- **Recommends** evidence-based management strategies (cultural, biological, chemical controls)
- **Logs** confirmed cases into ServiceNow for outbreak tracking and follow-up
- **Tracks** active disease cases across locations

---

## Example Interaction

```
You: My maize leaves have yellow streaks and stunted growth. We're in Nigeria, rainy season.

PlantPath AI: Based on your description, the most likely diagnosis is Maize Streak Virus (MSV),
caused by Mastrevirus transmitted by the leafhopper Cicadulina mbila. Key indicators:
- Yellow streaking along leaf veins ✓
- Stunted growth ✓
- Sub-Saharan Africa geography ✓
- Rainy season (vector activity peaks) ✓

Differential diagnoses to rule out: maize lethal necrosis, iron deficiency chlorosis.

Management recommendations:
1. Remove and destroy infected plants to reduce inoculum
2. Apply insecticide to control leafhopper vectors
3. Plant MSV-tolerant varieties (e.g. CIMMYT-developed hybrids) in next season

Shall I log this as an outbreak case in the tracking system?

You: Yes, log it — severity is high, affecting about 40% of the field.

PlantPath AI: Case logged successfully!
Case Number: INC0000003
Crop: Maize | Disease: Maize Streak Virus | Severity: High | Location: Nigeria
```

---

## Tech Stack

- **Node.js** (ESM modules)
- **Anthropic Claude API** — claude-opus-4-6 with tool calling for disease diagnosis
- **ServiceNow REST Table API** — incident management for outbreak case tracking
- **axios**, **dotenv**

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/plantpath-ai.git
cd plantpath-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env`:
```
ANTHROPIC_API_KEY=your-claude-api-key        # console.anthropic.com
SERVICENOW_INSTANCE=https://devXXXXXX.service-now.com
SERVICENOW_USER=admin
SERVICENOW_PASSWORD=your-password
```

### 4. Run
```bash
npm start
```

---

## Project Structure

```
src/
  chatbot.js             — Claude conversation loop + tool handling
  servicenow_client.js   — ServiceNow REST API (report, status, list cases)
.env.example             — Environment variable template
.gitignore               — Keeps credentials out of GitHub
README.md
package.json
```

---

## Why This Matters

Plant diseases cause **up to 40% crop losses globally**, disproportionately affecting smallholder farmers in Sub-Saharan Africa and South Asia. Early, accurate diagnosis is critical — but access to plant pathologists is limited in rural areas.

PlantPath AI demonstrates how AI + enterprise systems can be combined to support food security at scale.

---

## Author

Built by [Your Name] | Plant Pathologist | Food Systems & AI Strategy
[LinkedIn](#) | [GitHub](#)
