import { useMemo, useState } from "react";
import { ArrowRight, Bell, Check, Clock3, FileText, Filter, Flag, LayoutDashboard, MessageSquareText, MoreHorizontal, Search, ShieldAlert, Sparkles, X, type LucideIcon } from "lucide-react";

type Decision = {
  id: number;
  title: string;
  company: string;
  amount: string;
  age: string;
  type: "Approval" | "Risk" | "Signal";
  copy: string;
  priority: "High" | "Medium";
};

const decisions: Decision[] = [
  { id: 1, title: "Release infrastructure capital", company: "UCC Infrastructure", amount: "QAR 42M", age: "12 min ago", type: "Approval", priority: "High", copy: "Phase two contractor release is ready. Holding it moves the Lusail handover by an estimated 9 days." },
  { id: 2, title: "Hospitality occupancy gap", company: "Estithmar Hospitality", amount: "−4.2% vs plan", age: "38 min ago", type: "Risk", priority: "High", copy: "The July recovery plan is not yet funded. Weekend occupancy is the primary driver of the QAR 214M forecast gap." },
  { id: 3, title: "New contract award", company: "UCC Contracting", amount: "QAR 18M", age: "1 hr ago", type: "Approval", priority: "Medium", copy: "Commercial review is complete. Margin is 2.1 points above the current book average." },
  { id: 4, title: "Baladna beat forecast", company: "Baladna", amount: "+11.0% YTD", age: "2 hrs ago", type: "Signal", priority: "Medium", copy: "Milk powder volume and regional distribution are carrying the group ahead of plan." },
];

