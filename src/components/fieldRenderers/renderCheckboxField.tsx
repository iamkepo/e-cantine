"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { Field } from '@/core/types';

export const renderCheckboxField = (field: Field, control: unknown, errors: FieldErrors<FieldValues>) => (
  <>
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
  </>
);
