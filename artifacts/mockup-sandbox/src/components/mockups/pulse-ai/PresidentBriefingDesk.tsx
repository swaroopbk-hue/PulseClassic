import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  Flag,
  Inbox,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Decision = {
  id: number;
  priority: "Now" | "Soon" | "Watch";
  title: string;
  company: string;
  owner: string;
  due: string;
  amount: string;
  detail: string;
};

const decisions: Decision[] = [
  {
    id: 1,
    priority: "Now",
    title: "Approve revised delivery sequence",
    company: "UCC Infrastructure",
    owner: "M. Rahman",
    due: "Today · 14:00",
    amount: "QAR 18.4M",
    detail: "A 12-day sequence change protects the Lusail handover. Procurement has confirmed the alternate steel route; margin impact is contained at 0.6 points.",
  },
  {
    id: 2,
    priority: "Now",
    title: "Resolve hospitality occupancy gap",
    company: "Aura Hospitality",
    owner: "L. Haddad",
    due: "Today · 17:30",
    amount: "−6.8 pts",
    detail: "Three properties are below the June plan. The proposed corporate-rate intervention is ready for sign-off and has a 21-day test window.",
  },
  {
    id: 3,
    priority: "Soon",
    title: "Confirm 2025 capex gate",
    company: "Estithmar Holding",
    owner: "S. Al-Kuwari",
    due: "Wed · 10:00",
    amount: "QAR 42.0M",
    detail: "The second gate is within plan, but the board pack needs a clear view of the downside case before Thursday.",
  },
  {
    id: 4,
    priority: "Watch",
    title: "Review services renewal mix",
    company: "UCC Services",
    owner: "N. Omar",
    due: "18 Jun",
    amount: "91.2%",
    detail: "Renewals are healthy overall, though two enterprise accounts have moved to month-to-month terms.",
  },
];

