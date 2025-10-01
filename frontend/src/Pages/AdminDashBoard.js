import NavBar from "../Components/NavBar"
import "../CSS/button.css"
import "../CSS/admindashboard.css"
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
                  <TabButton redirectLink={"/admin/user-management"}>
                     User
                  </TabButton>,
                  <TabButton redirectLink={"/admin/logs"}>
                     Logs
                  </TabButton>,
            ]}/>

            <div className="admin-dashboard-container">
               <h1 className="title">Results Dashboard</h1>
               <p>Welcome to the Dashboard! Here you can manage users, nominees, and view logs.</p>
               
               <div className="clear-button-container">
                  <button className="clear-home-button">Remove Currently Displayed Result from Home</button>
               </div>

               <div className="dashboard-sections">
                  <div className="results-card">
                     <div className="card-header">
                        <h2>Weekly Results</h2>
                     </div>
                     <div className="card-body">
                        <p>Summary of weekly results.</p>
                        <div className="results-display">
                           <p>Display results from component here</p>
                        </div>
                        <div className="card-buttons">
                           <button className="view-results-button">View Page</button>
                           <button className="add-results-button">Add to Home</button>
                        </div>
                     </div>
                  </div>
                  <div className="results-card">
                     <div className="card-header">
                        <h2>Leaderboard Results</h2>
                     </div>
                     <div className="card-body">
                        <p>Summary of Leaderboard results.</p>
                        <div className="results-display">
                           <p>Display results from component here</p>
                        </div>
                        <div className="card-buttons">
                           <button className="view-results-button">View Page</button>
                           <button className="add-results-button">Add to Home</button>
                        </div>
                     </div>
                  </div>
                  <div className="results-card">
                     <div className="card-header">
                        <h2>Prediction Results</h2>
                     </div>
                     <div className="card-body">
                        <p>Summary of Prediction results.</p>
                        <div className="results-display">
                           <p>Display results from component here</p>
                        </div>
                        <div className="card-buttons">
                           <button className="view-results-button">View Page</button>
                           <button className="add-results-button">Add to Home</button>
                        </div>
                     </div>
                  </div>
                  <div className="results-card">
                     <div className="card-header">
                        <h2>Streaming Results</h2>
                     </div>
                     <div className="card-body">
                        <p>Summary of Streaming results.</p>
                        <div className="results-display">
                           <p>Display results from component here</p>
                        </div>
                        <div className="card-buttons">
                           <button className="view-results-button">View Page</button>
                           <button className="add-results-button">Add to Home</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </>
    )
}