"use client";
import React from 'react';
import { modal } from '@/stores/appStore';
import ConfirmComponent from './ConfirmComponent';

interface BtnConfirmComponentProps {
  btn: {
    label: string;
    color: string;
    icon?: string;
  }
  confirm: {
    title: string;
    description: string;
  }
  onConfirm: () => void;
}

const BtnConfirmComponent: React.FC<BtnConfirmComponentProps> = ({ btn, onConfirm, confirm }) => {
  return (
    <button 
      type="button" 
      className={`btn btn-${btn.color}`}
      onClick={() => modal.open(
        <ConfirmComponent 
          title={confirm.title}
          description={confirm.description}
          onConfirm={onConfirm}
        />
      )}
    >
      {btn?.icon && <i className={`bi bi-${btn.icon}`}></i>}
      <span className="d-none d-md-inline-block ms-2 fw-bold">{btn.label}</span>
    </button>
  );
};

export default BtnConfirmComponent;