import React from 'react';
import { Field } from '@/core/types';

export const renderSocialField = (field: Field & { disabled?: boolean, color?: string, icon?: string }) => (
  <button type="button" className={`btn btn-outline-${field.color} w-100`} onClick={field.value} disabled={field.disabled}>
    <i className={`bi bi-${field.icon}`}></i>
    <span className="ms-2">{field.label}</span>
  </button>
);