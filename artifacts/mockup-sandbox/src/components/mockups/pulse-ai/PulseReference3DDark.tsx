import { useState } from "react";
import { Bell, Moon, Search, Send, SlidersHorizontal, Sun } from "lucide-react";
import "./PulseReference3DDark.css";

const navItems = ["Overview", "Businesses", "Performance", "Forecast", "Insights", "Attention", "Reports"];
const periods = ["MTD", "QTD", "YTD"];
const bars = [64, 57, 73, 48, 40, 35, 46, 58, 52, 69, 62, 78];

export function PulseReference3DDark() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [nav, setNav] = useState("Overview");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [profile, setProfile] = useState(false);
  const [period, setPeriod] = useState("YTD");
  const [selectedBar, setSelectedBar] = useState(2);
  const [toast, setToast] = useState("");

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

          <div className="ref-layout">
            <section className="ref-card">
              <div className="card-head">
                <h2>Enterprise revenue</h2>
                <button className="more" onClick={() => notify("Revenue options opened")}>···</button>
              </div>
              <div className="pulse-chart">
                <div className="chart-grid"><i /><i /><i /><i /><i /></div>
                <div className="bars">
                  {bars.map((height, index) => (
                    <button
                      className={`bar ${selectedBar === index ? "focus" : ""}`}
                      key={index}
                      style={{ height: `${height}%` }}
                      onClick={() => {
                        setSelectedBar(index);
                        notify(`Period ${index + 1} selected`);
                      }}
                      aria-label={`Period ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="chart-float"><b>QAR 18.4B</b> · 94% target</div>
                <div className="chart-labels"><span>Jan</span><span>Mar</span><span>May</span><span>Jun</span></div>
              </div>
              <div className="ask-inline">
                <Search size={13} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} placeholder="Ask Pulse about the enterprise signal" />
                <button onClick={ask} aria-label="Ask Pulse"><Send size={12} /></button>
              </div>
              {answer && <div className="ask-result"><b>Executive answer · </b>{answer}</div>}
            </section>

            <section className="ref-card metric-card">
              <div className="card-head"><h2>Gross enterprise value</h2><button className="more" onClick={() => notify("Value options opened")}>···</button></div>
              <div className="metric-value">QAR 18.4B <span className="delta">↗ 8.2%</span></div>
              <div className="mini-list">
                {[["Revenue", "11.8B", 82, ""], ["EBITDA", "3.76B", 63, "blue"], ["Forecast", "18.9B", 49, "pink"]].map((row) => (
                  <div className="mini-row" key={row[0]}>
                    <header><span>{row[0]}</span><span>QAR {row[1]}</span></header>
                    <div className="mini-track"><i className={String(row[3])} style={{ width: `${row[2]}%` }} /></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="ref-bottom">
            <section className="ref-card retention">
              <div className="card-head"><h2>Performance signal</h2><button className="more" onClick={() => notify("Signal options opened")}>···</button></div>
              <div className="spark-area"><svg viewBox="0 0 260 115" preserveAspectRatio="none"><polyline points="0,87 22,91 44,74 65,77 87,48 108,51 130,40 151,47 173,30 195,58 216,63 238,45 260,52 260,115 0,115" /></svg></div>
              <div className="axis"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
            </section>
            <section className="ref-card stat-card">
              <div className="card-head"><h2>Transactions</h2><button className="more" onClick={() => notify("Transactions opened")}>···</button></div>
              <div className="stat-content"><div><div className="stat-num">106k</div><span className="delta">+34,002 vs last period</span></div><div className="dot-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</div></div>
              <div className="card-head"><h2>Customers</h2><span className="delta">+320</span></div>
              <div className="stat-content" style={{ paddingTop: 0 }}><div className="stat-num">1,284</div><div className="dot-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} />)}</div></div>
            </section>
            <section className="insight-card"><h3>Pulse insight</h3><strong>94%</strong><p>Enterprise position is ahead of expected pace by 5 points.</p><small>Assets is the clearest watchpoint today.</small></section>
          </div>
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default PulseReference3DDark;