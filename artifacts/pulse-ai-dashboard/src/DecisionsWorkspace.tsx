import { useEffect, useState, useMemo } from "react";
import { 
  AlertCircle, ArrowLeft, Check, CheckCircle2, Clock, Download,
  FileSpreadsheet, FileText, MessageSquare, Share, ThumbsUp, XCircle, Search, Sparkles,
  Send, ChevronUp, ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";
import "./decisions.css";

const extendedDecisions = [
  {
    id: "DEC-882",
    type: "Approval",
    title: "UCC Infrastructure · QAR 42M",
    shortTitle: "Release infrastructure capital",
    description: "Capital release awaiting your review.",
    detail: "Phase two contractor release is ready. Holding it moves the Lusail handover by an estimated 9 days.",
    action: "Review",
    meta: "12 min ago",
    tone: "approval",
    amount: "QAR 42,000,000",
    isPriority: true,
    status: "Pending",
    sourcePlatform: "SAP S/4HANA",
    dueDate: "Due Today",
    requester: { name: "Khalid Al-Mahmoud", role: "VP Infrastructure", initials: "KA" },
    context: [
      "Phase two of the Lusail infrastructure development has reached its contractor milestone. The capital release of QAR 42M is required to authorize the next stage of procurement and labor allocation.",
      "Any delay in this release directly impacts the critical path. Holding the capital beyond this week will push the final handover date by an estimated 9 days, potentially triggering late penalties in the master agreement."
    ],
    impact: [
      { category: "Budget", value: "QAR 42M", trend: "neutral", subtitle: "Within planned Q3 allocation" },
      { category: "Schedule", value: "-9 Days", trend: "negative", subtitle: "If delayed past Thursday" },
      { category: "Contract", value: "Compliant", trend: "positive", subtitle: "All milestones verified" }
    ],
    attachments: [
      { name: "Lusail_Phase2_Drawdown.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Contractor_Milestone_Signoff.pdf", size: "1.1 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Milestone Verified", actor: "Project Management Office", time: "Oct 12, 09:30 AM", status: "completed" },
      { step: "Financial Audit", actor: "Finance Control", time: "Oct 12, 11:45 AM", status: "completed", note: "Funds verified in Q3 allocation." },
      { step: "Director Review", actor: "Operations Director", time: "Oct 13, 10:15 AM", status: "completed" },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" },
      { step: "Funds Disbursement", actor: "Treasury", time: "Awaiting", status: "pending" }
    ]
  },
  {
    id: "DEC-883",
    type: "Risk",
    title: "Hospitality occupancy gap",
    shortTitle: "Hospitality occupancy gap",
    description: "Projected 4.2% below seasonal plan.",
    detail: "Forward bookings are below the seasonal plan across two priority properties and require a response before the next forecast.",
    action: "Analyse",
    meta: "38 min ago",
    tone: "risk",
    isPriority: true,
    status: "Pending",
    sourcePlatform: "Signature.ai",
    dueDate: "Due Tomorrow",
    requester: { name: "Sarah Jenkins", role: "Director, Hospitality", initials: "SJ" },
    context: [
      "Forward bookings for Q4 are currently tracking 4.2% below the seasonal baseline, primarily concentrated in our two flagship luxury properties.",
      "A strategic response is required before the next forecasting cycle. Marketing has proposed a targeted promotional campaign, while Revenue Management suggests dynamic pricing adjustments."
    ],
    impact: [
      { category: "Revenue At Risk", value: "QAR 8.5M", trend: "negative", subtitle: "Q4 Projection" },
      { category: "Occupancy Gap", value: "-4.2%", trend: "negative", subtitle: "Vs Seasonal Baseline" },
      { category: "ADR Impact", value: "-1.5%", trend: "neutral", subtitle: "If pricing adjusted" }
    ],
    attachments: [
      { name: "Q4_Booking_Pace.xlsx", size: "4.8 MB", type: "excel" },
      { name: "Competitor_Pricing_Analysis.pdf", size: "3.2 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Anomaly Detected", actor: "Pulse.ai Predictive Engine", time: "Today, 06:15 AM", status: "completed" },
      { step: "Initial Assessment", actor: "Revenue Management", time: "Today, 08:30 AM", status: "completed", note: "Confirmed trend across flagship properties." },
      { step: "Executive Review", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-884",
    type: "Approval",
    title: "New contract wins",
    shortTitle: "Review new contract award",
    description: "QAR 18M · decision due this week.",
    detail: "A new QAR 18M contract award is ready for commercial review before the decision window closes this week.",
    action: "Open",
    meta: "1 hr ago",
    tone: "approval",
    amount: "QAR 18,000,000",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "SAP S/4HANA",
    dueDate: "Due Thursday",
    requester: { name: "Ahmed Hassan", role: "Commercial Director", initials: "AH" },
    context: [
      "A newly negotiated QAR 18M facilities management contract for the Al Rayyan complex has been finalized. The margins are slightly above our baseline target, but require executive sign-off due to the multi-year commitment structure.",
      "The client is requesting final confirmation by Thursday to proceed with mobilization."
    ],
    impact: [
      { category: "Total Value", value: "QAR 18M", trend: "positive", subtitle: "Over 3 years" },
      { category: "Margin", value: "22.4%", trend: "positive", subtitle: "+1.2% vs baseline" },
      { category: "Mobilization", value: "30 Days", trend: "neutral", subtitle: "From signing date" }
    ],
    attachments: [
      { name: "Al_Rayyan_FM_Contract.pdf", size: "5.1 MB", type: "pdf" },
      { name: "Commercial_Summary.pdf", size: "850 KB", type: "pdf" }
    ],
    workflow: [
      { step: "Contract Drafted", actor: "Legal Dept", time: "Oct 10, 02:20 PM", status: "completed" },
      { step: "Commercial Review", actor: "Commercial Director", time: "Oct 11, 10:00 AM", status: "completed" },
      { step: "Final Sign-off", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-885",
    type: "Signal",
    title: "Baladna beat forecast",
    shortTitle: "Baladna forecast outperformance",
    description: "Performance is tracking +11.0% YTD.",
    detail: "Baladna is outperforming the current forecast, creating an opportunity to reassess the group outlook and near-term allocation.",
    action: "Open",
    meta: "2 hrs ago",
    tone: "signal",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "Signature.ai",
    dueDate: "No Action Required",
    requester: { name: "Pulse.ai", role: "Automated Insight", initials: "AI" },
    context: [
      "Baladna continues to outperform its YTD targets by 11.0%, driven by higher than expected export volumes and improved operational efficiencies in Q3.",
      "This sustained outperformance creates an opportunity to reassess the group's overall outlook and consider near-term reallocation of capital to support further export expansion."
    ],
    impact: [
      { category: "YTD Performance", value: "+11.0%", trend: "positive", subtitle: "Vs Forecast" },
      { category: "Export Volume", value: "+18%", trend: "positive", subtitle: "Year over year" },
      { category: "Op Margin", value: "-3.1%", trend: "negative", subtitle: "Due to feed costs" }
    ],
    attachments: [
      { name: "Baladna_Q3_Performance.pdf", size: "2.8 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Signal Generated", actor: "Pulse.ai", time: "Today, 04:00 AM", status: "completed" },
      { step: "Executive Review", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-886",
    type: "Approval",
    title: "Executive Travel Authorization",
    shortTitle: "Approve executive travel",
    description: "Multi-city roadshow across Asia.",
    detail: "The Q4 investor roadshow requires approval for private charter and ground logistics across Singapore, Tokyo, and Seoul.",
    action: "Review",
    meta: "3 hrs ago",
    tone: "approval",
    amount: "QAR 340,000",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "SAP SuccessFactors",
    dueDate: "Due Friday",
    requester: { name: "Fatima Al-Thani", role: "Investor Relations", initials: "FA" },
    context: [
      "The scheduled Q4 investor roadshow spans Singapore, Tokyo, and Seoul. Due to the tight timeline between meetings, commercial flights are not viable.",
      "We are requesting authorization for private charter logistics to ensure the executive team can meet the back-to-back schedule."
    ],
    impact: [
      { category: "Cost", value: "QAR 340k", trend: "negative", subtitle: "Charter + Logistics" },
      { category: "Time Saved", value: "28 Hrs", trend: "positive", subtitle: "Vs Commercial routing" },
      { category: "Meetings", value: "14", trend: "neutral", subtitle: "Confirmed investors" }
    ],
    attachments: [
      { name: "Roadshow_Itinerary.pdf", size: "1.2 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Request Submitted", actor: "Fatima Al-Thani", time: "Yesterday, 02:15 PM", status: "completed" },
      { step: "Finance Review", actor: "Travel Control", time: "Yesterday, 04:30 PM", status: "completed", note: "Cost is within Q4 IR budget." },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-887",
    type: "Approval",
    title: "Enterprise AI License",
    shortTitle: "Renew GitHub Copilot seats",
    description: "Annual renewal for 450 engineers.",
    detail: "The enterprise agreement for developer AI tools is up for renewal. We have negotiated a 5% volume discount for a 2-year commitment.",
    action: "Review",
    meta: "4 hrs ago",
    tone: "approval",
    amount: "USD 210,000",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "IT Service Desk",
    dueDate: "Due Next Week",
    requester: { name: "Omar Siddiqui", role: "CTO", initials: "OS" },
    context: [
      "Our current GitHub Copilot Enterprise agreement expires on the 30th. Based on internal productivity metrics, the tool has saved an average of 14% development time per sprint.",
      "Procurement has negotiated a 5% volume discount on the condition of a 2-year commitment for 450 seats."
    ],
    impact: [
      { category: "Dev Time Saved", value: "14%", trend: "positive", subtitle: "Per sprint average" },
      { category: "Discount", value: "5%", trend: "positive", subtitle: "Volume pricing applied" },
      { category: "Commitment", value: "2 Yrs", trend: "neutral", subtitle: "Lock-in period" }
    ],
    attachments: [
      { name: "Vendor_Quote_Renewal.pdf", size: "540 KB", type: "pdf" },
      { name: "Engineering_Productivity_Report.pdf", size: "2.1 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Procurement Negotitation", actor: "IT Sourcing", time: "Oct 05, 11:00 AM", status: "completed" },
      { step: "CTO Endorsement", actor: "Omar Siddiqui", time: "Oct 08, 09:20 AM", status: "completed" },
      { step: "CFO Review", actor: "Finance Control", time: "Yesterday, 10:45 AM", status: "completed" },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-888",
    type: "Approval",
    title: "Q4 Marketing Reallocation",
    shortTitle: "Reallocate Q4 media spend",
    description: "Shift QAR 1.2M to digital channels.",
    detail: "Marketing requests shifting print and out-of-home budget towards performance digital to capitalize on current conversion rates.",
    action: "Review",
    meta: "5 hrs ago",
    tone: "approval",
    amount: "QAR 1,200,000",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "SAP S/4HANA",
    dueDate: "Due Tomorrow",
    requester: { name: "Lina Marwan", role: "CMO", initials: "LM" },
    context: [
      "Current digital conversion rates are outperforming historical baselines by 22%. Conversely, out-of-home tracking shows diminished returns in Q3.",
      "We request authorization to reallocate QAR 1.2M from the planned Q4 Print/OOH budget directly into programmatic and paid social channels."
    ],
    impact: [
      { category: "Est. Conversions", value: "+15%", trend: "positive", subtitle: "Model projection" },
      { category: "OOH Presence", value: "-30%", trend: "negative", subtitle: "Reduced visibility" },
      { category: "Budget Net", value: "Zero", trend: "neutral", subtitle: "No new funds required" }
    ],
    attachments: [
      { name: "Media_Mix_Proposal.pdf", size: "3.4 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Proposal Drafted", actor: "Media Team", time: "Oct 11, 03:00 PM", status: "completed" },
      { step: "CMO Approval", actor: "Lina Marwan", time: "Yesterday, 09:00 AM", status: "completed" },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-889",
    type: "Risk",
    title: "Cybersecurity Compliance",
    shortTitle: "Unpatched server vulnerabilities",
    description: "12 legacy servers require immediate patching.",
    detail: "A routine scan identified 12 legacy application servers missing critical security patches that expose them to known exploits.",
    action: "Analyse",
    meta: "1 d ago",
    tone: "risk",
    isPriority: true,
    status: "Pending",
    sourcePlatform: "IT Service Desk",
    dueDate: "Immediate",
    requester: { name: "Tariq Ali", role: "CISO", initials: "TA" },
    context: [
      "A scheduled vulnerability scan flagged 12 legacy servers running the old HR portal environment. These systems are missing critical OS patches from last month.",
      "Patching will require 4 hours of downtime. We need approval for an emergency maintenance window tonight."
    ],
    impact: [
      { category: "Risk Level", value: "Critical", trend: "negative", subtitle: "CVSS Score 9.2" },
      { category: "Downtime", value: "4 Hrs", trend: "neutral", subtitle: "During off-peak" },
      { category: "Systems", value: "12", trend: "neutral", subtitle: "Legacy nodes" }
    ],
    attachments: [
      { name: "Vulnerability_Scan_Report.pdf", size: "1.8 MB", type: "pdf" }
    ],
    workflow: [
      { step: "Scan Completed", actor: "SecOps Team", time: "Yesterday, 02:00 AM", status: "completed" },
      { step: "CISO Escalation", actor: "Tariq Ali", time: "Yesterday, 07:30 AM", status: "completed" },
      { step: "Executive Review", actor: "Jasim", time: "Pending", status: "current" }
    ]
  },
  {
    id: "DEC-890",
    type: "Approval",
    title: "Regional GM Compensation",
    shortTitle: "Adjust Dubai GM package",
    description: "Market adjustment for key leadership role.",
    detail: "HR recommends a 12% base salary adjustment for the Dubai Regional GM to align with recent market benchmarking data.",
    action: "Review",
    meta: "1 d ago",
    tone: "approval",
    amount: "QAR 85,000",
    isPriority: false,
    status: "Pending",
    sourcePlatform: "SAP SuccessFactors",
    dueDate: "Next Payroll",
    requester: { name: "Nadia Youssef", role: "CHRO", initials: "NY" },
    context: [
      "Recent market benchmarking by Korn Ferry indicates that our Dubai Regional GM compensation is currently in the 35th percentile for the local market.",
      "To ensure retention of key talent, HR proposes a 12% upward adjustment to base salary, bringing the package to the targeted 65th percentile."
    ],
    impact: [
      { category: "Annual Cost", value: "QAR 85k", trend: "negative", subtitle: "Prorated for year" },
      { category: "Retention", value: "High", trend: "positive", subtitle: "Flight risk mitigated" },
      { category: "Market Position", value: "65th", trend: "neutral", subtitle: "Target percentile" }
    ],
    attachments: [
      { name: "KornFerry_Benchmark_Dubai.pdf", size: "890 KB", type: "pdf" }
    ],
    workflow: [
      { step: "Benchmark Completed", actor: "HR Comp & Ben", time: "Oct 01, 10:00 AM", status: "completed" },
      { step: "CHRO Endorsement", actor: "Nadia Youssef", time: "Oct 05, 11:30 AM", status: "completed" },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" },
      { step: "Payroll Processing", actor: "Finance", time: "Awaiting", status: "pending" }
    ]
  },
  {
    id: "DEC-891",
    type: "Approval",
    title: "Heavy Machinery Fleet",
    shortTitle: "Procure 5 new excavators",
    description: "Expand fleet capacity for Q1 projects.",
    detail: "Operations requires 5 new Caterpillar excavators to support the upcoming pipeline of civil works scheduled for Q1.",
    action: "Review",
    meta: "2 d ago",
    tone: "approval",
    amount: "QAR 4,800,000",
    isPriority: true,
    status: "Pending",
    sourcePlatform: "SAP S/4HANA",
    dueDate: "Due Today",
    requester: { name: "Hassan Ibrahim", role: "Fleet Director", initials: "HI" },
    context: [
      "The confirmed pipeline of civil engineering projects for Q1 exceeds our current heavy machinery capacity by approximately 15%.",
      "We recommend purchasing 5 new Caterpillar excavators rather than leasing, as the multi-year utilization forecast makes Capex far more cost-effective."
    ],
    impact: [
      { category: "Capex", value: "QAR 4.8M", trend: "negative", subtitle: "Asset purchase" },
      { category: "Capacity", value: "+15%", trend: "positive", subtitle: "Fleet expansion" },
      { category: "ROI vs Lease", value: "+18%", trend: "positive", subtitle: "Over 36 months" }
    ],
    attachments: [
      { name: "Caterpillar_Quote.pdf", size: "1.1 MB", type: "pdf" },
      { name: "Lease_vs_Buy_Analysis.xlsx", size: "2.5 MB", type: "excel" }
    ],
    workflow: [
      { step: "Capacity Analysis", actor: "Fleet Planning", time: "Oct 02, 09:00 AM", status: "completed" },
      { step: "Procurement Review", actor: "Strategic Sourcing", time: "Oct 06, 02:45 PM", status: "completed" },
      { step: "CFO Endorsement", actor: "Finance Control", time: "Oct 09, 10:15 AM", status: "completed" },
      { step: "Executive Approval", actor: "Jasim", time: "Pending", status: "current" }
    ]
  }
];

interface DecisionsWorkspaceProps {
  onBack: () => void;
  initialIndex: number;
  onNotify: (msg: string) => void;
}

export function DecisionsWorkspace({
  onBack,
  initialIndex = 0,
  onNotify,
}: DecisionsWorkspaceProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(true);

  const filteredDecisions = useMemo(() => {
    return extendedDecisions.filter(dec => {
      const matchesSearch = dec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dec.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dec.sourcePlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dec.requester.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = !priorityOnly || dec.isPriority;
      
      return matchesSearch && matchesPriority;
    });
  }, [searchQuery, priorityOnly]);

  // Adjust selected index if filtering removes the currently selected item
  const safeIndex = selectedIndex >= 0 && selectedIndex < filteredDecisions.length ? selectedIndex : 0;
  const selectedDecision = filteredDecisions[safeIndex];

  useEffect(() => {
    if (initialIndex < filteredDecisions.length) {
      setSelectedIndex(initialIndex);
    }
  }, [initialIndex, filteredDecisions.length]);

  const handleAction = (action: string) => {
    onNotify(`Action: ${action}`);
  };

  return (
    <div className={`decisions-workspace fade-in ${mobileDetailOpen ? "mobile-detail-open" : "mobile-queue-open"}`} data-testid="decisions-workspace">
      <div className="decisions-header">
         <button type="button" onClick={onBack} className="back-btn" aria-label="Back to Glance" data-testid="button-back">
           <ArrowLeft size={16} /> Back
         </button>
         <div className="decisions-heading">
           <span>Executive decision desk</span>
           <h1>Ready for your decision.</h1>
         </div>
      </div>
      
      <div className="decisions-layout">
        <aside className="decisions-queue" aria-label="Decision Queue">
          <div className="queue-header">
            <div className="queue-header-top">
              <h2>Requires Attention</h2>
              <span className="queue-count">{filteredDecisions.length}</span>
            </div>
            
            <div className="queue-search">
              <Search size={14} />
              <input 
                type="text" 
                placeholder="Search requests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="queue-filters">
              <button
                type="button"
                className={`queue-filter-btn ${!priorityOnly ? 'active' : ''}`}
                onClick={() => setPriorityOnly(false)}
              >
                All Requests
              </button>
              <button
                type="button"
                className={`queue-filter-btn ${priorityOnly ? 'active' : ''}`}
                onClick={() => setPriorityOnly(true)}
              >
                Priority
              </button>
            </div>
          </div>
          
          <div className="queue-list">
            {filteredDecisions.length > 0 ? filteredDecisions.map((dec, i) => (
              <button 
                key={dec.id}
                type="button"
                className={`queue-item ${i === safeIndex ? 'is-active' : ''} type-${dec.tone}`}
                onClick={() => {
                  setSelectedIndex(i);
                  setMobileDetailOpen(true);
                }}
                data-testid={`queue-item-${dec.id}`}
                aria-current={i === safeIndex ? "true" : undefined}
              >
                <div className="queue-item-top">
                  <span className="queue-item-type">{dec.type}</span>
                  <div className="queue-item-meta">
                    <span className="queue-item-platform">{dec.sourcePlatform}</span>
                    <span>{dec.meta}</span>
                  </div>
                </div>
                <h3>{dec.shortTitle}</h3>
                <p>{dec.description}</p>
                <div className="queue-item-meta" style={{ marginTop: '8px', justifyContent: 'space-between', width: '100%' }}>
                  {dec.isPriority ? <strong className="priority-status">• Priority</strong> : <span />}
                  <span className="queue-item-date">{dec.dueDate}</span>
                </div>
              </button>
            )) : (
              <div className="empty-detail" style={{ padding: '24px', textAlign: 'center' }}>No requests match your filters.</div>
            )}
          </div>
        </aside>

        {filteredDecisions.length > 0 && (
          <nav className="mobile-decision-navigation" aria-label="Decision navigation">
            <button
              type="button"
              aria-label="Previous decision"
              onClick={() => setSelectedIndex((safeIndex - 1 + filteredDecisions.length) % filteredDecisions.length)}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="mobile-decision-dots" role="tablist" aria-label="Decision requests">
              {filteredDecisions.map((decision, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-label={`Show ${decision.shortTitle}`}
                  aria-selected={index === safeIndex}
                  className={index === safeIndex ? "active" : ""}
                  key={decision.id}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next decision"
              onClick={() => setSelectedIndex((safeIndex + 1) % filteredDecisions.length)}
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        )}
        
        <main className="decisions-detail scrollable">
           <div className="mobile-detail-toolbar">
             <button type="button" onClick={() => setMobileDetailOpen(false)} aria-label="Back to decision requests">
               <ArrowLeft size={18} />
             </button>
             <strong>Decision Detail</strong>
             <span aria-hidden="true" />
           </div>
           {selectedDecision ? (
             <DecisionDetail 
               decision={selectedDecision} 
               onAction={handleAction} 
             />
           ) : (
             <div className="empty-detail">Select a decision to review.</div>
           )}
        </main>
      </div>
    </div>
  );
}

function DecisionDetail({ decision, onAction }: { decision: typeof extendedDecisions[0], onAction: (a: string) => void }) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const approvalFlow = [
    {
      step: "Submitted by",
      actor: `${decision.requester.name} · ${decision.requester.role}`,
      time: `Received ${decision.meta}`,
      status: "completed",
    },
    ...decision.workflow,
  ];

  useEffect(() => {
    setAssistantOpen(false);
    setAssistantPrompt("");
    setAssistantMessages([]);
  }, [decision.id]);

  const getContextualResponse = (prompt: string) => {
    const normalizedPrompt = prompt.toLowerCase();
    const currentStep = approvalFlow.find(step => step.status === "current");

    if (normalizedPrompt.includes("workflow") || normalizedPrompt.includes("audit") || normalizedPrompt.includes("approval")) {
      return `This request has ${approvalFlow.length} recorded stages. ${currentStep ? `${currentStep.step} is currently with ${currentStep.actor}.` : "All recorded stages are complete."} I can also explain any individual handoff or timestamp.`;
    }

    if (normalizedPrompt.includes("document") || normalizedPrompt.includes("attachment") || normalizedPrompt.includes("evidence")) {
      return `${decision.attachments.length} supporting ${decision.attachments.length === 1 ? "document is" : "documents are"} attached: ${decision.attachments.map(item => item.name).join(", ")}.`;
    }

    if (normalizedPrompt.includes("priority") || normalizedPrompt.includes("urgent") || normalizedPrompt.includes("due")) {
      return `${decision.isPriority ? "This request is marked Priority." : "This request is not marked Priority."} Its current due date is ${decision.dueDate.toLowerCase()}.`;
    }

    return `${decision.title} was submitted by ${decision.requester.name} through ${decision.sourcePlatform}. ${decision.context[0]} ${currentStep ? `The current approval stage is ${currentStep.step}.` : ""}`;
  };

  const askAssistant = (prompt: string) => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setAssistantMessages(previous => [
      ...previous,
      { role: "user", text: cleanPrompt },
      { role: "assistant", text: getContextualResponse(cleanPrompt) },
    ]);
    setAssistantPrompt("");
    onAction("Asked Pulse.AI about this decision");
  };

  return (
    <div className="decision-detail-inner animate-in fade-in slide-in-from-bottom-2 duration-300" key={decision.id}>
      <header className="detail-header">
        <div className="detail-header-top">
          <div className={`detail-badge type-${decision.tone}`}>{decision.type}</div>
          <span className="detail-id">{decision.id}</span>
        </div>
        <h2 className="detail-title">{decision.title}</h2>
        
        <div className="detail-meta-row">
          <div className="requester-info">
            <div className="requester-avatar">{decision.requester.initials}</div>
            <div className="requester-details">
              <strong>{decision.requester.name}</strong>
              <span>{decision.requester.role}</span>
            </div>
          </div>
          <div className="meta-divider" />
          <div className="priority-info">
            <span className="meta-label">Approver Request Platform</span>
            <strong>{decision.sourcePlatform}</strong>
          </div>
          <div className="meta-divider" />
          <div className="priority-info">
            <span className="meta-label">Due Date</span>
            <strong>{decision.dueDate}</strong>
          </div>
          <div className="meta-divider" />
          <div className="priority-info">
            <span className="meta-label">Priority</span>
            <strong className={decision.isPriority ? "priority-status" : undefined}>
              {decision.isPriority ? "Priority" : "Standard"}
            </strong>
          </div>
          {decision.amount && (
            <>
              <div className="meta-divider" />
              <div className="amount-info">
                <span className="meta-label">Value</span>
                <strong>{decision.amount}</strong>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="detail-content-grid">
        <div className="detail-main-col">
          <section className="detail-section">
            <h3>Context</h3>
            <div className="context-blocks">
              {decision.context.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h3>Key Impacts</h3>
            <div className="impact-grid">
              {decision.impact.map((imp, i) => (
                <div key={i} className="impact-card">
                  <span className="impact-label">{imp.category}</span>
                  <div className="impact-value-row">
                    <strong className={`trend-${imp.trend}`}>{imp.value}</strong>
                  </div>
                  <span className="impact-sub">{imp.subtitle}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h3>Supporting Documents</h3>
            <div className="attachments-list">
              {decision.attachments.map((att, i) => (
                <button type="button" key={i} className="attachment-item" onClick={() => onAction(`Opened ${att.name}`)}>
                  <div className="attachment-icon">
                    {att.type === 'pdf' ? <FileText size={16} /> : <FileSpreadsheet size={16} />}
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">{att.name}</span>
                    <span className="attachment-size">{att.size}</span>
                  </div>
                  <Download size={14} className="download-icon" />
                </button>
              ))}
            </div>
          </section>

        </div>

        <div className="detail-side-col">
          <section className="detail-section">
            <h3>Decision Actions</h3>
            <div className="action-buttons">
              {decision.type === 'Approval' ? (
                <>
                  <button type="button" className="btn-approve" onClick={() => onAction('Approved Request')}>
                    <CheckCircle2 size={16} /> Approve Request
                  </button>
                  <button type="button" className="btn-reject" onClick={() => onAction('Declined Request')}>
                    <XCircle size={16} /> Decline
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => onAction('Requested Info')}>
                    <MessageSquare size={16} /> Request Info
                  </button>
                </>
              ) : decision.type === 'Risk' ? (
                <>
                  <button type="button" className="btn-approve" onClick={() => onAction('Acknowledged Risk')}>
                    <AlertCircle size={16} /> Acknowledge Risk
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => onAction('Escalated to Board')}>
                    <Share size={16} /> Escalate to Board
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="btn-approve" onClick={() => onAction('Acknowledged Signal')}>
                    <ThumbsUp size={16} /> Acknowledge
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => onAction('Reassigned')}>
                    <Share size={16} /> Reassign
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="detail-section">
            <h3>Approvals &amp; Audit Trail</h3>
            <div className="workflow-timeline">
              {approvalFlow.map((step, i) => (
                <div key={i} className={`workflow-step status-${step.status}`}>
                  <div className="step-indicator">
                    {step.status === 'completed' ? <Check size={12} /> : step.status === 'current' ? <Clock size={12} /> : <div className="dot" />}
                  </div>
                  <div className="step-content">
                    <div className="step-header">
                      <strong><span className="step-order">{String(i + 1).padStart(2, "0")}</span>{step.step}</strong>
                      <span className="step-time">{step.time}</span>
                    </div>
                    <div className="step-actor">{step.actor}</div>
                    {step.note && <div className="step-note">{step.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mobile-decision-actions" aria-label="Decision actions">
        {decision.type === 'Approval' ? (
          <>
            <button type="button" className="btn-approve" onClick={() => onAction('Approved Request')}>
              <CheckCircle2 size={17} /> Approve Request
            </button>
            <button type="button" className="btn-reject" onClick={() => onAction('Declined Request')}>
              <XCircle size={16} /> Decline
            </button>
            <button type="button" className="btn-secondary mobile-request-info" onClick={() => onAction('Requested Info')}>
              <MessageSquare size={16} /> Request Info
            </button>
          </>
        ) : decision.type === 'Risk' ? (
          <>
            <button type="button" className="btn-approve" onClick={() => onAction('Acknowledged Risk')}>
              <AlertCircle size={17} /> Acknowledge Risk
            </button>
            <button type="button" className="btn-secondary" onClick={() => onAction('Escalated to Board')}>
              <Share size={16} /> Escalate to Board
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-approve" onClick={() => onAction('Acknowledged Signal')}>
              <ThumbsUp size={17} /> Acknowledge
            </button>
            <button type="button" className="btn-secondary" onClick={() => onAction('Reassigned')}>
              <Share size={16} /> Reassign
            </button>
          </>
        )}
      </section>

      <section className={`ask-pulse-context ${assistantOpen ? "is-open" : ""}`} aria-label={`Ask Pulse.AI about ${decision.title}`}>
        <button
          type="button"
          className="ask-pulse-context-trigger"
          onClick={() => {
            setAssistantOpen(open => !open);
            if (!assistantOpen) onAction("Ask Pulse.AI opened");
          }}
          aria-expanded={assistantOpen}
        >
          <span className="ask-pulse-context-title">
            <span className="ask-pulse-context-icon"><Sparkles size={17} /></span>
            <span>
              <strong>Ask Pulse.AI</strong>
              <small>Explore this request, its evidence, and approval history.</small>
            </span>
          </span>
          <span className="ask-pulse-context-action">
            {assistantOpen ? "Close assistant" : "Open assistant"}
            {assistantOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {assistantOpen && (
          <div className="ask-pulse-panel">
            <div className="ask-pulse-context-map">
              <div className="ask-pulse-panel-label">Decision context</div>
              <div className="ask-pulse-context-chips">
                <span>Request · {decision.id}</span>
                <span>Platform · {decision.sourcePlatform}</span>
                <span>Requester · {decision.requester.name}</span>
                <span>{decision.attachments.length} supporting {decision.attachments.length === 1 ? "document" : "documents"}</span>
                <span>{approvalFlow.length} approval stages</span>
              </div>
            </div>

            <div className="ask-pulse-intro">
              <Sparkles size={16} />
              <p>
                I can connect the facts in this request with its supporting documents and audit trail.
                My answers stay focused on <strong>{decision.shortTitle}</strong>.
              </p>
            </div>

            <div className="ask-pulse-suggested-prompts" aria-label="Suggested questions">
              {["Summarize this request", "What should I verify?", "Explain the approval workflow"].map(prompt => (
                <button type="button" key={prompt} onClick={() => askAssistant(prompt)}>{prompt}</button>
              ))}
            </div>

            {assistantMessages.length > 0 && (
              <div className="ask-pulse-messages" aria-live="polite">
                {assistantMessages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`ask-pulse-message ${message.role}`}>
                    <span>{message.role === "assistant" ? "Pulse.AI" : "You"}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            )}

            <form
              className="ask-pulse-context-form"
              onSubmit={(event) => {
                event.preventDefault();
                askAssistant(assistantPrompt);
              }}
            >
              <input
                value={assistantPrompt}
                onChange={(event) => setAssistantPrompt(event.target.value)}
                placeholder={`Ask about ${decision.shortTitle.toLowerCase()}...`}
                aria-label="Ask Pulse.AI about this decision"
              />
              <button type="submit" disabled={!assistantPrompt.trim()} aria-label="Send question to Pulse.AI">
                <Send size={16} />
              </button>
            </form>
            <p className="ask-pulse-context-note">
              Responses use the request information currently visible in this decision workspace.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
