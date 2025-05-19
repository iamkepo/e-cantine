/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@/stores/appStore";
import { useState } from "react";

export const useHandleError = () => {
  const [error, setError] = useState<string | null>(null);


  const handleError = (err: any) => {
    if (err?.message) {
      setError(err.message);
    } else {
      setError(JSON.stringify(err));
    }
    toast.danger(error as string)
  };

  return {
    error,
    setError,
    handleError,
  };
};
