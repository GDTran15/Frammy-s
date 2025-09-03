import Header from "../Components/Header"
import { Link } from "react-router-dom"

export default function UserManagement(){
    return (
        <div>
            <Header />
            <h2>Welcome to User Management</h2>

             <Link to = "/home">
                <button>Go to back to home</button>
            </Link>
        </div>
    )
 }