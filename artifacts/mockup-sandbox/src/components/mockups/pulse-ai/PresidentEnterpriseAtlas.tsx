import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  CircleAlert,
  FileText,
  Link2,
  Map,
  MessageSquareText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import "./PresidentEnterpriseAtlas.css";

type Group = {
  name: string;
  revenue: string;
  achievement: string;
  growth: string;
  forecast: string;
  status: "Ahead" | "On track" | "Watch";
  driver: string;
  risk: string;
  source: string;
  color: string;
  points: number[];
};

const groups: Group[] = [
  { name: "UCC", revenue: "5.82B", achievement: "96%", growth: "+7.4%", forecast: "5.99B", status: "On track", driver: "Infrastructure contract wins", risk: "Hospitality occupancy", source: "UCC monthly performance · 17 Jun", color: "#7e9d9b", points: [32, 38, 37, 44, 43, 53, 56] },
  { name: "Estithmar", revenue: "3.46B", achievement: "101%", growth: "+9.1%", forecast: "3.58B", status: "Ahead", driver: "CapEx conversion", risk: "Project phasing", source: "Estithmar forecast review · 17 Jun", color: "#b08b50", points: [26, 32, 30, 40, 44, 43, 55] },
  { name: "Assets", revenue: "2.91B", achievement: "88%", growth: "-2.8%", forecast: "2.74B", status: "Watch", driver: "Hospitality occupancy", risk: "Commercial leasing", source: "Assets operating report · 17 Jun", color: "#b3685e", points: [54, 53, 49, 46, 42, 40, 37] },
  { name: "Aura", revenue: "1.74B", achievement: "94%", growth: "+4.6%", forecast: "1.80B", status: "On track", driver: "Portfolio mix", risk: "Retail footfall", source: "Aura group pulse · 18 Jun", color: "#8b95a4", points: [28, 34, 32, 36, 38, 43, 46] },
  { name: "PIH", revenue: "1.38B", achievement: "97%", growth: "+5.8%", forecast: "1.42B", status: "On track", driver: "Margin discipline", risk: "Input costs", source: "PIH management report · 17 Jun", color: "#7c8e7f", points: [25, 30, 29, 35, 38, 42, 44] },
  { name: "Baladna", revenue: "1.62B", achievement: "111%", growth: "+12.2%", forecast: "1.69B", status: "Ahead", driver: "Domestic sales", risk: "Distribution capacity", source: "Baladna sales pulse · 18 Jun", color: "#b08b50", points: [20, 27, 34, 37, 43, 48, 55] },
  { name: "TMT", revenue: "1.47B", achievement: "91%", growth: "+1.1%", forecast: "1.52B", status: "Watch", driver: "Renewal pipeline", risk: "Enterprise churn", source: "TMT forecast model · 17 Jun", color: "#a87972", points: [47, 46, 44, 43, 40, 41, 40] },
];

const questions = ["Why is this position moving?", "What happens by December?", "Compare the two strongest groups"];

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const path = points.map((point, index) => `${index ? "L" : "M"} ${index * 18} ${62 - point}`).join(" ");
  return <svg className="atlas-spark" viewBox="0 0 108 62" aria-label="seven point trend"><path d="M0 54H108" className="spark-guide" /><path d={path} style={{ stroke: color }} /></svg>;
}

function ProfileSurface() {
  const [open, setOpen] = useState(false);
  return <div className="profile-anchor">
    <button className="atlas-avatar" aria-label="Open Mr. Jasim profile" aria-expanded={open} onClick={() => setOpen(!open)}>JJ</button>
    {open && <div className="profile-surface" role="dialog" aria-label="Account surface">
      <button className="surface-close" aria-label="Close account surface" onClick={() => setOpen(false)}><X size={14} /></button>
      <strong>Mr. Jasim</strong><span>President · Enterprise access</span>
      <div className="sso-line"><ShieldCheck size={14} /> SSO secured · refreshed 08:42 AST</div>
      <button onClick={() => setOpen(false)}>Profile &amp; preferences</button>
      <button onClick={() => setOpen(false)}>Notification settings</button>
    </div>}
  </div>;
}

