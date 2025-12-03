import { ArrowDown, Shield, Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-glow opacity-50" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8 animate-fade-up">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">QA Framework for AI Agents</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up animation-delay-100">
          <span className="text-foreground">Ship AI with</span>
          <br />
          <span className="text-gradient glow-text">Confidence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200 font-body">
          A systematic QA methodology that helped us launch an AI agent chatbot 
          with minimal production issues. 200+ test queries, unit testing, and 
          jailbreak sessions that actually work.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-up animation-delay-300">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-display">200+</div>
            <div className="text-sm text-muted-foreground">Test Queries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-display">100+</div>
            <div className="text-sm text-muted-foreground">Tool Tests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-display">4</div>
            <div className="text-sm text-muted-foreground">Testing Phases</div>
          </div>
        </div>

        {/* Terminal preview */}
        <div className="relative max-w-xl mx-auto animate-fade-up animation-delay-400">
          <div className="rounded-lg border border-border bg-card/80 backdrop-blur overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="text-xs text-muted-foreground ml-2 font-display">qa_runner.py</span>
            </div>
            <div className="p-4 font-display text-sm text-left">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-primary">$</span>
                <span>python run_agent_tests.py --queries 200</span>
              </div>
              <div className="mt-2 text-success">✓ All tests passed</div>
              <div className="text-muted-foreground">Score: 94.5% | Time: 12.3s</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
