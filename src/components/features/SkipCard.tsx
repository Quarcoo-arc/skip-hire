import type { SkipData } from "../../types";
import { calculateTotalPrice, formatPrice } from "../../utils/pricing";
import { Badge, Button, Card } from "../ui";

interface IProps {
  skip: SkipData;
  isSelected: boolean;
  onSelect: (skip: SkipData) => void;
  showFeatures?: boolean;
  image: string;
}

const SkipCard = ({
  skip,
  isSelected,
  onSelect,
  showFeatures = true,
  image,
}: IProps) => {
  const pricing = calculateTotalPrice(skip);

  return (
    <Card
      hover={true}
      selected={isSelected}
      className="group h-full flex flex-col overflow-hidden"
      onClick={() => onSelect(skip)}
    >
      <div className="h-32 md:h-48 w-full relative bg-black/30">
        <img
          src={image}
          alt="Skip"
          className="object-cover w-full h-full object-center"
        />

        <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 top-2 right-2 absolute">
          <svg
            className="w-4 h-4 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {skip.hire_period_days} day hire
          </span>
        </div>
        {/* Skip Size Header - Responsive text */}

        <div className="text-xl sm:text-2xl font-bold text-white top-1/3 left-1/4 absolute">
          {skip.size} Yard Skip
        </div>

        {/* Features - Responsive badges */}
        {showFeatures && (
          <div className="flex flex-wrap gap-1 justify-center sm:justify-start absolute bottom-2.5 left-2">
            {skip.allowed_on_road && (
              <Badge variant="success" className="text-xs">
                Road Placement
              </Badge>
            )}
            {skip.allow_heavy_waste && (
              <Badge variant="info" className="text-xs">
                Heavy Waste OK
              </Badge>
            )}
            {skip.transport_cost && (
              <Badge variant="warning" className="text-xs">
                Transport Included
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {/* Pricing - Responsive text sizes */}
        <div className="mb-4 space-y-1 text-center sm:text-left grow">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {formatPrice(pricing.totalPrice)}
          </div>

          {/* Detailed pricing - Hidden on small screens, shown on hover */}
          <div className="text-xs sm:text-sm font-medium text-gray-600">
            <div className="sm:hidden">Inc. VAT</div>
            <div className="hidden sm:block">
              Base: {formatPrice(pricing.basePrice)} + VAT:{" "}
              {formatPrice(pricing.vatAmount)}
              {pricing.transportCost > 0 && (
                <div>+ Transport: {formatPrice(pricing.transportCost)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button - Responsive sizing */}
        <div className="mt-auto">
          <Button
            variant={isSelected ? "primary" : "outline"}
            size="sm"
            className="w-full font-semibold text-sm sm:text-base"
            onClick={() => onSelect(skip)}
          >
            {isSelected ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Selected
              </span>
            ) : (
              "Select This Skip"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SkipCard;
