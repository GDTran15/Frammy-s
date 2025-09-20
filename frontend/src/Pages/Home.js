
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import "../CSS/Home.css"

 export default function Home(){
    return (
        <div className = "homepage t">
            <Header />
            <h2 >homepage content</h2>

            <Link to = "/weekly-result-summary"> 
                <button>Go to weekly result summary</button>
            </Link>

            <Link to = "/UserManagement"> 
                <button>Go to User Management Page</button>
            </Link>
<<<<<<< HEAD
            <Link to = "/ArtistManagement"> 
                <button>Go to Artist Management Page</button>
            </Link>
=======

            <Link to = "/PopularityMetrics">
                <button>Popularity Metrics Page</button>
            </Link> 
>>>>>>> 38818844793df75088932708262dbd1b09dcbd93
        </div>
    
    )
 }