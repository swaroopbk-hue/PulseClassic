import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Moon, Send, Sparkles, Sun } from "lucide-react";
import darkPulseLogo from "@assets/image_1789651667740.png";
import "./pulse.css";
import "./pulse-overrides.css";

const periods = ["Today", "MTD", "YTD"] as const;
type Period = (typeof periods)[number];

const enterprisePerformance: Record<Period, {
  revenue: string;
  revenueUnit: string;
  revenueDetail: string;
  ebitda: string;
  ebitdaDetail: string;
  budgetAchievement: string;
  budgetDetail: string;
  budgetPlan: string;
  forecast: string;
  forecastDetail: string;
  elapsed: number;
  achieved: number;
  pace: string;
}> = {
  Today: {
    revenue: "2.4", revenueUnit: "B QAR", revenueDetail: "↗ 3.1% vs daily plan · 97% target",
    ebitda: "486M", ebitdaDetail: "20.2% margin · +2.8% vs plan",
    budgetAchievement: "97.0%", budgetDetail: "QAR 2.4B", budgetPlan: "vs 2.5B plan",
    forecast: "2.6B", forecastDetail: "+1.8% vs daily plan",
    elapsed: 42, achieved: 47, pace: "5% ahead of today’s expected pace",
  },
  MTD: {
    revenue: "18.4", revenueUnit: "B QAR", revenueDetail: "↗ 8.2% vs prior month · 94% target",
    ebitda: "3.76B", ebitdaDetail: "20.4% margin · +6.9% vs prior month",
    budgetAchievement: "94.0%", budgetDetail: "QAR 18.4B", budgetPlan: "vs 19.6B plan",
    forecast: "21.2B", forecastDetail: "+2.4% vs monthly plan",
    elapsed: 58, achieved: 64, pace: "6% ahead of expected monthly pace",
  },
  YTD: {
    revenue: "612", revenueUnit: "B QAR", revenueDetail: "↗ 8.2% YoY · 96% target",
    ebitda: "132B", ebitdaDetail: "21.6% margin · +9.4% YoY",
    budgetAchievement: "96.0%", budgetDetail: "QAR 612B", budgetPlan: "vs 638B plan",
    forecast: "710B", forecastDetail: "+3.8% vs full-year plan",
    elapsed: 71, achieved: 76, pace: "5% ahead of expected annual pace",
  },
};
const decisions = [
  { type: "Approval", title: "UCC Infrastructure · QAR 42M", shortTitle: "Release infrastructure capital", description: "Capital release awaiting your review.", detail: "Phase two contractor release is ready. Holding it moves the Lusail handover by an estimated 9 days.", action: "Review", meta: "12 min ago", tone: "approval" },
  { type: "Risk", title: "Hospitality occupancy", shortTitle: "Hospitality occupancy gap", description: "Projected 4.2% below seasonal plan.", detail: "Forward bookings are below the seasonal plan across two priority properties and require a response before the next forecast.", action: "Analyse", meta: "38 min ago", tone: "risk" },
  { type: "Approval", title: "New contract wins", shortTitle: "Review new contract award", description: "QAR 18M · decision due this week.", detail: "A new QAR 18M contract award is ready for commercial review before the decision window closes this week.", action: "Open", meta: "1 hr ago", tone: "approval" },
  { type: "Signal", title: "Baladna beat forecast", shortTitle: "Baladna forecast outperformance", description: "Performance is tracking +11.0% YTD.", detail: "Baladna is outperforming the current forecast, creating an opportunity to reassess the group outlook and near-term allocation.", action: "Open", meta: "2 hrs ago", tone: "signal" },
] as const;
const insightSlides = [
  { group: "UCC", value: "92%", title: "Occupancy momentum is holding above plan.", body: "Leisure demand and ADR are carrying the group through the summer booking curve.", note: "QAR 38M upside identified in the latest operating review.", tone: "blue" },
  { group: "Assets", value: "88%", title: "Assets Group is 12 points behind its YTD target.", body: "Hospitality occupancy is down 4.2 pts and retail footfall has fallen 71%, while commercial leasing revenue is QAR 12M short of plan. Current trajectory points to roughly QAR 38M of annual revenue exposure if it continues.", note: "", tone: "coral" },
  { group: "Estithmar Aviation Services", value: "106%", title: "Estithmar Aviation Services is running 6 points ahead of plan.", body: "Aviation ground-services growth and new facilities-management contracts have lifted the group a point ahead of its YTD target. A QAR 18.4M capacity-expansion request for aviation ground services is awaiting your approval.", note: "", tone: "blue" },
  { group: "UCC", value: "QAR 61M", title: "UCC won QAR 61M in new contract awards this month.", body: "New contracting wins and QAR 22M in procurement savings are offsetting QAR 14M in schedule delays across two sites, keeping UCC on track at 96% of its YTD target. Full-year forecast has been raised to QAR 6.0B.", note: "", tone: "mint" },
  { group: "Baladna", value: "111%", title: "Baladna is outperforming its YTD target by 11.4%.", body: "Domestic sales grew sharply and export volumes rose 18% year over year, keeping Baladna ahead of every other business group this quarter. Operating margin slipped 3.1 pts on feed costs — worth watching even as revenue outperforms.", note: "", tone: "violet" },
];

