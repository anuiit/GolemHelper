// src/components/livegame/matchPrediction.jsx
import React from 'react';

export default function MatchPrediction({ isLoading, prediction }) {
  if (isLoading) {
    return <div>Loading Prediction...</div>;
  }

  if (!prediction) {
    return <div>No Prediction Available</div>;
  }

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded">
      <h3 className="text-lg font-semibold text-white">Match Prediction</h3>
      <p className="text-sm text-gray-400">Winner: {prediction.winner}</p>
      <p className="text-sm text-gray-400">Confidence: {Math.round(prediction.confidence)}%</p>
    </div>
  );
}