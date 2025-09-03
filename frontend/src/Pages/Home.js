
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import "../CSS/Home.css"

 export default function Home(){
    return (
        <div className = "homepage">
            <Header />
            <h2>homepage content</h2>

            <Link to = "/weekly-result-summary"> 
                <button>Go to weekly result summary</button>
            </Link>
        </div>
    
    )
 }