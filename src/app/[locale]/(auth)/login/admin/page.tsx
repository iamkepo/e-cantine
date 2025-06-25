/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import AuthRepository from "@/frontend/repositories/auth.repository";
import { yupResolver } from "@hookform/resolvers/yup";
import FormComponent from "@/components/FormComponent";
import { Field } from "@/core";
import { toast } from "@/stores/appStore";
import { setTokenAndRefreshToken } from "@/stores/useAuthStore";

const Page: React.FC = () => {
  const router = useRouter();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();

  const onSubmit = async (data: any) => {
    repository.loginAdmin(data).then((response: any) => {
      setTokenAndRefreshToken({token: response?.data.accessToken, refreshToken: response?.data.refreshToken});
      router.push('/'+lang+'/dashboard');
    }).catch((error) => {
      toast.danger(JSON.stringify(error));
    });
  };

  const repository = useMemo(() => new AuthRepository(), []);
    const methods = useForm({
      resolver: yupResolver(repository.loginSchema)
    }); // Initialize react-hook-form with yupResolver
    const { handleSubmit } = methods;

  return (
    <div className="col-11 col-md-6 col-lg-4">
      <div className={`card p-3 text-bg-${theme}`}>
        <FormProvider {...methods}> {/* Provide form context */}
          <form onSubmit={handleSubmit(onSubmit)} className="col-12 d-flex flex-column gap-2">
            <h3 className="text-center mb-3">Login</h3>
            <FormComponent fields={repository.formLogin() as (Field | Field[])[]} />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
