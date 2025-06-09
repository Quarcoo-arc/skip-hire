import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Sidebar = ({ children }: IProps) => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="w-80 bg-blue-50 shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
        <div className="p-6 xl:p-8">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