function InsightPageContent({ slide }: { slide: (typeof insightSlides)[number] }) {
  return (
    <div className="insight-page-content">
      <div className="insight-topline">
        <span className="insights-badge"><Sparkles size={9} /> Insights</span>
        <span className="insight-group">{slide.group}</span>
      </div>
      <strong>{slide.value}</strong>
      <h3>{slide.title}</h3>
      <p>{slide.body}</p>
      {slide.note && <small>{slide.note}</small>}
    </div>
  );
}

const groupPerformanceByPeriod = {
  Today: [
    { name: "Power International", short: "Power International", value: "420M", change: "+4.2%", direction: "up", height: 78, budget: "96%", forecast: "98%", lastYear: "+3.7%" },
    { name: "UCC Holding", short: "UCC Holding", value: "365M", change: "−1.4%", direction: "down", height: 68, budget: "91%", forecast: "93%", lastYear: "−0.8%" },
    { name: "Estithmar Holding", short: "Estithmar Holding", value: "398M", change: "+3.8%", direction: "up", height: 73, budget: "95%", forecast: "97%", lastYear: "+3.2%" },
    { name: "Baladna", short: "Baladna", value: "284M", change: "+1.2%", direction: "up", height: 52, budget: "98%", forecast: "101%", lastYear: "+1.0%" },
    { name: "TMT", short: "TMT", value: "312M", change: "+2.6%", direction: "up", height: 58, budget: "94%", forecast: "96%", lastYear: "+2.1%" },
    { name: "Assets Group", short: "Assets Group", value: "216M", change: "−2.1%", direction: "down", height: 40, budget: "88%", forecast: "90%", lastYear: "−1.7%" },
    { name: "Aura Group", short: "Aura Group", value: "247M", change: "+0.8%", direction: "stable", height: 46, budget: "93%", forecast: "94%", lastYear: "+0.6%" },
  ],
  MTD: [
    { name: "Power International", short: "Power International", value: "12.8B", change: "+8.4%", direction: "up", height: 88, budget: "97%", forecast: "101%", lastYear: "+7.9%" },
    { name: "UCC Holding", short: "UCC Holding", value: "9.6B", change: "−2.8%", direction: "down", height: 66, budget: "90%", forecast: "92%", lastYear: "−2.1%" },
    { name: "Estithmar Holding", short: "Estithmar Holding", value: "11.4B", change: "+5.7%", direction: "up", height: 79, budget: "96%", forecast: "99%", lastYear: "+5.1%" },
    { name: "Baladna", short: "Baladna", value: "7.2B", change: "+1.9%", direction: "up", height: 50, budget: "99%", forecast: "102%", lastYear: "+1.5%" },
    { name: "TMT", short: "TMT", value: "8.9B", change: "+6.3%", direction: "up", height: 62, budget: "95%", forecast: "98%", lastYear: "+5.8%" },
    { name: "Assets Group", short: "Assets Group", value: "5.8B", change: "−4.1%", direction: "down", height: 40, budget: "87%", forecast: "89%", lastYear: "−3.6%" },
    { name: "Aura Group", short: "Aura Group", value: "6.7B", change: "+1.4%", direction: "stable", height: 46, budget: "92%", forecast: "94%", lastYear: "+1.1%" },
  ],
  YTD: [
    { name: "Power International", short: "Power International", value: "132B", change: "+12%", direction: "up", height: 91, budget: "98%", forecast: "103%", lastYear: "+11.2%" },
    { name: "UCC Holding", short: "UCC Holding", value: "118B", change: "−3.8%", direction: "down", height: 81, budget: "91%", forecast: "94%", lastYear: "−3.1%" },
    { name: "Estithmar Holding", short: "Estithmar Holding", value: "145B", change: "+6.4%", direction: "up", height: 100, budget: "97%", forecast: "101%", lastYear: "+5.9%" },
    { name: "Baladna", short: "Baladna", value: "96B", change: "+11.4%", direction: "up", height: 66, budget: "104%", forecast: "108%", lastYear: "+10.7%" },
    { name: "TMT", short: "TMT", value: "84B", change: "+9.1%", direction: "up", height: 58, budget: "96%", forecast: "100%", lastYear: "+8.6%" },
    { name: "Assets Group", short: "Assets Group", value: "72B", change: "−5.2%", direction: "down", height: 50, budget: "88%", forecast: "91%", lastYear: "−4.8%" },
    { name: "Aura Group", short: "Aura Group", value: "65B", change: "+1.1%", direction: "stable", height: 45, budget: "93%", forecast: "95%", lastYear: "+0.9%" },
  ],
} satisfies Record<Period, Array<{ name: string; short: string; value: string; change: string; direction: string; height: number; budget: string; forecast: string; lastYear: string }>>;

