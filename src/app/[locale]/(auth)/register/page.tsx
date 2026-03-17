/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useLangStore } from "@/stores/langStore";
import { useRouter } from "next/navigation";
import AuthRepository from "@/frontend/repositories/auth.repository";
import { Field } from "@/core";
import { inverseTheme, useThemeStore } from "@/stores/themeStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import FormComponent from "@/components/FormComponent";
import Link from "next/link";
import { toast } from "@/stores/appStore";
import { authClient } from "@/lib/auth-client";
import SocialAuthButtons from "@/components/SocialAuthButtons";

const Page: React.FC = () => {
  const router = useRouter();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);

  const repository = useMemo(() => new AuthRepository(), []);
  const methods = useForm({
    resolver: yupResolver(repository.registerSchema)
  });
  const { handleSubmit } = methods;

  const OnSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Sign up with better-auth
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: `${data.firstname} ${data.lastname}`,
        },
        {
          onSuccess: () => {
            toast.success('Registration successful');
            router.push('/' + lang + '/login');
          },
          onError: (error: any) => {
            toast.danger(error?.message || "Registration failed");
          }
        }
      );
    } catch (error: any) {
      toast.danger(error?.message || JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-11 col-md-6 col-lg-4">
      <div className={`card p-3 text-bg-${theme}`}>         
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(OnSubmit)} className="col-12 d-flex flex-column gap-2">
            <h3 className="text-center mb-3">Register</h3>
            <FormComponent fields={repository.formRegister() as (Field | Field[])[]} />
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              {isLoading ? "Loading..." : "Register"}
            </button>
            <p className="text-center my-3">Or</p>
            <SocialAuthButtons isLoading={isLoading} fields={repository.formSocial(inverseTheme(theme))} />
            <p className="text-center mb-0">
              <span>Vous avez déjà un compte ?</span>
              <Link href={'/' + lang + '/login'} className="text-primary ms-2">Login</Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
