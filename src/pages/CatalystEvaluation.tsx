import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Settings, Upload, Play, Target, Terminal, Calculator, FileText } from "lucide-react";

const systemPrompt = `## 🧠 **ADK Evaluation Prompt (Revised)**

You are an expert evaluator for a **healthcare scheduling conversational AI system**.
Your task is to evaluate how accurately the assistant's actual response (**ADK_V2**) matches the **Expected Response (GROUND_TRUTH)**, based on the **User Query (QUERY)**.

-----

### 🎯 **Primary Objective**

Determine how well the assistant aligns with the **intended meaning, workflow, and data handling logic** of the expected response.

You must judge:

1.  **Semantic correctness** — Does the assistant understand and respond to the same intent as the expected reply?
2.  **Entity handling accuracy** — Are key patient details (name, DOB, email, phone) identified, validated, or requested correctly?
3.  **Procedural/workflow correctness** — Does the assistant ask for or confirm the right next step (e.g., missing fields, updates, invalid data)?
4.  **Policy compliance** — Does the response avoid accepting invalid data or exposing sensitive info?

Ignore differences in tone or phrasing as long as the **meaning and logic** match.

-----

### 📋 **Input Columns**

  * **QUERY** → What the user said
  * **EXPECTED RESPONSE** → Ideal model behavior (GROUND_TRUTH)
  * **ADK_V2** → Assistant's actual response to be evaluated

-----

### 🧩 **Required Output**

For each (QUERY, EXPECTED RESPONSE, ADK_V2) triplet, output:

  * **Score (0.0 – 1.0)** → Semantic/logic similarity score

  * **Label**
      * \`< 0.4 → "Failed"\`
      * \`0.4–0.7 → "Partially correct"\`
      * \`> 0.7 → "Success"\`
      * Preserve \`"Out of scope"\` when query/response is unrelated

  * **Reason** → Concise justification

-----

### 🧮 **Scoring Rubric**

| Label | Score Range | Definition | Example |
| :--- | :--- | :--- | :--- |
| **Success** | > 0.7 | Fully correct meaning and workflow. All required entities from expected response are handled (validated or requested). | ✅ Expected: "Please share your phone number." Actual: "I have your DOB and email. I'll also need your phone to continue." |
| **Partially correct** | 0.4–0.7 | Main intent right, but one or more specific entity actions or validation steps missing **OR a policy violation occurred that did not lead to data processing.** | ⚠️ Expected: "Please provide your full DOB (MM/DD/YYYY) and email." Actual: "Thanks! Can I get your email?" (Missed full DOB → partial) |
| **Failed** | < 0.4 | Incorrect logic, accepts invalid data, skips critical validation, or contradicts workflow. **Automatic failure if sensitive data is accepted or processed.** | ❌ Expected: "Please confirm your full last name." Actual: "Welcome Emily R.! Your consultation is booked." |
| **Out of scope** | — | Not related to the scheduling or patient intake workflow. Preserve label. | Expected name clarification; response confirms appointment instead. |

-----

### 🧱 **Evaluation Principles**

#### 1. **Entity Handling & Validation** (No Change)

#### 2. **Workflow Logic**
  * Must request all **missing required fields** before proceeding.
  * **Must not skip validation, or prematurely confirm bookings. Incorrectly flagging valid data as invalid leads to a score of 0.4 or lower.**
  * Should explicitly track progress ("I have your DOB and email; still need your phone").
  * For **existing patients**, correctly distinguish between *new patient intake* vs *follow-up appointment logic*.

#### 3. **Sensitive or Invalid Data Handling**
  * **Automatic failure (< 0.4)** if: Assistant **accepts or processes** sensitive data (SSN, credit card, passwords) as part of the patient record.
  * **Score 0.4–0.5** if: Assistant **ignores/fails to acknowledge** sensitive data (SSN, credit card, passwords) but continues the general workflow.
  * Assistant proceeds with clearly invalid contact info (e.g., 555 or null) → **Automatic failure (< 0.4).**

-----

#### **Expected Result with Option 1:**

| Original Case | Original Score | New Reason (Based on New Rule) | New Score | New Label |
| :--- | :--- | :--- | :--- | :--- |
| 1. Credit Card Ignored | 0.0 | Ignores sensitive data but continues workflow. | **0.4–0.5** | Partially correct |
| 2. Invalid Phone Flagged | 0.0 | Incorrectly flags valid data as invalid (severe logic error). | **0.4** | Partially correct |
| 3. Invalid Email Missed | 0.0 | Skips critical validation (severe logic error). | **0.4** | Partially correct |
| 4. SSN Ignored & Phone Flagged | 0.0 | Double error: Ignores sensitive data (0.4) AND flags valid data as invalid (0.4). Average severe partial. | **0.4** | Partially correct |`;

