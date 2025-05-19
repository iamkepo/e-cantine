/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FormComponent, { IField } from "./FormComponent";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FilterComponentProps {
  fields: IField[];
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
        <FormComponent fields={fields as (IField | IField[])[]} />
      </form>
    </FormProvider>
  );
};

export default FilterComponent;