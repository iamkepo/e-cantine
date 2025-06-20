"use client";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/themeStore";
interface AccordionProps {
  title: string;
  content: React.ReactNode;
  checked?: boolean;
  badge?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, checked, badge }) => {
  const [show, setShow] = useState<boolean>(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setShow(checked || false);
  }, [checked]);

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${show ? 'collapsed' : ''} text-bg-${theme} d-flex justify-content-between`}
            type="button"
            onClick={()=> setShow(!show)}
          >
            <span className="fw-bold">{title}</span>
            {badge && <span className="badge bg-secondary ms-2">{badge}</span>}
          </button>
        </h2>
        <div className={`accordion-collapse collapse ${show ? 'show' : ''} text-bg-${theme}`}>
          <div className={`accordion-body text-bg-${theme} p-3`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;