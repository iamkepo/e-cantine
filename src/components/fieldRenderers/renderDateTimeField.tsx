"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { IField } from '../FormComponent';

export const renderDateTimeField = (field: IField, index: React.Key | null | undefined, control: Control<FieldValues> | undefined, errors: FieldErrors<FieldValues>, theme: string) => (
  <div key={index} className={`${field.colSize} mb-3`}>
    {field.label ? <label htmlFor={field.id} className='form-label'>{field.label}</label> : false}
    <Controller
      name={field.id}
      control={control}
      defaultValue={field.value || ''}
      render={({ field: { onChange, value } }) => (
        <input
          type={field.type}
          id={field.id}
          className={`form-control text-bg-${theme}`}
          placeholder={field.placeholder || ''}
          readOnly={field.readOnly}
          value={value}
          onChange={onChange}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      )}
    />
    {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
  </div>
);
