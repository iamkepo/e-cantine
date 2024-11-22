"use client";

import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";

interface AccordionProps {
  title: string;
  content: (string | DateObject | Date)[]; // Maintien du type mixte
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [show, setShow] = useState<boolean>(false);
  // Convertir tous les éléments en chaînes pour garantir un affichage correct


  return (
    <div className="accordion mb-3">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            onClick={()=> setShow(!show)}
          >
            {title}
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${show ? 'show' : ''}`}
        >
          <div className="accordion-body">
            {content.length > 0 ? (
              <span className="small">{content.join(", ")}</span>
            ) : (
              <span className="text-muted">No dates available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;