const styles = `
  .briefing-desk{min-height:100vh;background:#f3f1eb;color:#142c35;font-family:ui-sans-serif,system-ui,sans-serif;letter-spacing:-.01em}
  .briefing-desk *{box-sizing:border-box}
  .briefing-desk button{font:inherit}
  .desk-top{height:72px;background:#123c4a;color:#f7f3e8;display:flex;align-items:center;padding:0 34px;justify-content:space-between}
  .desk-brand{display:flex;align-items:center;gap:12px;font-size:18px;font-weight:760;letter-spacing:-.04em}
  .desk-mark{width:27px;height:27px;border:2px solid #dcb776;border-radius:50%;display:grid;place-items:center;color:#dcb776;font-size:12px}
  .desk-top-right{display:flex;align-items:center;gap:20px;font-size:11px;color:#b7c8c8}
  .desk-top-right button{border:0;background:transparent;color:#e6d09d;cursor:pointer}
  .desk-avatar{border:1px solid #70909a;width:31px;height:31px;border-radius:50%;display:grid;place-items:center;color:#f4d79e}
  .desk-body{display:grid;grid-template-columns:218px 1fr;min-height:calc(100vh - 72px)}
  .desk-rail{border-right:1px solid #d8d8cf;padding:30px 18px;background:#eeece5;display:flex;flex-direction:column}
  .rail-kicker{text-transform:uppercase;letter-spacing:.13em;font-size:9px;color:#78888a;font-weight:700;padding:0 12px 20px}
  .rail-link{background:transparent;border:0;padding:12px;color:#617174;text-align:left;display:flex;gap:11px;align-items:center;font-size:12px;cursor:pointer;border-radius:4px}
  .rail-link.active{background:#dbe7e4;color:#123c4a;font-weight:700}
  .rail-count{margin-left:auto;background:#d8b471;color:#173842;border-radius:20px;padding:2px 7px;font-size:9px}
  .rail-footer{margin-top:auto;border-top:1px solid #d8d8cf;padding:18px 12px;font-size:10px;color:#839093;line-height:1.6}
  .desk-main{padding:36px 40px 70px;max-width:1350px;width:100%}
  .desk-heading{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:27px}
  .desk-overline{text-transform:uppercase;letter-spacing:.13em;font-size:10px;color:#ae7f37;font-weight:760;margin-bottom:8px}
  .desk-title{font-family:Georgia,serif;font-size:34px;font-weight:400;line-height:1.08;margin:0 0 8px;letter-spacing:-.045em}
  .desk-subtitle{font-size:12px;color:#748386}
  .heading-actions{display:flex;gap:8px}
  .outline-button{border:1px solid #c9cfca;background:transparent;color:#456068;padding:9px 13px;border-radius:3px;font-size:11px;display:flex;align-items:center;gap:7px;cursor:pointer}
  .outline-button:hover{background:#e4e5dc}
  .brief-grid{display:grid;grid-template-columns:minmax(320px,1fr) minmax(360px,1.35fr) 250px;gap:18px;align-items:start}
  .inbox-panel,.focus-panel,.pulse-panel{border:1px solid #d6d8d1;background:#f8f7f2}
  .panel-head{padding:17px 18px 14px;border-bottom:1px solid #dedfd8;display:flex;align-items:center;justify-content:space-between}
  .panel-head h2{font-size:13px;margin:0;font-weight:760}
  .panel-head span{font-size:10px;color:#899497}
  .queue-tabs{display:flex;border-bottom:1px solid #dedfd8;padding:0 18px}
  .queue-tab{border:0;background:none;padding:12px 0;margin-right:18px;color:#8a9595;font-size:10px;cursor:pointer;border-bottom:2px solid transparent}
  .queue-tab.active{color:#123c4a;border-color:#d2a75f;font-weight:760}
  .queue-item{padding:15px 18px;border-bottom:1px solid #e2e2dc;cursor:pointer;transition:background .18s}
  .queue-item:hover,.queue-item.selected{background:#edf3f0}
  .queue-item.selected{border-left:3px solid #d3aa65;padding-left:15px}
  .queue-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .priority{font-size:9px;letter-spacing:.09em;text-transform:uppercase;font-weight:800}
  .priority.now{color:#bd6b51}.priority.soon{color:#b1843d}.priority.watch{color:#70888b}
  .queue-time{font-size:10px;color:#8c9694;display:flex;align-items:center;gap:4px}
  .queue-title{font-size:12px;line-height:1.35;font-weight:740;margin-bottom:7px}
  .queue-company{font-size:10px;color:#758588}
  .focus-panel{background:#123c4a;color:#edf2eb;border-color:#123c4a;min-height:500px}
  .focus-head{padding:18px 21px;border-bottom:1px solid #35606a;display:flex;justify-content:space-between;align-items:center}
  .focus-head-label{font-size:10px;letter-spacing:.11em;text-transform:uppercase;color:#b8c8c3}
  .focus-head button{background:transparent;border:0;color:#a9c0bd;cursor:pointer}
  .focus-content{padding:28px 28px 24px}
  .focus-priority{color:#e0bd7b;text-transform:uppercase;letter-spacing:.15em;font-size:10px;font-weight:800}
  .focus-title{font-family:Georgia,serif;font-size:29px;line-height:1.14;font-weight:400;letter-spacing:-.04em;margin:13px 0 11px}
  .focus-company{font-size:11px;color:#aec0bf}
  .focus-detail{font-size:13px;line-height:1.65;color:#d4dfda;margin:26px 0 24px;max-width:540px}
  .focus-data{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #35606a;border-bottom:1px solid #35606a;padding:15px 0;margin-bottom:24px}
  .focus-data div+div{border-left:1px solid #35606a;padding-left:15px}
  .focus-data label{font-size:9px;color:#91aaa8;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:6px}
  .focus-data strong{font-size:12px;color:#f0d29a}
  .source-line{display:flex;gap:8px;align-items:center;font-size:10px;color:#9db4b2;margin-bottom:25px}
  .focus-actions{display:flex;gap:8px}
  .approve-button{background:#d7b16f;color:#173842;border:0;padding:12px 15px;font-size:11px;font-weight:800;border-radius:3px;cursor:pointer}
  .approve-button:hover{background:#e4c484}
  .snooze-button{background:transparent;color:#d4e1dc;border:1px solid #54747a;padding:11px 14px;font-size:11px;border-radius:3px;cursor:pointer}
  .snooze-button:hover{background:#1b4a57}
  .pulse-panel{background:transparent;border:0}
  .pulse-title{font-family:Georgia,serif;font-size:18px;margin:0}
  .pulse-panel .panel-head{padding:0 0 14px;border-color:#d6d8d1}
  .pulse-block{padding:17px 0;border-bottom:1px solid #d6d8d1}
  .pulse-block:last-child{border:0}
  .pulse-label{font-size:10px;color:#7d8b8c;margin-bottom:8px}
  .pulse-value{font-size:23px;font-weight:650;color:#163e4a}
  .pulse-note{font-size:10px;color:#77878a;line-height:1.45;margin-top:5px}
  .delta{font-size:10px;color:#4e8a72;margin-left:7px}
  .progress{height:4px;background:#dce0d9;margin-top:11px}.progress i{display:block;height:100%;background:#c89f59}
  .briefing-strip{margin-top:25px;border-top:1px solid #d6d8d1;padding-top:16px;display:flex;gap:24px;align-items:center;font-size:11px;color:#728285}
  .briefing-strip strong{color:#173d48}.strip-item{display:flex;gap:7px;align-items:center}
  @media(max-width:1050px){.brief-grid{grid-template-columns:1fr 1fr}.pulse-panel{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;gap:20px}.pulse-panel .panel-head{grid-column:span 2}.desk-main{padding:28px}.desk-rail{width:190px}.desk-body{grid-template-columns:190px 1fr}}
  @media(max-width:760px){.desk-top{height:62px;padding:0 17px}.desk-top-right span{display:none}.desk-body{display:block}.desk-rail{display:none}.desk-main{padding:24px 16px 48px}.desk-heading{display:block}.heading-actions{margin-top:18px}.brief-grid{display:block}.inbox-panel,.focus-panel,.pulse-panel{margin-bottom:16px}.focus-panel{min-height:0}.pulse-panel{display:block}.pulse-panel .panel-head{display:flex}.briefing-strip{display:grid;grid-template-columns:1fr 1fr;gap:12px}.desk-title{font-size:30px}}
`;

