import React from 'react';
import { Field } from '@/core/types';

export const renderButtonField = (field: Field & { color?: string }) => (
  <button type="button" className={`btn btn-${field.color} w-100`} onClick={field.value}>
    {field.label}
  </button>
);
