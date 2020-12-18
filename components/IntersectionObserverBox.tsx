import { useEffect, useRef } from "react";

type IntersectionObserverBoxProps<
  RefType extends Element,
  IDType,
  ComponentProps
> = {
  componentProps: ComponentProps;
  options?: IntersectionObserverInit;
  Component: React.ComponentType<
    ComponentProps & {
      ref: React.Ref<RefType>;
    }
  >;
  id: IDType;
  callback: (id: IDType) => IntersectionObserverCallback;
  skip?: boolean;
};

function IntersectionObserverBox<
  RefType extends HTMLElement,
  IDType,
  ComponentProps
>({
  options,
  Component,
  id,
  callback,
  skip = false,
  componentProps,
}: IntersectionObserverBoxProps<RefType, IDType, ComponentProps>): JSX.Element {
  const componentRef = useRef<RefType>(null);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    if (!skip && componentRef.current) {
      observer = new window.IntersectionObserver(callback(id));
      observer.observe(componentRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback, id, options, skip]);

  return <Component {...componentProps} ref={componentRef} />;
}

export default IntersectionObserverBox;
