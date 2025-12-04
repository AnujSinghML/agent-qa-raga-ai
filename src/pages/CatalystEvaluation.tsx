import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Brain, ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

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
              Automated scoring with manual calibration for accuracy.
            </p>
          </div>

          {/* Step by Step Flow */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Evaluation Pipeline</h3>
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Prepare Test Data</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Collect query-response pairs from script testing phase. Each test case has:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-primary">Query:</span> User input
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-primary">Expected:</span> Ground truth
                    </div>
                    <div className="p-3 rounded bg-secondary/30 text-xs font-display">
                      <span className="text-primary">Actual:</span> Agent response
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Configure Catalyst</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up Catalyst with custom judge prompt for domain-specific evaluation:
                  </p>
                  <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                      <span className="text-xs text-muted-foreground font-display">system_prompt.txt</span>
                    </div>
                    <pre className="p-4 text-sm font-display overflow-x-auto text-muted-foreground">
{`You are an expert evaluator for a healthcare appointment 
scheduling AI agent. Your task is to compare the agent's 
actual response with the expected response and rate it.

Evaluation criteria:
1. Does the response address the user's intent correctly?
2. Is the information provided accurate?
3. Does it follow the expected conversation flow?
4. Are there any safety or compliance issues?

Rate as:
- CORRECT: Response matches expected behavior
- PARTIALLY_CORRECT: Response is acceptable but incomplete
- INCORRECT: Response fails to meet expectations

Provide your rating and brief explanation.`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Run Evaluation</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Execute Catalyst evaluation to get automated scores:
                  </p>
                  <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                      <span className="text-xs text-muted-foreground font-display">run_evaluation.py</span>
                    </div>
                    <pre className="p-4 text-sm font-display overflow-x-auto text-muted-foreground">
{`from catalyst import Evaluator

evaluator = Evaluator(
    model="gpt-4",
    system_prompt=judge_prompt
)

results = evaluator.evaluate(
    queries=test_queries,
    expected=expected_responses,
    actual=agent_responses
)

# Output: correct | partially_correct | incorrect
print(f"Overall Score: {results.accuracy}%")
print(f"Correct: {results.correct_count}")
print(f"Partial: {results.partial_count}")
print(f"Incorrect: {results.incorrect_count}")`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card/30">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-semibold mb-2">Analyze Results</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Review evaluation output categorized by rating:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-success/30 bg-success/5">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="font-display font-semibold text-success">Correct</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Response matches expected behavior exactly</p>
                    </div>
                    <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-warning" />
                        <span className="font-display font-semibold text-warning">Partial</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Acceptable but incomplete or slightly off</p>
                    </div>
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-destructive" />
                        <span className="font-display font-semibold text-destructive">Incorrect</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Failed to meet expectations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manual Calibration Section */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-8">
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

                {/* Calibration Code Example */}
                <div className="mt-6 rounded-lg border border-border bg-card/80 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                    <span className="text-xs text-muted-foreground font-display">calibration_check.py</span>
                  </div>
                  <pre className="p-4 text-sm font-display overflow-x-auto text-muted-foreground">
{`# Manual calibration validation
manual_scores = load_manual_scores("subset_50.json")
catalyst_scores = evaluator.evaluate(subset_queries)

agreement = 0
for i, (manual, auto) in enumerate(zip(manual_scores, catalyst_scores)):
    if manual == auto.rating:
        agreement += 1
    else:
        print(f"Mismatch #{i}: Manual={manual}, Auto={auto.rating}")
        print(f"  Query: {subset_queries[i][:50]}...")
        print(f"  Reason: {auto.explanation}")

agreement_rate = agreement / len(manual_scores) * 100
print(f"\\nAgreement Rate: {agreement_rate:.1f}%")

if agreement_rate < 90:
    print("⚠️ Judge prompt needs refinement")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="mt-16 grid md:grid-cols-2 gap-6">
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
                  <span>Overall accuracy score (%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Correct / Partial / Incorrect distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-display">•</span>
                  <span>Per-category breakdown (flow, security, tools)</span>
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
