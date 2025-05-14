"use client";
import React from 'react';
import { IField } from '../FormComponent';

export const renderResetField = (field: IField, index: React.Key | null | undefined) => (
  <div key={index} className={`${field.colSize} mb-3`}>
    <button type="reset" className={`btn btn-${field.color} ${field.colSize}`}>
      {field.label}
    </button>
  </div>
);