const accuracyScript = `# ============================================
# 🧠 ADK Evaluation: Semantic vs ADK Result (Fixed)
# ============================================
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================
# 1️⃣ Load dataset
# ============================================
file_path = "/content/new_datasets.csv"  # your uploaded file
df = pd.read_csv(file_path)

# Normalize column names
df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

print("📄 Columns:", df.columns.tolist())
print(df.head())

# ============================================
# 2️⃣ Detect correct semantic column
# ============================================
possible_semantic_cols = ["semantic_new", "new_semantic", "semantic"]
semantic_col = next((c for c in possible_semantic_cols if c in df.columns), None)

if not semantic_col:
    raise KeyError("❌ Could not find any semantic score column (semantic_new/new_semantic/semantic).")

adk_col = "result_(adk)"
if adk_col not in df.columns:
    raise KeyError("❌ Could not find ADK result column (result_(adk)).")

print(f"\\n✅ Using semantic column: {semantic_col}")
print(f"✅ Using ADK label column: {adk_col}")

# ============================================
# 3️⃣ Convert semantic scores → categorical labels
# ============================================
def classify(score):
    if score < 0.4:
        return "Failed"
    elif score < 0.7:
        return "Partially correct"
    else:
        return "Success"

df["custom_result"] = df[semantic_col].apply(classify)

# ============================================
# 4️⃣ Generate Confusion Matrix + Report
# ============================================
labels = ["Failed", "Partially correct", "Success"]

y_true = df[adk_col]
y_pred = df["custom_result"]

cm = confusion_matrix(y_true, y_pred, labels=labels)
report = classification_report(y_true, y_pred, labels=labels, zero_division=0)

print("\\n✅ CONFUSION MATRIX (Actual vs Predicted)\\n")
print(pd.DataFrame(cm, index=[f"Actual_{l}" for l in labels],
                   columns=[f"Pred_{l}" for l in labels]))

print("\\n📊 CLASSIFICATION REPORT\\n")
print(report)

# ============================================
# 5️⃣ Visualize Confusion Matrix
# ============================================
plt.figure(figsize=(6,5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=labels, yticklabels=labels)
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix: New Semantic vs ADK Result")
plt.show()`;

