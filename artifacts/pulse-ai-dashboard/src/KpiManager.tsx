import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ArrowUp, Check, GripVertical, SlidersHorizontal, X } from "lucide-react";

export const KPI_IDS = [
  "revenue", "ebitda", "budget", "forecast", "time",
  "grossProfit", "operatingProfit", "netMargin", "revenueGrowth", "ebitdaMargin",
  "cashFlow", "budgetVariance", "forecastAccuracy", "roi", "workingCapital",
] as const;
export type KpiId = (typeof KPI_IDS)[number];
export const DEFAULT_KPIS: KpiId[] = ["revenue", "ebitda", "budget", "forecast", "time"];
export const KPI_LABELS: Record<KpiId, string> = {
  revenue: "Consolidated Revenue",
  ebitda: "EBITDA / Profit",
  budget: "Budget Achievement",
  forecast: "Full-Year Forecast",
  time: "Time vs Achievement",
  grossProfit: "Gross Profit",
  operatingProfit: "Operating Profit",
  netMargin: "Net Profit Margin",
  revenueGrowth: "Revenue Growth",
  ebitdaMargin: "EBITDA Margin",
  cashFlow: "Operating Cash Flow",
  budgetVariance: "Budget Variance",
  forecastAccuracy: "Forecast Accuracy",
  roi: "Return on Investment (ROI)",
  workingCapital: "Working Capital",
};

const storageKey = (edition: string) => `pulse.kpis.${edition}.v1`;

export function loadKpis(edition: string): KpiId[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey(edition)) ?? "null");
    if (
      Array.isArray(saved) &&
      saved.length >= 5 && saved.length <= 10 &&
      new Set(saved).size === saved.length &&
      saved.every((id) => KPI_IDS.includes(id as KpiId))
    ) return saved as KpiId[];
  } catch {
    // Unavailable or outdated browser storage: use the original five cards.
  }
  return [...DEFAULT_KPIS];
}

export function saveKpis(edition: string, ids: KpiId[]) {
  try {
    localStorage.setItem(storageKey(edition), JSON.stringify(ids));
  } catch {
    // Changes still apply for this visit if storage is disabled.
  }
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: KpiId[];
  onApply: (ids: KpiId[]) => void;
  theme: "light" | "dark";
};

export function ManageKpis({ open, onOpenChange, selected, onApply, theme }: Props) {
  const [draft, setDraft] = useState<KpiId[]>(selected);
  const [dragged, setDragged] = useState<KpiId | null>(null);

  useEffect(() => {
    if (open) setDraft([...selected]);
  }, [open, selected]);

  const available = KPI_IDS.filter((id) => !draft.includes(id));
  const move = (from: number, to: number) => {
    if (from < 0 || to < 0 || to >= draft.length || from === to) return;
    setDraft((current) => {
      const next = [...current];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="kpi-dialog-overlay" />
        <Dialog.Content className={`kpi-dialog ${theme}`} aria-describedby="kpi-dialog-help">
          <div className="kpi-dialog-header">
            <div>
              <Dialog.Title>Manage KPIs</Dialog.Title>
              <Dialog.Description id="kpi-dialog-help">Select a minimum of 5 and a maximum of 10 KPIs.</Dialog.Description>
            </div>
            <Dialog.Close className="kpi-dialog-close" aria-label="Close Manage KPIs"><X size={18} /></Dialog.Close>
          </div>
          <div className="kpi-dialog-body">
            <div className="kpi-list-heading">
              <strong>Selected KPIs</strong>
              <span>{draft.length} of 10 selected</span>
            </div>
            <p className="kpi-list-hint">Drag to reorder on desktop, or use the arrows on any device.</p>
            <ul className="kpi-selected-list">
              {draft.map((id, index) => (
                <li
                  key={id}
                  className={`kpi-selected-item ${dragged === id ? "is-dragging" : ""}`}
                  draggable
                  onDragStart={(event) => {
                    setDragged(id);
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", id);
                  }}
                  onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; }}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (dragged && dragged !== id) move(draft.indexOf(dragged), index);
                    setDragged(null);
                  }}
                  onDragEnd={() => setDragged(null)}
                >
                  <GripVertical className="kpi-grip" size={16} aria-hidden="true" />
                  <span className="kpi-selected-name">{KPI_LABELS[id]}</span>
                  <button type="button" className="kpi-icon-button" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move ${KPI_LABELS[id]} up`}><ArrowUp size={16} /></button>
                  <button type="button" className="kpi-icon-button" disabled={index === draft.length - 1} onClick={() => move(index, index + 1)} aria-label={`Move ${KPI_LABELS[id]} down`}><ArrowDown size={16} /></button>
                  <button type="button" className="kpi-icon-button kpi-remove" disabled={draft.length <= 5} onClick={() => setDraft((current) => current.filter((value) => value !== id))} aria-label={`Remove ${KPI_LABELS[id]}`} title={draft.length <= 5 ? "At least 5 KPIs are required" : `Remove ${KPI_LABELS[id]}`}><X size={16} /></button>
                </li>
              ))}
            </ul>
            <div className="kpi-list-heading kpi-available-heading">
              <strong>More KPIs</strong>
              {draft.length === 10 && <span className="kpi-limit" role="status">Maximum of 10 reached</span>}
            </div>
            <div className="kpi-available-list">
              {available.map((id) => (
                <button key={id} type="button" disabled={draft.length >= 10} onClick={() => setDraft((current) => [...current, id])}>
                  <span>{KPI_LABELS[id]}</span><span aria-hidden="true">+</span>
                </button>
              ))}
              {available.length === 0 && <p>All KPIs selected.</p>}
            </div>
            <p className="kpi-data-note">Additional KPI values are illustrative demo data until a live data source is connected.</p>
          </div>
          <div className="kpi-dialog-actions">
            <button type="button" className="kpi-cancel" onClick={() => onOpenChange(false)}>Cancel</button>
            <button type="button" className="kpi-apply" onClick={() => { onApply(draft); onOpenChange(false); }}><Check size={16} /> Apply</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ManageKpisButton({ onClick }: { onClick: () => void }) {
  return (
    <span className="kpi-manage-wrap">
      <button type="button" className="kpi-manage-button" onClick={onClick} aria-describedby="kpi-manage-tooltip">
        <SlidersHorizontal size={16} aria-hidden="true" /> Manage KPIs
      </button>
      <span id="kpi-manage-tooltip" className="kpi-manage-tooltip" role="tooltip">Add, remove or reorder KPIs.</span>
    </span>
  );
}