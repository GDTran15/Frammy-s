import NavBar from "../Components/NavBar";
import { TabButton } from "../Components/ButtonComponent";
import ActivityLog from "../Components/ActivityLog";
import "../CSS/button.css";

export default function AdminLogsPage() {
  return (
    <>
            <NavBar children={[
                <TabButton redirectLink={"/admin/dashboard"}>
                Dashboard
                </TabButton>,
                <TabButton redirectLink={"/admin/voting"}>
                Voting
                </TabButton>,
                <TabButton redirectLink={"/admin/nominee-management"}>
                Nominee
                </TabButton>,
                <TabButton redirectLink={"/admin/community"}>
                Community
                </TabButton>,
                <TabButton redirectLink={"/admin/users"}>
                User
                </TabButton>,
                <TabButton activeCondition={'active'}>
                Logs
                </TabButton>,
      ]}/>

      <div className="container mt-4">
        <h2>Activity Logs</h2>
        <p className="text-muted">Full admin view of all user and system activity.</p>
        
        <ActivityLog /> 
      </div>
    </>
  );
}