import { Bell } from "lucide-react";
import { Header, KPI, Groups, AskPulse, Attention, Lower, BottomNav, Brand } from "./PulseShared";
import "./_group.css";
export function PresidentMobile(){return <div className="pulse-ai"><main className="main"><div className="mobile-actions" style={{justifyContent:"space-between",marginBottom:24}}><Brand/><div className="mobile-actions"><Bell size={18}/><span className="avatar">JJ</span></div></div><Header/><KPI/><section style={{marginTop:24}}><AskPulse/></section><Groups/><Attention/><Lower/><BottomNav/></main></div>}
export default PresidentMobile;