import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Server, ArrowRight, CheckCircle2, Github } from "lucide-react";

const apiSteps = [
  {
    step: 1,
    title: "Start Session",
    endpoint: "POST /api/v1/appointments/start-session",
    description: "Initialize a new session for the patient flow",
    payload: `{}`,
    response: `{
  "status": "success",
  "session_id": "d73d14aa-1a62-4b9b-92e8-b5759a5f488d",
  "message": "Hello! I'm here to help you schedule...",
  "ui_directives": {
    "show_selections": false,
    "show_calendly": false,
    "current_step": "greeting"
  }
}`,
  },
  {
    step: 2,
    title: "Patient Information",
    endpoint: "POST /api/v1/appointments/message",
    description: "Collect patient details - system detects new vs returning patient",
    payload: `{
  "session_id": "d73d14aa-...",
  "message": "Emily Rodriguez, 20/09/1992, emily.rodriguez@mail.com, 555-111-2222"
}`,
    response: `{
  "status": "success",
  "message": "Welcome Emily Rodriguez! As a new patient, your initial consultation will be 60 minutes.",
  "session_data": {
    "patient_name": "Emily Rodriguez",
    "visit_type": "new",
    "slot_duration": 60
  },
  "ui_directives": {
    "show_selections": true,
    "doctors": ["Dr. Nicole Barberis", "Dr. Shikha Gupta", ...],
    "clinics": ["Boulder", "Lakewood(West)", ...]
  }
}`,
  },
  {
    step: 3,
    title: "Doctor & Clinic Selection",
    endpoint: "POST /api/v1/appointments/message",
    description: "User selects doctor and clinic location",
    payload: `{
  "session_id": "d73d14aa-...",
  "message": "I've made my selections",
  "selections": {
    "selected_doctor": "Dr. Nicole Barberis",
    "clinic_location": "Lakewood(West)",
    "preferred_contact_method": "Email"
  }
}`,
    response: `{
  "status": "success",
  "message": "✅ Great! You've selected Dr. Nicole Barberis at Lakewood(West).",
  "ui_directives": {
    "show_calendly": true,
    "current_step": "calendar"
  },
  "calendly_widget": {
    "url": "https://calendly.com/.../dr-nicole-barbaris-new-patients",
    "appointment_duration": 60
  }
}`,
  },
  {
    step: 4,
    title: "Calendly Webhook",
    endpoint: "POST /webhooks/calendly",
    description: "Background webhook from Calendly after user books slot",
    payload: `{
  "event": "invitee.created",
  "payload": {
    "tracking": {
      "utm_content": "session-d73d14aa-..."
    },
    "scheduled_event": {
      "start_time": "2025-10-31T02:30:00.000000Z",
      "end_time": "2025-10-31T03:30:00.000000Z"
    }
  }
}`,
    response: `// Session updated with:
{
  "appointment_date": "2025-10-31",
  "appointment_time": "08:00-09:00",
  "webhook_processed": true
}`,
  },
  {
    step: 5,
    title: "Appointment Confirmation",
    endpoint: "POST /api/v1/appointments/message",
    description: "Confirm booking and request insurance details",
    payload: `{
  "session_id": "d73d14aa-...",
  "message": "Selected appointment for October 31, 2025 at 8:00 AM",
  "appointment": {
    "appointment_date": "October 31, 2025",
    "appointment_time": "8:00 AM"
  }
}`,
    response: `{
  "status": "success",
  "message": "I have:\\n✓ Patient Name: Emily Rodriguez\\n✓ Appointment: October 31, 2025 at 8:00 AM\\n\\nStill need:\\n- Insurance provider\\n- Insurance member ID",
  "ui_directives": {
    "current_step": "insurance"
  }
}`,
  },
  {
    step: 6,
    title: "Insurance Collection",
    endpoint: "POST /api/v1/appointments/message",
    description: "Collect insurance and finalize appointment",
    payload: `{
  "session_id": "d73d14aa-...",
  "message": "provider: Cigna, member_id: 123456789",
  "insurance": {
    "insurance_provider": "Cigna",
    "insurance_member_id": "123456789"
  }
}`,
    response: `{
  "status": "success",
  "message": "🎉 APPOINTMENT CONFIRMED!\\n\\nConfirmation #: APT-20251007-BEE767B5\\n\\n📋 Details:\\n- Patient: Emily Rodriguez\\n- Date: October 31, 2025\\n- Time: 8:00 AM\\n- Duration: 60 minutes\\n- Status: ✅ CONFIRMED"
}`,
  },
  {
    step: 7,
    title: "Experience Rating",
    endpoint: "POST /api/v1/appointments/message",
    description: "Capture user feedback",
    payload: `{
  "session_id": "d73d14aa-...",
  "message": "happy"
}`,
    response: `{
  "status": "success",
  "message": "Thank you for your feedback! Your appointment is all set.",
  "ui_directives": {
    "current_step": "completed"
  }
}`,
  },
];

