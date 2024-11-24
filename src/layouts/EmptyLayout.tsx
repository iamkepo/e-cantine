import React from 'react';
import { Outlet } from "react-router-dom";
import { toggleTheme, useAppStore } from '../store/appStore';

const EmptyLayout: React.FC = () => {
  const { theme } = useAppStore();
  return (
    <main className={`${theme}-theme`}>    
      <section className={`container-full vh-100`}>
        <div className="text-end">
          <button
            type="button"
            aria-label={`Toggle theme to ${theme === "dark" ? "light" : "dark"}`}
            className={`btn btn-${theme}`}
            onClick={toggleTheme}
          >
            <i className={`bi bi-${theme === "dark" ? "sun" : "moon"}`}></i>
          </button>
        </div>
        <Outlet />
      </section>
    </main>
  );
};

export default EmptyLayout;