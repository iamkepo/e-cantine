"use client";
import { useThemeStore } from "@/stores/themeStore";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LayoutProfile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const route = usePathname();

  useEffect(() => {
    
  }, [route]);

  const routeMatch = (path: string): boolean => {
    return route.includes(path);
  };
  
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <ul className="nav nav-tabs h-85 flex-lg-wrap flex-nowrap gap-2 overflow-scroll mb-3">
        <li className="nav-item">
          <Link 
            href={'/'+lang+'/my/profile'} 
            className={`nav-link text-truncate text-bg-${(route == '/' + lang + '/my/profile' ? 'primary active' : theme)}`}
          >
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            href={'/'+lang+'/my/profile/preferences'} 
            className={`nav-link text-truncate text-bg-${(routeMatch('/preferences') ? 'primary active' : theme)}`}
          >
            Preferences
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            href={'/'+lang+'/my/profile/friends'} 
            className={`nav-link text-truncate text-bg-${(routeMatch('/friends') ? 'primary active' : theme)}`}
          >
            Friends
          </Link>
        </li>
      </ul>
      <div className="card-body h-100">
        {children}
      </div>
    </div>
  );
};

export default LayoutProfile;
