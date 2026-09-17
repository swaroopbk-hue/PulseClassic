import { useEffect, useState } from "react";
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, Clock, Maximize2, Minimize2, Moon, Search, Send, Sparkles, Sun } from "lucide-react";
import darkPulseLogo from "@assets/image_1789651667740.png";
import "./pulse.css";
import "./pulse-overrides.css";

const periods = ["MTD", "QTD", "YTD"];
const decisions = [
  { type: "Approval", title: "UCC Infrastructure · QAR 42M", shortTitle: "Release infrastructure capital", description: "Capital release awaiting your review.", detail: "Phase two contractor release is ready. Holding it moves the Lusail handover by an estimated 9 days.", action: "Review", meta: "12 min ago", tone: "approval" },
  { type: "Risk", title: "Hospitality occupancy", shortTitle: "Hospitality occupancy gap", description: "Projected 4.2% below seasonal plan.", detail: "Forward bookings are below the seasonal plan across two priority properties and require a response before the next forecast.", action: "Analyse", meta: "38 min ago", tone: "risk" },
  { type: "Approval", title: "New contract wins", shortTitle: "Review new contract award", description: "QAR 18M · decision due this week.", detail: "A new QAR 18M contract award is ready for commercial review before the decision window closes this week.", action: "Open", meta: "1 hr ago", tone: "approval" },
  { type: "Signal", title: "Baladna beat forecast", shortTitle: "Baladna forecast outperformance", description: "Performance is tracking +11.0% YTD.", detail: "Baladna is outperforming the current forecast, creating an opportunity to reassess the group outlook and near-term allocation.", action: "Open", meta: "2 hrs ago", tone: "signal" },
] as const;
const pulseQuestions = [
  "What is driving UCC's margin change?",
  "Which group is closest to missing forecast?",
  "How is Estithmar tracking against plan?",
  "What changed in Assets hospitality occupancy?",
  "Where should the executive team focus today?",
];
const insightSlides = [
  { group: "UCC", value: "92%", title: "Occupancy momentum is holding above plan.", body: "Leisure demand and ADR are carrying the group through the summer booking curve.", note: "QAR 38M upside identified in the latest operating review.", tone: "blue" },
  { group: "Estithmar", value: "+18.6%", title: "EBITDA growth is ahead of the quarterly forecast.", body: "Hospitality and services contributed most of the gain, supported by stronger pricing and tighter operating costs.", note: "QAR 46M above plan · two follow-up actions due this week.", tone: "sand" },
  { group: "Assets", value: "−214M", title: "The forecast gap is concentrated in two operating areas.", body: "Lower hotel occupancy and delayed commercial leasing account for 81% of the variance, making them the priority recovery levers.", note: "Recovery plan requested · latest evidence refreshed 2 hours ago.", tone: "coral" },
  { group: "Baladna", value: "111%", title: "Demand is exceeding the full-year run-rate target.", body: "Core dairy volume and regional exports are both ahead of plan, with sufficient production capacity for the next-quarter outlook.", note: "Forecast confidence raised to high · supply remains on track.", tone: "mint" },
  { group: "TMT", value: "87%", title: "The transformation portfolio is nearing its Q3 milestone.", body: "Shared services delivery has accelerated, while two leadership decisions remain on the critical path for completion.", note: "Seven of eight workstreams on track · decisions due this month.", tone: "violet" },
];
const groupPerformance = [
  { name: "Power International", short: "Power International", value: "65.2K", change: "+12%", direction: "up", height: 92 },
  { name: "UCC Holding", short: "UCC Holding", value: "49.4K", change: "−3.8%", direction: "down", height: 68 },
  { name: "Estithmar Holding", short: "Estithmar Holding", value: "57.8K", change: "+6.4%", direction: "up", height: 80 },
  { name: "Baladna", short: "Baladna", value: "38.3K", change: "+0.6%", direction: "stable", height: 52 },
  { name: "TMT", short: "TMT", value: "44.6K", change: "+9.1%", direction: "up", height: 62 },
  { name: "Assets Group", short: "Assets Group", value: "29.7K", change: "−5.2%", direction: "down", height: 41 },
  { name: "Aura Group", short: "Aura Group", value: "35.1K", change: "+1.1%", direction: "stable", height: 48 },
];