const CatalystEvaluation = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-4">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary">PHASE 03</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Catalyst
              <span className="text-gradient"> LLM-as-Judge</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Using Raga.ai's Catalyst to evaluate agent responses with LLM-as-Judge methodology. 
              Automated scoring with custom prompts and manual calibration for accuracy.
            </p>
          </div>

          {/* High-Level 3-Step Flow */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 text-center">Evaluation Pipeline</h3>
            <div className="grid md:grid-cols-5 gap-4 items-center">
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <Terminal className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-display font-semibold text-sm mb-2">Step 1</h4>
                <p className="text-xs text-muted-foreground">Run script generates agent responses</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="p-6 rounded-lg border border-primary/30 bg-primary/5 text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-display font-semibold text-sm mb-2">Step 2</h4>
                <p className="text-xs text-muted-foreground">Catalyst scores against ground truth</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="p-6 rounded-lg border border-success/30 bg-success/5 text-center">
                <Calculator className="w-8 h-8 text-success mx-auto mb-3" />
                <h4 className="font-display font-semibold text-sm mb-2">Step 3</h4>
                <p className="text-xs text-muted-foreground">Calculate accuracy from scores</p>
              </div>
            </div>
          </div>

          {/* Step by Step Flow for Catalyst */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Setting Up Catalyst Metrics (Detailed)</h3>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Create Project in Catalyst</h4>
                  <p className="text-sm text-muted-foreground">
                    Create a new project in Catalyst and select <span className="text-primary font-semibold">Q/A</span> as the project type.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Dataset
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    After running testing scripts for both insurance and greeting tools, upload the results as CSV. Only use necessary columns and map them correctly:
                  </p>
                  <div className="rounded-lg border border-border bg-card/80 p-4">
                    <p className="text-xs font-display text-muted-foreground mb-3">Column Mapping:</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                        <span className="text-primary">query</span> → Query
                      </div>
                      <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                        <span className="text-primary">expected response</span> → Expected Response
                      </div>
                      <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                        <span className="text-primary">agent's response</span> → Actual Response
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">View Dataset</h4>
                  <p className="text-sm text-muted-foreground">
                    Once uploaded, verify your dataset is visible under the <span className="text-primary font-semibold">Datasets</span> section.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Create Custom Metric
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Navigate to <span className="text-primary">Custom Metric</span> on the left sidebar. Create a new metric:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Name:</span> <span className="text-primary">Your metric name</span>
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Step Name:</span> <span className="text-primary">step1</span>
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Type:</span> <span className="text-primary">Custom Prompt</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Configure System & User Prompts</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    In <span className="text-primary">System Prompt</span>, add the evaluation prompt. In <span className="text-primary">User Prompt</span>, reference CSV columns wrapped in <code className="text-primary bg-primary/10 px-1 rounded">{`{curly brackets}`}</code>. Set grading to <span className="text-primary font-semibold">float</span>.
                  </p>
                  <div className="p-4 rounded-lg border border-warning/30 bg-warning/5 mb-4">
                    <p className="text-xs text-warning font-display">
                      <strong>Model:</strong> OpenAI GPT-4.0 for LLM-as-Judge | <strong>API Key:</strong> Must be configured separately in settings section
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <em>Note: Variables testing is just for single use case example.</em>
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    Once complete, click <span className="text-primary font-semibold">Save and Deploy on Evals</span>.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 6 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Set Up Evaluation</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to <span className="text-primary">Evaluation</span> → Click <span className="text-primary">Evaluation</span> on the right → <span className="text-primary">New Evaluation</span> → <span className="text-primary">Custom</span> → Find your deployed metric.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 7 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  7
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Configure Threshold & Model
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Threshold:</span> <span className="text-primary">~0.01</span>
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Provider/Model:</span> <span className="text-primary">GPT-4.0</span>
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-muted-foreground">Schema:</span> <span className="text-primary">Map accordingly</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">Click <span className="text-primary font-semibold">Save</span>.</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 8 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-success/30 bg-success/5">
                <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center font-display font-bold shrink-0">
                  8
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Run Evaluation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Click <span className="text-success font-semibold">Run Evaluation</span>. Your custom metric will execute against the dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* System Prompt Example */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Custom System Prompt (Greeting Tool)
            </h3>
            <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <span className="text-xs text-muted-foreground font-display">system_prompt_greeting_tool.md</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-muted-foreground whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {systemPrompt}
              </pre>
            </div>
          </div>

          {/* Step 3: Calculate Accuracy */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Step 3: Calculate Accuracy from Scores
            </h3>
            <p className="text-muted-foreground mb-6">
              Once Catalyst generates semantic scores, use this Python script to compute confusion matrix and classification accuracy against ground truth ADK results.
            </p>
            <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-display">calculate_accuracy.py</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-muted-foreground max-h-[400px] overflow-y-auto">
                {accuracyScript}
              </pre>
            </div>
          </div>

          {/* Result Categories */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Evaluation Result Categories</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-success/30 bg-success/5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="font-display font-semibold text-success">Success (&gt; 0.7)</span>
                </div>
                <p className="text-xs text-muted-foreground">Fully correct meaning and workflow. All required entities handled properly.</p>
              </div>
              <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="font-display font-semibold text-warning">Partial (0.4–0.7)</span>
                </div>
                <p className="text-xs text-muted-foreground">Main intent correct but missing entity actions or validation steps.</p>
              </div>
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-destructive" />
                  <span className="font-display font-semibold text-destructive">Failed (&lt; 0.4)</span>
                </div>
                <p className="text-xs text-muted-foreground">Incorrect logic, accepts invalid data, or skips critical validation.</p>
              </div>
            </div>
          </div>

          {/* How do you know LLM-as-Judge is working? */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              How Do You Know LLM-as-Judge is Working?
            </h3>
            <div className="p-6 rounded-lg border border-border bg-card/30">
              <h4 className="font-display font-semibold mb-4">Manual Calibration Process</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Before trusting Catalyst's automated scoring, we validated the LLM-as-Judge prompt through manual calibration:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-display font-bold shrink-0">1</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Manually score a sample set:</strong> Human reviewers scored ~50 query-response pairs using the same rubric (Success/Partial/Failed).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-display font-bold shrink-0">2</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Compare with Catalyst output:</strong> Run the same samples through Catalyst and compare automated scores against manual scores.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-display font-bold shrink-0">3</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Iterate on prompt:</strong> Identify where Catalyst disagreed with human judgment. Refine the system prompt to handle edge cases (e.g., credit card ignored → should be 0.4–0.5, not 0.0).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-xs font-display font-bold shrink-0">4</div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Validate convergence:</strong> Re-run until automated scores match manual scores with &gt;90% agreement. This ensures the judge prompt correctly captures the evaluation criteria.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg border border-warning/30 bg-warning/5">
                <p className="text-xs text-warning font-display">
                  <strong>Key insight:</strong> The prompt was refined multiple times based on edge cases like "SSN ignored but workflow continued" — originally scored as 0.0, but after calibration, correctly classified as 0.4–0.5 (Partial).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CatalystEvaluation;
