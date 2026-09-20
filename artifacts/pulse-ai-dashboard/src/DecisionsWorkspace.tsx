import { useEffect, useState } from "react";
import { 
  AlertCircle, ArrowLeft, Check, CheckCircle2, Clock, Download,
  FileSpreadsheet, FileText, MessageSquare, Share, ThumbsUp, XCircle
} from "lucide-react";
import "./decisions.css";

// Define enhanced data with rich content for the workspace
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
    priority: "High",
    status: "Pending",
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
    priority: "High",
    status: "Pending",
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
    priority: "Medium",
    status: "Pending",
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
    priority: "Low",
    status: "Pending",
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
  }
];

interface DecisionsWorkspaceProps {
  onBack: () => void;
  initialIndex: number;
  onNotify: (msg: string) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <rect x="2.25" y="2.75" width="13.5" height="12.5" rx="2" />
      <path d="M6.4 3.2v11.6" />
      <path d={collapsed ? "m9 7 2 2-2 2" : "m12 7-2 2 2 2"} />
    </svg>
  );
}

export function DecisionsWorkspace({
  onBack,
  initialIndex = 0,
  onNotify,
  sidebarCollapsed,
  onToggleSidebar,
}: DecisionsWorkspaceProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  
  // Keep index in bounds just in case
  const safeIndex = selectedIndex >= 0 && selectedIndex < extendedDecisions.length ? selectedIndex : 0;
  const selectedDecision = extendedDecisions[safeIndex];

  // Sync state if initialIndex changes via props
  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const handleAction = (action: string) => {
    onNotify(`Action: ${action}`);
  };

  return (
    <div className="decisions-workspace fade-in" data-testid="decisions-workspace">
      <div className="decisions-header">
         <button type="button" onClick={onBack} className="back-btn" aria-label="Back to Glance" data-testid="button-back">
           <ArrowLeft size={16} /> Back
         </button>
         <button
           type="button"
           className="sidebar-toggle-btn"
           onClick={onToggleSidebar}
           aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
           title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
           aria-pressed={sidebarCollapsed}
         >
           <SidebarToggleIcon collapsed={sidebarCollapsed} />
         </button>
         <div className="decisions-heading">
           <span>Executive decision desk</span>
           <h1>Ready for your decision.</h1>
         </div>
      </div>
      
      <div className="decisions-layout">
        <aside className="decisions-queue" aria-label="Decision Queue">
          <div className="queue-header">
            <h2>Requires Attention</h2>
            <span className="queue-count">{extendedDecisions.length}</span>
          </div>
          <div className="queue-list">
            {extendedDecisions.map((dec, i) => (
              <button 
                key={dec.id}
                type="button"
                className={`queue-item ${i === safeIndex ? 'is-active' : ''} type-${dec.tone}`}
                onClick={() => setSelectedIndex(i)}
                data-testid={`queue-item-${dec.id}`}
                aria-current={i === safeIndex ? "true" : undefined}
              >
                <div className="queue-item-top">
                  <span className="queue-item-type">{dec.type}</span>
                  <span className="queue-item-meta">{dec.meta}</span>
                </div>
                <h3>{dec.shortTitle}</h3>
                <p>{dec.description}</p>
              </button>
            ))}
          </div>
        </aside>
        
        <main className="decisions-detail scrollable">
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
            <span className="meta-label">Priority</span>
            <strong className={`priority-${decision.priority.toLowerCase()}`}>{decision.priority}</strong>
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
            <h3>Audit Trail</h3>
            <div className="workflow-timeline">
              {decision.workflow.map((step, i) => (
                <div key={i} className={`workflow-step status-${step.status}`}>
                  <div className="step-indicator">
                    {step.status === 'completed' ? <Check size={12} /> : step.status === 'current' ? <Clock size={12} /> : <div className="dot" />}
                  </div>
                  <div className="step-content">
                    <div className="step-header">
                      <strong>{step.step}</strong>
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
    </div>
  );
}
