import { RequestState } from "@/core/types";
import { useCallback, useState } from "react";

const useDataFetch = <T>() => {
  const [state, setState] = useState({ 
    data: null, loading: false, error: null
  });

  // Memoize handleData to prevent unnecessary re-renders and state updates
  const handleData = useCallback((
    key: string,
    data: RequestState<T>
  ): void => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: data
      };
    });
  }, []);

  return { 
    state,
    handleData
  };
};

export default useDataFetch;