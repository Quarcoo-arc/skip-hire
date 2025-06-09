import { useEffect, useRef } from "react";
import { SkipGrid } from "./components/features";
import { Header, Sidebar } from "./components/layout";
import {
  StickyMobileProgress,
  VerticalProgressIndicator,
} from "./components/layout/ProgressIndicator";
import { Button } from "./components/ui";
import { STEPS } from "./constants";
import { useSkips, useSkipSelection } from "./hooks";

const App = () => {
  const actionButtons = useRef<HTMLDivElement | null>(null);
  const { skips, loading, error } = useSkips("NR32", "Lowestoft");
  const { selectedSkip, currentStep, selectSkip, prevStep, nextStep } =
    useSkipSelection();

  useEffect(() => {
    if (selectedSkip && actionButtons.current) {
      actionButtons.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedSkip]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
            Error Loading Skips
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Sticky Progress */}
      <StickyMobileProgress
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={() => null}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar>
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Your Progress
          </h2>

          <VerticalProgressIndicator
            steps={STEPS}
            currentStep={currentStep}
            showLabels={true}
            compact={false}
          />
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:h-screen lg:overflow-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 lg:overflow-y-auto">
            <Header
              title="Choose Your Skip Size"
              subtitle="Select the skip size that best suits your needs"
            />

            <SkipGrid
              skips={skips}
              selectedSkip={selectedSkip}
              onSkipSelect={selectSkip}
              loading={loading}
            />

            {/* Navigation */}
            {selectedSkip && (
              <div ref={actionButtons} className="mt-8 lg:mt-12">
                <div className="flex flex-col-reverse gap-3 sm:flex-row justify-center items-center">
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                    className="w-full sm:w-auto min-w-[120px]"
                    disabled={currentStep === 0}
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="w-full sm:w-auto min-w-[120px]"
                    disabled={currentStep === STEPS.length - 1}
                  >
                    Continue →
                  </Button>
                </div>

                {/* Mobile Selected Skip Summary */}
                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border lg:hidden">
                  <div className="text-center">
                    <span className="text-sm text-gray-600">Selected: </span>
                    <span className="font-semibold">
                      {selectedSkip.size} Yard Skip
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      £
                      {(
                        selectedSkip.price_before_vat *
                          (1 + selectedSkip.vat / 100) +
                        (selectedSkip.transport_cost || 0)
                      ).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
