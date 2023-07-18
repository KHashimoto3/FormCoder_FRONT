import { useEffect } from "react";

const useInterval = (callback: Function, delay?: number | null) => {
  useEffect(() => {
    //停止中でない場合実行
    if (delay !== null) {
      const interval = setInterval(() => callback(), delay || 0);
      return () => clearInterval(interval);
    }
  }, [callback, delay]);
};

export default useInterval;
