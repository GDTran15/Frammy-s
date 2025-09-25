import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"
import UserManagement from "./Pages/UserManagement"
import RegisterPage from "./Pages/RegisterPage"
import ArtistManagement from "./Pages/ArtistManagement"
import LoginPage from "./Pages/LoginPage";
import PopularityMetrics from "./Pages/PopularityMetrics"; 
import AdminDashBoard from "./Pages/AdminDashBoard";
import UserHomePage from "./Pages/UserHomePage";
import Voting from "./Pages/Voting";

//CONFIGURE UR PAGES HERE by importing them and adding to router-Trison

 export default function App(){
    return (
        <div >
            <BrowserRouter>
                <Routes>
                  <Route index element = {<HomePage />} /> 
                  <Route path = "/" element = {<HomePage />} /> 
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                  <Route path = "/UserManagement" element = {<UserManagement />} />
                    <Route path="/login" element = {<LoginPage/>}/>
                    <Route path="/register" element = {<RegisterPage/>}/>
                  <Route path = "/ArtistManagement" element = {<ArtistManagement />} />
                  <Route path = "/admin/dashboard" element = {<AdminDashBoard />} />
                  <Route path = "/user/home" element = {<UserHomePage />} />
                  <Route path = "/Voting" element = {<Voting />} />
                  

                  <Route path = "/PopularityMetrics" element = {<PopularityMetrics />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
 }  