import { RequestState, RequestType, Meta } from "@/core/types";
import { useCallback, useState } from "react";



const useDataFetch = <T>() => {
  const [state, setState] = useState<Record<RequestType, RequestState<T>>>({
    get: { data: null, loading: false, error: null },
    getById: { data: null, loading: false, error: null },
    post: { data: null, loading: false, error: null },
    put: { data: null, loading: false, error: null },
    patch: { data: null, loading: false, error: null },
    delete: { data: null, loading: false, error: null },
    deleteMany: { data: null, loading: false, error: null }
  });

  const handleData = useCallback((
    rep: RequestType,
    key: keyof RequestState<T>,
    data: T | T[] | { data: T[], meta: Meta } | boolean | string | null
  ): void => {
    setState(prevState => {
      // Compare with previous state to prevent unnecessary updates
      if (prevState[rep]?.[key] === data) {
        return prevState;
      }
      return {
        ...prevState,
        [rep]: {
          ...prevState[rep],
          [key]: data
        }
      };
    });
  }, []); // No dependencies needed as we're using the setState updater function

  return { 
    state,
    handleData
  };
};

export default useDataFetch;