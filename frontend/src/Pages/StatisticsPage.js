import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function StatisticsPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
<<<<<<< HEAD
        // Make this match your backend route
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/statistics`);
=======
        const res = await fetch("http://localhost:8080/api/statistics");
>>>>>>> 9291a3ccbc7f759c9df6e0aa9e7c99e3c204be2d
        if (!res.ok) throw new Error("Failed to fetch statistics data.");
        const json = await res.json();
        setStats(json.data || []);
      } catch (e) {
        console.error(e);
        setError("Unable to load statistics at the moment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container py-5 statistics-container">
      {/* Header always visible */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-warning m-0">🎶 Voting Statistics</h1>
        <Link to="/" className="btn btn-outline-secondary">← Back to Home</Link>
      </div>

      {loading && <div className="text-center mt-5">Loading statistics…</div>}

      {error && (
        <div className="text-center mt-5 text-danger">{error}</div>
      )}

      {!loading && !error && (
        <>
          {stats.length === 0 ? (
            <p className="text-muted">No voting data available yet.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-dark table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Nominee</th>
                      <th>Category</th>
                      <th>Popularity Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((row, index) => (
                      <tr key={index}>
                        <td>{row.nomineeId}</td>
                        <td>{row.categoryName}</td>
                        <td className="fw-semibold">{row.popularityScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bar chart section */}
              <div className="mt-5">
                <h2 className="h5 text-center mb-3 text-warning">Popularity Overview</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoryName" tick={{ fill: '#000' }} />
                    <YAxis tick={{ fill: '#000' }} />
                    <Tooltip />
                    <Bar dataKey="popularityScore" fill="#6a0dad" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
