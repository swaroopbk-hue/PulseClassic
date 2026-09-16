import { Rail, Header, KPI, Groups, AskPulse, Attention, Lower } from "./PulseShared";
import "./_group.css";
import "./PresidentDesktop.css";

export function PresidentDesktop(){
  return <div className="pulse-ai president-editorial">
    <div className="shell">
      <Rail/>
      <main className="main">
        <Header/>
        <KPI/>
        <Groups/>
        <div className="workspace president-workspace"><AskPulse/><Attention/></div>
        <Lower/>
      </main>
    </div>
  </div>
}
export default PresidentDesktop;