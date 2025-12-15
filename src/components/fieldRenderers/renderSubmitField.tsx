import React from 'react';
import { Field } from '@/core/types';

export const renderSubmitField = (field: Field & { color?: string }) => (
  <button type="submit" className={`btn btn-${field.color} w-100`}>
    {field.label}
  </button>
);
