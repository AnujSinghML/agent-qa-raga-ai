import { CheckCircle2, FileCode, Gauge, Brain, FlaskConical, GitCompare } from "lucide-react";

const steps = [
  {
    icon: FileCode,
    title: "Script-Based Agent Testing",
    description: "Run the agent against 200+ user queries with expected responses defined upfront. Automated, reproducible, and thorough.",
    highlight: "200+ queries",
  },
  {
    icon: CheckCircle2,
    title: "Unit Testing on GitHub",
    description: "Document all unit tests in the repository. Clear test cases, clear expectations, clear history of what's tested.",
    highlight: "Documented",
  },
  {
    icon: FlaskConical,
    title: "Tool-Level Testing",
    description: "Each tool used by the agent gets 100+ dedicated test queries. Tools are the building blocks—they must be solid.",
    highlight: "100+ per tool",
  },
  {
    icon: Gauge,
    title: "Ground Truth Scoring",
    description: "Calculate agent scores using expected responses as ground truth. Objective, quantifiable quality metrics.",
    highlight: "Quantified",
  },
  {
    icon: Brain,
    title: "LLM-as-Judge via Catalyst",
    description: "Use Raga.ai's Catalyst to rate responses as correct, partially correct, or incorrect. LLM judges LLM for comprehensive evaluation.",
    highlight: "AI-powered",
  },
  {
    icon: GitCompare,
    title: "Manual Calibration",
    description: "Periodically score a small dataset manually and compare with Catalyst results. Ensures the judge prompt is well-calibrated.",
    highlight: "Validated",
  },
];

const LocalTestingDeep = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <span className="text-xs font-display text-primary">PHASE 01</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Local Testing
            <span className="text-gradient"> Deep Dive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The foundation of confident AI launches. This is where most edge cases get caught.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group p-6 rounded-lg border border-border bg-card/30 backdrop-blur hover:bg-card/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon and highlight */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-display text-primary/80 bg-primary/10 px-2 py-1 rounded">
                  {step.highlight}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold mb-2 font-display">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="text-xs text-muted-foreground ml-2 font-display">catalyst_eval.py</span>
            </div>
            <pre className="p-4 text-sm font-display overflow-x-auto">
              <code className="text-muted-foreground">
{`# Run evaluation with LLM-as-Judge
from catalyst import Evaluator

evaluator = Evaluator(
    model="gpt-4",
    criteria=["correctness", "helpfulness", "safety"]
)

results = evaluator.run(
    queries=test_queries,
    responses=agent_responses,
    expected=ground_truth
)

# Results: correct | partially_correct | incorrect
print(f"Score: {results.accuracy}%")`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalTestingDeep;
