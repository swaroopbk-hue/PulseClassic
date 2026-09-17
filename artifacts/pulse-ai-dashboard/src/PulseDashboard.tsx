import { useEffect, useState } from "react";
import { Bell, ChevronRight, Moon, Search, Send, SlidersHorizontal, Sparkles, Sun } from "lucide-react";
import "./pulse.css";

const navItems = ["Overview", "Businesses", "Performance", "Forecast", "Insights", "Attention", "Reports"];
const periods = ["MTD", "QTD", "YTD"];
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [nav, setNav] = useState("Overview");
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
      <div className="ref-window">
        <header className="ref-top">
          <div className="ref-logo">
            <img src="/images/pulse-ai-official.png" alt="Pulse.ai" />
          </div>
          <nav className="ref-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={nav === item ? "active" : ""}
                data-testid={`nav-${item.toLowerCase()}`}
                key={item}
                onClick={() => {
                  setNav(item);
                  notify(`${item} view selected`);
                }}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="ref-actions">
            <button data-testid="button-theme-toggle" className="round-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button data-testid="button-notifications" className="round-btn" onClick={() => notify("No new notifications")} aria-label="Notifications">
              <Bell size={14} />
            </button>
            <button data-testid="button-account" className="ref-avatar" onClick={() => setProfile(!profile)} aria-label="Open account">JJ</button>
          </div>
        </header>

        {profile && (
          <div className="profile-pop">
            <strong>Mr. Jasim</strong>
            <span>President · Secure executive access</span>
            <button onClick={() => notify("Preferences opened")}>Profile &amp; preferences</button>
            <button onClick={() => setProfile(false)}>Close account menu</button>
          </div>
        )}

        <main className="ref-body">
          <div className="ref-heading">
            <div>
              <h1>{nav}</h1>
              <p>Enterprise command center · Tuesday, 18 June 2024 · Consolidated view</p>
            </div>
            <div className="ref-controls">
              {periods.map((item) => (
                <button data-testid={`button-period-${item.toLowerCase()}`} className={`ref-control ${period === item ? "primary" : ""}`} onClick={() => setPeriod(item)} key={item}>{item}</button>
              ))}
              <button data-testid="button-date-range" className="ref-control" onClick={() => notify("Date range opened")}>01 Jan – 31 Jul⌄</button>
              <button data-testid="button-add-widget" className="ref-control" onClick={() => notify("Widget added")}><SlidersHorizontal size={11} /> Add widget +</button>
            </div>
          </div>

          <section className="glance-band" aria-label="Enterprise at a glance">
            <div className="glance-heading">
              <h2>Enterprise at a glance</h2>
              <span>YTD through 18 June · 71% of year elapsed</span>
            </div>
              <div className="glance-metrics" data-testid="metrics-at-a-glance">
              <button className="glance-metric" onClick={() => notify("Revenue detail opened")}>
                <span className="glance-label">Revenue</span>
                <strong>QAR 18.4B</strong>
                <small><i className="glance-arrow">↗</i> 8.2% vs last year · 94% target</small>
              </button>
              <button className="glance-metric" onClick={() => notify("EBITDA detail opened")}>
                <span className="glance-label">EBITDA</span>
                <strong>QAR 3.76B</strong>
                <small><i className="glance-arrow">↗</i> 6.9% margin 20.4%</small>
              </button>
              <button className="glance-metric" onClick={() => notify("Forecast detail opened")}>
                <span className="glance-label">Forecast</span>
                <strong>98.1%</strong>
                <small><b>QAR 18.9B</b> expected</small>
              </button>
              <button className="glance-metric" onClick={() => notify("Pace detail opened")}>
                <span className="glance-label">Time vs achieved</span>
                <strong>+5%</strong>
                <small>ahead of expected pace</small>
              </button>
            </div>
          </section>

          <section className={`group-performance ${groupChatOpen ? "chat-open" : "chat-collapsed"}`} aria-label="Enterprise group performance">
            <div className="group-performance-head">
              <div>
                <h2>Group Performance</h2>
                <p>Revenue movement across the enterprise portfolio</p>
              </div>
               <div className="group-view-actions" aria-label="Group performance views">
                 {groupView === "orbit" ? (
                   <button className="group-view-button" onClick={() => setGroupView("bars")}>Line Bar</button>
                 ) : (
                   <button className="group-view-button" onClick={() => setGroupView("orbit")}>Orbit</button>
                 )}
                 <button className="more" onClick={() => notify("Group performance options opened")} aria-label="Group performance options">···</button>
               </div>
            </div>
             {groupView === "orbit" ? (
               <div className="group-orbit-view" aria-label="Orbit visualization">
                 <div className="orbit-ring orbit-ring-one" />
                 <div className="orbit-ring orbit-ring-two" />
                 <div className="orbit-ring orbit-ring-three" />
                 <div className="orbit-core"><span>18.4B</span><small>CONSOLIDATED REVENUE</small></div>
                 {groupPerformance.map((group, index) => (
                   <button
                     className={`orbit-node orbit-node-${index}`}
                     key={group.name}
                     onMouseEnter={() => setGroupIndex(index)}
                     onFocus={() => setGroupIndex(index)}
                     onClick={() => notify(`${group.name} selected`)}
                   >
                     <span>{group.name}</span><strong>{group.value}</strong><small>{group.change} vs LY</small>
                   </button>
                 ))}
               </div>
             ) : (
             <div className="group-chart">
              <div className="group-axis"><span>100K</span><span>80K</span><span>60K</span><span>40K</span><span>20K</span></div>
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
                    placeholder={`Show me the reason for the ${groupPerformance[groupIndex].change.startsWith("-") ? "drop" : "change"} in ${groupPerformance[groupIndex].name}`}
                    aria-label="Ask about group performance"
                  />
                   <button data-testid="button-send-group-question" onClick={askGroup} aria-label="Send group performance question"><Send size={15} /></button>
                </div>
              )}
            </div>
          </section>

          <div className="ref-bottom">
             <section className="ref-card assistant-card">
               <div className="card-head assistant-heading"><h2>AI Assistant</h2><button className="more" onClick={() => notify("Assistant options opened")} aria-label="Assistant options">···</button></div>
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
            <section className="ref-card stat-card">
              <div className="card-head"><h2>Transactions</h2><button className="more" onClick={() => notify("Transactions opened")}>···</button></div>
              <div className="stat-content"><div><div className="stat-num">106k</div><span className="delta">+34,002 vs last period</span></div><div className="dot-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</div></div>
              <div className="card-head"><h2>Customers</h2><span className="delta">+320</span></div>
              <div className="stat-content" style={{ paddingTop: 0 }}><div className="stat-num">1,284</div><div className="dot-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</div></div>
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
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default PulseReference3DDark;