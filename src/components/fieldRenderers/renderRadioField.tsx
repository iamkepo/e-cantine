"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { IField } from '../FormComponent';

export const renderRadioField = (field: IField, index: React.Key | null | undefined, control: Control<FieldValues> | undefined, errors: FieldErrors<FieldValues>) => (
  <div key={index} className={`${field.colSize} mb-3`}>
    {field.label ? <label className='form-label'>{field.label}</label> : false}
    <div>
      {field.options?.map((option, idx) => (
        <div key={idx} className="form-check">
          <Controller
            name={field.id}
            control={control}
            defaultValue={field.value || ''}
            render={({ field: { onChange, value } }) => (
              <input
                type="radio"
                id={`${field.id}-${option.value}`}
                name={field.id}
                value={option.value}
                className="form-check-input"
                checked={value === option.value}
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
          <label className="form-check-label" htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
    {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
  </div>
);
