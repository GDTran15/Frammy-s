import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import WeeklyResultSummary from  "./Pages/WeeklyResultSummary"


 export default function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                  <Route index element = {<Home />} /> //makes default
                  <Route path = "/home" element = {<Home />} /> //allows naviagation to home by addding the /home to the url
                  <Route path = "/weekly-result-summary" element = {<WeeklyResultSummary />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
 }