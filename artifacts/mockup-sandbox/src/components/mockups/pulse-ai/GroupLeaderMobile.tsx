import { Bell } from "lucide-react";
import { Header, KPI, Groups, AskPulse, Attention, Lower, BottomNav, Brand, AccountMenu } from "./PulseShared";
import "./_group.css";
export function GroupLeaderMobile(){return <div className="pulse-ai"><main className="main"><div className="mobile-actions" style={{justifyContent:"space-between",marginBottom:24}}><Brand/><div className="mobile-actions"><Bell size={18}/><AccountMenu group/></div></div><Header group/><KPI group/><section style={{marginTop:24}}><AskPulse/></section><Groups group/><Attention group/><Lower group/><BottomNav/></main></div>}
export default GroupLeaderMobile;