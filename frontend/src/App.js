import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"
import UserManagement from "./Pages/UserManagement"

import NomineManagementPage from "./Pages/NomineeManagementPage";

import RegisterPage from "./Pages/RegisterPage"

import ArtistManagement from "./Pages/ArtistManagement"
import LoginPage from "./Pages/LoginPage";
import PopularityMetrics from "./Pages/PopularityMetrics"; 
import AdminDashBoard from "./Pages/AdminDashBoard";
<<<<<<< HEAD
import UserHomePage from "./Pages/UserHomePage";
import Voting from "./Pages/Voting";
=======
import UserVotingPage from "./Pages/UserVotingPage";
>>>>>>> main

//CONFIGURE UR PAGES HERE by importing them and adding to router-Trison

 export default function App(){
    return (
        <div >
            <BrowserRouter>
                <Routes>
                  <Route path="/admin/nominee-management" element={<NomineManagementPage/>}/>
                  <Route index element = {<HomePage />} /> 
                  <Route path = "/" element = {<HomePage />} /> 
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                  <Route path = "/UserManagement" element = {<UserManagement />} />
                    <Route path="/login" element = {<LoginPage/>}/>
                    <Route path="/register" element = {<RegisterPage/>}/>
                  <Route path = "/ArtistManagement" element = {<ArtistManagement />} />
                  <Route path = "/admin/dashboard" element = {<AdminDashBoard />} />
<<<<<<< HEAD
                  <Route path = "/user/home" element = {<UserHomePage />} />
                  <Route path = "/Voting" element = {<Voting />} />
=======
                  <Route path = "/user/voting" element = {<UserVotingPage />} />
>>>>>>> main
                  

                  <Route path = "/PopularityMetrics" element = {<PopularityMetrics />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
 }  