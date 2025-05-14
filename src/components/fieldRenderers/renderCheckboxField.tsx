"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { IField } from '../FormComponent';

export const renderCheckboxField = (field: IField, index: React.Key | null | undefined, control: unknown, errors: FieldErrors<FieldValues>) => (
  <div key={index} className={`${field.colSize} mb-3 form-check`}>
    <Controller
      name={field.id}
      control={control as Control<FieldValues>}
      defaultValue={field.isChecked || false}
      render={({ field: { onChange, value } }) => (
        <input
          type="checkbox"
          id={field.id}
          className="form-check-input"
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
      )}
    />
    {field.label ? <label htmlFor={field.id} className="form-check-label">{field.label}</label> : false}
    {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
  </div>
);
