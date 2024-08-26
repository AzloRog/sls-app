import { useCallback, useRef } from "react";

export const usePagination = (onChangePage: () => any, isLoading: boolean) => {
  const observer = useRef<IntersectionObserver>();

  const lastPostElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onChangePage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return [lastPostElementRef];
};

export default usePagination;
