import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"
import UserManagement from "./Pages/UserManagement"
import ArtistManagement from "./Pages/ArtistManagement"



//CONFIGURE UR PAGES HERE by importing them and adding to router-Trison

 export default function App(){
    return (
        <div >
            <BrowserRouter>
                <Routes>
                  <Route index element = {<Home />} /> 
                  <Route path = "/home" element = {<Home />} /> 
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                  <Route path = "/UserManagement" element = {<UserManagement />} />
                  <Route path = "/ArtistManagement" element = {<ArtistManagement />} />
                  
                </Routes>
            </BrowserRouter>

        </div>
    )
 }