import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  className = "",
  hover = false,
  selected = false,
  onClick,
}: IProps) => {
  const baseClasses =
    "bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-200";
  const hoverClasses = hover
    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    : "";
  const selectedClasses = selected
    ? "border-blue-500 ring-2 ring-blue-200"
    : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`}
      {...(onClick ? { onClick, role: "button" } : {})}
    >
      {children}
    </div>
  );
};

export default Card;