export function PulseReference3DDark() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [profile, setProfile] = useState(false);
  const [period, setPeriod] = useState("YTD");
  const [toast, setToast] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(2);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [groupChatOpen, setGroupChatOpen] = useState(true);
  const [groupQuestion, setGroupQuestion] = useState("");
  const [groupView, setGroupView] = useState<"bars" | "orbit">("bars");
  const [assistantExpanded, setAssistantExpanded] = useState(false);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [decisionsViewAll, setDecisionsViewAll] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuestionIndex((current) => (current + 1) % pulseQuestions.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const ask = () => {
    if (!query.trim()) return;
    setAnswer("Pulse identifies Assets as the priority: QAR 214M below forecast, with occupancy and leasing as the evidence-backed drivers.");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    notify(`${next === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const askGroup = () => {
    if (!groupQuestion.trim()) return;
    setAnswer(`${groupPerformance[groupIndex].name} is at ${groupPerformance[groupIndex].value}, ${groupPerformance[groupIndex].change} versus last period. Pulse is comparing the movement against the current enterprise forecast.`);
    notify("Group performance analysis ready");
  };

  return (
    <div className={`pulse-ref3d ${theme}`} data-testid="pulse-dashboard">
      <header className="exe-header">
        <div className="exe-logo-area">
          <img
            src={theme === "dark" ? darkPulseLogo : "/images/pulse-ai-official.png"}
            alt="Pulse.ai"
            className="exe-logo"
          />
          <span className="exe-edition">EXECUTIVE EDITION</span>
        </div>
        <div className="exe-header-actions">
          <div className="exe-refresh">
            <Clock size={13} /> <span>Refreshed 08:42 AST</span>
          </div>
          <button data-testid="button-theme-toggle" className="exe-icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button data-testid="button-account" className="exe-avatar-btn" onClick={() => setProfile(!profile)} aria-label="Open account">JJ</button>
        </div>
      </header>

      {profile && (
        <div className="profile-pop exe-profile-pop">
          <strong>Mr. Jasim</strong>
          <span>President &middot; Secure executive access</span>
          <button onClick={() => notify("Preferences opened")}>Profile &amp; preferences</button>
          <button onClick={() => setProfile(false)}>Close account menu</button>
        </div>
      )}

      <main className="exe-main">
        <div className="exe-masthead">
          <div className="masthead-top">
            <div className="masthead-meta">TUESDAY &middot; 18 JUNE 2024 / QAR CONSOLIDATED VIEW</div>
            <div className="masthead-controls">
              <div className="period-tabs">
                {periods.map((item) => (
                  <button
                    data-testid={`button-period-${item.toLowerCase()}`}
                    className={`period-tab ${period === item ? "active" : ""}`}
                    onClick={() => setPeriod(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="current-date">18 Jun 2024</div>
            </div>
          </div>
          <div className="masthead-content">
            <h1 className="masthead-headline">
              The enterprise is <strong>ahead</strong> of its morning pace.
            </h1>
            <p className="masthead-subhead">
              Revenue is tracking at <strong>QAR 18.4B</strong>, 5 pts ahead of time elapsed. Baladna and Estithmar are creating the lift; Assets is the one position that merits a decision before noon.
            </p>
          </div>
        </div>

        <section className="exe-metrics-section" aria-label="Enterprise position">
          <div className="exe-section-header">
            <h2><span>01</span> Enterprise position</h2>
            <div className="exe-section-line"></div>
            <span className="exe-section-meta">YTD &middot; FY24 plan</span>
          </div>

          <div className="exe-metrics-grid" data-testid="metrics-at-a-glance">
            <div className="metric-cell">
               <span className="metric-label">Consolidated revenue</span>
               <div className="metric-value-large">18.4<span className="unit">B QAR</span></div>
               <div className="metric-sub">↗ 8.2% YoY &middot; 94% target</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">EBITDA / profit</span>
               <div className="metric-value-large">3.76B</div>
               <div className="metric-sub">20.4% margin <span className="positive">+6.9% YoY</span></div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Budget achievement</span>
               <div className="metric-value-large">94.0%</div>
               <div className="metric-sub">QAR 18.4B <span className="dim">vs 19.6B plan</span></div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Full-year forecast</span>
               <div className="metric-value-large">98.1%</div>
               <div className="metric-sub">18.9B expected <span className="dim">−1.9% vs plan</span></div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Time vs achievement</span>
               <div className="metric-split-labels">
                 <div>71% <span>year elapsed</span></div>
                 <div>76% <span>achieved</span></div>
               </div>
               <div className="metric-progress">
                  <div className="metric-progress-elapsed">
                    <span className="metric-elapsed-marker" style={{ left: '71%' }} />
                  </div>
                  <div className="metric-progress-achieved" style={{ width: '76%' }}>
                    <span className="metric-achieved-marker" />
                  </div>
               </div>
               <div className="metric-sub">5% ahead of expected pace</div>
            </div>
          </div>
        </section>

        <div className="exe-content">
          <div className="exe-section-header group-header-adjustment">
            <h2><span>02</span> Seven businesses, one connected pulse</h2>
            <div className="exe-section-line"></div>
          </div>

          <section className={`group-performance ${groupChatOpen ? "chat-open" : "chat-collapsed"}`} aria-label="Enterprise group performance">
            <div className="group-performance-head">
              <div>
                <h2>Group Performance</h2>
                <p>Revenue movement across the enterprise portfolio</p>
              </div>
               <div className="group-view-actions" aria-label="Group performance views">
                 <button data-testid="button-group-view-bars" className={`group-view-button ${groupView === "bars" ? "active" : ""}`} onClick={() => setGroupView("bars")}>Line Bar</button>
                 <button data-testid="button-group-view-orbit" className={`group-view-button ${groupView === "orbit" ? "active" : ""}`} onClick={() => setGroupView("orbit")}>Orbit</button>
               </div>
            </div>
             {groupView === "orbit" ? (
               <div className="group-orbit-view" aria-label="Orbit visualization">
                 <div className="orbit-ring orbit-ring-one" />
                 <div className="orbit-ring orbit-ring-two" />
                 <div className="orbit-ring orbit-ring-three" />
                 <div className="orbit-core">
                   <small>CONSOLIDATED<br />REVENUE</small>
                   <div className="orbit-core-value">
                     <span>18.4</span><sub>B QAR</sub>
                   </div>
                   <div className="orbit-core-trend">
                     ↗ 8.2% YoY
                   </div>
                 </div>
                 {groupPerformance.map((group, index) => {
                   const isNegative = group.direction === "down";
                   const isHighestPositive = group.name === "Power International";
                   return (
                     <button
                       data-testid={`button-orbit-node-${group.short.toLowerCase().replace(/\s+/g, '-')}`}
                       className={`orbit-node orbit-node-${index} ${isNegative ? 'negative' : ''} ${isHighestPositive ? 'highest-positive' : ''}`}
                       key={group.name}
                       onMouseEnter={() => setGroupIndex(index)}
                       onFocus={() => setGroupIndex(index)}
                       onClick={() => notify(`${group.name} selected`)}
                     >
                       <span className="orbit-node-name">{group.name}</span>
                       <strong className="orbit-node-value">QAR {group.value}</strong>
                       <div className="orbit-node-trend">
                         <span className="trend-indicator">{isNegative ? '↘' : (group.direction === "up" ? '↗' : '→')}</span> {group.change} YoY
                       </div>
                     </button>
                   );
                 })}
               </div>
             ) : (
             <div className="group-chart">
              <div className="group-columns">
                {groupPerformance.map((group, index) => (
                  <div
                    className="group-column"
                    key={group.name}
                    onMouseEnter={() => {
                      setGroupIndex(index);
                      setHoveredGroup(index);
                    }}
                    onMouseLeave={() => setHoveredGroup(null)}
                  >
                    <span className="group-column-name">{group.short}</span>
                     <div className="group-value-row">
                       <strong>{group.value}</strong>
                       <span className={`group-change ${group.direction}`}>{group.direction === "up" ? "↑" : group.direction === "down" ? "↓" : "→"} {group.change}</span>
                     </div>
                    <span className="group-bar-wrap"><i style={{ height: `${group.height}%` }} /></span>
                    {hoveredGroup === index && (
                      <div className="group-hover-tooltip" role="status">
                        <b>{group.value}</b>
                         <span>Revenue</span>
                        <i />
                         <span>Budget: <strong>{index === 2 ? "89%" : index % 2 === 0 ? "86%" : "82%"}</strong></span>
                        <i />
                          <span>LY: <strong>{group.direction === "down" ? "−11%" : group.direction === "stable" ? "+0.4%" : "+8%"}</strong></span>
                      </div>
                      )}
                  </div>
                ))}
              </div>
             </div>
             )}
            <div className="group-chat">
              <button className="group-chat-prompt" onClick={() => setGroupChatOpen(!groupChatOpen)} aria-expanded={groupChatOpen}>
                <Sparkles size={14} />
                <span>{groupChatOpen ? "Would you like to explore revenue, budget, or last year comparison?" : "Ask Pulse about group performance"}</span>
                <ChevronRight className={groupChatOpen ? "chat-chevron open" : "chat-chevron"} size={15} />
              </button>
              {groupChatOpen && (
                <div className="group-chat-input">
                   <input data-testid="input-group-question"
                    value={groupQuestion}
                    onChange={(event) => setGroupQuestion(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && askGroup()}
                    placeholder={`Show me the reason for the ${groupPerformance[groupIndex].change.startsWith("−") || groupPerformance[groupIndex].change.startsWith("-") ? "drop" : "change"} in ${groupPerformance[groupIndex].name}`}
                    aria-label="Ask about group performance"
                  />
                   <button data-testid="button-send-group-question" onClick={askGroup} aria-label="Send group performance question"><Send size={15} /></button>
                </div>
              )}
            </div>
          </section>

          <div className="exe-section-header" style={{ marginTop: '48px', marginBottom: '24px' }}>
            <h2><span>03</span> Intelligence & operations</h2>
            <div className="exe-section-line"></div>
          </div>

          <div className="ref-bottom">
             <section className={`ref-card assistant-card ${assistantExpanded ? "assistant-expanded" : ""}`}>
               <div className="card-head assistant-heading">
                 <h2>AI Assistant</h2>
                 <button
                   data-testid="button-expand-assistant"
                   className="assistant-expand"
                   onClick={() => setAssistantExpanded((expanded) => !expanded)}
                   aria-label={assistantExpanded ? "Exit expanded AI Assistant" : "Expand AI Assistant"}
                 >
                   {assistantExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                 </button>
               </div>
               <button className="assistant-orb" onClick={() => { setQuery(pulseQuestions[questionIndex]); notify("Question added to Ask Pulse"); }} aria-label="Use suggested business question">
                 <span className="orb-core" />
               </button>
               <div className="assistant-input">
                 <Search size={12} />
                  <input data-testid="input-ask-pulse"
                   value={query}
                   onChange={(event) => setQuery(event.target.value)}
                   onKeyDown={(event) => event.key === "Enter" && ask()}
                   placeholder={pulseQuestions[questionIndex]}
                   aria-label="Ask Pulse a business question"
                 />
                  <button data-testid="button-ask-pulse" onClick={ask} aria-label="Ask Pulse"><Send size={11} /></button>
               </div>
                {answer && <div className="ask-result" data-testid="text-pulse-answer">{answer}</div>}
            </section>
             <section className={`ref-card stat-card decisions-card ${decisionsViewAll ? "decisions-all" : ""}`} aria-label="Executive decisions">
               {decisionsViewAll ? (
                 <div className="decisions-workspace">
                   <header className="decisions-workspace-head">
                     <button className="decisions-back" onClick={() => setDecisionsViewAll(false)}><ArrowLeft size={14} /> Back</button>
                     <div>
                       <span>Decision desk · Tuesday, 18 June 2024</span>
                       <h2>What needs your call?</h2>
                       <p>Four signals surfaced from across the enterprise. One clear queue for the day.</p>
                     </div>
                   </header>
                   <div className="decisions-workspace-body">
                     <aside className="decision-queue">
                       <div className="decision-queue-title"><strong>Decision queue</strong><span>{decisions.length} open items</span></div>
                       {decisions.map((decision, index) => (
                         <button key={decision.title} className={`decision-queue-item ${decision.tone} ${decisionIndex === index ? "active" : ""}`} onClick={() => setDecisionIndex(index)}>
                           <span className="decision-dot" />
                           <span>
                             <small>{decision.type} · {decision.meta}</small>
                             <strong>{decision.shortTitle}</strong>
                             <em>{decision.description}</em>
                           </span>
                         </button>
                       ))}
                     </aside>
                     <article className="decision-detail">
                       <small>{decisions[decisionIndex].type} · High priority</small>
                       <h3>{decisions[decisionIndex].shortTitle}</h3>
                       <span>{decisions[decisionIndex].title}</span>
                       <p>{decisions[decisionIndex].detail}</p>
                       <div className="decision-recommendation"><span>Recommended next step</span><strong>{decisions[decisionIndex].action} decision</strong></div>
                       <button className="decision-primary-action" onClick={() => notify(`${decisions[decisionIndex].action} opened`)}>{decisions[decisionIndex].action}</button>
                     </article>
                   </div>
                 </div>
               ) : (
                 <>
                   <div className="card-head decisions-head">
                     <div><h2>Decisions</h2><span>{decisions.length} items</span></div>
                     <button className="decisions-view-all" onClick={() => setDecisionsViewAll(true)}>View All</button>
                   </div>
                   <div className="decision-slider">
                     <button className="decision-arrow previous" onClick={() => setDecisionIndex((decisionIndex - 1 + decisions.length) % decisions.length)} aria-label="Previous decision"><ChevronLeft size={15} /></button>
                     <article className={`decision-slide ${decisions[decisionIndex].tone}`}>
                       <span className="decision-dot" />
                       <div><h3>{decisions[decisionIndex].title}</h3><p>{decisions[decisionIndex].description}</p></div>
                       <button onClick={() => notify(`${decisions[decisionIndex].action} opened`)}>{decisions[decisionIndex].action}</button>
                     </article>
                     <button className="decision-arrow next" onClick={() => setDecisionIndex((decisionIndex + 1) % decisions.length)} aria-label="Next decision"><ChevronRight size={15} /></button>
                   </div>
                   <div className="decision-pagination" aria-label={`Decision ${decisionIndex + 1} of ${decisions.length}`}>
                     <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
                     <i><b style={{ width: `${((decisionIndex + 1) / decisions.length) * 100}%` }} /></i>
                     <span>{String(decisions.length).padStart(2, "0")}</span>
                   </div>
                 </>
               )}
             </section>
             <section className="insight-card" aria-label="Pulse Insights carousel">
               <div className="insight-track" style={{ transform: `translateX(-${insightIndex * 100}%)` }}>
                 {insightSlides.map((slide) => (
                   <article className="insight-slide" key={slide.group}>
                     <div className="insight-topline">
                       <span className="insights-badge"><Sparkles size={9} /> Insights</span>
                       <span className="insight-group">{slide.group}</span>
                     </div>
                     <strong>{slide.value}</strong>
                     <h3>{slide.title}</h3>
                     <p>{slide.body}</p>
                     <small>{slide.note}</small>
                   </article>
                 ))}
               </div>
               <div className="insight-progress" role="tablist" aria-label="Insight slides">
                 {insightSlides.map((slide, index) => (
                   <button
                     key={slide.group}
                     className={index === insightIndex ? "active" : ""}
                     onClick={() => setInsightIndex(index)}
                     aria-label={`Show insight ${index + 1}: ${slide.group}`}
                     aria-selected={index === insightIndex}
                     role="tab"
                   />
                 ))}
               </div>
             </section>
          </div>
        </div>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default PulseReference3DDark;
