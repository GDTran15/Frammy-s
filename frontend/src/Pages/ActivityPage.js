import React from "react";
import { Link } from "react-router-dom";
import PublicLogFeed from "../Components/PublicLogFeed";

export default function ActivityPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-warning m-0">Community Activity Feed</h2>
        <a href ="/" className="btn btn-outline-secondary">← Back to Home</a>
      </div>

      <p className="text-secondary">Here’s the full activity log:</p>

      {/* Use the same endpoint everywhere for consistency */}
      <PublicLogFeed endpoint={`${process.env.REACT_APP_API_URL}/api/user-logs/public`} />
    </div>
  );
}
