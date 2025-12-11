"use client";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  progressText: string;
}

export default function QuizProgress({
  currentStep,
  totalSteps,
  progressText,
}: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  // Replace {current} and {total} placeholders
  const formattedText = progressText
    .replace("{current}", String(currentStep))
    .replace("{total}", String(totalSteps));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">{formattedText}</span>
        <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
