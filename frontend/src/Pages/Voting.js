import Header from "../Components/Header"
import { Link } from "react-router-dom"
import NavBar from "../Components/NavBar";


export default function Voting(){
    return (
        <div>
            <NavBar children={""} isNotLogin={false}/>
            <h2>Voting</h2>

             <Link to = "/">
                <button>Go to back to home</button>
            </Link>
        </div>
    )
 }