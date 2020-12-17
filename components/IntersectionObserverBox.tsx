import { useCallback, useState, useEffect } from "react";

function IntersectionObserverBox<
  RefType extends HTMLElement,
  IDType extends unknown,
  Props
>({
  options,
  Component,
  id,
  callback,
  props,
}: {
  options?: IntersectionObserverInit;
  Component: React.ComponentType<
    Props & {
      ref: React.Ref<RefType>;
    }
  >;
  id: IDType;
  callback: (id: IDType) => IntersectionObserverCallback;
  props: Props;
}): JSX.Element {
  const [componentRef, setComponentRef] = useState<RefType | null>(null);

  const refCallback = useCallback<(node: RefType | null) => void>(
    (node) => {
      if (node && node !== componentRef) {
        console.log("setting");
        setComponentRef(node);
      }
    },
    [componentRef]
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    if (componentRef) {
      observer = new window.IntersectionObserver(callback(id));
      observer.observe(componentRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback, componentRef, id, options]);

  return <Component {...props} ref={refCallback} />;
}

export default IntersectionObserverBox;
