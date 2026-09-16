import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import "./PresidentMorningLedger.css";

type Group = {
  name: string;
  revenue: string;
  profit: string;
  achievement: string;
  forecast: string;
  status: "Ahead" | "On track" | "Watch";
  note: string;
  line: number[];
};

const groups: Group[] = [
  { name: "UCC", revenue: "5.82B", profit: "+7.4%", achievement: "96%", forecast: "5.99B", status: "On track", note: "Infrastructure carrying the lead", line: [32, 36, 35, 42, 47, 49, 55] },
  { name: "Estithmar", revenue: "3.46B", profit: "+9.1%", achievement: "101%", forecast: "3.58B", status: "Ahead", note: "CapEx conversion ahead of plan", line: [28, 30, 35, 33, 41, 47, 54] },
  { name: "Assets", revenue: "2.91B", profit: "-2.8%", achievement: "88%", forecast: "2.74B", status: "Watch", note: "Hospitality softening the curve", line: [55, 53, 51, 48, 44, 40, 38] },
  { name: "Aura", revenue: "1.74B", profit: "+4.6%", achievement: "94%", forecast: "1.80B", status: "On track", note: "Steady across portfolio", line: [30, 34, 33, 37, 40, 43, 45] },
  { name: "PIH", revenue: "1.38B", profit: "+5.8%", achievement: "97%", forecast: "1.42B", status: "On track", note: "Margin holding at 18.8%", line: [26, 29, 32, 31, 36, 40, 44] },
  { name: "Baladna", revenue: "1.62B", profit: "+12.2%", achievement: "111%", forecast: "1.69B", status: "Ahead", note: "Domestic sales momentum", line: [22, 26, 31, 38, 39, 46, 53] },
  { name: "TMT", revenue: "1.47B", profit: "+1.1%", achievement: "91%", forecast: "1.52B", status: "Watch", note: "Renewals need a closer look", line: [47, 48, 45, 43, 41, 42, 40] },
];

const questions = [
  "What changed since yesterday?",
  "Where is the largest forecast gap?",
  "Give me the five things I should know.",
];

function MiniLine({ points, inverse = false }: { points: number[]; inverse?: boolean }) {
  const path = points.map((value, index) => `${index === 0 ? "M" : "L"} ${index * 17} ${58 - value}`).join(" ");
  return (
    <svg className={`mini-line ${inverse ? "inverse" : ""}`} viewBox="0 0 102 60" role="img" aria-label="seven point business trend">
      <path d="M0 53 H102" className="line-guide" />
      <path d={path} className="line-path" />
    </svg>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="profile-wrap">
      <button className="profile-button" aria-label="Open President account" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>JJ</span>
        <ChevronDown size={13} />
      </button>
      {open && (
        <div className="profile-popover" role="dialog" aria-label="President account menu">
          <div className="profile-name"><strong>Mr. Jasim</strong><span>President · Enterprise access</span></div>
          <div className="profile-secure"><ShieldCheck size={14} /> SSO secured · refreshed 08:42 AST</div>
          <button onClick={() => setOpen(false)}>Profile &amp; preferences</button>
          <button onClick={() => setOpen(false)}>Notification settings</button>
          <button className="profile-close" onClick={() => setOpen(false)}><X size={13} /> Close</button>
        </div>
      )}
    </div>
  );
}

