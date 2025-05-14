"use client";
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { IField } from '../FormComponent';

export const renderFileField = (field: IField, index: React.Key | null | undefined, control: unknown, errors: FieldErrors<FieldValues>, theme: string) => (
  <div key={index} className={`${field.colSize} mb-3`}>
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
  </div>
);
