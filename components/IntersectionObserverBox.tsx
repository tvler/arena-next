import { useEffect, useRef } from "react";

type IntersectionObserverBoxProps<RefType extends Element, IDType, Props> = {
  props: Props;
  options?: IntersectionObserverInit;
  Component: React.ComponentType<
    Props & {
      ref: React.Ref<RefType>;
    }
  >;
  id: IDType;
  callback: (id: IDType) => IntersectionObserverCallback;
  skip?: boolean;
};

function IntersectionObserverBox<RefType extends HTMLElement, IDType, Props>({
  options,
  Component,
  id,
  callback,
  skip = false,
  props,
}: IntersectionObserverBoxProps<RefType, IDType, Props>): JSX.Element {
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

  return <Component {...props} ref={componentRef} />;
}

export default IntersectionObserverBox;
