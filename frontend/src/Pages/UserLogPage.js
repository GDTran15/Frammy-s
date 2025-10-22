import React, { useEffect, useState } from "react";

const UserLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8080/api/user-logs/${userId}`)
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user logs:", err);
        setLoading(false);
      });
  }, [userId]);

  if (!userId)
    return <p className="text-center text-red-500">Please log in to view your logs.</p>;

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Activity Logs</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">You haven’t logged any activity yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {logs.map((log) => (
            <li key={log.id} className="py-2">
              <p className="font-medium text-gray-800">{log.target}</p>
              <p className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserLogPage;
