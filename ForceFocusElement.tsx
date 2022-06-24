import React, {
  Children,
  FunctionComponent, PropsWithChildren, ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import ForceFocusWrapper from '../styled/ForceFocusWrapper';

interface ForceFocusProps {
  isForceFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const ForceFocus = React.forwardRef<HTMLButtonElement | HTMLInputElement, PropsWithChildren<ForceFocusProps>>(({
  isForceFocused,
  onFocus,
  onBlur,
  children,
}, ref) => {
  const forceFocusRef = useRef<HTMLButtonElement | HTMLInputElement>(null);

  // @ts-ignore
  useImperativeHandle(ref, () => ({
    focus: () => {
      onFocus();
      forceFocusRef?.current?.focus();
    },
    blur: () => {
      onBlur();
      forceFocusRef?.current?.blur();
    }
  }));

  return (
    <>
      {Children.count(children) === 1 && Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <ForceFocusWrapper isForceFocused={isForceFocused}>
              {React.cloneElement(child, {
                ref: forceFocusRef,
                forwardedRef: forceFocusRef, // vcc-ui-button is passing as ref, vcc-ui-input as forwardedRef
              })}
            </ForceFocusWrapper>);
        }
        return null;
      })}
    </>
  );
});

interface ForceFocusElementProps {
  forwardedRef: React.Ref<HTMLButtonElement | HTMLInputElement>;
  element: ReactElement;
}

const ForceFocusElement: FunctionComponent<ForceFocusElementProps> = ({
  forwardedRef,
  element,
}) => {
  const [isForceFocused, setIsForceFocused] = useState<boolean>(false);

  const onFocusCallback = () => setIsForceFocused(true);
  const onBlurCallback = () => setIsForceFocused(false);

  return (
    <ForceFocus
      ref={forwardedRef}
      isForceFocused={isForceFocused}
      onFocus={onFocusCallback}
      onBlur={onBlurCallback}
    >
      {element}
    </ForceFocus>
  );
};

export default ForceFocusElement;
