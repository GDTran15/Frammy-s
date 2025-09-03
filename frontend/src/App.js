import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"
import UserManagement from "./Pages/UserManagement"


//CONFIGURE UR PAGES HERE by importing them and adding to router-Trison

 export default function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                  <Route index element = {<Home />} /> //makes default
                  <Route path = "/home" element = {<Home />} /> //allows navigation to home by adding the /home to the url
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                  <Route path = "/UserManagement" element = {<UserManagement />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
 }