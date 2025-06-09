import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
}

const Card = ({
  children,
  className = "",
  hover = false,
  selected = false,
}: IProps) => {
  const baseClasses =
    "bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
  const selectedClasses = selected
    ? "border-blue-500 ring-2 ring-blue-200"
    : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
