import { useRef, useEffect } from "react";

// Custom hook which can be used inside useEffect
// to determine if the useEffect call is a page
// render or triggered by a dependency array change
export const useDidMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
