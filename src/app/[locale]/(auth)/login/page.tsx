/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLangStore } from "@/stores/langStore";
import { inverseTheme, useThemeStore } from "@/stores/themeStore";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import AuthRepository from "@/frontend/repositories/auth.repository";
import { yupResolver } from "@hookform/resolvers/yup";
import FormComponent from "@/components/FormComponent";
import { Field } from "@/core";
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
    resolver: yupResolver(repository.loginSchema)
  });
  const { handleSubmit } = methods;
  
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Sign in with better-auth
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Login successful");
            router.push('/' + lang);
          },
          onError: (error: any) => {
            toast.danger(error?.message || "Login failed");
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
          <form onSubmit={handleSubmit(onSubmit)} className="col-12 d-flex flex-column gap-2">
            <h3 className="text-center mb-3">Login</h3>
            <FormComponent fields={repository.formLogin() as (Field | Field[])[]} />
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="text-center mb-2">Or</p>
            <SocialAuthButtons isLoading={isLoading} fields={repository.formSocial(inverseTheme(theme))} />
            
            <p className="text-center mb-2">
              <span>Vous n&apos;avez pas encore un compte ?</span>
              <Link href={'/' + lang + '/register'} className="text-primary ms-2">Register</Link>
            </p>
            
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
