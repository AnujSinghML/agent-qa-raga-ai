import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Settings, Upload, Play, Target } from "lucide-react";

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

          {/* Step by Step Flow */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Step-by-Step: Setting Up Catalyst Metrics</h3>
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
                    After running testing scripts for both insurance and greeting tools, upload the results as CSV:
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
                    Set up your evaluation prompts. Column names from CSV must be wrapped in <code className="text-primary bg-primary/10 px-1 rounded">{`{curly brackets}`}</code> in both prompts. Set grading to <span className="text-primary font-semibold">float</span>.
                  </p>
                  <div className="p-4 rounded-lg border border-warning/30 bg-warning/5 mb-4">
                    <p className="text-xs text-warning font-display">
                      <strong>Model:</strong> OpenAI GPT-4.0 for LLM-as-Judge | <strong>API Key:</strong> Must be configured separately in settings
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
            <h3 className="text-xl font-display font-bold mb-6">Example: Greeting Tool System Prompt</h3>
            <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <span className="text-xs text-muted-foreground font-display">system_prompt_greeting_tool.md</span>
              </div>
              <pre className="p-4 text-xs font-display overflow-x-auto text-muted-foreground whitespace-pre-wrap">
{`## 🧠 **ADK Evaluation Prompt (Revised)**

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
| **Success** | > 0.7 | Fully correct meaning and workflow. All required entities handled. | ✅ Expected: "Please share your phone number." Actual: "I have your DOB and email. I'll also need your phone to continue." |
| **Partially correct** | 0.4–0.7 | Main intent right, but one or more entity actions or validation steps missing. | ⚠️ Expected: "Please provide your full DOB and email." Actual: "Can I get your email?" (Missed DOB) |
| **Failed** | < 0.4 | Incorrect logic, accepts invalid data, skips critical validation. **Automatic failure if sensitive data is accepted.** | ❌ Expected: "Please confirm your full last name." Actual: "Welcome Emily R.! Your consultation is booked." |
| **Out of scope** | — | Not related to scheduling or patient intake workflow. | — |

-----

### 🧱 **Evaluation Principles**

#### 1. **Entity Handling & Validation**

#### 2. **Workflow Logic**
  * Must request all **missing required fields** before proceeding.
  * **Must not skip validation, or prematurely confirm bookings. Incorrectly flagging valid data as invalid → score ≤ 0.4**
  * Should explicitly track progress ("I have your DOB and email; still need your phone").

#### 3. **Sensitive or Invalid Data Handling**
  * **Automatic failure (< 0.4)** if: Assistant **accepts or processes** sensitive data (SSN, credit card, passwords).
  * **Score 0.4–0.5** if: Assistant **ignores** sensitive data but continues workflow.
  * Proceeds with clearly invalid contact info (e.g., 555 or null) → **Automatic failure (< 0.4).**

-----

#### **Expected Results with Scoring:**

| Case | New Reason | Score | Label |
| :--- | :--- | :--- | :--- |
| 1. Credit Card Ignored | Ignores sensitive data but continues workflow. | **0.4–0.5** | Partially correct |
| 2. Invalid Phone Flagged | Incorrectly flags valid data as invalid. | **0.4** | Partially correct |
| 3. Invalid Email Missed | Skips critical validation. | **0.4** | Partially correct |
| 4. SSN Ignored & Phone Flagged | Double error: Ignores sensitive + flags valid. | **0.4** | Partially correct |`}
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
                <p className="text-xs text-muted-foreground">Incorrect logic, accepted invalid/sensitive data, or skipped critical validation.</p>
              </div>
            </div>
          </div>

          {/* Manual Calibration Section */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold mb-4">
                  How Do You Know LLM-as-Judge is Working?
                </h3>
                <p className="text-muted-foreground mb-6">
                  The key challenge with LLM-as-Judge is calibration. How do you know the judge prompt 
                  is evaluating correctly? Here's our validation approach:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h4 className="font-display font-semibold mb-2">1. Manual Scoring Subset</h4>
                    <p className="text-sm text-muted-foreground">
                      Periodically take a small subset (20-50 test cases) and manually score them. 
                      This creates a human ground truth for that subset.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h4 className="font-display font-semibold mb-2">2. Compare with Catalyst Output</h4>
                    <p className="text-sm text-muted-foreground">
                      Run the same subset through Catalyst and compare the automated scores 
                      with your manual scores. Track agreement rate.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h4 className="font-display font-semibold mb-2">3. Iterate on Judge Prompt</h4>
                    <p className="text-sm text-muted-foreground">
                      If agreement is low, refine the judge system prompt. Add more specific criteria, 
                      examples of edge cases, or clarify ambiguous evaluation rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h4 className="font-display font-semibold mb-2">4. Target Agreement Rate</h4>
                    <p className="text-sm text-muted-foreground">
                      Aim for 90%+ agreement between manual and automated scoring. 
                      Below this, the judge prompt needs refinement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calibration Code */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Calibration Utilities: calibration_check.py</h3>
            <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <span className="text-xs text-muted-foreground font-display">calibration_check.py</span>
              </div>
              <pre className="p-4 text-xs font-display overflow-x-auto text-muted-foreground">
{`"""
Semantic Score Accuracy Analysis Utilities

This module helps you:
- Bucket semantic scores into Failed / Partial Success / Success
- Compute success / partial / failure rates
- Compute an "adjusted accuracy" (partial counts as half credit)
- Build confusion matrices vs. a ground-truth / ADK flag
- Export partial / failed samples for manual review
"""

from dataclasses import dataclass
from typing import Tuple, Dict, Optional

import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix, classification_report


# -------------------------------------------------------------------
# 1. Configuration dataclass
# -------------------------------------------------------------------

@dataclass
class ScoreBucketsConfig:
    """
    Configuration for semantic score bucketing.

    Thresholds:
      - Failed:          score < low
      - Partial Success: low <= score < high
      - Success:         score >= high
    """
    low: float = 0.4
    high: float = 0.7
    score_col: str = "semantic_score"
    bucket_col: str = "semantic_bucket"
    range_col: str = "score_range"


# -------------------------------------------------------------------
# 2. Core bucketing helpers
# -------------------------------------------------------------------

def classify_score(
    score: float,
    low: float = 0.4,
    high: float = 0.7
) -> str:
    """
    Map a numeric semantic score into a label.
    Returns one of: "Failed", "Partial Success", "Success".
    """
    if pd.isna(score):
        return "Unknown"
    if score < low:
        return "Failed"
    if score < high:
        return "Partial Success"
    return "Success"


def add_score_buckets(
    df: pd.DataFrame,
    config: ScoreBucketsConfig = ScoreBucketsConfig()
) -> pd.DataFrame:
    """
    Add semantic score bucket labels and coarse score ranges to a DataFrame.
    """
    df = df.copy()
    df[config.bucket_col] = df[config.score_col].apply(
        lambda s: classify_score(s, config.low, config.high)
    )
    bins = np.round(np.arange(0.0, 1.01, 0.1), 1)
    labels = [f"{bins[i]:.1f}–{bins[i+1]:.1f}" for i in range(len(bins) - 1)]
    df[config.range_col] = pd.cut(
        df[config.score_col],
        bins=bins,
        labels=labels,
        include_lowest=True,
        right=True
    )
    return df


# -------------------------------------------------------------------
# 3. Aggregate metrics for buckets
# -------------------------------------------------------------------

@dataclass
class BucketStats:
    total_samples: int
    success_count: int
    partial_count: int
    failed_count: int
    success_rate: float
    partial_rate: float
    failed_rate: float
    adjusted_accuracy: float  # Success + 0.5 * Partial


def compute_bucket_stats(
    df: pd.DataFrame,
    bucket_col: str = "semantic_bucket"
) -> BucketStats:
    """
    Compute counts and rates for Failed / Partial / Success,
    plus an adjusted accuracy where partial success counts as half.
    """
    total = len(df)
    counts = df[bucket_col].value_counts().to_dict()

    success = counts.get("Success", 0)
    partial = counts.get("Partial Success", 0)
    failed = counts.get("Failed", 0)

    if total == 0:
        return BucketStats(0, 0, 0, 0, 0.0, 0.0, 0.0, 0.0)

    success_rate = success / total
    partial_rate = partial / total
    failed_rate = failed / total
    adjusted_accuracy = (success + 0.5 * partial) / total

    return BucketStats(
        total_samples=total,
        success_count=success,
        partial_count=partial,
        failed_count=failed,
        success_rate=success_rate * 100.0,
        partial_rate=partial_rate * 100.0,
        failed_rate=failed_rate * 100.0,
        adjusted_accuracy=adjusted_accuracy * 100.0,
    )


# -------------------------------------------------------------------
# 4. Confusion matrix vs. ground truth / ADK result
# -------------------------------------------------------------------

def build_confusion_against_flag(
    df: pd.DataFrame,
    bucket_col: str = "semantic_bucket",
    flag_col: str = "adk_result",
    positive_label: str = "Success",
    flag_positive_value: int = 1,
    include_partial_as_positive: bool = False,
) -> Dict[str, object]:
    """
    Build a confusion matrix comparing semantic buckets vs. a ground-truth flag.
    """
    if include_partial_as_positive:
        predicted_positive = df[bucket_col].isin(["Success", "Partial Success"])
    else:
        predicted_positive = df[bucket_col] == positive_label

    y_pred = predicted_positive.astype(int)
    y_true = (df[flag_col] == flag_positive_value).astype(int)

    labels = [0, 1]
    cm = confusion_matrix(y_true, y_pred, labels=labels)
    report = classification_report(y_true, y_pred, target_names=["Negative", "Positive"])

    return {
        "confusion_matrix": cm,
        "labels": labels,
        "classification_report": report,
    }


# -------------------------------------------------------------------
# 5. Sample exporters
# -------------------------------------------------------------------

def export_bucket_samples(
    df: pd.DataFrame,
    bucket_col: str = "semantic_bucket",
    output_prefix: str = "semantic",
    export_failed: bool = True,
    export_partial: bool = True,
) -> Dict[str, str]:
    """
    Export failed / partial samples as CSV for manual audit.
    """
    paths: Dict[str, str] = {}

    def _export(mask, suffix):
        subset = df.loc[mask]
        if len(subset) == 0:
            return None
        path = f"{output_prefix}_{suffix}_samples.csv"
        subset.to_csv(path, index=False)
        return path

    if export_failed:
        path = _export(df[bucket_col] == "Failed", "failed")
        if path:
            paths["failed"] = path

    if export_partial:
        path = _export(df[bucket_col] == "Partial Success", "partial")
        if path:
            paths["partial"] = path

    return paths


# -------------------------------------------------------------------
# 6. One-shot convenience function
# -------------------------------------------------------------------

def run_full_semantic_analysis(
    df: pd.DataFrame,
    score_col: str = "semantic_score",
    flag_col: Optional[str] = None,
) -> Dict[str, object]:
    """
    High-level entry point that:
      1) Buckets scores into Failed / Partial / Success
      2) Computes bucket stats & adjusted accuracy
      3) Optionally computes confusion matrix vs. a flag column
    """
    cfg = ScoreBucketsConfig(score_col=score_col)
    annotated = add_score_buckets(df, cfg)
    stats = compute_bucket_stats(annotated, bucket_col=cfg.bucket_col)

    result = {"df": annotated, "stats": stats}

    if flag_col is not None:
        confusion = build_confusion_against_flag(
            annotated, bucket_col=cfg.bucket_col, flag_col=flag_col
        )
        result["confusion"] = confusion

    return result`}
              </pre>
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border bg-card/30">
              <h4 className="font-display font-semibold mb-3">Why LLM-as-Judge?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Scalable evaluation for hundreds of test cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Semantic understanding beyond exact string matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Consistent evaluation criteria across all tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span>Detailed explanations for failed tests</span>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card/30">
              <h4 className="font-display font-semibold mb-3">Key Metrics Tracked</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Overall accuracy score (0.0 - 1.0)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Success / Partial / Failed distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Adjusted accuracy (partial = 0.5 credit)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Manual vs automated agreement rate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CatalystEvaluation;
