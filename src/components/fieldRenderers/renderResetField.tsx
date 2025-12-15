import React from 'react';
import { Field } from '@/core/types';

export const renderResetField = (field: Field & { color?: string }) => (
  <button type="reset" className={`btn btn-${field.color} w-100`}>
    {field.label}
  </button>
);
