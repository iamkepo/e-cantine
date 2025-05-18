"use client";
import React, { useState } from 'react';
import { IField } from '../FormComponent';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { useThemeStore } from '../../stores/themeStore';

export const renderPasswordField = (
  field: IField,
  control: unknown,
  errors: FieldErrors<FieldValues>
) => (
  <PasswordFieldInternal
    field={field}
    control={control}
    errors={errors}
  />
);

const PasswordFieldInternal: React.FC<{
  field: IField;
  control: unknown;
  errors: FieldErrors<FieldValues>;
}> = ({ field, control, errors }) => {
  const { theme } = useThemeStore();
  const [showEye, setShowEye] = useState<boolean>(false);

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
          <div className="col-12 position-relative">
            <input
              type={showEye ? 'text' : field.type}
              id={field.id}
              className={`form-control text-bg-${theme}`}
              placeholder={field.placeholder || ''}
              readOnly={field.readOnly}
              value={value}
              onChange={onChange}
            />
            <i
              className={`bi bi-eye${showEye ? '' : '-slash'} position-absolute top-0 end-0 p-2`}
              onClick={() => setShowEye(!showEye)}
              style={{ cursor: 'pointer' }}
              aria-label={showEye ? 'Hide password' : 'Show password'}
            ></i>
          </div>
        )}
      />
      {errors[field.id]?.message ? (
        <p className="text-danger">{String(errors[field.id]?.message)}</p>
      ) : null}
    </>
  );
};
