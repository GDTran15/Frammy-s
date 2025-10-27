import { useState, useEffect } from "react"
import "../CSS/home.css"

export default function PredictionNomineeList({ permission }) {
    const [nominees, setNominees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [predictionUsage, setPredictionUsage] = useState({
        predictionsUsedToday: 0,
        maxPredictionsPerDay: 10,
        predictionsRemaining: 10
    });
    const [selectedConfidence, setSelectedConfidence] = useState({});

    
    useEffect(() => {
        fetchNominees(currentPage);
        // Only fetch usage if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            fetchPredictionUsage();
        }
    }, [currentPage]);

    const fetchNominees = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/nominee?page=${page}&size=9`
            );
            const result = await response.json();
            
            if (result.status === 'success') {
                setNominees(result.data.content);
                setTotalPages(result.data.totalPages);
            }
        } catch (error) {
            console.error('Error fetching nominees:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPredictionUsage = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found, skipping usage fetch');
                return;
            }
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/prediction/usage`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Check if response is OK before parsing
            if (!response.ok) {
                console.error('Failed to fetch prediction usage:', response.status);
                return;
            }
            
            const result = await response.json();
            
            if (result.status === 'success') {
                setPredictionUsage(result.data);
            }
        } catch (error) {
            console.error('Error fetching prediction usage:', error);
        }
    };


    const handlePredict = async (nomineeId) => {
        const confidence = selectedConfidence[nomineeId] || 'CONFIDENT';
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/prediction`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomineeId: nomineeId,
                    confidenceLevel: confidence
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('Prediction successfully created!');
                fetchPredictionUsage(); // Refresh usage count
            } else {
                alert(result.message || 'Failed to create prediction');
            }
        } catch (error) {
            console.error('Error creating prediction:', error);
            alert('Error creating prediction. Please try again.');
        }
    };

    const handleConfidenceChange = (nomineeId, confidence) => {
        setSelectedConfidence(prev => ({
            ...prev,
            [nomineeId]: confidence
        }));
    };

    const getNomineeName = (nominee) => {
        if (nominee.nomineeType === 'ARTIST') return nominee.artistName;
        if (nominee.nomineeType === 'ALBUM') return nominee.albumName;
        if (nominee.nomineeType === 'SONG') return nominee.songName;
        return 'Unknown';
    };

    const getConfidenceBadgeClass = (confidence) => {
        switch(confidence) {
            case 'VERY_CONFIDENT': return 'bg-success';
            case 'CONFIDENT': return 'bg-primary';
            case 'UNSURE': return 'bg-warning';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container mt-4">
            {/* Prediction Usage Info */}
            <div className="row mb-4">
                <div className="col">
                    <div className="alert alert-info">
                        <strong>Predictions Today:</strong> {predictionUsage.predictionsUsedToday} / {predictionUsage.maxPredictionsPerDay}
                        <span className="ms-3">
                            <strong>Remaining:</strong> {predictionUsage.predictionsRemaining}
                        </span>
                    </div>
                </div>
            </div>

            {/* Nominees Grid */}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {nominees.map((nominee) => (
                        <div key={nominee.nomineeId} className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <span className={`badge ${nominee.nomineeType === 'ARTIST' ? 'bg-primary' : nominee.nomineeType === 'ALBUM' ? 'bg-success' : 'bg-warning'} mb-2`}>
                                        {nominee.nomineeType}
                                    </span>
                                    <h5 className="card-title">{getNomineeName(nominee)}</h5>
                                    <p className="card-text">
                                        <strong>Category:</strong> {nominee.categoryName}
                                    </p>
                                    
                                    {nominee.nomineeType === 'SONG' && (
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Release: {nominee.releaseDate} | Genre: {nominee.songGenre}
                                            </small>
                                        </p>
                                    )}
                                    
                                    {nominee.nomineeType === 'ALBUM' && (
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Release: {nominee.releaseDate} | Genre: {nominee.albumGenre}
                                            </small>
                                        </p>
                                    )}

                                    {nominee.nomineeType === 'ARTIST' && nominee.artistInfo && (
                                        <p className="card-text">
                                            <small className="text-muted">{nominee.artistInfo}</small>
                                        </p>
                                    )}

                                    {/* Confidence Level Selector */}
                                    <div className="mb-3">
                                        <label className="form-label small">Confidence Level:</label>
                                        <select 
                                            className="form-select form-select-sm"
                                            value={selectedConfidence[nominee.nomineeId] || 'CONFIDENT'}
                                            onChange={(e) => handleConfidenceChange(nominee.nomineeId, e.target.value)}
                                        >
                                            <option value="VERY_CONFIDENT">Very Confident</option>
                                            <option value="CONFIDENT">Confident</option>
                                            <option value="UNSURE">Unsure</option>
                                        </select>
                                    </div>

                                    <button 
                                        className="btn btn-warning w-100"
                                        onClick={() => handlePredict(nominee.nomineeId)}
                                        disabled={predictionUsage.predictionsRemaining === 0}
                                    >
                                        {predictionUsage.predictionsRemaining === 0 ? 'Limit Reached' : 'Predict Winner'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="row mt-4 mb-5">
                <div className="col d-flex justify-content-center gap-2">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>
                    
                    <span className="btn btn-outline-secondary disabled">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
