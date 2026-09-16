import { Rail, Header, KPI, Groups, AskPulse, Attention, Lower } from "./PulseShared";
import "./_group.css";
export function PresidentDesktop(){return <div className="pulse-ai"><div className="shell"><Rail/><main className="main"><Header/><KPI/><Groups/><div className="workspace" style={{marginTop:24}}><AskPulse/><Attention/></div><Lower/></main></div></div>}
export default PresidentDesktop;