import { Code, Server, Monitor, Skull } from "lucide-react";

const phases = [
  {
    icon: Code,
    number: "01",
    title: "Local Testing",
    description: "Script-based testing against 200+ queries with expected responses and LLM-as-judge scoring",
    color: "primary",
  },
  {
    icon: Server,
    number: "02",
    title: "Backend Testing",
    description: "Postman-based API testing to ensure all endpoints work correctly before deployment",
    color: "primary",
  },
  {
    icon: Monitor,
    number: "03",
    title: "Dev Environment",
    description: "Manual testing in development environment to catch integration issues",
    color: "primary",
  },
  {
    icon: Skull,
    number: "04",
    title: "Jailbreak Sessions",
    description: "Production stress testing with real users attempting to break the system",
    color: "destructive",
  },
];

const PhaseOverview = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Four Phases of
            <span className="text-gradient"> Quality</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A systematic approach to testing AI agents that catches edge cases 
            before they become production incidents.
          </p>
        </div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <div
              key={phase.number}
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
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connection line */}
        <div className="hidden lg:block relative h-1 mt-8">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default PhaseOverview;
