import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StatisticsPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Make this match your backend route
        const res = await fetch("http://localhost:8080/api/statistics");
        if (!res.ok) throw new Error("Failed to fetch statistics data.");
        const data = await res.json();
        setStats(data || []);
      } catch (e) {
        console.error(e);
        setError("Unable to load statistics at the moment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading statistics…</div>;
  if (error)   return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-warning m-0">🎶 Voting Statistics</h1>
        <Link to="/" className="btn btn-outline-secondary">← Back to Home</Link>
      </div>

      {stats.length === 0 ? (
        <p className="text-muted">No voting data available yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Nominee</th>
                <th>Popularity Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row) => (
                <tr key={row.nomineeId}>
                  <td>{row.nomineeName}</td>
                  <td className="fw-semibold">{row.popularityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
