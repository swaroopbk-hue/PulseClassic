import { useEffect, useState } from "react";
import { Bell, ChevronRight, Moon, Search, Send, SlidersHorizontal, Sparkles, Sun } from "lucide-react";
import "./PulseReference3DDark.css";

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
  { group: "Estithmar", value: "18.6%", title: "Portfolio EBITDA widened ahead of forecast.", body: "Three properties contributed 74% of the improvement, led by disciplined cost control.", note: "Operating review signed off · 2 actions due this week.", tone: "sand" },
  { group: "Assets", value: "−214M", title: "Hospitality remains the clearest enterprise watchpoint.", body: "Occupancy and commercial leasing explain most of the gap against the current forecast.", note: "Executive attention requested · evidence refreshed 2h ago.", tone: "coral" },
  { group: "Baladna", value: "111%", title: "Demand is running above the annual target.", body: "Volume growth is strongest across core dairy and export channels into the next quarter.", note: "Forecast confidence increased from medium to high.", tone: "mint" },
  { group: "TMT", value: "Q3", title: "A new transformation milestone is within reach.", body: "Delivery velocity improved across the shared services roadmap and capital program.", note: "Two dependencies remain with Group Leadership.", tone: "violet" },
];
const groupPerformance = [
  { name: "Power International", short: "Power International", value: "65.2K", change: "+12%", direction: "up", height: 92 },
  { name: "UCC Holding", short: "UCC Holding", value: "54.8K", change: "-8%", direction: "down", height: 76 },
  { name: "Estithmar Holding", short: "Estithmar Holding", value: "48.6K", change: "+6%", direction: "up", height: 64 },
  { name: "Baladna", short: "Baladna", value: "38.3K", change: "-4%", direction: "down", height: 54 },
  { name: "TMT", short: "TMT", value: "32.9K", change: "+9%", direction: "up", height: 47 },
  { name: "Assets Group", short: "Assets Group", value: "28.1K", change: "-3%", direction: "down", height: 42 },
  { name: "Aura Group", short: "Aura Group", value: "24.7K", change: "+11%", direction: "up", height: 37 },
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
  const [groupView, setGroupView] = useState<"bars" | "orbit" | "line">("bars");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuestionIndex((current) => (current + 1) % pulseQuestions.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setInsightIndex((current) => (current + 1) % insightSlides.length);
    }, 11000);
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
    <div className={`pulse-ref3d ${theme}`}>
      <div className="ref-window">
        <header className="ref-top">
          <div className="ref-logo">
            <img src="/__mockup/images/pulse-ai-official.png" alt="Pulse.ai" />
          </div>
          <nav className="ref-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={nav === item ? "active" : ""}
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
            <button className="round-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button className="round-btn" onClick={() => notify("No new notifications")} aria-label="Notifications">
              <Bell size={14} />
            </button>
            <button className="ref-avatar" onClick={() => setProfile(!profile)} aria-label="Open account">JJ</button>
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
                <button className={`ref-control ${period === item ? "primary" : ""}`} onClick={() => setPeriod(item)} key={item}>{item}</button>
              ))}
              <button className="ref-control" onClick={() => notify("Date range opened")}>01 Jan – 31 Jul⌄</button>
              <button className="ref-control" onClick={() => notify("Widget added")}><SlidersHorizontal size={11} /> Add widget +</button>
            </div>
          </div>

          <section className="glance-band" aria-label="Enterprise at a glance">
            <div className="glance-heading">
              <h2>Enterprise at a glance</h2>
              <span>YTD through 18 June · 71% of year elapsed</span>
            </div>
            <div className="glance-metrics">
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
                 <button className={`group-view-button ${groupView === "orbit" ? "active" : ""}`} onClick={() => setGroupView("orbit")}>Orbit</button>
                 <button className={`group-view-button ${groupView === "line" ? "active" : ""}`} onClick={() => setGroupView("line")}>Line Bar</button>
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
             ) : groupView === "line" ? (
               <div className="group-line-view" aria-label="Line bar visualization">
                 <div className="line-axis"><span>100K</span><span>50K</span><span>0</span></div>
                 <div className="line-stage">
                   <svg className="line-chart-svg" viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true">
                     <defs><linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4da7f5" stopOpacity=".34" /><stop offset="1" stopColor="#4da7f5" stopOpacity="0" /></linearGradient></defs>
                     <path className="line-area" d="M0 48 L116 72 L233 90 L350 113 L466 129 L583 142 L700 151 L700 190 L0 190Z" />
                     <path className="line-path" d="M0 48 L116 72 L233 90 L350 113 L466 129 L583 142 L700 151" />
                     {groupPerformance.map((group, index) => <circle key={group.name} className="line-point" cx={index * 116.6} cy={[48,72,90,113,129,142,151][index]} r="4" />)}
                   </svg>
                   <div className="line-labels">{groupPerformance.map((group, index) => <button key={group.name} onMouseEnter={() => setGroupIndex(index)} onClick={() => notify(`${group.name} selected`)}><span>{group.short}</span><strong>{group.value}</strong><i style={{ height: `${group.height}%` }} /></button>)}</div>
                 </div>
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
                    <span className={`group-change ${group.direction}`}>{group.direction === "up" ? "↑" : "↓"} {group.change}</span>
                    <strong>{group.value}</strong>
                    <span className="group-bar-wrap"><i style={{ height: `${group.height}%` }} /></span>
                    {hoveredGroup === index && (
                      <div className="group-hover-tooltip" role="status">
                        <b>{group.value}</b>
                         <span>Revenue</span>
                        <i />
                         <span>Budget: <strong>{index === 2 ? "89%" : index % 2 === 0 ? "86%" : "82%"}</strong></span>
                        <i />
                         <span>LY: <strong>{group.direction === "down" ? "-11%" : "-8%"}</strong></span>
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
                  <input
                    value={groupQuestion}
                    onChange={(event) => setGroupQuestion(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && askGroup()}
                    placeholder={`Show me the reason for the ${groupPerformance[groupIndex].change.startsWith("-") ? "drop" : "change"} in ${groupPerformance[groupIndex].name}`}
                    aria-label="Ask about group performance"
                  />
                  <button onClick={askGroup} aria-label="Send group performance question"><Send size={15} /></button>
                </div>
              )}
            </div>
          </section>

          <div className="ref-bottom">
             <section className="ref-card assistant-card">
               <div className="assistant-heading"><span>AI Assistant</span><button className="more" onClick={() => notify("Assistant options opened")} aria-label="Assistant options">↗</button></div>
               <button className="assistant-orb" onClick={() => { setQuery(pulseQuestions[questionIndex]); notify("Question added to Ask Pulse"); }} aria-label="Use suggested business question">
                 <span className="orb-core" />
               </button>
               <div className="assistant-input">
                 <Search size={12} />
                 <input
                   value={query}
                   onChange={(event) => setQuery(event.target.value)}
                   onKeyDown={(event) => event.key === "Enter" && ask()}
                   placeholder={pulseQuestions[questionIndex]}
                   aria-label="Ask Pulse a business question"
                 />
                 <button onClick={ask} aria-label="Ask Pulse"><Send size={11} /></button>
               </div>
               <small className="assistant-hint">Tap the pulse to use this question</small>
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
                     aria-label={`Show ${slide.group} insight`}
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