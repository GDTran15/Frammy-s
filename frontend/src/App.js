import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"
import UserManagement from "./Pages/UserManagement"

import NomineeManagementPage from "./Pages/NomineeManagementPage";

import RegisterPage from "./Pages/RegisterPage"


import LoginPage from "./Pages/LoginPage";
import PopularityMetrics from "./Pages/PopularityMetrics"; 
import AdminDashBoard from "./Pages/AdminDashBoard";
import UserVotingPage from "./Pages/UserVotingPage";

//CONFIGURE UR PAGES HERE by importing them and adding to router-Trison

 export default function App(){
    return (
        <div >
            <BrowserRouter>
                <Routes>
                  <Route path="/admin/nominee-management" element={<NomineeManagementPage/>}/>
                  <Route index element = {<HomePage />} /> 
                  <Route path = "/" element = {<HomePage />} /> 
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                  <Route path = "/admin/user-management" element = {<UserManagement />} />
                    <Route path="/login" element = {<LoginPage/>}/>
                    <Route path="/register" element = {<RegisterPage/>}/>
                 
                  <Route path = "/admin/dashboard" element = {<AdminDashBoard />} />
                  <Route path = "/user/voting" element = {<UserVotingPage />} />
                  <Route path = "/PopularityMetrics" element = {<PopularityMetrics />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
 }  