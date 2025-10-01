
import axios from "axios";
import { useEffect, useState } from "react";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Fetch logs when component mounts
  const fetchLogs = () => {
    axios
      .get("http://localhost:9000/logs", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Assuming backend returns an array of logs
        const data = res.data.map((log) => ({
          id: log.id,
          action: log.action,
          target: log.target,
          details: log.details,
          timestamp: log.timestamp,
        }));
        setLogs(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch activity logs.");
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row mt-2 rounded-2">
          <div className="col bg-white py-3 px-4">
            <h2>Activity Log</h2>

            {/* Error Message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Logs List */}
            <ul className="list-group">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <li key={log.id} className="list-group-item">
                    <strong>{log.action}</strong> on <em>{log.target}</em>
                    <br />
                    {log.details && (
                      <span className="text-muted">{log.details}</span>
                    )}
                    <span className="float-end text-secondary">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">
                  No activity logs found.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
