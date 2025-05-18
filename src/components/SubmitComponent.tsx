/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormComponent, { IField } from "./FormComponent";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useThemeStore } from "../stores/themeStore";
import { modal } from "../stores/appStore";

interface SubmitComponentProps {
  title?: string;
  fields: (IField | IField[])[];
  schema?: any;
  btn: string;
  onSubmit: (data: any) => void;
}

const SubmitComponent: React.FC<SubmitComponentProps> = ({
  title,
  fields,
  schema,
  btn,
  onSubmit
}) => {
  const methods = useForm({
    resolver: yupResolver(schema)
  }); // Initialize react-hook-form with yupResolver
  const { handleSubmit } = methods;
  const { theme } = useThemeStore();


  // Form submission handler
  const submit = (data: any) => {
    // console.log('Form Data:', data);
    onSubmit(data);
  };

  return (
    <div className="col-12">      
      <FormProvider {...methods}> {/* Provide form context */}
        <form onSubmit={handleSubmit(submit)} className="col-12">

          {title ? <h3 className="text-center mb-3">{title}</h3> : false}

          <FormComponent fields={fields as (IField | IField[])[]} />

          <div className="d-flex align-items-center justify-content-between">
            <button className={`btn btn-${theme}`} onClick={modal.close}>Annuler</button>
            <button type="submit" className="btn btn-primary">{btn}</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SubmitComponent;