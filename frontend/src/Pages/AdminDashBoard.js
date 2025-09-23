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
                        Vote
                     </TabButton>,
                     <TabButton>
                        Tournament
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