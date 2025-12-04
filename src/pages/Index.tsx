import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowDown, Shield, Terminal, ArrowRight, Code, Server, Monitor, Skull } from "lucide-react";

const phases = [
  {
    icon: Server,
    number: "01",
    title: "Backend Testing",
    description: "Postman-based API testing documented on GitHub with full flow coverage",
    href: "/backend-testing",
    color: "primary",
  },
  {
    icon: Code,
    number: "02",
    title: "Script Testing",
    description: "455+ test cases across complete flows, security, and individual tools",
    href: "/script-testing",
    color: "primary",
  },
  {
    icon: Terminal,
    number: "03",
    title: "Catalyst Evaluation",
    description: "LLM-as-Judge scoring with manual calibration for accuracy validation",
    href: "/catalyst",
    color: "primary",
  },
  {
    icon: Skull,
    number: "04",
    title: "Jailbreak Sessions",
    description: "Production stress testing with real users to identify security gaps",
    href: "/jailbreak",
    color: "destructive",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
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
            with minimal production issues. 455+ test queries, tool testing, and 
            jailbreak sessions that actually work.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-up animation-delay-300">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-display">455+</div>
              <div className="text-sm text-muted-foreground">Test Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-display">4</div>
              <div className="text-sm text-muted-foreground">Testing Phases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary font-display">90%+</div>
              <div className="text-sm text-muted-foreground">Judge Accuracy</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="animate-float">
            <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
          </div>
        </div>
      </section>

      {/* Phases Overview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              The
              <span className="text-gradient"> Methodology</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A systematic approach to testing AI agents that catches edge cases 
              before they become production incidents.
            </p>
          </div>

          {/* Phase cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase, index) => (
              <Link
                key={phase.number}
                to={phase.href}
                className="group relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  {/* Number */}
                  <span className="text-5xl font-bold text-border/50 font-display absolute -top-2 -left-1">
                    {phase.number}
                  </span>
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mt-6 ${
                    phase.color === 'destructive' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <phase.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 font-display">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                  
                  {/* Link indicator */}
                  <div className="flex items-center gap-2 text-primary text-sm font-display group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Connection line */}
          <div className="hidden lg:block relative h-1 mt-8">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
