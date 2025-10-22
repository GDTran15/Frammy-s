import React, { useEffect, useState } from "react";

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
    <section className="p-6 bg-white rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-3">Recent Activity</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">No recent activity.</p>
      ) : (
        <ul className="space-y-1">
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.userName}</strong> {log.target}
              <span className="text-gray-400 text-sm ml-2">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PublicLogFeed;