export function PresidentDecisionDesk() {
  const [active, setActive] = useState<"All" | Decision["type"]>("All");
  const [selected, setSelected] = useState(1);
  const [resolved, setResolved] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [period, setPeriod] = useState("Today");
  const visible = useMemo(() => decisions.filter((item) => !resolved.includes(item.id) && (active === "All" || item.type === active) && `${item.title} ${item.company}`.toLowerCase().includes(query.toLowerCase())), [active, query, resolved]);
  const current = decisions.find((item) => item.id === selected) ?? visible[0] ?? decisions[0];
  const resolve = (label: string) => {
    setResolved((items) => [...items, current.id]);
    setNotice(`${label} logged for ${current.company}`);
    setSelected(visible.find((item) => item.id !== current.id)?.id ?? 1);
  };

  return (
    <div className="decision-desk">
      <style>{`
        .decision-desk{--ink:#183348;--navy:#0a3a5d;--cream:#f7f6f1;--paper:#fcfbf8;--line:#d8dfe1;--muted:#718087;--gold:#c39a58;--red:#a96762;min-height:100dvh;background:var(--cream);color:var(--ink);font-family:"DM Sans","Avenir Next",sans-serif;letter-spacing:-.01em}.decision-desk *{box-sizing:border-box}.decision-desk button,.decision-desk input{font:inherit}.desk-shell{display:grid;grid-template-columns:214px minmax(0,1fr);min-height:100dvh}.desk-rail{background:var(--navy);color:#dce8eb;padding:26px 17px;display:flex;flex-direction:column}.wordmark{font-family:Georgia,serif;font-size:23px;letter-spacing:-.06em;color:#f2eee3}.wordmark span{color:#ddba78}.rail-kicker{color:#9eb8c6;font-size:9px;letter-spacing:.18em;text-transform:uppercase;margin:53px 11px 12px}.rail-link{display:flex;align-items:center;gap:11px;width:100%;padding:11px;border:0;background:transparent;color:#b5c6cc;text-align:left;font-size:12px;cursor:pointer;border-radius:3px;margin:2px 0}.rail-link:hover,.rail-link.is-active{background:#124b70;color:#fff}.rail-meta{margin-top:auto;border-top:1px solid #315873;padding:16px 10px;color:#9fb3bc;font-size:10px;line-height:1.6}.rail-meta strong{color:#e5ece9}.desk-main{min-width:0;padding:27px 38px 46px}.desk-top{display:flex;justify-content:space-between;gap:22px;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:22px}.overline{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--navy)}.desk-title{font-family:Georgia,serif;font-size:34px;line-height:1.04;font-weight:500;margin:8px 0 7px;letter-spacing:-.05em}.desk-sub{color:var(--muted);font-size:13px}.top-actions{display:flex;gap:8px;align-items:center}.top-actions button{border:1px solid var(--line);background:var(--paper);color:var(--ink);padding:8px 11px;font-size:11px;cursor:pointer}.top-actions .round{width:32px;height:32px;border-radius:50%;padding:0;background:#d9c494;border:0;font-size:10px;font-weight:700}.desk-bar{display:flex;align-items:center;justify-content:space-between;margin:24px 0 14px;gap:10px}.desk-bar h2{font-size:16px;margin:0}.count{font-size:11px;color:var(--muted);margin-left:8px}.tabs{display:flex;gap:5px}.tabs button{background:transparent;border:1px solid transparent;color:var(--muted);font-size:11px;padding:7px 10px;cursor:pointer}.tabs button.active{background:var(--navy);color:#fff}.command-grid{display:grid;grid-template-columns:minmax(300px,.88fr) minmax(370px,1.35fr) minmax(210px,.6fr);gap:16px;align-items:start}.inbox,.detail,.context{background:var(--paper);border:1px solid var(--line)}.inbox-head{display:flex;align-items:center;gap:8px;padding:12px;border-bottom:1px solid var(--line)}.inbox-head input{flex:1;min-width:0;border:0;background:transparent;outline:0;font-size:12px;color:var(--ink)}.inbox-head input::placeholder{color:#96a1a4}.decision-row{display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:start;padding:15px 13px;border:0;border-bottom:1px solid var(--line);background:transparent;width:100%;text-align:left;cursor:pointer;color:var(--ink)}.decision-row:hover,.decision-row.selected{background:#eef3f2}.decision-row.selected{box-shadow:inset 3px 0 0 var(--gold)}.priority-dot{width:7px;height:7px;background:var(--gold);margin-top:5px}.priority-dot.red{background:var(--red)}.row-type{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}.row-title{font-size:12px;font-weight:700;margin:4px 0}.row-company{font-size:10px;color:var(--muted)}.row-amount{font-size:11px;font-weight:700;white-space:nowrap}.detail{padding:22px;min-height:423px}.detail-top{display:flex;justify-content:space-between;gap:12px}.detail-label{color:var(--navy);font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}.detail h2{font-family:Georgia,serif;font-weight:500;font-size:29px;line-height:1.08;letter-spacing:-.04em;margin:10px 0 6px}.detail-company{color:var(--muted);font-size:12px}.detail-copy{font-size:14px;line-height:1.6;max-width:590px;margin:27px 0;color:#40545b}.evidence{border-top:1px solid var(--line);border-bottom:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:15px;padding:14px 0;margin-bottom:20px}.evidence span{display:block;color:var(--muted);font-size:10px;margin-bottom:5px}.evidence strong{font-size:14px}.detail-actions{display:flex;gap:8px}.detail-actions button{border:1px solid var(--navy);background:var(--navy);color:white;padding:10px 13px;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:7px}.detail-actions button.secondary{background:transparent;color:var(--navy);border-color:var(--line)}.context{padding:17px}.context h3{font-size:13px;margin:0 0 16px}.context-block{border-top:1px solid var(--line);padding:13px 0}.context-label{font-size:9px;text-transform:uppercase;letter-spacing:.13em;color:var(--muted)}.context-value{font-size:19px;margin-top:7px}.context-copy{font-size:10px;color:var(--muted);line-height:1.45;margin-top:4px}.source{display:flex;gap:8px;align-items:start;font-size:10px;line-height:1.4;margin-top:14px}.source svg{color:var(--gold);flex:none}.notice{position:fixed;right:25px;bottom:24px;background:var(--navy);color:#fff;padding:12px 15px;font-size:11px;box-shadow:0 10px 22px #0a3a5d22;animation:deskIn .2s ease both}@keyframes deskIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}@media(max-width:1050px){.command-grid{grid-template-columns:1fr 1.3fr}.context{grid-column:span 2}.context{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.context h3{grid-column:1/-1;margin-bottom:-5px}.context-block{border-top:0;border-left:1px solid var(--line);padding:0 0 0 14px}}@media(max-width:760px){.desk-shell{display:block}.desk-rail{display:none}.desk-main{padding:20px 15px 30px}.desk-top{display:block}.top-actions{margin-top:18px;justify-content:flex-end}.desk-title{font-size:29px}.desk-bar{display:block}.tabs{margin-top:13px;overflow:auto}.command-grid{display:block}.inbox{margin-bottom:12px}.detail{min-height:0}.context{display:block;margin-top:12px}.context-block{border-top:1px solid var(--line);border-left:0;padding:13px 0}.detail h2{font-size:25px}.detail-copy{margin:20px 0}.decision-row{padding:13px}.desk-sub{max-width:290px}}
      `}</style>
      <div className="desk-shell">
        <aside className="desk-rail">
          <div className="wordmark">pulse<span>.ai</span></div>
          <div className="rail-kicker">President / command desk</div>
          {([["Overview", LayoutDashboard], ["Decisions", Flag], ["Ask Pulse", MessageSquareText], ["Reports", FileText]] as Array<[string, LucideIcon]>).map(([label, Icon], index) => <button className={`rail-link ${index === 1 ? "is-active" : ""}`} key={label}><Icon size={15} />{label}</button>)}
          <div className="rail-meta">Last synced<br /><strong>Today, 08:42 AST</strong><br /><br />Enterprise access · SSO</div>
        </aside>
        <main className="desk-main">
          <header className="desk-top">
            <div><div className="overline">Decision desk · Tuesday, 18 June 2024</div><h1 className="desk-title">What needs your call?</h1><div className="desk-sub">Four signals surfaced from across the enterprise. One clear queue for the day.</div></div>
            <div className="top-actions"><button onClick={() => setPeriod(period === "Today" ? "This week" : "Today")}><Clock3 size={13} style={{ verticalAlign: "middle", marginRight: 5 }} />{period}</button><button aria-label="Notifications"><Bell size={15} /></button><button className="round" aria-label="Account">JJ</button></div>
          </header>
          <div className="desk-bar"><h2>Decision queue <span className="count">{visible.length} open items</span></h2><div className="tabs">{(["All", "Approval", "Risk", "Signal"] as const).map((tab) => <button key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div></div>
          <div className="command-grid">
            <section className="inbox">
              <div className="inbox-head"><Search size={14} color="#718087" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the queue" /><Filter size={14} color="#718087" /></div>
              {visible.map((item) => <button key={item.id} className={`decision-row ${current.id === item.id ? "selected" : ""}`} onClick={() => setSelected(item.id)}><i className={`priority-dot ${item.type === "Risk" ? "red" : ""}`} /><div><div className="row-type">{item.type} · {item.age}</div><div className="row-title">{item.title}</div><div className="row-company">{item.company}</div></div><div className="row-amount">{item.amount}</div></button>)}
              {visible.length === 0 && <div style={{ padding: 24, color: "var(--muted)", fontSize: 12 }}>Queue cleared. Nothing matches this view.</div>}
            </section>
            <section className="detail">
              <div className="detail-top"><div><div className="detail-label">{current.type} · {current.priority} priority</div><h2>{current.title}</h2><div className="detail-company">{current.company} · surfaced {current.age}</div></div><MoreHorizontal size={18} color="#718087" /></div>
              <p className="detail-copy">{current.copy}</p>
              <div className="evidence"><div><span>Recommended next step</span><strong>{current.type === "Risk" ? "Review recovery plan" : "Approve release"}</strong></div><div><span>Decision by</span><strong>20 June 2024</strong></div></div>
              <div className="detail-actions"><button onClick={() => resolve("Decision")}><Check size={14} />{current.type === "Approval" ? "Approve" : "Mark reviewed"}</button><button className="secondary" onClick={() => resolve("Deferred")}><ArrowRight size={14} />Defer</button><button className="secondary" onClick={() => setNotice("Briefing note copied to your workspace")} aria-label="Add to briefing"><Sparkles size={14} /></button></div>
            </section>
            <aside className="context"><h3>Context at a glance</h3><div className="context-block"><div className="context-label">Enterprise revenue</div><div className="context-value">QAR 18.4B</div><div className="context-copy">94% of target · up 8.2% year on year</div></div><div className="context-block"><div className="context-label">Forecast confidence</div><div className="context-value">98.1%</div><div className="context-copy">QAR 18.9B expected by year end</div></div><div className="source"><ShieldAlert size={14} /><span>Signals are ranked by financial exposure, deadline and confidence.</span></div></aside>
          </div>
        </main>
      </div>
      {notice && <div className="notice" onAnimationEnd={() => setNotice("")}><Check size={13} style={{ verticalAlign: "middle", marginRight: 7 }} />{notice}<X size={13} style={{ verticalAlign: "middle", marginLeft: 15, cursor: "pointer" }} onClick={() => setNotice("")} /></div>}
    </div>
  );
}

export default PresidentDecisionDesk;