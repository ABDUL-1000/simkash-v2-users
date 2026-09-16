import { APP_COLORS } from "@/constants/colors";
import { Check } from "lucide-react";
import type { CaActivationStep } from "../types/ca-sim-activation.types";

interface CaActivationStepperProps {
  currentStep: CaActivationStep;
  isBulkMode?: boolean;
}

export function CaActivationStepper({
  currentStep,
  isBulkMode = false,
}: CaActivationStepperProps) {
  const steps = [
    { number: 1, label: "SIM Details" },
    { number: 2, label: isBulkMode ? "Customers" : "Customer Info" },
    { number: 3, label: "Confirm" },
  ];

  const getStepTag = () => {
    if (isBulkMode) return "BULK ACTIVATION MODE";
    switch (currentStep) {
      case 1:
        return "STEP 1 OF 3 — SIM DETAILS";
      case 2:
        return "STEP 2 OF 3 — CUSTOMER INFO";
      case 3:
        return "STEP 3 OF 3 — CONFIRM";
      default:
        return "STEP 1 OF 3 — SIM DETAILS";
    }
  };

  return (
    <div className="space-y-4">
      {/* 3 Step Indicator */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4 relative">
        {/* Connecting line */}
        <div
          className="absolute left-10 right-10 top-4 h-0.5 -z-0"
          style={{ backgroundColor: APP_COLORS.greys.stroke }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className="size-8 rounded-full flex items-center justify-center text-xs font-black transition-colors"
                style={{
                  backgroundColor: isCompleted
                    ? APP_COLORS.greens.green
                    : isCurrent
                      ? APP_COLORS.texts.primary
                      : APP_COLORS.backgrounds.surface,
                  color: isCompleted || isCurrent
                    ? "#FFFFFF"
                    : APP_COLORS.texts.slate,
                  border: isCompleted || isCurrent
                    ? "none"
                    : `1px solid ${APP_COLORS.greys.stroke}`,
                }}
              >
                {isCompleted ? (
                  <Check className="size-4 stroke-[3]" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className="text-[11px] font-bold mt-1.5 transition-colors"
                style={{
                  color: isCurrent
                    ? APP_COLORS.texts.primary
                    : APP_COLORS.texts.slate,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mode / Step Sub-badge */}
      <div>
        <span
          className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            color: APP_COLORS.blues.interactiveCta,
          }}
        >
          {getStepTag()}
        </span>
      </div>
    </div>
  );
}
