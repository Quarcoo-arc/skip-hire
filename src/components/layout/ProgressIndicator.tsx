import { useState } from "react";
import type { Step } from "../../types";

interface IProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (id: string) => void;
}

interface IVerticalProgressIndicatorProps extends IProps {
  className?: string;
  showLabels: boolean;
  compact: boolean;
}

export const StickyMobileProgress = ({
  steps,
  currentStep,
  onStepClick,
}: IProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Sticky Header Progress Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div className="px-4 py-3">
          {/* Current Step Info */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowDetails(true)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {currentStep + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {currentStepData.title}
                </div>
                <div className="text-xs text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center space-x-1">
              {steps.map((step, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep
                      ? "bg-blue-600 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => onStepClick(step.id)}
                />
              ))}
              <svg
                className="w-4 h-4 ml-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Sheet Details */}
      {showDetails && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowDetails(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl max-h-[70vh] overflow-hidden">
            <div className="p-6">
              {/* Handle Bar */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Progress Overview
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Vertical Progress List */}
              <div className="space-y-4 md:space-y-6 max-h-80 overflow-y-auto p-1.5">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    className={`flex items-start space-x-3 text-left ${
                      index <= currentStep
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => onStepClick(step.id)}
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0
                        ${
                          index <= currentStep
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }
                        ${index === currentStep ? "ring-4 ring-blue-200" : ""}
                      `}
                    >
                      {index <= currentStep ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium ${
                          index <= currentStep
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {step.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const VerticalProgressIndicator = ({
  steps,
  currentStep,
  className = "",
  showLabels = true,
  compact = false,
  onStepClick,
}: IVerticalProgressIndicatorProps) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      {steps.map((step, index) => (
        <button
          key={step.id}
          className={`flex items-start text-left ${
            index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={() => onStepClick(step.id)}
        >
          <div className="flex flex-col items-center">
            <div
              className={`
                flex items-center justify-center rounded-full font-semibold flex-shrink-0
                ${
                  compact
                    ? "w-8 h-8 text-xs"
                    : "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base"
                }
                ${
                  index <= currentStep
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }
                ${index === currentStep ? "ring-4 ring-blue-200" : ""}
              `}
            >
              {index <= currentStep ? (
                <svg
                  className={`${compact ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                  w-0.5 flex-1 my-2
                  ${compact ? "h-8" : "h-12 sm:h-16"}
                  ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}
                `}
              />
            )}
          </div>

          {showLabels && (
            <div className="ml-3 sm:ml-4 flex-1 pb-8">
              <div
                className={`
                  font-semibold
                  ${compact ? "text-sm" : "text-base sm:text-lg"}
                  ${index <= currentStep ? "text-gray-900" : "text-gray-500"}
                `}
              >
                {step.title}
              </div>
              {step.description && (
                <div
                  className={`
                    text-gray-600 mt-1
                    ${compact ? "text-xs" : "text-sm"}
                  `}
                >
                  {step.description}
                </div>
              )}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
