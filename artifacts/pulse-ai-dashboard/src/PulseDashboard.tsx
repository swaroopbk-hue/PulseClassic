import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Moon, Send, Sparkles, Sun, Plus, Eye, Folder, LayoutGrid, Link as LinkIcon, Brain, Box, Settings, Menu, X, ArrowUp, LayoutTemplate, Layout, Smartphone, Table, BarChart3, Telescope, BarChart2, Globe, DollarSign, ShieldCheck, Users, Truck, PenTool, AlertTriangle, Briefcase, Monitor, ChevronDown } from "lucide-react";
import darkPulseLogo from "@assets/image_1789651667740.png";
import "./pulse.css";
import "./pulse-overrides.css";
import { DecisionsWorkspace } from "./DecisionsWorkspace";

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
  { type: "Approval", title: "Release infrastructure capital", description: "Phase two capital release for the Lusail infrastructure program.", action: "Review request", meta: "12 min ago", tone: "approval", sourcePlatform: "SAP S/4HANA", isPriority: true, dueDate: "Due today", status: "Awaiting executive approval", requester: "Khalid Al-Mahmoud", value: "QAR 42M" },
  { type: "Risk", title: "Hospitality occupancy gap", description: "Forward bookings are projected 4.2% below the seasonal plan.", action: "Review risk", meta: "38 min ago", tone: "risk", sourcePlatform: "Signature.ai", isPriority: true, dueDate: "Due tomorrow", status: "Executive review pending", requester: "Sarah Jenkins", value: "QAR 8.5M at risk" },
  { type: "Approval", title: "Review new contract award", description: "Commercial sign-off for the new Al Rayyan facilities contract.", action: "Review request", meta: "1 hr ago", tone: "approval", sourcePlatform: "SAP S/4HANA", isPriority: false, dueDate: "Due Thursday", status: "Awaiting final sign-off", requester: "Ahmed Hassan", value: "QAR 18M" },
  { type: "Signal", title: "Baladna forecast outperformance", description: "Performance is tracking 11.0% above the current YTD forecast.", action: "Open insight", meta: "2 hrs ago", tone: "signal", sourcePlatform: "Signature.ai", isPriority: false, dueDate: "No action required", status: "Ready for executive review", requester: "Pulse.ai", value: "+11.0% YTD" },
] as const;
const insightSlides = [
  { group: "UCC", value: "92%", title: "Occupancy momentum is holding above plan.", body: "Leisure demand and ADR are carrying the group through the summer booking curve.", note: "QAR 38M upside identified in the latest operating review.", tone: "blue", performance: "positive" },
  { group: "Assets", value: "88%", title: "Assets Group is 12 points behind its YTD target.", body: "Hospitality occupancy is down 4.2 pts and retail footfall has fallen 71%, while commercial leasing revenue is QAR 12M short of plan. Current trajectory points to roughly QAR 38M of annual revenue exposure if it continues.", note: "", tone: "coral", performance: "negative" },
  { group: "Estithmar Aviation Services", value: "106%", title: "Estithmar Aviation Services is running 6 points ahead of plan.", body: "Aviation ground-services growth and new facilities-management contracts have lifted the group a point ahead of its YTD target. A QAR 18.4M capacity-expansion request for aviation ground services is awaiting your approval.", note: "", tone: "blue", performance: "positive" },
  { group: "UCC", value: "QAR 61M", title: "UCC won QAR 61M in new contract awards this month.", body: "New contracting wins and QAR 22M in procurement savings are offsetting QAR 14M in schedule delays across two sites, keeping UCC on track at 96% of its YTD target. Full-year forecast has been raised to QAR 6.0B.", note: "", tone: "mint", performance: "positive" },
  { group: "Baladna", value: "111%", title: "Baladna is outperforming its YTD target by 11.4%.", body: "Domestic sales grew sharply and export volumes rose 18% year over year, keeping Baladna ahead of every other business group this quarter. Operating margin slipped 3.1 pts on feed costs — worth watching even as revenue outperforms.", note: "", tone: "violet", performance: "positive" },
];

