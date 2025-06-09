"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { Field } from '@/core/types';

export const renderTextareaField = (field: Field, control: Control<FieldValues> | undefined, errors: FieldErrors<FieldValues>, theme: string) => (
  <>
    {field.label ? <label htmlFor={field.id} className='form-label' aria-label={field.label}>{field.label}</label> : false}
    <Controller
      name={field.id}
      control={control}
      defaultValue={field.value || ''}
      render={({ field: { onChange, value } }) => (
        <textarea
          id={field.id}
          className={`form-control text-bg-${theme}`}
          rows={5}
          placeholder={field.placeholder || ''}
          readOnly={field.readOnly}
          value={value}
          onChange={onChange}
        ></textarea>
      )}
    />
    {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
  </>
);
