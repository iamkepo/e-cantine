"use client";
import React from 'react';
import { IField } from '../FormComponent';

export const renderButtonField = (field: IField, index: React.Key | null | undefined) => (
  <div key={index} className={`${field.colSize} mb-3`}>
    <button type="button" className={`btn btn-${field.color} ${field.colSize}`} onClick={field.value}>
      {field.label}
    </button>
  </div>
);
