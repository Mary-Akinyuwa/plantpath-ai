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
You: I'm walking a maize field in Abeokuta, Ogun State, Nigeria — mid-rainy season, about 5 weeks after
     emergence. I'm seeing narrow yellow streaks running parallel along the leaf veins on the
     younger leaves, some plants noticeably shorter than their neighbors. No lesions, no rot.
     Affecting maybe a third of the stand so far but spreading fast.

PlantPath AI: This presentation is very consistent with Maize Streak Virus (MSV), caused by
Mastrevirus and vectored by the leafhopper Cicadulina mbila. Let me walk through why:

- Narrow chlorotic streaking parallel to leaf veins — classic MSV signature ✓
- Systemic stunting in affected plants ✓
- Younger leaves showing symptoms first (apical expression) ✓
- Oyo State, rainy season — peak leafhopper activity and vector pressure ✓
- Rapid spread without physical lesions rules out fungal or bacterial etiology ✓

Differential diagnoses to rule out:
- Maize Lethal Necrosis (MLN) — would expect necrotic leaf margins and cob damage
- Iron deficiency chlorosis — typically uniform yellowing, not streaking; non-infectious

Given the one-third stand impact and rapid spread, I'd call this high severity.

Management recommendations:
1. Flag and remove the most severely affected plants to reduce inoculum load
2. Apply a systemic insecticide targeting leafhoppers — timing matters here, the vector
   window is still open mid-season
3. Document GPS coordinates of the affected blocks — useful for outbreak mapping
4. For next season: source MSV-tolerant varieties (CIMMYT DTMA hybrids have strong
   field performance in West Africa)

Want me to log this as a formal outbreak case in the tracking system?

You: Yes — log it. High severity, Oyo State, approximately 35% of the field affected.

PlantPath AI: Case logged successfully.
Case Number: INC0000003
Crop: Maize  |  Disease: Maize Streak Virus  |  Severity: High
Location: Abeokuta, Ogun State, Nigeria  |  Stand Impact: ~35%

You'll get a follow-up notification once the case is assigned. Recommend a field
re-assessment in 7–10 days to track spread rate.
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

Built by [Mary Akinyuwa](https://www.linkedin.com/in/mary-akinyuwa-700268165/) | Plant Pathologist | Food Systems & AI Strategy
[LinkedIn](https://www.linkedin.com/in/mary-akinyuwa-700268165/) | [GitHub](https://github.com/Mary-Akinyuwa)