export function PulseReference3DDark() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [profile, setProfile] = useState(false);
  const [period, setPeriod] = useState<Period>("YTD");
  const [toast, setToast] = useState("");
  const [insightIndex, setInsightIndex] = useState(0);
  const [insightTransition, setInsightTransition] = useState<{
    from: number;
    to: number;
    direction: "forward" | "reverse";
  } | null>(null);
  const insightAnimatingRef = useRef(false);
  const insightTransitionTimerRef = useRef<number | null>(null);
  const [groupIndex, setGroupIndex] = useState(2);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [groupChatOpen, setGroupChatOpen] = useState(true);
  const [groupQuestion, setGroupQuestion] = useState("");
  const [groupView, setGroupView] = useState<"bars" | "orbit">("bars");
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [decisionsViewAll, setDecisionsViewAll] = useState(false);
  const enterprise = enterprisePerformance[period];
  const groupPerformance = groupPerformanceByPeriod[period];

  const turnInsightPage = useCallback((targetIndex: number, direction?: "forward" | "reverse") => {
    if (insightAnimatingRef.current || targetIndex === insightIndex) return;

    insightAnimatingRef.current = true;
    setInsightTransition({
      from: insightIndex,
      to: targetIndex,
      direction: direction ?? (targetIndex > insightIndex ? "forward" : "reverse"),
    });
    setInsightIndex(targetIndex);

    insightTransitionTimerRef.current = window.setTimeout(() => {
      setInsightTransition(null);
      insightAnimatingRef.current = false;
      insightTransitionTimerRef.current = null;
    }, 1000);
  }, [insightIndex]);

  useEffect(() => {
    const autoplayTimer = window.setTimeout(() => {
      turnInsightPage((insightIndex + 1) % insightSlides.length, "forward");
    }, 12000);

    return () => window.clearTimeout(autoplayTimer);
  }, [insightIndex, turnInsightPage]);

  useEffect(() => () => {
    if (insightTransitionTimerRef.current !== null) {
      window.clearTimeout(insightTransitionTimerRef.current);
    }
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    notify(`${next === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const askGroup = () => {
    if (!groupQuestion.trim()) return;
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
          </div>
          <div className="masthead-grid">
            <div className="masthead-content">
              <h1 className="masthead-headline">
                Good Morning, Jasim
              </h1>
              <p className="masthead-subhead">
                 Revenue is tracking at <strong>QAR {enterprise.revenue}{enterprise.revenueUnit.startsWith("B") ? "B" : ""}</strong>, {enterprise.achieved - enterprise.elapsed} pts ahead of time elapsed. Baladna and Estithmar are creating the lift; Assets is the one position that merits a decision before noon.
              </p>
            </div>
            <section className="insight-card masthead-insight" aria-label="Pulse Insights carousel">
              <div className="insight-track">
                {insightSlides.map((slide, index) => {
                  const isRestingPage = !insightTransition && index === insightIndex;
                  const isOutgoingPage = insightTransition?.from === index;
                  const isIncomingPage = insightTransition?.to === index;
                  const transitionDirection = isOutgoingPage ? insightTransition.direction : "";
                  const reverseSideSlide = isOutgoingPage && insightTransition
                    ? insightSlides[insightTransition.to]
                    : slide;

                  return (
                  <article
                    className={[
                      "insight-slide",
                      isRestingPage ? "is-active" : "",
                      isIncomingPage ? "is-incoming" : "",
                      isOutgoingPage ? `is-turning is-turning-${transitionDirection}` : "",
                    ].filter(Boolean).join(" ")}
                    key={`${slide.group}-${index}`}
                    aria-hidden={!isRestingPage && !isIncomingPage && !isOutgoingPage}
                  >
                    <div className="insight-page-full">
                      <InsightPageContent slide={slide} />
                    </div>
                    <div className="insight-page-half insight-page-left" aria-hidden="true">
                      <div className="insight-page-face insight-page-front">
                        <div className="insight-page-half-inner">
                          <InsightPageContent slide={slide} />
                        </div>
                      </div>
                      <div className="insight-page-face insight-page-back">
                        <div className="insight-page-half-inner">
                          <InsightPageContent slide={reverseSideSlide} />
                        </div>
                      </div>
                    </div>
                    <div className="insight-page-half insight-page-right" aria-hidden="true">
                      <div className="insight-page-face insight-page-front">
                        <div className="insight-page-half-inner">
                          <InsightPageContent slide={slide} />
                        </div>
                      </div>
                      <div className="insight-page-face insight-page-back">
                        <div className="insight-page-half-inner">
                          <InsightPageContent slide={reverseSideSlide} />
                        </div>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
              <div className="insight-progress" role="tablist" aria-label="Insight slides">
                {insightSlides.map((slide, index) => (
                  <button
                    key={`${slide.group}-${index}`}
                    className={index === insightIndex ? "active" : ""}
                    onClick={() => turnInsightPage(index)}
                    aria-label={`Show insight ${index + 1}: ${slide.group}`}
                    aria-selected={index === insightIndex}
                    role="tab"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="exe-metrics-section" aria-label="Enterprise position">
          <div className="exe-section-header">
            <h2><span>01</span> Enterprise position</h2>
            <div className="exe-section-line"></div>
            <div className="period-tabs" aria-label="Dashboard period">
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
          </div>

          <div className="exe-metrics-grid" data-testid="metrics-at-a-glance">
            <div className="metric-cell">
               <span className="metric-label">Consolidated revenue</span>
               <div className="metric-value-large">{enterprise.revenue}<span className="unit">{enterprise.revenueUnit}</span></div>
               <div className="metric-sub">{enterprise.revenueDetail}</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">EBITDA / profit</span>
               <div className="metric-value-large">{enterprise.ebitda}</div>
               <div className="metric-sub">{enterprise.ebitdaDetail}</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Budget achievement</span>
               <div className="metric-value-large">{enterprise.budgetAchievement}</div>
               <div className="metric-sub">{enterprise.budgetDetail} <span className="dim">{enterprise.budgetPlan}</span></div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Full-year forecast</span>
               <div className="metric-value-large">{enterprise.forecast}</div>
               <div className="metric-sub">{enterprise.forecastDetail}</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Time vs achievement</span>
               <div className="metric-split-labels">
                  <div>{enterprise.elapsed}% <span>{period === "Today" ? "day" : period === "MTD" ? "month" : "year"} elapsed</span></div>
                  <div>{enterprise.achieved}% <span>achieved</span></div>
               </div>
               <div className="metric-progress">
                  <div className="metric-progress-elapsed">
                     <span className="metric-elapsed-marker" style={{ left: `${enterprise.elapsed}%` }} />
                  </div>
                   <div className="metric-progress-achieved" style={{ width: `${enterprise.achieved}%` }}>
                    <span className="metric-achieved-marker" />
                  </div>
               </div>
                <div className="metric-sub">{enterprise.pace}</div>
            </div>
          </div>
        </section>

        <div className="exe-content">
          <div className="exe-section-header group-header-adjustment">
            <h2><span>02</span> Seven businesses, one connected pulse</h2>
            <div className="exe-section-line"></div>
          </div>

          <section className={`group-performance period-${period.toLowerCase()} ${groupChatOpen ? "chat-open" : "chat-collapsed"}`} aria-label="Enterprise group performance">
            <div className="group-performance-head">
               <div>
                <h2>Group Performance</h2>
                 <p>{period} revenue movement across the enterprise portfolio</p>
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
                      <span>{enterprise.revenue}</span><sub>{enterprise.revenueUnit}</sub>
                   </div>
                   <div className="orbit-core-trend">
                      {period === "YTD" ? "↗ 8.2% YoY" : period === "MTD" ? "↗ 6.1% MTD" : "↗ 3.1% today"}
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
                        <span>Budget: <strong>{group.budget}</strong></span>
                        <i />
                        <span>Forecast: <strong>{group.forecast}</strong></span>
                        <i />
                        <span>LY: <strong>{group.lastYear}</strong></span>
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
          </div>

          <div className="exe-section-header agents-section-header">
            <h2><span>04</span> Our Agents</h2>
            <div className="exe-section-line"></div>
          </div>

          <section className="agents-grid" aria-label="Our Agents placeholders">
            {[1, 2, 3, 4].map((agent) => (
              <article className="agent-placeholder-card" key={agent}>
                <span>Agent {String(agent).padStart(2, "0")}</span>
                <p>Details coming soon</p>
              </article>
            ))}
          </section>
        </div>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default PulseReference3DDark;
