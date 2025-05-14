/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import { useFormContext } from 'react-hook-form';
import { renderInputField } from './fieldRenderers/renderInputField';
import { renderPasswordField } from './fieldRenderers/renderPasswordField';
import { renderTextareaField } from './fieldRenderers/renderTextareaField';
import { renderSelectField } from './fieldRenderers/renderSelectField';
import { renderSearchSelectField } from './fieldRenderers/renderSearchSelectField';
import { renderCheckboxField } from './fieldRenderers/renderCheckboxField';
import { renderRadioField } from './fieldRenderers/renderRadioField';
import { renderFileField } from './fieldRenderers/renderFileField';
import { renderDateTimeField } from './fieldRenderers/renderDateTimeField';
import { renderButtonField } from './fieldRenderers/renderButtonField';
import { renderSubmitField } from './fieldRenderers/renderSubmitField';
import { renderResetField } from './fieldRenderers/renderResetField';

export interface IField {
  type: 'section' | 'text' | 'email' | 'tel' | 'number'| 'textarea' | 'file' | 'date' | 'checkbox' | 'select' | 'searchSelect' | 'radio' | 'password' | 'button' | 'submit' | 'reset' | 'range' | 'time' | 'datetime-local' | 'month' | 'week' | 'search'  | 'datetime';
  id: string;
  label?: string;
  placeholder?: string;  
  colSize: string;
  color?: string;
  options?: { label: string; value: string }[];  
  isChecked?: boolean;  
  multiple?: boolean;  
  readOnly?: boolean;  
  value?: any;
  accept?: string;
  min?: number;
  max?: number;
  step?: number;
};

interface FormComponentProps {
  fields: (IField | IField[])[];
};

const FormComponent: React.FC<FormComponentProps> = ({ fields }) => {
  const { control, formState: { errors } } = useFormContext(); // Access the form context and errors
  const { theme } = useThemeStore();
  
  const renderField = (field: IField, index: number) => {
    switch (field.type) {
      case 'section':
        return (
          field.label ? <div key={index} className={`${field.colSize} mb-3`}><h5>{field.label}</h5></div> : false
        );
      case 'text':
      case 'email':
      case 'tel':
      case 'search':
      case 'number':
        return renderInputField(field, index, control, errors);
      case 'password':
        return renderPasswordField(field, index, control, errors);
      case 'textarea':
        return renderTextareaField(field, index, control, errors, theme);
      case 'select':
        return renderSelectField(field, index, control, errors);
      case 'searchSelect':
        return renderSearchSelectField(field, index, control, errors);
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'time':
      case 'range':
        return renderDateTimeField(field, index, control, errors, theme);
      case 'file':
        return renderFileField(field, index, control, errors, theme);
      case 'checkbox':
        return renderCheckboxField(field, index, control, errors);
      case 'radio':
        return renderRadioField(field, index, control, errors);
      case 'button':
        return renderButtonField(field, index);
      case 'submit':
        return renderSubmitField(field, index);
      case 'reset':
        return renderResetField(field, index);
      default:
        return null;
    }
  };

  return (
    <div className="row row-cols-4 g-3 mb-0">
      {fields.map((fieldGroup, index) => {
        if (Array.isArray(fieldGroup)) {
          return (
            <div key={index} className={`col`}>
              <div className={`card text-bg-${theme} p-3`}>
                {fieldGroup.map((field, i) => renderField(field, i)
                )}
              </div>
              
            </div>
          );
        }
        return renderField(fieldGroup as IField, index);
      })}
    </div>
  );
};

export default FormComponent;