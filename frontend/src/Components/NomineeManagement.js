
import NomineeList from "./NomineeList";
import NomineeForm from "./NomineeForm";

export default function NomineeManagement(){
   return (<>   
   <NomineeForm title="Add Nominee" usage="Add"/>

            <NomineeList />  
        </>
    )
}