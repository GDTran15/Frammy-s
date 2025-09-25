
import Header from "../Components/Header"
import { Link } from "react-router-dom"

export default function PopularityMetricsnpm() {
    return (
        <div>
            <Header />
            <h2> Le Pop Matricex </h2>

            <Link to = "/home">
                <button> Go back to homepage </button>
            </Link>
        
        </div>
    )
}