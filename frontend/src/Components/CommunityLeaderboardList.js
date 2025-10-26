import axios from "axios";
import { useEffect, useState } from "react";
import  { Button } from "react-bootstrap";


export default function CommunityLeaderboardList({title, permission, limit = 25, defaultType = "ALL", showFilter = true}){
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeType, setActiveType] = useState(defaultType);
    const [lastUpdated, setLastUpdated] = useState(null);

    //const token = localStorage.getItem("token");

    useEffect(() => {
        let alive = true;

        const fetchRows = async () => {
        try {
            const res = await axios.get("http://localhost:8080/leaderboard", {
            params: { limit }, // backend already defaults to 25 if omitted
            });

            if (!alive) return;
            setRows(Array.isArray(res?.data?.data) ? res.data.data : []);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Fetch leaderboard failed:", err);
        } finally {
            if (alive) setLoading(false);
        }
        };

        fetchRows();
        const id = setInterval(fetchRows, 10000); //refersh

        return () => {
        alive = false;
        clearInterval(id);
        };
    }, [limit]);

    //const filtered = rows.filter((r) => r.nomineeType === "ARTIST");
    //const filtered = rows.filter((r) => r.nomineeType === activeType);
    const filtered = activeType === "ALL" ? rows : rows.filter((r) => r.nomineeType === activeType);

    return (
        <>
        <div className="container">
            <div className="row bg-white mt-3 rounded-3 py-3">
                <div className="d-flex align-items-end justify-content-between">
                <h3 className="mb-0">{title}</h3>
                {lastUpdated && (
                    <small className="text-muted">Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
                )}
                    </div>

                    {/* Type toggle buttons (like your category select, but faster to click) */}
                    {showFilter && (
                    <div className="mt-3 d-flex gap-2">
                    <Button
                        size="sm"
                        variant={activeType === "ALL" ? "primary" : "outline-primary"}
                        onClick={() => setActiveType("ALL")}
                    >
                        Global
                    </Button>
                    <Button
                        size="sm"
                        variant={activeType === "ARTIST" ? "primary" : "outline-primary"}
                        onClick={() => setActiveType("ARTIST")}
                    >
                        Best Artists
                    </Button>
                    <Button
                        size="sm"
                        variant={activeType === "ALBUM" ? "primary" : "outline-primary"}
                        onClick={() => setActiveType("ALBUM")}
                    >
                        Best Albums
                    </Button>
                    <Button
                        size="sm"
                        variant={activeType === "SONG" ? "primary" : "outline-primary"}
                        onClick={() => setActiveType("SONG")}
                    >
                        Best Songs
                    </Button>
                    </div>
                )}

                <div className="bg-white rounded-3 mt-3 p-0">
                    {loading ? (
                        <div className="p-3">Loading leaderboard…</div>
                            ) : filtered.length === 0 ? (
                        <div className="p-3 text-muted">No votes yet for {activeType.toLowerCase()}s.</div>
                            ) : (
                        <ul className="list-group">
                            {filtered.map((r, idx) => (
                                <li
                                    key={`${r.nomineeId}-${r.rank}`}
                                    className="list-group-item d-flex align-items-center"                
                                >
                                    <span className="badge bg-secondary me-3" style={{ minWidth: 38, fontSize: "0.9rem" }}>
                                        #{idx + 1}
                                    </span>

                                    {/* Name (grows, keeps votes to the right) */}
                                    <div className="flex-grow-1">
                                        <strong>{r.displayName}</strong>
                                        <span className="text-muted ms-2" style={{ fontSize: "0.85rem" }}>
                                        ({r.nomineeType})
                                        </span>
                                    </div>

                                    {/* Votes aligned far right */}
                                    <div className="ms-3" style={{ minWidth: 180, textAlign: "right" }}>
                                        <span className="fw-semibold">{r.votes}</span>{" "}
                                        <span className="text-muted">Community Votes</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                )}
                </div>
            </div>
            </div>
                    </>

  );


}