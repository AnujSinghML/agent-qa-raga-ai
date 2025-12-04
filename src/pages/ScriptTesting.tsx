import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileCode, Database, Shield, MessageSquare, Wrench, Play, Terminal, ArrowRight } from "lucide-react";
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

// Empty table data structure - for categories without data yet
const emptyTestCases = Array(10).fill({
  query: "",
  expected: "",
  actual: "",
  result: "",
});

// Greeting Tool Test Cases - actual data
const greetingTestCases = [
  {
    query: "Hi",
    expected: "Hi! To continue, please share your full name, date of birth (MM/DD/YYYY), email, and phone number. We'll only proceed once all four are provided.",
    actual: "Hello! I can help you schedule your appointment. To start, I'll need a few details from you:\n\n* **Your Full Name**\n* **Your Date of Birth** (MM/DD/YYYY)\n* **Your Contact Number**\n* **Your Email Address**\n\nCould you please provide these?",
    result: "success",
  },
  {
    query: "Emily Rodriguez",
    expected: "Thanks, Emily Rodriguez! Please provide your date of birth (MM/DD/YYYY)), email, and phone number.",
    actual: "Okay, I have Emily Rodriguez, born on 09/20/1992. Could you please also provide your contact number and email address?",
    result: "success",
  },
  {
    query: "Emily Rodriguez, 09/20/1992",
    expected: "Noted: Emily Rodriguez, DOB 09/20/1992. Please provide your email and phone number.",
    actual: "Okay, I have Emily Rodriguez, born on 09/20/1992. Could you please also provide your contact number and email address?",
    result: "success",
  },
  {
    query: "Just do it / proceed",
    expected: "I can't proceed until we have your full name, DOB (MM/DD/YYYY), email, and phone. Please share those now.",
    actual: "It looks like I couldn't get all your information. Could you please provide your full name, date of birth, contact number, and email address?",
    result: "success",
  },
  {
    query: "Why do you need that? just book it",
    expected: "For safety and accuracy, we require full name, DOB (MM/DD/YYYY), email, and phone before scheduling. Please share them to continue.",
    actual: "I still need your full name, date of birth (format: mm/dd/yyyy, e.g., 05/10/1990), contact number, and email address.",
    result: "success",
  },
  {
    query: "LINK: https://example.com/mydetails",
    expected: "I can't open links. Please type your full name, DOB (MM/DD/YYYY), email, and phone here.",
    actual: "Hello! I can help you schedule your appointment. To start, please tell me your full name, date of birth, contact number, and email address.",
    result: "partial",
  },
  {
    query: "k",
    expected: "To continue, please provide your full name, DOB (MM/DD/YYYY), email, and phone.",
    actual: "I can help you schedule an appointment. Could you please provide me with your full name, date of birth, contact number, and email address?",
    result: "success",
  },
  {
    query: "… / (blank message)",
    expected: "I didn't catch that. Please share your full name, DOB (MM/DD/YYYY), email, and phone.",
    actual: "Hello! To start, please provide your full name, date of birth, contact number, and email address.",
    result: "success",
  },
  {
    query: "🤷‍♂️",
    expected: "I can help once I have your full name, DOB (MM/DD/YYYY), email, and phone.",
    actual: "Hello! I'm here to help you schedule your next appointment. To start, I'll need a few details from you. Could you please provide your full name, date of birth, a contact number, and your email address?",
    result: "success",
  },
  {
    query: "asdfasdf qwerty 12345",
    expected: "I'm not able to use that. Please provide your full name, DOB (MM/DD/YYYY, email, and phone so we can proceed.",
    actual: "I didn't quite catch that. To get you scheduled, I need your full name, date of birth (MM/DD/YYYY), email, and phone number.",
    result: "success",
  },
];

// Security test cases - placeholder for now
const securityTestCases = emptyTestCases;