export function PresidentBriefingDesk() {
  const [selectedId, setSelectedId] = useState(1);
  const [queue, setQueue] = useState<"All" | "Now" | "Soon">("All");
  const [resolved, setResolved] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const selected = decisions.find((item) => item.id === selectedId) ?? decisions[0];
  const visible = decisions.filter((item) => !resolved.includes(item.id) && (queue === "All" || item.priority === queue));

  const resolve = () => {
    setResolved((items) => [...items, selected.id]);
    setNotice("Decision recorded — the owner has been notified.");
    const next = decisions.find((item) => item.id !== selected.id && !resolved.includes(item.id));
    if (next) setSelectedId(next.id);
  };

  return (
    <div className="briefing-desk">
      <style>{styles}</style>
      <header className="desk-top">
        <div className="desk-brand"><span className="desk-mark">P</span> pulse.ai <span style={{ color: "#839da0", fontWeight: 400, fontSize: 11 }}>/ decision desk</span></div>
        <div className="desk-top-right"><span>Tuesday, 18 June 2024 · 08:42 AST</span><button aria-label="Notifications"><Bell size={16} /></button><span className="desk-avatar">JJ</span></div>
      </header>
      <div className="desk-body">
        <aside className="desk-rail">
          <div className="rail-kicker">Enterprise command</div>
          <button className="rail-link active"><Inbox size={15} /> Decision desk <span className="rail-count">{decisions.length - resolved.length}</span></button>
          <button className="rail-link"><Sparkles size={15} /> Signal room</button>
          <button className="rail-link"><ArrowUpRight size={15} /> Performance</button>
          <button className="rail-link"><FileText size={15} /> Board materials</button>
          <button className="rail-link"><ShieldCheck size={15} /> Access &amp; audit</button>
          <div className="rail-footer">Data refreshed<br /><strong style={{ color: "#46656b" }}>Today, 08:42 AST</strong><br /><br />SSO · Executive access</div>
        </aside>
        <main className="desk-main">
          <div className="desk-heading">
            <div><div className="desk-overline">Morning brief · 04 decisions in motion</div><h1 className="desk-title">Good morning, Mr. Jasim.</h1><div className="desk-subtitle">A short list of the choices that change the day — with the evidence beside them.</div></div>
            <div className="heading-actions"><button className="outline-button"><Filter size={13} /> Filter</button><button className="outline-button"><Search size={13} /> Search</button></div>
          </div>
          <div className="brief-grid">
            <section className="inbox-panel">
              <div className="panel-head"><h2>Decision queue</h2><span>{visible.length} open</span></div>
              <div className="queue-tabs">{(["All", "Now", "Soon"] as const).map((tab) => <button key={tab} onClick={() => setQueue(tab)} className={`queue-tab ${queue === tab ? "active" : ""}`}>{tab}</button>)}</div>
              {visible.length === 0 ? <div style={{ padding: 28, fontSize: 12, color: "#748386" }}>All clear for this view.</div> : visible.map((item) => <div key={item.id} className={`queue-item ${selectedId === item.id ? "selected" : ""}`} onClick={() => { setSelectedId(item.id); setNotice(""); }}><div className="queue-top"><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span><span className="queue-time"><Clock3 size={11} /> {item.due}</span></div><div className="queue-title">{item.title}</div><div className="queue-company">{item.company} · {item.amount}</div></div>)}
            </section>
            <section className="focus-panel">
              <div className="focus-head"><span className="focus-head-label">Focused decision</span><button aria-label="Close decision" onClick={() => setNotice("Choose a decision from the queue.")}><X size={16} /></button></div>
              <div className="focus-content"><div className="focus-priority">{selected.priority} · needs your call</div><h2 className="focus-title">{selected.title}</h2><div className="focus-company">{selected.company} · Owner {selected.owner}</div><p className="focus-detail">{selected.detail}</p><div className="focus-data"><div><label>Decision value</label><strong>{selected.amount}</strong></div><div><label>Requested by</label><strong>{selected.owner}</strong></div><div><label>Due</label><strong>{selected.due.split(" · ")[0]}</strong></div></div><div className="source-line"><FileText size={13} /> 6 source documents · confidence 91% <ChevronRight size={12} /></div><div className="focus-actions"><button className="approve-button" onClick={resolve}><Check size={13} style={{ verticalAlign: "middle", marginRight: 6 }} />Approve &amp; notify</button><button className="snooze-button" onClick={() => setNotice("Snoozed until tomorrow morning.")}>Snooze</button></div>{notice && <div style={{ marginTop: 18, color: "#e1c27f", fontSize: 11 }}>{notice}</div>}</div>
            </section>
            <aside className="pulse-panel">
              <div className="panel-head"><h2 className="pulse-title">The pulse</h2><ChevronDown size={15} color="#7e8b8c" /></div>
              <div className="pulse-block"><div className="pulse-label">Group revenue · YTD</div><div className="pulse-value">QAR 18.4B <span className="delta">↑ 8.7%</span></div><div className="pulse-note">Against plan across 7 operating groups</div><div className="progress"><i style={{ width: "78%" }} /></div></div>
              <div className="pulse-block"><div className="pulse-label">Execution confidence</div><div className="pulse-value">86.3%</div><div className="pulse-note">Up 2.1 pts since last Monday</div><div className="progress"><i style={{ width: "86%" }} /></div></div>
              <div className="pulse-block"><div className="pulse-label">Ask Pulse</div><div className="pulse-note" style={{ color: "#173f4b", fontSize: 12 }}>“What should I know before the board call?”</div><button className="outline-button" style={{ marginTop: 12 }} onClick={() => setNotice("Briefing prepared from 24 cited signals.")}><MessageSquare size={13} /> Prepare brief</button></div>
            </aside>
          </div>
          <div className="briefing-strip"><span className="strip-item"><Flag size={13} color="#b1843d" /><strong>2 items</strong> need a decision today</span><span className="strip-item"><Check size={13} color="#4e8a72" /><strong>{resolved.length} resolved</strong> this session</span><span className="strip-item"><FileText size={13} /> Evidence synced from 24 sources</span></div>
        </main>
      </div>
    </div>
  );
}

export default PresidentBriefingDesk;