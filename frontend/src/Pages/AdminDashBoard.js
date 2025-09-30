import NavBar from "../Components/NavBar"
import "../CSS/button.css"
import { TabButton } from "../Components/ButtonComponent"

export default function AdminDashBoard(){
    return (
        <>
        <NavBar children={[
                     <TabButton activeCondition={'active'}>
                        DashBoard
                     </TabButton>,
                     <TabButton>
                        Voting
                     </TabButton>,
                     <TabButton redirectLink={"/admin/nominee-management"}>
                        Nominee
                     </TabButton>,
                     <TabButton>
                        Community
                     </TabButton>,
                     <TabButton>
                        User
                     </TabButton>,
   ]}/>
    



        </>
    )
}