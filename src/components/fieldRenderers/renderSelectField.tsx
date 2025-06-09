"use client";
import React from 'react';
import { Field } from '@/core/types';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { useThemeStore } from '@/stores/themeStore';

export const renderSelectField = (
  field: Field,
  control: unknown,
  errors: FieldErrors<FieldValues>
) => (
  <SelectFieldInternal
    field={field}
    control={control}
    errors={errors}
  />
);

const SelectFieldInternal: React.FC<{
  field: Field;
  control: unknown;
  errors: FieldErrors<FieldValues>;
}> = ({ field, control, errors }) => {
  const { theme } = useThemeStore();
  return (
    <>
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
    </>
  );
};
