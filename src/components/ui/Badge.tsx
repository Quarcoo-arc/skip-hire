import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  variant: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const Badge = ({ children, variant = "default", className = "" }: IProps) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