const BackendTesting = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-4">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-xs font-display text-primary">PHASE 01</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Backend Testing
              <span className="text-gradient"> with Postman</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              API flow documentation for the New Patient appointment scheduling flow. 
              Tested against all permutation combinations and documented on private GitHub.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Github className="w-4 h-4" />
              <span>Documented on private GitHub repository</span>
            </div>
          </div>

          {/* Flow Summary */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card/50">
            <h3 className="font-display font-semibold mb-4">Flow Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total API Calls:</span>
                <span className="ml-2 text-primary font-semibold">7 from frontend</span>
              </div>
              <div>
                <span className="text-muted-foreground">Webhook Calls:</span>
                <span className="ml-2 text-primary font-semibold">1 from Calendly</span>
              </div>
              <div>
                <span className="text-muted-foreground">Flow Variations:</span>
                <span className="ml-2 text-primary font-semibold">New + Follow-up patients</span>
              </div>
            </div>
          </div>

          {/* API Steps */}
          <div className="space-y-8">
            {apiSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative rounded-lg border border-border bg-card/30 overflow-hidden"
              >
                {/* Step Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-secondary/20">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold">{step.title}</h3>
                    <code className="text-xs text-primary">{step.endpoint}</code>
                  </div>
                  {index < apiSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                  )}
                </div>

                {/* Description */}
                <div className="px-6 py-3 border-b border-border">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Payload & Response */}
                <div className="grid md:grid-cols-2">
                  <div className="p-4 border-r border-border">
                    <div className="text-xs font-display text-muted-foreground mb-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/20 rounded text-primary">REQUEST</span>
                      Payload
                    </div>
                    <pre className="text-xs font-display overflow-x-auto text-muted-foreground whitespace-pre-wrap">
                      {step.payload}
                    </pre>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-display text-muted-foreground mb-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-success/20 rounded text-success">RESPONSE</span>
                      Data
                    </div>
                    <pre className="text-xs font-display overflow-x-auto text-muted-foreground whitespace-pre-wrap">
                      {step.response}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-16">
            <h3 className="text-xl font-display font-bold mb-6">New Patient vs Follow-Up Patient</h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/30">
                  <tr>
                    <th className="text-left px-4 py-3 font-display">Feature</th>
                    <th className="text-left px-4 py-3 font-display">New Patient</th>
                    <th className="text-left px-4 py-3 font-display">Follow-Up Patient</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 text-muted-foreground">Appointment Duration</td>
                    <td className="px-4 py-3"><span className="text-primary font-semibold">60 minutes</span></td>
                    <td className="px-4 py-3">30 minutes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-muted-foreground">Calendly Event</td>
                    <td className="px-4 py-3">"New Patients"</td>
                    <td className="px-4 py-3">"Follow up Patients"</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-muted-foreground">Insurance Prompt</td>
                    <td className="px-4 py-3">Direct collection</td>
                    <td className="px-4 py-3">Confirmation of stored data</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-muted-foreground">Insurance Stored</td>
                    <td className="px-4 py-3"><span className="text-destructive">❌ First time</span></td>
                    <td className="px-4 py-3"><span className="text-success">✅ From previous visit</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Testing Note */}
          <div className="mt-12 p-6 rounded-lg border border-success/30 bg-success/5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-display font-semibold text-success">Tested with Real Calendly Integration</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  All flows tested against permutation combinations: new/follow-up patients, 
                  different doctors, clinics, and insurance scenarios.
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

export default BackendTesting;
