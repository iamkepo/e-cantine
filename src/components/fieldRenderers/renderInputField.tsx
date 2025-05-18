"use client";
import React from 'react';
import { IField } from '../FormComponent';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { useThemeStore } from '../../stores/themeStore';

export const renderInputField = (
  field: IField,
  control: unknown,
  errors: FieldErrors<FieldValues>
) => (
  <InputFieldInternal
    field={field}
    control={control}
    errors={errors}
  />
);

const InputFieldInternal: React.FC<{
  field: IField;
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
          <input
            type={field.type}
            id={field.id}
            className={`form-control text-bg-${theme}`}
            placeholder={field.placeholder || ''}
            readOnly={field.readOnly}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors[field.id]?.message ? (
        <p className="text-danger">{String(errors[field.id]?.message)}</p>
      ) : null}
    </>
  );
};