export function PresidentMorningLedger() {
  const [period, setPeriod] = useState("YTD");
  const [selectedGroup, setSelectedGroup] = useState("Assets");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [approved, setApproved] = useState(false);
  const [document, setDocument] = useState("Board briefing · June");
  const selected = useMemo(() => groups.find((group) => group.name === selectedGroup) ?? groups[2], [selectedGroup]);

  const ask = (prompt = query) => {
    if (!prompt.trim()) return;
    setQuery(prompt);
    setAnswer(
      prompt.toLowerCase().includes("yesterday")
        ? "Baladna moved furthest forward (+2.1 pts achievement), while Assets widened its forecast gap by QAR 18M. The enterprise remains 5 pts ahead of time elapsed."
        : `Assets is QAR 214M below its YTD forecast. Hospitality occupancy (−4.2%) and delayed commercial leasing account for 81% of the gap. Review the July recovery plan before the next steering committee.`,
    );
  };

  return (
    <div className="morning-ledger">
      <header className="ledger-header">
        <div className="masthead">
          <img src="/__mockup/images/pulse-ai-official.png" alt="Pulse.ai" />
          <span className="masthead-rule" />
          <span>President’s morning edition</span>
        </div>
        <div className="header-actions">
          <span className="refresh"><Clock3 size={13} /> Refreshed 08:42 AST</span>
          <button className="notice" aria-label="Notifications"><CircleAlert size={16} /><i /></button>
          <ProfileMenu />
        </div>
      </header>

      <main className="ledger-content">
        <section className="edition-intro">
          <div>
            <div className="kicker">Tuesday · 18 June 2024 <span> / </span> QAR consolidated view</div>
            <h1>The enterprise is ahead<br /><em>of its morning pace.</em></h1>
            <p className="position">Revenue is tracking at <strong>QAR 18.4B</strong>, 5 pts ahead of time elapsed. Baladna and Estithmar are creating the lift; Assets is the one position that merits a decision before noon.</p>
          </div>
          <div className="period-control" aria-label="Reporting period">
            {["MTD", "QTD", "YTD"].map((item) => <button key={item} className={period === item ? "active" : ""} onClick={() => setPeriod(item)}>{item}</button>)}
            <span>18 Jun 2024</span>
          </div>
        </section>

        <section className="enterprise-pulse">
          <div className="pulse-heading"><span>01</span><h2>Enterprise position</h2><span className="heading-rule" /><small>{period} · FY24 plan</small></div>
          <div className="pulse-grid">
            <div className="position-number"><span>Consolidated revenue</span><strong>18.4<small>B QAR</small></strong><div className="delta positive"><ArrowUpRight size={14} /> 8.2% YoY <b>·</b> 94% target</div></div>
            <div className="metric-column"><span>EBITDA / profit</span><strong>3.76B</strong><div className="metric-meta"><b className="positive">20.4% margin</b><span>+6.9% YoY</span></div><div className="rule-progress"><i style={{ width: "76%" }} /></div></div>
            <div className="metric-column"><span>Budget achievement</span><strong>94.0%</strong><div className="metric-meta"><b>QAR 18.4B</b><span>vs 19.6B plan</span></div><div className="rule-progress gold"><i style={{ width: "94%" }} /></div></div>
            <div className="metric-column"><span>Full-year forecast</span><strong>98.1%</strong><div className="metric-meta"><b className="positive">18.9B expected</b><span>−1.9% vs plan</span></div><div className="rule-progress"><i style={{ width: "82%" }} /></div></div>
            <div className="time-plot"><span>Time vs achievement</span><div className="plot-label"><b>71%</b><span>year elapsed</span><b className="positive">76%</b><span>achieved</span></div><div className="plot-track"><i className="elapsed" /><i className="achieved" /><em /></div><small>5% ahead of expected pace</small></div>
          </div>
        </section>

        <div className="ledger-columns">
          <section className="movement">
            <div className="section-title"><span className="section-index">02</span><div><h2>Seven positions, one view</h2><p>Select a position to read its movement and evidence.</p></div><MoreHorizontal size={18} /></div>
            <div className="group-list">
              {groups.map((group, index) => (
                <button key={group.name} className={`group-row ${selectedGroup === group.name ? "selected" : ""}`} onClick={() => setSelectedGroup(group.name)}>
                  <span className="row-index">0{index + 1}</span><strong>{group.name}</strong><span className="row-revenue">QAR {group.revenue}</span><span className={`status ${group.status.toLowerCase().replace(" ", "-")}`}><i />{group.status}</span><span className={group.profit.startsWith("-") ? "negative" : "positive"}>{group.profit}</span><MiniLine points={group.line} inverse={group.status === "Watch"} /><ChevronRight size={15} className="row-chevron" />
                </button>
              ))}
            </div>
            <div className="selected-caption"><Target size={15} /><span><b>{selected.name}</b> · {selected.note}. Forecast <strong>QAR {selected.forecast}</strong> · achievement <strong>{selected.achievement}</strong>.</span><button onClick={() => setAnswer(`${selected.name} drill-down opened: the clearest driver is ${selected.note.toLowerCase()}.`)}>Open position <ArrowUpRight size={13} /></button></div>
          </section>

          <aside className="ledger-aside">
            <section className="insight-section">
              <div className="aside-title"><span>03</span><h2>Pulse insight</h2><Sparkles size={15} /></div>
              <div className="insight-copy"><span className="insight-tag">Watch · Assets</span><h3>One position is narrowing the lead.</h3><p>Assets revenue is <strong>QAR 214M below forecast</strong>. Hospitality occupancy and commercial leasing make up 81% of the gap.</p><div className="driver"><span>Hospitality occupancy</span><b>−4.2%</b><i style={{ width: "68%" }} /></div><div className="driver"><span>Commercial leasing</span><b>−QAR 12M</b><i style={{ width: "43%" }} /></div><button className="text-action" onClick={() => ask("Why is Assets below forecast?")}>Explore evidence <ChevronRight size={14} /></button></div>
            </section>

            <section className="attention-section">
              <div className="aside-title"><span>04</span><h2>Needs your attention</h2><span className="attention-count">{approved ? "3" : "4"} items</span></div>
              <div className="approval-row"><span className="approval-mark"><Paperclip size={13} /></span><div><b>UCC Infrastructure</b><p>Capital release · QAR 42M</p></div>{approved ? <span className="approved"><Check size={13} /> Approved</span> : <button onClick={() => setApproved(true)}>Approve</button>}</div>
              <div className="approval-row"><span className="approval-mark risk"><CircleAlert size={13} /></span><div><b>Assets forecast risk</b><p>−7.2% projected annual target</p></div><button onClick={() => { setSelectedGroup("Assets"); setAnswer("Assets analysis is ready in the evidence column."); }}>Analyse</button></div>
              <div className="approval-row"><span className="approval-mark"><Target size={13} /></span><div><b>Estithmar CapEx request</b><p>Decision due this week · QAR 18.4M</p></div><button onClick={() => setAnswer("Estithmar CapEx request opened for review.")}>Review</button></div>
            </section>
          </aside>
        </div>

        <section className="command-ribbon">
          <div className="command-label"><MessageSquareText size={17} /><div><b>Ask Pulse</b><span>Ask about this edition, a position, or a document.</span></div></div>
          <div className="command-input"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} placeholder="Why is Assets revenue below forecast this month?" /><button onClick={() => ask()} aria-label="Send question"><Send size={15} /></button></div>
          <div className="question-list">{questions.map((question) => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div>
          {answer && <div className="command-answer"><b>Pulse answer</b><span>{answer}</span><small>Sources: FY24 forecast model · operating report · 17 Jun 2024</small></div>}
        </section>

        <section className="documents">
          <div className="documents-heading"><div><span className="section-index">05</span><h2>Evidence on the desk</h2></div><span>Business documents · select to ask about their contents</span></div>
          <div className="document-list">
            {["Monthly performance report", "Board briefing · June", "Forecast review"].map((item, index) => <button key={item} className={document === item ? "current" : ""} onClick={() => { setDocument(item); setQuery(`What changed in ${item}?`); }}><FileText size={16} /><span><b>{item}</b><small>{index === 0 ? "Enterprise · 18 Jun" : index === 1 ? "President's office · 17 Jun" : "Finance · 17 Jun"}</small></span><ChevronRight size={14} /></button>)}
          </div>
        </section>
      </main>
      <footer className="ledger-footer"><span>Pulse.ai / President’s morning ledger</span><span>Confidential · Enterprise access</span></footer>
    </div>
  );
}

export default PresidentMorningLedger;