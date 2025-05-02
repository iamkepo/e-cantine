"use client";

import { capitalize } from "@/helpers/functions";
import { useThemeStore } from "@/stores/themeStore";
import { usePathname } from "next/navigation";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  const pathname = usePathname();
  return (
    <div className="col-12 h-100 pe-4">
      <h3 className="mb-3">{capitalize(pathname.split('/').pop() || '')}</h3>
      <div className={`card text-bg-${theme} mb-3`}>
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