const runScript = `#!/usr/bin/env python
"""
Automated test script for Medical Scheduling Agent using production Docker Compose
Runs through all queries automatically without manual input
"""
import requests
import json
import time
import os
import csv
import subprocess
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8000"  # Backend API URL (production port)
QUERIES_FILE = "queries.txt"  # File containing test queries
RESULTS_FILE = "agent_responses_auto.csv"  # Output file for responses
DOCKER_COMPOSE_FILE = "scheduling_agent/docker-compose.prod.yml"

def start_docker_containers():
    """Start the Docker containers for testing"""
    print("Starting Docker containers...")
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", "name=medical_scheduler_backend", "--format", "{{.Names}}"],
            capture_output=True, text=True
        )
        
        if "medical_scheduler_backend" in result.stdout:
            print("Docker containers are already running")
            return True
            
        subprocess.run(["docker-compose", "-f", DOCKER_COMPOSE_FILE, "up", "-d"], check=True)
        
        print("Waiting for backend to be ready...")
        max_retries = 60
        for i in range(max_retries):
            try:
                response = requests.get(f"{BASE_URL}/api/v1/health", timeout=5)
                if response.status_code == 200:
                    print("Backend is ready!")
                    return True
            except requests.exceptions.ConnectionError:
                pass
            print(f"Waiting for backend to start... ({i+1}/{max_retries})")
            time.sleep(3)
        
        print("Failed to start backend within timeout")
        return False
    except subprocess.CalledProcessError as e:
        print(f"Error starting Docker containers: {e}")
        return False

def start_session():
    """Start a new session with the agent"""
    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        try:
            response = requests.post(
                f"{BASE_URL}/api/v1/appointments/start-session",
                json={"client_id": "test_client"},
                timeout=15
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            if attempt < max_attempts:
                time.sleep(2)
            else:
                return None

def send_message(session_id, message):
    """Send a message to the agent"""
    max_attempts = 3
    for attempt in range(1, max_attempts + 1):
        try:
            payload = {
                "session_id": session_id,
                "message": message,
                "selections": {},
                "appointment": {},
                "insurance": {}
            }
            
            response = requests.post(
                f"{BASE_URL}/api/v1/appointments/message",
                json=payload,
                timeout=15
            )
            
            if response.status_code == 422:
                return {
                    'agent_message': f"ERROR 422: {response.text}",
                    'collected_data': {'error': 'Validation error'},
                    'error_code': 422
                }
            
            response.raise_for_status()
            response_data = response.json()
            
            agent_message = response_data.get('agent_message', '')
            if not agent_message:
                agent_message = response_data.get('message', '')
            
            return {
                'agent_message': agent_message,
                'collected_data': response_data.get('collected_data', {}),
                'error_code': 0
            }
            
        except requests.exceptions.RequestException as e:
            if attempt < max_attempts:
                time.sleep(2)
            else:
                return {
                    'agent_message': f"ERROR: {str(e)}",
                    'collected_data': {'error': str(e)},
                    'error_code': -1
                }

def load_queries(file_path):
    """Load test queries from file"""
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f if line.strip()]

def save_results(results, file_path):
    """Save test results to CSV file"""
    fieldnames = ['query', 'agent_response', 'collected_data', 'error_code', 'timestamp']
    with open(file_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

def process_query(query, query_index, total_queries):
    """Process a single query"""
    print(f"\\n[{query_index+1}/{total_queries}] Testing query: {query}")
    
    session_data = start_session()
    if not session_data:
        return {
            'query': query,
            'agent_response': "ERROR: Failed to start session",
            'collected_data': "{}",
            'error_code': -4,
            'timestamp': datetime.now().isoformat()
        }
    
    session_id = session_data.get('session_id')
    response_data = send_message(session_id, query)
    
    return {
        'query': query,
        'agent_response': response_data.get('agent_message', ''),
        'collected_data': json.dumps(response_data.get('collected_data', {})),
        'error_code': response_data.get('error_code', 0),
        'timestamp': datetime.now().isoformat()
    }

def run_all_queries():
    """Run all queries automatically"""
    queries = load_queries(QUERIES_FILE)
    if not queries:
        print("No queries found. Exiting.")
        return []
    
    print(f"Loaded {len(queries)} queries for testing")
    results = []
    
    for i, query in enumerate(queries):
        result = process_query(query, i, len(queries))
        results.append(result)
        if i < len(queries) - 1:
            time.sleep(2)
    
    return results

def main():
    """Main function for automated testing"""
    if not start_docker_containers():
        print("Failed to start Docker containers. Exiting.")
        return
    
    try:
        print("Starting automated testing of all queries...")
        results = run_all_queries()
        
        if results:
            save_results(results, RESULTS_FILE)
            print(f"Testing completed. Processed {len(results)} queries.")
    except KeyboardInterrupt:
        print("\\nTesting interrupted by user.")

if __name__ == "__main__":
    main()`;

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

          {/* Run Script Section */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Step 1: Run Automated Test Script
            </h3>
            <p className="text-muted-foreground mb-6">
              This Python script spins up Docker containers, iterates through all test queries in <code className="text-primary bg-primary/10 px-1 rounded">queries.txt</code>, 
              sends each to the agent API, and outputs results to <code className="text-primary bg-primary/10 px-1 rounded">agent_responses_auto.csv</code>.
            </p>
            <div className="rounded-lg border border-border bg-card/80 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-display">run_tests.py</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto text-muted-foreground max-h-[500px] overflow-y-auto">
                {runScript}
              </pre>
            </div>
          </div>

          {/* Process Flow */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6 text-center">Testing Pipeline Flow</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  1
                </div>
                <h4 className="font-display font-semibold mb-2">Run Script</h4>
                <p className="text-sm text-muted-foreground">
                  Execute <code className="text-primary text-xs">run_tests.py</code> against the agent and capture actual responses
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/30 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-display font-bold">
                  2
                </div>
                <h4 className="font-display font-semibold mb-2">Generate CSV</h4>
                <p className="text-sm text-muted-foreground">
                  Output contains query, agent_response, collected_data, error_code, timestamp
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
            </div>
            <div className="mt-6 p-6 rounded-lg border border-success/30 bg-success/5 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-4 font-display font-bold">
                3
              </div>
              <h4 className="font-display font-semibold mb-2 text-success">Feed to Catalyst</h4>
              <p className="text-sm text-muted-foreground">
                Upload CSV to Catalyst for LLM-as-Judge semantic scoring
              </p>
            </div>
          </div>

          {/* Test Category Tabs */}
          <div className="mb-16">
            <h3 className="text-xl font-display font-bold mb-6">Test Case Categories</h3>
            <Tabs defaultValue="complete-flow" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {testCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                    {category.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {testCategories.map((category) => {
                const testCases = category.id === "greeting" ? greetingTestCases : emptyTestCases;
                const hasData = category.id === "greeting";
                
                return (
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
                            {testCases.map((testCase, index) => (
                              <tr key={index} className="hover:bg-secondary/5">
                                <td className="px-4 py-4 text-muted-foreground font-display">{index + 1}</td>
                                <td className="px-4 py-4">
                                  {hasData ? (
                                    <code className="text-xs bg-secondary/30 px-2 py-1 rounded">{testCase.query}</code>
                                  ) : (
                                    <span className="text-muted-foreground/50 italic">—</span>
                                  )}
                                </td>
                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                  {hasData ? testCase.expected : <span className="italic opacity-50">—</span>}
                                </td>
                                <td className="px-4 py-4 text-xs text-muted-foreground">
                                  {hasData ? testCase.actual : <span className="italic opacity-50">—</span>}
                                </td>
                                <td className="px-4 py-4">
                                  {hasData ? (
                                    <span className={`px-2 py-1 rounded text-xs font-display ${
                                      testCase.result === "success" 
                                        ? "bg-success/20 text-success" 
                                        : testCase.result === "partial"
                                        ? "bg-warning/20 text-warning"
                                        : "bg-destructive/20 text-destructive"
                                    }`}>
                                      {testCase.result}
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                                      pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Table Footer */}
                      <div className="px-6 py-4 border-t border-border bg-secondary/10 text-center">
                        <p className="text-sm text-muted-foreground">
                          {hasData 
                            ? `Showing ${testCases.length} of ${category.count} test cases`
                            : `Showing 10 of ${category.count} test cases • Data to be populated`
                          }
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ScriptTesting;
