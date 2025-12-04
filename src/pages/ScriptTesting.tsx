import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileCode, Database, Shield, MessageSquare, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const testCategories = [
  {
    id: "complete-flow",
    title: "Complete Flow Tests",
    icon: Database,
    count: 124,
    description: "End-to-end test cases covering the full appointment scheduling flow",
  },
  {
    id: "security",
    title: "Security & Persona Tests",
    icon: Shield,
    count: 55,
    description: "Test cases for security boundaries and persona adherence",
  },
  {
    id: "greeting",
    title: "Greeting Tool Tests",
    icon: MessageSquare,
    count: 178,
    description: "110 greeting scenarios + 68 edge case variations",
  },
  {
    id: "insurance",
    title: "Insurance Tool Tests",
    icon: Wrench,
    count: 98,
    description: "Insurance collection, validation, and edge cases",
  },
];

// Empty table data structure - user will fill in later
const emptyTestCases = Array(10).fill({
  query: "",
  expected: "",
  actual: "",
  result: "",
});

const ScriptTesting = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-4">
              <FileCode className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary">PHASE 02</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Script-Based
              <span className="text-gradient"> Testing</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Automated testing framework running the agent against categorized test cases 
              with expected responses. This is the foundation before Catalyst evaluation.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {testCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-lg border border-border bg-card/30 text-center"
              >
                <category.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary font-display">{category.count}</div>
                <div className="text-xs text-muted-foreground">{category.title}</div>
              </div>
            ))}
          </div>

          {/* Test Category Tabs */}
          <Tabs defaultValue="complete-flow" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {testCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                  {category.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {testCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="rounded-lg border border-border bg-card/30 overflow-hidden">
                  {/* Category Header */}
                  <div className="px-6 py-4 border-b border-border bg-secondary/20">
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-display font-semibold">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <span className="ml-auto px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-display">
                        {category.count} tests
                      </span>
                    </div>
                  </div>

                  {/* Test Cases Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/10">
                        <tr>
                          <th className="text-left px-4 py-3 font-display text-muted-foreground w-8">#</th>
                          <th className="text-left px-4 py-3 font-display text-muted-foreground min-w-[200px]">Query</th>
                          <th className="text-left px-4 py-3 font-display text-muted-foreground min-w-[200px]">Expected Response</th>
                          <th className="text-left px-4 py-3 font-display text-muted-foreground min-w-[200px]">Actual Response</th>
                          <th className="text-left px-4 py-3 font-display text-muted-foreground w-24">Result</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {emptyTestCases.map((_, index) => (
                          <tr key={index} className="hover:bg-secondary/5">
                            <td className="px-4 py-4 text-muted-foreground font-display">{index + 1}</td>
                            <td className="px-4 py-4 text-muted-foreground/50 italic">—</td>
                            <td className="px-4 py-4 text-muted-foreground/50 italic">—</td>
                            <td className="px-4 py-4 text-muted-foreground/50 italic">—</td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                                pending
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="px-6 py-4 border-t border-border bg-secondary/10 text-center">
                    <p className="text-sm text-muted-foreground">
                      Showing 10 of {category.count} test cases • Data to be populated
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Process Flow */}
          <div className="mt-16">
            <h3 className="text-xl font-display font-bold mb-6 text-center">Testing Process Flow</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  1
                </div>
                <h4 className="font-display font-semibold mb-2">Run Script</h4>
                <p className="text-sm text-muted-foreground">
                  Execute test queries against the agent and capture actual responses
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  2
                </div>
                <h4 className="font-display font-semibold mb-2">Compare Results</h4>
                <p className="text-sm text-muted-foreground">
                  Match actual responses with expected responses for ground truth scoring
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  3
                </div>
                <h4 className="font-display font-semibold mb-2">Feed to Catalyst</h4>
                <p className="text-sm text-muted-foreground">
                  Send query-response pairs to Catalyst for LLM-as-Judge evaluation
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

export default ScriptTesting;