const businessInsightSlides = [
  { group: "UCC Infrastructure", value: "98%", title: "Infrastructure is close to target.", body: "UCC Infrastructure is reporting QAR 2.42B and is currently at 98% of target.", note: "On track", tone: "blue", performance: "positive" },
  { group: "UCC Contracting", value: "96%", title: "Contracting remains on track.", body: "UCC Contracting is reporting QAR 1.87B and is currently at 96% of target.", note: "On track", tone: "mint", performance: "positive" },
  { group: "UCC Hospitality", value: "89%", title: "Hospitality requires attention.", body: "UCC Hospitality is reporting QAR 0.93B and is currently at 89% of target.", note: "Watch", tone: "coral", performance: "negative" },
  { group: "UCC Services", value: "103%", title: "Services is ahead of plan.", body: "UCC Services is reporting QAR 0.60B and is currently at 103% of target.", note: "Ahead of plan", tone: "violet", performance: "positive" },
];

function InsightPageContent({ slide }: { slide: (typeof insightSlides)[number] }) {
  return (
    <div className={`insight-page-content performance-${slide.performance}`}>
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

const pulseAgents = [
  { id: 1, name: "Data Analyst", desc: "Query performance data", icon: BarChart2 },
  { id: 2, name: "Market Researcher", desc: "Track competitor trends", icon: Globe },
  { id: 3, name: "Financial Planner", desc: "Forecast budgeting", icon: DollarSign },
  { id: 4, name: "Compliance Bot", desc: "Policy checks", icon: ShieldCheck },
  { id: 5, name: "HR Assistant", desc: "Team sentiment", icon: Users },
  { id: 6, name: "Operations", desc: "Supply chain alerts", icon: Truck },
  { id: 7, name: "Creative Writer", desc: "Draft comms", icon: PenTool },
  { id: 8, name: "Risk Manager", desc: "Identify exposure", icon: AlertTriangle },
  { id: 9, name: "Legal Counsel", desc: "Contract summaries", icon: Briefcase },
  { id: 10, name: "IT Support", desc: "System diagnostics", icon: Monitor },
];

function LandingAgentMarquee({ onNotify }: { onNotify: (msg: string) => void }) {
  return (
    <section className="marquee-container landing-agent-marquee" aria-label="Glance agents">
      <div className="marquee-track">
        {[...pulseAgents, ...pulseAgents].map((agent, index) => (
          <button type="button" key={`${agent.id}-${index}`} className="marquee-card" onClick={() => onNotify(`${agent.name} selected`)}>
            <div className="marquee-icon">
              <agent.icon size={16} />
            </div>
            <div className="marquee-info">
              <strong>{agent.name}</strong>
              <span>{agent.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function AskPulseView({ onNotify }: { onNotify: (msg: string) => void }) {
  const [askPrompt, setAskPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const placeholders = [
    "Hi Boss, how can I help you today?",
    "Draft a project update for the team...",
    "Analyze the latest Baladna forecast...",
    "Create a new visualization dashboard..."
  ];

  useEffect(() => {
    let fadeTimer: number | undefined;
    const interval = setInterval(() => {
      setIsFading(true);
      fadeTimer = window.setTimeout(() => {
        setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
        setIsFading(false);
      }, 300);
    }, 4000);
    return () => {
      clearInterval(interval);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askPrompt.trim()) {
      onNotify("Prompt submitted");
      setAskPrompt("");
    }
  };

  const suggestions = [
    { label: "Create slides", icon: LayoutTemplate },
    { label: "Build website", icon: Layout },
    { label: "Develop apps", icon: Smartphone },
    { label: "Spreadsheet", icon: Table },
    { label: "Visualization", icon: BarChart3 },
    { label: "Wide Research", icon: Telescope },
    { label: "Pulse suggested", icon: Sparkles },
  ];

  return (
    <div className="ask-pulse-view fade-in">
      <div className="ask-pulse-container">
        <h1 className="ask-pulse-heading">Let's knock something off your list</h1>
        
        <form className="ask-pulse-form" onSubmit={handleSubmit}>
          <div className="ask-pulse-input-wrap">
            <div className="ask-pulse-input-inner">
              {!askPrompt && (
                <div className={`ask-pulse-placeholder ${isFading ? 'fading' : ''}`}>
                  {placeholders[placeholderIndex]}
                </div>
              )}
              <input 
                value={askPrompt}
                onChange={e => setAskPrompt(e.target.value)}
                aria-label="Ask Pulse input"
              />
            </div>
            <div className="ask-pulse-input-footer">
              <button type="button" className="ask-pulse-attach" onClick={() => onNotify("Attach file")} aria-label="Attach file">
                <Plus size={16} />
              </button>
              <div className="ask-pulse-actions">
                <button type="button" className="ask-pulse-model" onClick={() => onNotify("Model selected")}>
                  <Sparkles size={14} /> Pulse GPT 5.6 Terra <ChevronDown size={14} />
                </button>
                <button type="submit" className="ask-pulse-submit" aria-label="Submit prompt">
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="ask-pulse-project">
          <button onClick={() => onNotify("Project selected")}>
            <Folder size={14} /> Work in a project <ChevronDown size={14} />
          </button>
        </div>

        <div className="ask-pulse-suggestions">
          {suggestions.map(s => (
            <button type="button" key={s.label} className="ask-pulse-chip" onClick={() => onNotify(`${s.label} template selected`)}>
              <s.icon size={14} /> {s.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="ask-pulse-agents">
        <h3>Our Agents</h3>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...pulseAgents, ...pulseAgents].map((agent, index) => (
              <button type="button" key={`${agent.id}-${index}`} className="marquee-card" onClick={() => onNotify(`${agent.name} selected`)}>
                <div className="marquee-icon">
                  <agent.icon size={16} />
                </div>
                <div className="marquee-info">
                  <strong>{agent.name}</strong>
                  <span>{agent.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
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

const businessUnitPerformance = [
  { name: "UCC Infrastructure", short: "UCC Infrastructure", value: "2.42B", change: "98% of target", direction: "up", height: 100, budget: "98%", forecast: "On track", lastYear: "—" },
  { name: "UCC Contracting", short: "UCC Contracting", value: "1.87B", change: "96% of target", direction: "up", height: 77, budget: "96%", forecast: "On track", lastYear: "—" },
  { name: "UCC Hospitality", short: "UCC Hospitality", value: "0.93B", change: "89% of target", direction: "down", height: 38, budget: "89%", forecast: "Watch", lastYear: "—" },
  { name: "UCC Services", short: "UCC Services", value: "0.60B", change: "103% of target", direction: "up", height: 25, budget: "103%", forecast: "Ahead of plan", lastYear: "—" },
];

const recentTasks = [
  { id: 1, label: "give me top materials we have", time: "5m ago" },
  { id: 2, label: "can you search recent PIH announcements", time: "Sep 8" },
  { id: 3, label: "@itsd check my open IT support tickets", time: "Sep 8" },
  { id: 4, label: "can you show me the last document", time: "Sep 8" },
];

export function PulseReference3DDark() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme");
    if (requestedTheme === "light" || requestedTheme === "dark") return requestedTheme;
    return window.matchMedia("(max-width: 640px)").matches ? "dark" : "light";
  });
  const [profile, setProfile] = useState(false);
  const [edition, setEdition] = useState<"executive" | "business">(() =>
    new URLSearchParams(window.location.search).get("edition") === "business" ? "business" : "executive"
  );
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
  const [groupView, setGroupView] = useState<"bars" | "orbit">(() =>
    new URLSearchParams(window.location.search).get("groupView") === "orbit" ? "orbit" : "bars"
  );
  const [decisionIndex, setDecisionIndex] = useState(0);
  const enterprise = enterprisePerformance[period];
  const isBusinessEdition = edition === "business";
  const activeInsightSlides = isBusinessEdition ? businessInsightSlides : insightSlides;
  const groupPerformance = isBusinessEdition ? businessUnitPerformance : groupPerformanceByPeriod[period];
  const highestRevenueHeight = Math.max(...groupPerformance.map(group => group.height));
  const lowestRevenueHeight = Math.min(...groupPerformance.map(group => group.height));

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
    }, 820);
  }, [insightIndex]);

  useEffect(() => {
    const autoplayTimer = window.setTimeout(() => {
      turnInsightPage((insightIndex + 1) % activeInsightSlides.length, "forward");
    }, 8000);

    return () => window.clearTimeout(autoplayTimer);
  }, [activeInsightSlides.length, insightIndex, turnInsightPage]);

  useEffect(() => {
    setInsightIndex(0);
    setInsightTransition(null);
    insightAnimatingRef.current = false;
    setGroupIndex(0);
  }, [edition]);

  useEffect(() => () => {
    if (insightTransitionTimerRef.current !== null) {
      window.clearTimeout(insightTransitionTimerRef.current);
    }
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPreferenceCollapsed, setSidebarPreferenceCollapsed] = useState(false);
  const [decisionSidebarExpanded, setDecisionSidebarExpanded] = useState(false);
  const [activeNav, setActiveNav] = useState(() => {
    const requestedView = new URLSearchParams(window.location.search).get("view");
    return requestedView === "decisions" || requestedView === "ask-pulse" ? requestedView : "glance";
  });
  const desktopSidebarCollapsed = activeNav === "decisions"
    ? !decisionSidebarExpanded
    : sidebarPreferenceCollapsed;
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const sidebarWasOpenRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveNav("ask-pulse");
        setSidebarOpen(false);
        notify("Ask Pulse opened");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => mobileMenuCloseRef.current?.focus());
      sidebarWasOpenRef.current = true;
    } else {
      document.body.style.overflow = "";
      if (sidebarWasOpenRef.current) {
        mobileMenuButtonRef.current?.focus();
        sidebarWasOpenRef.current = false;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeNav === "decisions") {
      url.searchParams.set("view", "decisions");
    } else {
      url.searchParams.delete("view");
    }
    if (edition === "business") {
      url.searchParams.set("edition", "business");
    } else {
      url.searchParams.delete("edition");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [activeNav, edition]);

  useEffect(() => {
    if (activeNav === "decisions") {
      setDecisionSidebarExpanded(false);
    }
  }, [activeNav]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    notify(`${next === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const askGroup = () => {
    if (!groupQuestion.trim()) return;
    notify("Group performance analysis ready");
  };

  const navItems = [
    { id: 'glance', label: 'Glance', icon: Eye },
    { id: 'projects', label: 'Projects', icon: Folder, count: 2 },
    { id: 'tasks', label: 'Scheduled Tasks', icon: Clock },
    { id: 'dashboards', label: 'Dashboards', icon: LayoutGrid, count: 5 },
    { id: 'artifacts', label: 'Live Artifacts', icon: Sparkles, count: 4 },
    { id: 'apps', label: 'Connected Apps & Data', icon: LinkIcon, count: 5 },
  ];

  const agentItems = [
    { id: 'memories', label: 'Memories', icon: Brain },
    { id: 'skills', label: 'Skills library', icon: Box },
  ];

  const SidebarContent = () => (
    <div className="exe-sidebar-inner">
      <div className="exe-sidebar-top">
        <button
          type="button"
          className={`exe-sidebar-ask ${activeNav === 'ask-pulse' ? 'active' : ''}`}
          aria-current={activeNav === "ask-pulse" ? "page" : undefined}
          onClick={() => { setActiveNav("ask-pulse"); setSidebarOpen(false); notify("Ask Pulse opened"); }}
        >
          <div className="ask-left"><Plus size={15} /> Ask Pulse</div>
          <kbd className="ask-kbd">⌘K</kbd>
        </button>

        <nav className="exe-sidebar-menu">
          {navItems.map(item => (
            <button 
              type="button"
              key={item.id} 
              className={`exe-sidebar-item ${item.id === "apps" ? "is-long-label" : ""} ${activeNav === item.id ? 'active' : ''}`}
              aria-current={activeNav === item.id ? "page" : undefined}
              onClick={() => {
                setActiveNav(item.id);
                setSidebarOpen(false);
              }}
            >
              <div className="item-left"><item.icon size={15} style={{ flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span></div>
              {item.count && <span className="item-count">{item.count}</span>}
            </button>
          ))}
        </nav>

        <div className="exe-sidebar-section">
          <div className="exe-sidebar-label">AGENT</div>
          <nav className="exe-sidebar-menu">
            {agentItems.map(item => (
              <button 
                type="button"
                key={item.id} 
                className={`exe-sidebar-item ${activeNav === item.id ? 'active' : ''}`}
                aria-current={activeNav === item.id ? "page" : undefined}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
              >
                <div className="item-left"><item.icon size={15} style={{ flexShrink: 0 }} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span></div>
              </button>
            ))}
          </nav>
        </div>

        {activeNav === 'ask-pulse' && (
          <div className="exe-sidebar-section animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="exe-sidebar-label">RECENT TASKS</div>
            <nav className="exe-sidebar-menu">
              {recentTasks.map(task => (
                <button 
                  type="button"
                  key={task.id} 
                  className="exe-sidebar-item task-item"
                  onClick={() => {
                    notify(`Task opened: ${task.label}`);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="task-label">{task.label}</span>
                  <span className="task-time">{task.time}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className="exe-sidebar-bottom">
        <button 
          type="button"
          className={`exe-sidebar-item ${activeNav === 'settings' ? 'active' : ''}`}
          aria-current={activeNav === "settings" ? "page" : undefined}
          onClick={() => {
            setActiveNav('settings');
            setSidebarOpen(false);
          }}
        >
          <div className="item-left"><Settings size={15} /> <span>Settings</span></div>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`pulse-ref3d ${theme}`} data-testid="pulse-dashboard">
      <header className="exe-header">
        <div className="exe-logo-area">
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="exe-mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            aria-controls="pulse-mobile-navigation"
          >
            <Menu size={20} />
          </button>
          <img
            src={theme === "dark" ? darkPulseLogo : "/images/pulse-ai-official.png"}
            alt="Pulse.ai"
            className="exe-logo"
          />
           <span className="exe-edition">{edition === "business" ? "BUSINESS EDITION" : "EXECUTIVE EDITION"}</span>
        </div>
        <div className="exe-header-actions">
          <button
            type="button"
            className="edition-switch-button"
            onClick={() => {
              setEdition(current => current === "executive" ? "business" : "executive");
              setActiveNav("glance");
              setSidebarOpen(false);
              notify(`${edition === "executive" ? "Business" : "Executive"} Edition opened`);
            }}
          >
            {edition === "executive" ? "Business" : "Executive"}
          </button>
          <div className="exe-refresh">
            <Clock size={13} /> <span>Refreshed 08:42 AST</span>
          </div>
          <button data-testid="button-theme-toggle" className="exe-icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button data-testid="button-account" className="exe-avatar-btn" onClick={() => setProfile(!profile)} aria-label="Open account">{isBusinessEdition ? "BM" : "JJ"}</button>
        </div>
      </header>

      {profile && (
        <div className="profile-pop exe-profile-pop">
          <strong>{isBusinessEdition ? "Boyd Merrett" : "Mr. Jasim"}</strong>
          <span>{isBusinessEdition ? "UCC Business Edition" : "President"} &middot; Secure access</span>
          <button onClick={() => notify("Preferences opened")}>Profile &amp; preferences</button>
          <button onClick={() => setProfile(false)}>Close account menu</button>
        </div>
      )}

      <div className={`exe-layout ${desktopSidebarCollapsed ? "desktop-sidebar-collapsed" : ""}`}>
        <aside className={`exe-sidebar desktop-only ${desktopSidebarCollapsed ? "is-compact" : ""}`}>
          <SidebarContent />
          <button 
            type="button" 
            className="sidebar-collapse-trigger"
            onClick={() => {
              if (activeNav === "decisions") {
                setDecisionSidebarExpanded(desktopSidebarCollapsed);
              } else {
                setSidebarPreferenceCollapsed(!desktopSidebarCollapsed);
              }
            }}
            aria-label="Toggle sidebar"
            title={desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {desktopSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </aside>

        {sidebarOpen && (
          <div className="exe-sidebar-drawer">
            <div className="exe-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
            <aside
              id="pulse-mobile-navigation"
              className="exe-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Pulse navigation"
            >
              <div className="exe-sidebar-close">
                <button ref={mobileMenuCloseRef} type="button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation menu"><X size={20} /></button>
              </div>
              <SidebarContent />
            </aside>
          </div>
        )}

        <main className="exe-main">
        {activeNav === 'ask-pulse' ? (
          <AskPulseView onNotify={notify} />
        ) : activeNav === 'decisions' ? (
          <DecisionsWorkspace 
            onBack={() => setActiveNav('glance')} 
            initialIndex={decisionIndex} 
            onNotify={notify} 
          />
        ) : (
          <div className={`exe-content-wrapper ${isBusinessEdition ? "business-dashboard" : ""}`}>
            <div className="exe-masthead">
              <div className="masthead-top">
            <div className="masthead-meta">TUESDAY &middot; 18 JUNE 2024 / {isBusinessEdition ? "UCC BUSINESS VIEW" : "PIH CONSOLIDATED VIEW"}</div>
          </div>
          <div className="masthead-grid">
            <div className="masthead-content">
              <h1 className="masthead-headline">
                Good Morning, {isBusinessEdition ? "Boyd Merrett" : "Jasim"}
              </h1>
              <p className="masthead-subhead">
                {isBusinessEdition ? (
                  <>UCC Infrastructure leads at <strong>QAR 2.42B</strong> and is on track at 98% of target. UCC Services is ahead of plan at 103%, while UCC Hospitality is the current watch item at 89% of target.</>
                ) : (
                  <>Revenue is tracking at <strong>QAR {enterprise.revenue}{enterprise.revenueUnit.startsWith("B") ? "B" : ""}</strong>, {enterprise.achieved - enterprise.elapsed} pts ahead of time elapsed. Baladna and Estithmar are creating the lift; Assets is the one position that merits a decision before noon.</>
                )}
              </p>
            </div>
            <section className="insight-card masthead-insight" aria-label="Pulse Insights carousel">
              <div className="insight-track">
                {activeInsightSlides.map((slide, index) => {
                  const isRestingPage = !insightTransition && index === insightIndex;
                  const isOutgoingPage = insightTransition?.from === index;
                  const isIncomingPage = insightTransition?.to === index;
                  const transitionDirection = isOutgoingPage ? insightTransition.direction : "";
                  const reverseSideSlide = isOutgoingPage && insightTransition
                    ? activeInsightSlides[insightTransition.to]
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
                {activeInsightSlides.map((slide, index) => (
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

        <section className="exe-metrics-section" aria-label={isBusinessEdition ? "UCC at a Glance" : "Enterprise position"}>
          <div className="exe-section-header">
            <h2><span>01</span> {isBusinessEdition ? "UCC at a Glance" : "Enterprise position"}</h2>
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
               <div className="metric-sub positive">{enterprise.revenueDetail}</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">EBITDA / profit</span>
               <div className="metric-value-large">{enterprise.ebitda}</div>
               <div className="metric-sub positive">{enterprise.ebitdaDetail}</div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Budget achievement</span>
               <div className="metric-value-large">{enterprise.budgetAchievement}</div>
               <div className="metric-sub negative">{enterprise.budgetDetail} <span className="dim">{enterprise.budgetPlan}</span></div>
            </div>
            <div className="metric-cell">
               <span className="metric-label">Full-year forecast</span>
               <div className="metric-value-large">{enterprise.forecast}</div>
               <div className="metric-sub positive">{enterprise.forecastDetail}</div>
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
                <div className="metric-sub positive">{enterprise.pace}</div>
            </div>
          </div>
        </section>

        <div className="exe-content">
          <div className="exe-section-header group-header-adjustment">
            <h2><span>02</span> {isBusinessEdition ? "Companies and Business Units" : "Seven businesses, one connected pulse"}</h2>
            <div className="exe-section-line"></div>
          </div>

          <section className={`group-performance period-${period.toLowerCase()} ${isBusinessEdition ? "business-group-performance" : ""} ${groupChatOpen ? "chat-open" : "chat-collapsed"}`} aria-label={isBusinessEdition ? "UCC companies and business units performance" : "Enterprise group performance"}>
            <div className="group-performance-head">
               <div>
                <h2>{isBusinessEdition ? "UCC Performance" : "Group Performance"}</h2>
                 <p>{isBusinessEdition ? `${period} performance across UCC companies and business units` : `${period} revenue movement across the enterprise portfolio`}</p>
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
                    <small>{isBusinessEdition ? <>UCC<br />PERFORMANCE</> : <>CONSOLIDATED<br />REVENUE</>}</small>
                   <div className="orbit-core-value">
                      {isBusinessEdition ? <span>UCC</span> : <><span>{enterprise.revenue}</span><sub>{enterprise.revenueUnit}</sub></>}
                   </div>
                   <div className="orbit-core-trend">
                      {isBusinessEdition ? "Companies & business units" : period === "YTD" ? "↗ 8.2% YoY" : period === "MTD" ? "↗ 6.1% MTD" : "↗ 3.1% today"}
                   </div>
                 </div>
                 {groupPerformance.map((group, index) => {
                    const isNegative = isBusinessEdition ? group.direction === "down" : group.height === lowestRevenueHeight;
                    const isHighestPositive = isBusinessEdition ? group.forecast === "Ahead of plan" : group.height === highestRevenueHeight;
                    const previousIndex = (groupIndex - 1 + groupPerformance.length) % groupPerformance.length;
                    const nextIndex = (groupIndex + 1) % groupPerformance.length;
                    const mobilePosition = index === groupIndex
                      ? "orbit-node-current"
                      : index === previousIndex
                        ? "orbit-node-previous"
                        : index === nextIndex
                          ? "orbit-node-next"
                          : "orbit-node-hidden";
                   return (
                     <button
                       data-testid={`button-orbit-node-${group.short.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`orbit-node orbit-node-${index} ${mobilePosition} ${isNegative ? 'negative' : ''} ${isHighestPositive ? 'highest-positive' : ''}`}
                       key={group.name}
                       onMouseEnter={() => setGroupIndex(index)}
                       onFocus={() => setGroupIndex(index)}
                        onClick={() => {
                          setGroupIndex(index);
                          notify(`${group.name} selected`);
                        }}
                        aria-pressed={groupIndex === index}
                     >
                       <span className="orbit-node-name">{group.name}</span>
                       <strong className="orbit-node-value">QAR {group.value}</strong>
                       <div className="orbit-node-trend">
                          <span className="trend-indicator">{isNegative ? '↘' : (group.direction === "up" ? '↗' : '→')}</span> {group.change}{isBusinessEdition ? "" : " YoY"}
                       </div>
                     </button>
                   );
                 })}
                  <div className="orbit-mobile-navigation" aria-label="Orbit business navigation">
                    <button
                      className="orbit-mobile-arrow"
                      type="button"
                      aria-label="Previous business"
                      onClick={() => setGroupIndex((groupIndex - 1 + groupPerformance.length) % groupPerformance.length)}
                    >
                      ‹
                    </button>
                    <div className="orbit-mobile-dots" role="tablist" aria-label="Businesses">
                      {groupPerformance.map((group, index) => (
                        <button
                          type="button"
                          role="tab"
                          aria-label={`Show ${group.name}`}
                          aria-selected={groupIndex === index}
                          className={groupIndex === index ? "active" : ""}
                          key={group.name}
                          onClick={() => setGroupIndex(index)}
                        />
                      ))}
                    </div>
                    <button
                      className="orbit-mobile-arrow"
                      type="button"
                      aria-label="Next business"
                      onClick={() => setGroupIndex((groupIndex + 1) % groupPerformance.length)}
                    >
                      ›
                    </button>
                  </div>
               </div>
             ) : (
             <div className="group-chart">
              <div className="group-columns">
                {groupPerformance.map((group, index) => (
                  <div
                    className={`group-column ${
                      (isBusinessEdition ? group.forecast === "Ahead of plan" : group.height === highestRevenueHeight)
                        ? "highest-revenue"
                        : (isBusinessEdition ? group.direction === "down" : group.height === lowestRevenueHeight)
                          ? "lowest-revenue"
                          : ""
                     } ${groupIndex === index ? "is-selected" : ""}`}
                    key={group.name}
                     role="button"
                     tabIndex={0}
                     aria-label={`${group.name}: ${group.value}, ${group.change}`}
                     aria-pressed={groupIndex === index}
                    onMouseEnter={() => {
                      setGroupIndex(index);
                      setHoveredGroup(index);
                    }}
                    onMouseLeave={() => setHoveredGroup(null)}
                     onFocus={() => setGroupIndex(index)}
                     onClick={() => setGroupIndex(index)}
                     onKeyDown={(event) => {
                       if (event.key === "Enter" || event.key === " ") {
                         event.preventDefault();
                         setGroupIndex(index);
                       }
                     }}
                  >
                    <span className="group-column-name">{group.short}</span>
                     <div className="group-value-row">
                        <strong>{isBusinessEdition ? "QAR " : ""}{group.value}</strong>
                        <span className={`group-change ${group.direction}`}>{group.direction === "up" ? "↑" : group.direction === "down" ? "↓" : "→"} {group.change}</span>
                     </div>
                     <span className="group-bar-wrap">
                       <i style={{ "--group-revenue-size": `${group.height}%` } as CSSProperties} />
                     </span>
                    {hoveredGroup === index && (
                      <div className="group-hover-tooltip" role="status">
                        <span>{isBusinessEdition ? "Target" : "Budget"}: <strong>{group.budget}</strong></span>
                        <i />
                        <span>{isBusinessEdition ? "Status" : "Forecast"}: <strong>{group.forecast}</strong></span>
                        {!isBusinessEdition && <><i /><span>LY: <strong>{group.lastYear}</strong></span></>}
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
                <span>{groupChatOpen ? (isBusinessEdition ? "Would you like to explore UCC revenue, target, or status?" : "Would you like to explore revenue, budget, or last year comparison?") : `Ask Pulse about ${isBusinessEdition ? "UCC" : "group"} performance`}</span>
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
             <section className="ref-card stat-card decisions-card" aria-label="Executive decisions">
               <div className="card-head decisions-head">
                 <div><h2>Decisions</h2><span>{decisions.length} items</span></div>
                 <button className="decisions-view-all" onClick={() => { setDecisionIndex(0); setActiveNav('decisions'); }}>View All</button>
               </div>
               <div className="decision-slider">
                 <button className="decision-arrow previous" onClick={() => setDecisionIndex((decisionIndex - 1 + decisions.length) % decisions.length)} aria-label="Previous decision"><ChevronLeft size={15} /></button>
                 <article className={`decision-slide ${decisions[decisionIndex].tone}`}>
                   <div className="decision-summary">
                     <div className="decision-summary-topline">
                       <span className={`decision-kind ${decisions[decisionIndex].tone}`}>{decisions[decisionIndex].type}</span>
                       <span className="decision-status">{decisions[decisionIndex].status}</span>
                     </div>
                     <h3>{decisions[decisionIndex].title}</h3>
                     <p>{decisions[decisionIndex].description}</p>
                     <div className="decision-summary-meta">
                       <span>{decisions[decisionIndex].sourcePlatform}</span>
                       {decisions[decisionIndex].isPriority && <strong>• Priority</strong>}
                       <span>{decisions[decisionIndex].dueDate}</span>
                     </div>
                     <div className="decision-summary-footer">
                       <span>{decisions[decisionIndex].requester} · {decisions[decisionIndex].meta}</span>
                       <strong>{decisions[decisionIndex].value}</strong>
                     </div>
                   </div>
                   <button onClick={() => { setActiveNav('decisions'); }}>{decisions[decisionIndex].action}</button>
                 </article>
                 <button className="decision-arrow next" onClick={() => setDecisionIndex((decisionIndex + 1) % decisions.length)} aria-label="Next decision"><ChevronRight size={15} /></button>
               </div>
               <div className="decision-pagination" aria-label={`Decision ${decisionIndex + 1} of ${decisions.length}`}>
                 <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
                 <i><b style={{ width: `${((decisionIndex + 1) / decisions.length) * 100}%` }} /></i>
                 <span>{String(decisions.length).padStart(2, "0")}</span>
               </div>
             </section>
          </div>

          <div className="exe-section-header agents-section-header">
            <h2><span>04</span> Our Agents</h2>
            <div className="exe-section-line"></div>
          </div>

          <LandingAgentMarquee onNotify={notify} />
        </div>
        </div>
        )}
      </main>
      </div>
      {activeNav !== "ask-pulse" && (
        <button
          type="button"
          className="ask-pulse-fab"
          onClick={() => {
            setActiveNav("ask-pulse");
            setSidebarOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
            notify("Ask Pulse opened");
          }}
          aria-label="Open Ask Pulse"
          title="Ask Pulse"
        >
          <span className="ask-pulse-fab-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default PulseReference3DDark;
