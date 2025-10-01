
import Header from "../Components/Header"
import { Link } from "react-router-dom"

export default function PopularityMetrics() {
    return (
        <div>
            <Header />
            <h2> Popularity Metrics </h2>

            <Link to = "/home">
                <button> Go back to homepage </button>
            </Link>
        </div>
    )
}