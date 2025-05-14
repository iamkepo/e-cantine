"use client";
import React from 'react';
import { IField } from '../FormComponent';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { useThemeStore } from '@/stores/themeStore';

export const renderSelectField = (
  field: IField,
  index: React.Key | null | undefined,
  control: unknown,
  errors: FieldErrors<FieldValues>
) => (
  <SelectFieldInternal
    field={field}
    index={index}
    control={control}
    errors={errors}
  />
);

const SelectFieldInternal: React.FC<{
  field: IField;
  index: React.Key | null | undefined;
  control: unknown;
  errors: FieldErrors<FieldValues>;
}> = ({ field, index, control, errors }) => {
  const { theme } = useThemeStore();
  return (
    <div key={index} className={`${field.colSize} mb-3`}>
      {field.label ? (
        <label htmlFor={field.id} className="form-label" aria-label={field.label}>
          {field.label}
        </label>
      ) : null}
      <Controller
        name={field.id}
        control={control as Control<FieldValues>}
        defaultValue={field.value || ''}
        render={({ field: { onChange, value } }) => (
          <select
            id={field.id}
            className={`form-select text-bg-${theme}`}
            value={value}
            onChange={onChange}
          >
            <option value="">{field.placeholder || 'Select'}</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors[field.id]?.message ? (
        <p className="text-danger">{String(errors[field.id]?.message)}</p>
      ) : null}
    </div>
  );
};
