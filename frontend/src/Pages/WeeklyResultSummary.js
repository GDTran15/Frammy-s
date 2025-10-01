import { useState, useEffect } from "react"
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import "../CSS/home.css"

export default function WeeklyResultSummary(){
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        fetchWeeklyResults();
    }, []);

    const fetchWeeklyResults = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/voting/weekly-results');
            const data = await response.json();
            setResults(data);
            setFilteredResults(data);
        } catch (error) {
            console.error('Error fetching weekly results:', error);
        }
    };

    const handleSort = (e) => {
        const sortValue = e.target.value;
        setSortBy(sortValue);
        
        let sortedResults = [...results];
        
        switch(sortValue) {
            case 'votes-asc':
                sortedResults.sort((a, b) => a.voteCount - b.voteCount);
                setFilteredResults(sortedResults);
                break;
            case 'votes-desc':
                sortedResults.sort((a, b) => b.voteCount - a.voteCount);
                setFilteredResults(sortedResults);
                break;
            case 'time-asc':
                sortedResults.sort((a, b) => new Date(a.date) - new Date(b.date));
                setFilteredResults(sortedResults);
                break;
            case 'time-desc':
                sortedResults.sort((a, b) => new Date(b.date) - new Date(a.date));
                setFilteredResults(sortedResults);
                break;
            case 'category-artist':
                setFilteredResults(sortedResults.filter(r => r.category === 'ARTIST'));
                break;
            case 'category-album':
                setFilteredResults(sortedResults.filter(r => r.category === 'ALBUM'));
                break;
            case 'category-song':
                setFilteredResults(sortedResults.filter(r => r.category === 'SONG'));
                break;
            default:
                setFilteredResults(results);
                break;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        }).replace(/\//g, '-');
    };

    const formatVotes = (votes) => {
        return votes.toLocaleString('en-US');
    };

    return (
        <div>
            <section className="feature bg-body-tertiary">
                
                <nav className="navbar bg-black fixed-top">
                    <div className="container small">
                        <a className="navbar-brand text-light d-flex align-items-center gap-2">
                        {/* SVG Logo */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width={30} height={30}><path fill="#FFD43B" d="M208.3 64L432.3 64C458.8 64 480.4 85.8 479.4 112.2C479.2 117.5 479 122.8 478.7 128L528.3 128C554.4 128 577.4 149.6 575.4 177.8C567.9 281.5 514.9 338.5 457.4 368.3C441.6 376.5 425.5 382.6 410.2 387.1C390 415.7 369 430.8 352.3 438.9L352.3 512L416.3 512C434 512 448.3 526.3 448.3 544C448.3 561.7 434 576 416.3 576L224.3 576C206.6 576 192.3 561.7 192.3 544C192.3 526.3 206.6 512 224.3 512L288.3 512L288.3 438.9C272.3 431.2 252.4 416.9 233 390.6C214.6 385.8 194.6 378.5 175.1 367.5C121 337.2 72.2 280.1 65.2 177.6C63.3 149.5 86.2 127.9 112.3 127.9L161.9 127.9C161.6 122.7 161.4 117.5 161.2 112.1C160.2 85.6 181.8 63.9 208.3 63.9zM165.5 176L113.1 176C119.3 260.7 158.2 303.1 198.3 325.6C183.9 288.3 172 239.6 165.5 176zM444 320.8C484.5 297 521.1 254.7 527.3 176L475 176C468.8 236.9 457.6 284.2 444 320.8z"/></svg>
                        <h5 className="mb-0">GrammyVote</h5>
                        </a>
                        <div>
                            <a href="/" className="btn btn-outline-warning me-2 btn-sm">Home</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <h5 className="fs-3">Weekly Result Summary</h5>
                            <p className="fs-5 text-secondary">Stay up to date with the latest Grammy highlights! Each week, we bring you a quick roundup of winners, standout performances, trending moments, and key updates from the Grammy Awards season. It's your one-stop summary to catch up on everything you might have missed. </p>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col text-end">
                        <select 
                            className="form-select w-auto d-inline-block"
                            value={sortBy}
                            onChange={handleSort}
                        >
                            <option value="">Sort By:</option>
                            <option value="votes-asc">Votes: Lowest to Highest</option>
                            <option value="votes-desc">Votes: Highest to Lowest</option>
                            <option value="time-asc">Date: Oldest to Newest</option>
                            <option value="time-desc">Date: Newest to Oldest</option>
                            <option value="category-artist">By Artist</option>
                            <option value="category-album">By Album</option>
                            <option value="category-song">By Song</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col text-center">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Winner</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.length > 0 ? (
                                    filteredResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.category}</td>
                                            <td>{result.winnerName}</td>
                                            <td>{formatDate(result.date)}</td>
                                            <td>{formatVotes(result.voteCount)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No results available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
