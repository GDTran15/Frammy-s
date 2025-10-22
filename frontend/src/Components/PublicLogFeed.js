import React, { useEffect, useState } from "react";
import "../CSS/PublicLogFeed.css";

const PublicLogFeed = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/public-logs")
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch public logs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading logs...</p>;

 return (
    <div className="public-log-container">
      <h2 className="public-log-title">Recent Activity</h2>
      {logs.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <ul className="public-log-list">
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.userName}</strong> {log.target}
              <span className="ml-2">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicLogFeed;
