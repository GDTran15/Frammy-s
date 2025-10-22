import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Statistics = () => {
  const [metrics, setMetrics] = useState([]);

  return (
    <div>
      <h2>Popularity Metrics</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nominee</th>
            <th>Category</th>
            <th>Popularity Score</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(m => (
            <tr key={m.nomineeId}>
              <td>{m.nomineeName}</td>
              <td>{m.category}</td>
              <td>{m.popularityScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
