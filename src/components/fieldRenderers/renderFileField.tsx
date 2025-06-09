"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { Field } from '@/core/types';

export const renderFileField = (field: Field, control: unknown, errors: FieldErrors<FieldValues>, theme: string) => (
  <>
    {field.label ? <label htmlFor={field.id} className="form-label">{field.label}</label> : false}
    <Controller
      name={field.id}
      control={control as Control<FieldValues>}
      defaultValue={null}
      render={({ field: { onChange } }) => (
        <input
          type="file"
          id={field.id}
          className={`form-control text-bg-${theme}`}
          accept={field.accept || undefined}
          multiple={field.multiple || false}
          readOnly={field.readOnly}
          onChange={e => onChange(field.multiple ? e.target.files : e.target.files?.[0] || null)}
        />
      )}
    />
    {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
  </>
);
