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
import { Field } from '@/core/types';

interface FormComponentProps {
  fields: (Field | Field[])[];
};

const FormComponent: React.FC<FormComponentProps> = ({ fields }) => {
  const { control, formState: { errors } } = useFormContext(); // Access the form context and errors
  const { theme } = useThemeStore();
  
  const renderField = (field: Field, index: number) => {
    switch (field.type) {
      case 'section':
        return (
          <div key={index} className={`${field.colSize} mb-2`}>
            {field.label ? <h5>{field.label}</h5> : null}
          </div>
        );
      case 'text':
      case 'email':
      case 'tel':
      case 'search':
      case 'number':
      case 'hidden':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderInputField(field, control, errors)}
          </div>
        );
      case 'password':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderPasswordField(field, control, errors)}
          </div>
        );
      case 'textarea':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderTextareaField(field, control, errors, theme)}
          </div>
        );
      case 'select':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderSelectField(field, control, errors)}
          </div>
        );
      case 'searchSelect':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderSearchSelectField(field, control, errors)}
          </div>
        );
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'time':
      case 'range':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderDateTimeField(field, control, errors, theme)}
          </div>
        );
      case 'file':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderFileField(field, control, errors, theme)}
          </div>
        );
      case 'checkbox':
        return (
          <div key={index} className={`${field.colSize} mb-3 form-check`}>
            {renderCheckboxField(field, control, errors)}
          </div>
        );
      case 'radio':
        return (
          <div key={index} className={`${field.colSize} mb-3`}>
            {renderRadioField(field, control, errors)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="row row-cols-4 g-2 mb-0">
      {fields.map((fieldGroup, index) => {
        if (Array.isArray(fieldGroup)) {
          return (
            <div key={index} className={`col`}>
              <div className={`card text-bg-${theme} p-2`}>
                {fieldGroup.map((field, i) => renderField(field, i)
                )}
              </div>
            </div>
          );
        }
        return renderField(fieldGroup as Field, index);
      })}
    </div>
  );
};

export default FormComponent;