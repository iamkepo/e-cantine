import { useState } from "react";

export function useCheckList (arr?: number[]) {

  const [checkList, setCheckList] = useState<number[]>([]);
  
  const handleCheckList = (id: number) => {
    if (checkList.length > 0) {
      if (checkList.includes(id)) {
        setCheckList([...checkList.filter(el => el != id)]);
      } else {
        setCheckList([...checkList, id]);
      }
    } else {
      setCheckList([id]);
    }
  };
  const checkAllList = () => {
    if(arr?.length == checkList.length) {
      return setCheckList([]) 
    }else {
      return setCheckList(arr?.map((el) => (el)) as number[])
    }
  };

  return {
    checkList,
    checkAllList,
    handleCheckList
  }
}