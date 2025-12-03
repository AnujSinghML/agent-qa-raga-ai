import { TrendingUp, Bug, Clock, Users } from "lucide-react";

const results = [
  {
    icon: Bug,
    metric: "90%",
    label: "Edge Cases Caught",
    description: "Before reaching production",
  },
  {
    icon: Clock,
    metric: "3x",
    label: "Faster Debugging",
    description: "With documented test cases",
  },
  {
    icon: TrendingUp,
    metric: "94%",
    label: "Agent Accuracy",
    description: "On ground truth evaluation",
  },
  {
    icon: Users,
    metric: "Zero",
    label: "Critical Issues",
    description: "Post-launch incidents",
  },
];

const ResultsSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            The
            <span className="text-gradient"> Results</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A methodical approach to QA pays dividends. Here's what this framework delivered.
          </p>
        </div>

        {/* Results grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <div
              key={result.label}
              className="group text-center p-8 rounded-lg border border-border bg-card/30 backdrop-blur hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <result.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Metric */}
              <div className="text-4xl font-bold text-gradient mb-2 font-display">
                {result.metric}
              </div>

              {/* Label */}
              <h3 className="font-semibold mb-1">{result.label}</h3>
              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <a 
              href="#methodology" 
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors animate-pulse-glow"
            >
              Explore Full Methodology
            </a>
            <span className="text-muted-foreground text-sm">or scroll up to learn more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
