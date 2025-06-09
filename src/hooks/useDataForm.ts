import { RequestState, RequestType } from "@/core/types";
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

  // Memoize handleData to prevent unnecessary re-renders and state updates
  const handleData = useCallback((
    rep: RequestType,
    key: keyof RequestState<T>,
    data: RequestState<T>[keyof RequestState<T>]
  ): void => {
    setState((prevState) => {
      // Skip state update if the value hasn't changed
      if (prevState[rep][key] === data) {
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
  }, []);

  return { 
    state,
    handleData
  };
};

export default useDataFetch;