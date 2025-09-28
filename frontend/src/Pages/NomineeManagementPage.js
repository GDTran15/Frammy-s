import NavBar from "../Components/NavBar";
import { TabButton } from "../Components/ButtonComponent";
import { useState } from "react";
import "../CSS/nominee.css"
import AddNomineeForm from "../Components/AddNomineeForm";
import AddArtist from "../Components/AddArtistForm";
import AddAlbum from "../Components/AddAlbum";
import AddSong from "../Components/AddSong";
import NomineeList from "../Components/NomineeList";


export default function NomineManagementPage(){
    const[activeTab,setActiveTab] = useState("Nominee")
   
    const mainContent = () => {
    switch (activeTab) {
      case "Nominee":
        return <AddNomineeForm />;
      case "Artist":
        return <AddArtist />;
      case "Song":
        return <AddSong />;
      case "Album":
        return <AddAlbum />;
      default:
        return null;
    }
  };
    
    return (
        <>
         <NavBar  children={[
                             <TabButton >
                                DashBoard
                             </TabButton>,
                             <TabButton>
                                Voting
                             </TabButton>,
                             <TabButton activeCondition={'active'}>
                                Nominee
                             </TabButton>,
                             <TabButton>
                                Community
                             </TabButton>,
                             <TabButton>
                                User
                             </TabButton>,
           ]}/>

           <header className="nominee-main">
            <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <div className="col ">
                        <h3 className=" ps-3">Nominee Management</h3>                        
                        <div className="btn-group w-100 px-1 bg-body-secondary py-1 rounded-5" >
                        {["Nominee","Artist","Song","Album"].map((tab) => (
                        <button
                            type="button"
                            className={`btn rounded-5 nominee-nav ${
                            activeTab === tab ? "active" : "btn-tertiary"
                            }`
                        }
                        onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                        </div>
                    </div>
                </div>
                
            </div>
           </header>

           
          {mainContent()}
                    
          
         
     </>

     
        
    );
}