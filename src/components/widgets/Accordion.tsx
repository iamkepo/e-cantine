import React, { useState } from "react";
import { useThemeStore } from "../../stores/themeStore";
interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [show, setShow] = useState<boolean>(false);
  const { theme } = useThemeStore();

  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${show ? 'collapsed' : ''} text-bg-${theme}`}
            type="button"
            onClick={()=> setShow(!show)}
          >
            {title}
          </button>
        </h2>
        <div className={`accordion-collapse collapse ${show ? 'show' : ''} text-bg-secondary`}>
          <div className="accordion-body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;