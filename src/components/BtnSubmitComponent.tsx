/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { modal } from '@/stores/appStore';
import SubmitComponent from './SubmitComponent';
import { Field } from '@/core/types';

interface BtnSubmitComponentProps {
  btn: {
    label: string;
    color: string;
    icon?: string;
  }
  submit: {
    title?: string;
    fields: (Field | Field[])[];
    schema?: any;
    btn: string;
  }
  onSubmit: (e: any) => void;
}

const BtnSubmitComponent: React.FC<BtnSubmitComponentProps> = ({ btn, onSubmit, submit }) => {
  return (
    <button 
      type="button" 
      className={`btn btn-${btn.color}`}
      onClick={() => modal.open(
        <SubmitComponent 
          title={submit.title}
          fields={submit.fields as unknown as Field[]}
          schema={submit.schema}
          btn={submit.btn}
          onSubmit={onSubmit}
        />
      )}
    >
      {btn?.icon && <i className={`bi bi-${btn.icon}`}></i>}
      <span className="d-none d-md-inline-block ms-2 fw-bold">{btn.label}</span>
    </button>
  );
};

export default BtnSubmitComponent;