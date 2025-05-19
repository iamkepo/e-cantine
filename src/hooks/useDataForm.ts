/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useHandleError } from "./useHandleError";

export const useDataForm = <T extends (params?: any)=> Promise<any>>(req: T) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const {error, setError, handleError} = useHandleError();

  // Fonction pour gérer la soumission du formulaire
  const on = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await req();
      setData(res)
    } catch (err: any) {
      handleError(err)
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    setData,
    on, 
    loading, 
    error, 
  };
};