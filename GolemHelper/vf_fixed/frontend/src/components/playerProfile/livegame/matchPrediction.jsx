import React from 'react';
import { ProgressCircleRoot, ProgressCircleRing } from '@/components/ui/progress-circle';

export default function MatchPrediction({ isLoading, prediction }) {
  isLoading = true;
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-centermb-4 p-4 bg-gray-800 rounded">
        <h3 className="py-2 text-lg font-semibold text-white">Match Prediction</h3>
        <ProgressCircleRoot className="py-2" value={null} size="sm">
          <ProgressCircleRing cap="round" color={"#6b6e8c"} />
        </ProgressCircleRoot>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-centermb-4 p-4 bg-gray-800 rounded">
        <h3 className="text-lg font-semibold text-white">Match Prediction</h3>
        <ProgressCircleRoot value={null} size="sm">
          <ProgressCircleRing cap="round" color={"#6b6e8c"} />
        </ProgressCircleRoot>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-centermb-4 p-4 bg-gray-800 rounded">
      <h3 className="text-lg font-semibold text-white">Match Prediction</h3>
      <p className="text-sm text-gray-400">Winner: {prediction.winner}</p>
      <p className="text-sm text-gray-400">Confidence: {Math.round(prediction.confidence)}%</p>
    </div>
  );
}