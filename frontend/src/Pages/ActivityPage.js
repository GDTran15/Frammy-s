import React from "react";
import { Link } from "react-router-dom";
import PublicLogFeed from "../Components/PublicLogFeed";

export default function ActivityPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-warning m-0">Community Activity Feed</h2>
        <Link to="/" className="btn btn-outline-secondary">← Back to Home</Link>
      </div>

      <p className="text-secondary">Here’s the full activity log:</p>

<<<<<<< HEAD
      {/* Use the same endpoint everywhere for consistency */}
      <PublicLogFeed endpoint={`${process.env.REACT_APP_API_URL}/api/user-logs/public`} />
=======
        
      <PublicLogFeed endpoint="http://localhost:8080/api/user-logs/public" />
>>>>>>> 9291a3ccbc7f759c9df6e0aa9e7c99e3c204be2d
    </div>
  );
}
