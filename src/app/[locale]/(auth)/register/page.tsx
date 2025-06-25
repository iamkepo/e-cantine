/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { useLangStore } from "@/stores/langStore";
import { useRouter } from "next/navigation";
import AuthRepository from "@/frontend/repositories/auth.repository";
import { Field } from "@/core";
import { useThemeStore } from "@/stores/themeStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import FormComponent from "@/components/FormComponent";
import Link from "next/link";
import { toast } from "@/stores/appStore";

const Page: React.FC = () => {
  const router = useRouter();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const repository = useMemo(() => new AuthRepository(), []);
    const methods = useForm({
      resolver: yupResolver(repository.registerSchema)
    }); // Initialize react-hook-form with yupResolver
    const { handleSubmit } = methods;

  const OnSubmit = async (data: any) => {
    repository.register(data)
      .then((response) => {
        console.log(response);
        router.push('/' + lang + '/login');
      })
      .catch((error) => {
        toast.danger(error);
      });
  };

  return (
    <div className="col-11 col-md-6 col-lg-4">
      <div className={`card p-3 text-bg-${theme}`}>         
        <FormProvider {...methods}> {/* Provide form context */}
          <form onSubmit={handleSubmit(OnSubmit)} className="col-12 d-flex flex-column gap-2">

            <h3 className="text-center mb-3">Register</h3>

            <FormComponent fields={repository.formRegister() as (Field | Field[])[]} />

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </FormProvider>
        <p className="text-center my-3">Or</p>
        <p className="text-center">
          Vous avez déjà un compte ? 
          <Link href={'/' + lang + '/login'} className="text-primary"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
