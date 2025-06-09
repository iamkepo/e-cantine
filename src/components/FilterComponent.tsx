/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FormComponent from "./FormComponent";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Field } from '@/core/types';

interface FilterComponentProps {
  fields: Field[];
  schema: any;
  onSubmit: (data: any) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ fields, schema, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(schema)
  }); // Initialize react-hook-form with yupResolver
  const { handleSubmit } = methods;

  const submit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}> {/* Provide form context */}
      <form onChange={handleSubmit(submit)} className="col-12">
        <FormComponent fields={fields as (Field | Field[])[]} />
      </form>
    </FormProvider>
  );
};

export default FilterComponent;