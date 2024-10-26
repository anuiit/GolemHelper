import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

export default function MatchPrediction({ isLoading, prediction }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-400">Predicting match outcome...</p>
      </div>
    )
  }

  if (!prediction) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center h-32 mb-6 p-4 bg-neutral-600 rounded-lg h-32">
      <h3 className="text-xl font-semibold mb-2 text-zinc-900">Match Prediction</h3>
      <p className="text-lg text-white">
        Predicted Winner: <span className="font-bold text-blue-400">{prediction.winner}</span>
      </p>
      <p className="text-sm text-white">
        Confidence: {prediction.confidence.toFixed(2)}%
      </p>
      <Progress value={prediction.confidence} className="mt-2 h-2" />
    </div>
  )
}