import { Header } from "./components/layout";
import {
  StickyMobileProgress,
  VerticalProgressIndicator,
} from "./components/layout/ProgressIndicator";
import { STEPS } from "./constants";
import { useSkips, useSkipSelection } from "./hooks";

const App = () => {
  const { skips, loading, error } = useSkips("NR32", "Lowestoft");
  const { selectedSkip, currentStep, selectSkip, nextStep, prevStep } =
    useSkipSelection();

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
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
            <div className="p-6 xl:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-8">
                Your Progress
              </h2>

              <VerticalProgressIndicator
                steps={STEPS}
                currentStep={currentStep}
                showLabels={true}
                compact={false}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:h-screen lg:overflow-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 lg:overflow-y-auto">
            <Header
              title="Choose Your Skip Size"
              subtitle="Select the skip size that best suits your needs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
