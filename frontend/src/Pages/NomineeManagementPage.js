import NavBar from "../Components/NavBar";
import { TabButton } from "../Components/ButtonComponent";
import { useState } from "react";
import "../CSS/nominee.css"

import NomineeManagement from "../Components/NomineeManagement";

import AlbumManagement from "../Components/AlbumManagment";

import SongManagement from "../Components/SongManagement";
import ArtistManagement from "../Components/ArtistManagement";
import CategoryManagement from "../Components/CategoryManagement";



export default function NomineManagementPage(){
    const[activeTab,setActiveTab] = useState("Nominee")
   
    const mainContent = () => {
    switch (activeTab) {
      case "Nominee":
        return <NomineeManagement />;
      case "Artist":
        return <ArtistManagement />;
      case "Song":
        return <SongManagement />;
      case "Album":
        return <AlbumManagement />;
      case "Category":
        return <CategoryManagement/>
      default:
        return null;
    }
  };
    
    return (
        <>
          <NavBar children={[
            <TabButton redirectLink={"/admin/dashboard"}>
                DashBoard
            </TabButton>,
            <TabButton activeCondition={'active'}>
                Nominee
            </TabButton>,
            <TabButton>
                Community
            </TabButton>,
            <TabButton redirectLink={"/admin/user-management"} >
                User
            </TabButton>,
            <TabButton redirectLink={"/admin/logs"}>
                Logs
            </TabButton>,
          ]}/>

           <header className="nominee-main">
            <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <div className="col ">
                        <h3 className=" ps-3">Nominee Management</h3>                        
                        <div className="btn-group w-100 px-1 bg-body-secondary py-1 rounded-5" >
                        {["Nominee","Artist","Song","Album","Category"].map((tab) => (
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