"use client";

interface QuizOption {
  key: string;
  label: string;
}

interface QuizStepProps {
  question: string;
  options: QuizOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export default function QuizStep({
  question,
  options,
  selectedValue,
  onSelect,
}: QuizStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
        {question}
      </h3>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`
              w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
              ${
                selectedValue === option.key
                  ? "border-cyan-500 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                  ${
                    selectedValue === option.key
                      ? "border-cyan-500 bg-cyan-500"
                      : "border-slate-500"
                  }
                `}
              >
                {selectedValue === option.key && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-base font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