export function PresidentEnterpriseAtlas() {
  const [period, setPeriod] = useState("YTD");
  const [selectedName, setSelectedName] = useState("Assets");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [approved, setApproved] = useState(false);
  const [document, setDocument] = useState("Assets operating report");
  const [layer, setLayer] = useState<"group" | "company" | "source">("group");
  const selected = useMemo(() => groups.find((group) => group.name === selectedName) ?? groups[2], [selectedName]);

  const ask = (prompt = query) => {
    if (!prompt.trim()) return;
    setQuery(prompt);
    setAnswer(prompt.toLowerCase().includes("december")
      ? `${selected.name} reaches QAR ${selected.forecast}B at the current trajectory. The downside is concentrated in ${selected.risk.toLowerCase()}; recovering half of the gap protects approximately QAR 107M of annual revenue.`
      : `${selected.name} is ${selected.achievement} to target with ${selected.growth} growth. ${selected.driver} is carrying the position, while ${selected.risk.toLowerCase()} is the clearest watchpoint.`);
  };

  return <div className="enterprise-atlas">
    <header className="atlas-header">
      <div className="atlas-brand"><img src="/__mockup/images/pulse-ai-official.png" alt="Pulse.ai" /><span>Enterprise atlas</span></div>
      <div className="atlas-context"><span className="live-dot" /> Consolidated view <b>·</b> Tue, 18 June 2024 <span className="refresh-note">Refreshed 08:42 AST</span></div>
      <div className="atlas-actions"><button aria-label="Notifications" className="icon-button"><Bell size={17} /><i /></button><ProfileSurface /></div>
    </header>

    <main className="atlas-main">
      <section className="atlas-intro">
        <div><div className="atlas-kicker"><Map size={13} /> LIVING ENTERPRISE ATLAS <span>·</span> EXECUTIVE EDITION</div><h1>See where the enterprise<br /><em>is moving.</em></h1><p>QAR 18.4B is ahead of its morning pace. Trace the lift, follow the risk, and move from signal to decision without leaving the view.</p></div>
        <div className="period-rail" aria-label="Reporting period">{["MTD", "QTD", "YTD"].map((item) => <button key={item} className={period === item ? "active" : ""} onClick={() => setPeriod(item)}>{item}</button>)}<span>18 Jun<br /><small>FY24</small></span></div>
      </section>

      <section className="atlas-stage">
        <div className="stage-head"><div><span className="section-tag">01 / ENTERPRISE POSITION</span><h2>Seven businesses, one connected pulse</h2></div><span className="stage-note">Select a node to reveal its story <ChevronRight size={14} /></span></div>
        <div className="atlas-canvas">
          <div className="enterprise-core"><span>CONSOLIDATED REVENUE</span><strong>18.4<small>B QAR</small></strong><b><ArrowUpRight size={13} /> 8.2% YoY</b><div className="core-rule"><i /></div><small>94% of target · 5 pts ahead of time</small></div>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          {groups.map((group, index) => {
            const isSelected = group.name === selectedName;
            return <button key={group.name} className={`atlas-node node-${index + 1} ${isSelected ? "selected" : ""}`} style={{ "--node": group.color } as React.CSSProperties} onClick={() => { setSelectedName(group.name); setLayer("group"); setAnswer(""); }}>
              <span className="node-stem" /><span className="node-name">{group.name}</span><strong>QAR {group.revenue}</strong><small>{group.achievement} target · {group.growth}</small><Sparkline points={group.points} color={group.color} /><i className={`node-status ${group.status === "Watch" ? "watch" : ""}`} />
            </button>;
          })}
          <div className="canvas-legend"><span><i className="legend-ahead" /> Ahead / on track</span><span><i className="legend-watch" /> Watch signal</span></div>
        </div>
        <div className="layer-path"><button className={layer === "group" ? "active" : ""} onClick={() => setLayer("group")}>Enterprise</button><ChevronRight size={13} /><button className={layer === "company" ? "active" : ""} onClick={() => setLayer("company")}>{selected.name}</button><ChevronRight size={13} /><button className={layer === "source" ? "active" : ""} onClick={() => setLayer("source")}>{layer === "source" ? "Source data" : "Company / KPI"}</button></div>
      </section>

      <section className="reveal-grid">
        <div className="reveal-story">
          <div className="reveal-label"><span className="section-tag">02 / SELECTED POSITION</span><span className={`status-pill ${selected.status === "Watch" ? "watch" : ""}`}>{selected.status}</span></div>
          <div className="story-title"><h2>{selected.name}</h2><span>QAR {selected.revenue} revenue <b>{selected.achievement} of target</b></span></div>
          <div className="story-metrics"><div><span>Forecast</span><strong>QAR {selected.forecast}</strong></div><div><span>Growth</span><strong className={selected.growth.startsWith("-") ? "negative" : "positive"}>{selected.growth}</strong></div><div><span>Primary driver</span><strong>{selected.driver}</strong></div></div>
          <div className="story-explanation"><Sparkles size={15} /><p><b>Pulse explains:</b> {selected.name} is holding its position because {selected.driver.toLowerCase()} is compensating for pressure in {selected.risk.toLowerCase()}.</p><button onClick={() => ask(`Why is ${selected.name} moving?`)}>Ask about this signal <ArrowUpRight size={13} /></button></div>
        </div>
        <aside className="atlas-right">
          <div className="right-block"><div className="right-heading"><Target size={14} /><span>Time vs achievement</span><b>71 / 76</b></div><div className="time-bars"><i style={{ width: "71%" }} /><i style={{ width: "76%" }} /></div><small>5 pts ahead of expected pace</small></div>
          <div className="right-block attention-block"><div className="right-heading"><CircleAlert size={14} /><span>Decision on your desk</span><b>{approved ? "Done" : "1 open"}</b></div><div className="attention-line"><div><strong>UCC Infrastructure</strong><small>Capital release · QAR 42M</small></div>{approved ? <span className="completed"><Check size={13} /> Approved</span> : <button onClick={() => setApproved(true)}>Approve</button>}</div></div>
        </aside>
      </section>

      <section className="bottom-band">
        <div className="ask-atlas"><div className="ask-mark"><MessageSquareText size={17} /></div><div className="ask-copy"><b>Ask Pulse</b><span>Follow the signal with a question.</span></div><div className="ask-input"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} placeholder={`Why is ${selected.name} moving?`} /><button onClick={() => ask()} aria-label="Send Ask Pulse question"><Send size={14} /></button></div><div className="ask-suggestions">{questions.map((question) => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div>{answer && <div className="ask-answer"><b>Pulse answer</b><span>{answer}</span><small>Evidence: {selected.source} · FY24 forecast model</small></div>}</div>
        <div className="evidence-strip"><div className="strip-heading"><span>Evidence trail</span><small>Connected to {selected.name}</small></div>{["Assets operating report", "Board briefing · June", "FY24 forecast model"].map((item, index) => <button key={item} className={document === item ? "current" : ""} onClick={() => { setDocument(item); setQuery(`What changed in ${item}?`); }}><FileText size={14} /><span>{item}<small>{index === 0 ? "17 Jun · operating" : index === 1 ? "17 Jun · President's office" : "18 Jun · Finance"}</small></span><Link2 size={13} /></button>)}</div>
      </section>
    </main>
    <footer className="atlas-footer"><span>Pulse.ai / Enterprise atlas</span><span><ShieldCheck size={12} /> Confidential · SSO executive access</span></footer>
  </div>;
}

export default PresidentEnterpriseAtlas;