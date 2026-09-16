import { Rail, Header, KPI, Groups, AskPulse, Attention, Lower } from "./PulseShared";
import "./_group.css";
export function GroupLeaderDesktop(){return <div className="pulse-ai"><div className="shell"><Rail group/><main className="main"><Header group/><KPI group/><Groups group/><div className="workspace" style={{marginTop:24}}><AskPulse/><Attention group/></div><Lower group/></main></div></div>}
export default GroupLeaderDesktop;