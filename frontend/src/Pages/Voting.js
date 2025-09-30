import "../CSS/voting.css"
import { Link } from "react-router-dom"
import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";


export default function Voting(){
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/artists")
            .then((res) => res.json())
            .then((response) => {
                if (response.status === "success") {
                    setArtists(response.data);
                } else {
                    setError("Failed to fetch artists");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Full error", error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <NavBar children={""} isNotLogin={false} />          

            <div className="voting-page">
                <h1 className="title">Voting</h1>
                <h2 className="subtitle">Suggested Picks</h2>

                <div className="controls">
                    <input
                        type="text"
                        placeholder="Search Artist"
                        className="voting-search"
                    />
                    <select className="voting-select">
                        <option value="">Filter by award</option>
                        <option value="Grammy">Grammy</option>
                    </select>
                </div>

                <ul className="voting-list">
                    {artists.map((artist) => (
                        <li key={artist.artistId} className="voting-item"> 
                            <div className="meta">
                                <p className="voting-name">{artist.artistName}</p>
                                <p className="info">{artist.artistInfo}</p>
                            </div>
                            <button className="button">Vote</button>
                        </li>
                    )
                )}
                </ul>

                <Link to = "/">
                    <button className="button">Go to back to home</button>
                </Link>
            </div>
        </>
    )
 }