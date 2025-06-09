import type { SkipData } from "../../types";
import SkipCard from "./SkipCard";
import img1 from "../../assets/skip-1.webp";
import img2 from "../../assets/skip-2.webp";
import img3 from "../../assets/skip-3.jpg";
import img4 from "../../assets/skip-4.jpg";
import img5 from "../../assets/skip-5.jpg";

interface IProps {
  skips: SkipData[];
  selectedSkip: SkipData | null;
  onSkipSelect: (skip: SkipData) => void;
  loading: boolean;
}

const images = [img1, img2, img3, img4, img5];

const SkipGrid = ({ skips, selectedSkip, onSkipSelect, loading }: IProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 animate-pulse rounded-xl h-64"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {skips.map((skip, idx) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkip?.id === skip.id}
          onSelect={onSkipSelect}
          image={images[idx % images.length]}
        />
      ))}
    </div>
  );
};

export default SkipGrid;
