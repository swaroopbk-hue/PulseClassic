import type { KpiId } from "./KpiManager";

type Period = "Today" | "MTD" | "YTD";
type Enterprise = {
  revenue: string; revenueUnit: string; revenueDetail: string;
  ebitda: string; ebitdaDetail: string;
  budgetAchievement: string; budgetDetail: string; budgetPlan: string;
  forecast: string; forecastDetail: string;
  elapsed: number; achieved: number; pace: string;
};
type ExtraMetric = { value: string; detail: string; tone: "positive" | "negative" };

// Presentation fixtures, not live financial reporting. Replace with API results alongside the existing KPIs.
const extraMetrics: Record<Exclude<KpiId, "revenue" | "ebitda" | "budget" | "forecast" | "time">, Record<Period, ExtraMetric>> = {
  grossProfit: {
    Today: { value: "0.82B", detail: "34.2% gross margin", tone: "positive" },
    MTD: { value: "6.3B", detail: "34.2% gross margin", tone: "positive" },
    YTD: { value: "209B", detail: "34.2% gross margin", tone: "positive" },
  },
  operatingProfit: {
    Today: { value: "0.38B", detail: "15.8% operating margin", tone: "positive" },
    MTD: { value: "2.9B", detail: "15.8% operating margin", tone: "positive" },
    YTD: { value: "97B", detail: "15.8% operating margin", tone: "positive" },
  },
  netMargin: {
    Today: { value: "11.4%", detail: "+0.6 pts vs plan", tone: "positive" },
    MTD: { value: "11.7%", detail: "+0.9 pts vs plan", tone: "positive" },
    YTD: { value: "12.1%", detail: "+1.2 pts YoY", tone: "positive" },
  },
  revenueGrowth: {
    Today: { value: "+3.1%", detail: "vs daily plan", tone: "positive" },
    MTD: { value: "+8.2%", detail: "vs prior month", tone: "positive" },
    YTD: { value: "+8.2%", detail: "year over year", tone: "positive" },
  },
  ebitdaMargin: {
    Today: { value: "20.2%", detail: "+0.4 pts vs plan", tone: "positive" },
    MTD: { value: "20.4%", detail: "+0.6 pts vs plan", tone: "positive" },
    YTD: { value: "21.6%", detail: "+0.9 pts YoY", tone: "positive" },
  },
  cashFlow: {
    Today: { value: "0.31B", detail: "+2.1% vs plan", tone: "positive" },
    MTD: { value: "2.5B", detail: "+3.4% vs plan", tone: "positive" },
    YTD: { value: "84B", detail: "+5.2% YoY", tone: "positive" },
  },
  budgetVariance: {
    Today: { value: "−0.1B", detail: "below daily budget", tone: "negative" },
    MTD: { value: "−1.2B", detail: "below monthly budget", tone: "negative" },
    YTD: { value: "−26B", detail: "vs QAR 638B plan", tone: "negative" },
  },
  forecastAccuracy: {
    Today: { value: "96.8%", detail: "+0.8 pts vs prior period", tone: "positive" },
    MTD: { value: "97.1%", detail: "+1.1 pts vs prior period", tone: "positive" },
    YTD: { value: "97.4%", detail: "+1.4 pts vs prior year", tone: "positive" },
  },
  roi: {
    Today: { value: "13.1%", detail: "+0.3 pts vs plan", tone: "positive" },
    MTD: { value: "13.4%", detail: "+0.6 pts vs plan", tone: "positive" },
    YTD: { value: "14.2%", detail: "+1.2 pts YoY", tone: "positive" },
  },
  workingCapital: {
    Today: { value: "34.1B", detail: "+0.2B vs prior day", tone: "positive" },
    MTD: { value: "35.8B", detail: "+1.9B vs prior month", tone: "positive" },
    YTD: { value: "38.4B", detail: "+3.2B vs prior year", tone: "positive" },
  },
};

export function KpiMetric({ id, enterprise, period }: { id: KpiId; enterprise: Enterprise; period: Period }) {
  if (id === "revenue") return <div className="metric-cell"><span className="metric-label">Consolidated revenue</span><div className="metric-value-large">{enterprise.revenue}<span className="unit">{enterprise.revenueUnit}</span></div><div className="metric-sub positive">{enterprise.revenueDetail}</div></div>;
  if (id === "ebitda") return <div className="metric-cell"><span className="metric-label">EBITDA / profit</span><div className="metric-value-large">{enterprise.ebitda}</div><div className="metric-sub positive">{enterprise.ebitdaDetail}</div></div>;
  if (id === "budget") return <div className="metric-cell"><span className="metric-label">Budget achievement</span><div className="metric-value-large">{enterprise.budgetAchievement}</div><div className="metric-sub negative">{enterprise.budgetDetail} <span className="dim">{enterprise.budgetPlan}</span></div></div>;
  if (id === "forecast") return <div className="metric-cell"><span className="metric-label">Full-year forecast</span><div className="metric-value-large">{enterprise.forecast}</div><div className="metric-sub positive">{enterprise.forecastDetail}</div></div>;
  if (id === "time") return (
    <div className="metric-cell">
      <span className="metric-label">Time vs achievement</span>
      <div className="metric-split-labels"><div>{enterprise.elapsed}% <span>{period === "Today" ? "day" : period === "MTD" ? "month" : "year"} elapsed</span></div><div>{enterprise.achieved}% <span>achieved</span></div></div>
      <div className="metric-progress"><div className="metric-progress-elapsed"><span className="metric-elapsed-marker" style={{ left: `${enterprise.elapsed}%` }} /></div><div className="metric-progress-achieved" style={{ width: `${enterprise.achieved}%` }}><span className="metric-achieved-marker" /></div></div>
      <div className="metric-sub positive">{enterprise.pace}</div>
    </div>
  );
  const metric = extraMetrics[id][period];
  const label = {
    grossProfit: "Gross Profit", operatingProfit: "Operating Profit", netMargin: "Net Profit Margin",
    revenueGrowth: "Revenue Growth", ebitdaMargin: "EBITDA Margin", cashFlow: "Operating Cash Flow",
    budgetVariance: "Budget Variance", forecastAccuracy: "Forecast Accuracy",
    roi: "Return on Investment (ROI)", workingCapital: "Working Capital",
  }[id];
  return <div className="metric-cell"><span className="metric-label">{label}</span><div className="metric-value-large">{metric.value}</div><div className={`metric-sub ${metric.tone}`}>{metric.detail}</div></div>;
}