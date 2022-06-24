import React, { useRef } from 'react';
import ForceFocusElement from './ForceFocusElement';

const Pseudo: FunctionComponent = () => {
  const localButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // if isKeyboardNavigationMode
    localButtonRef.current?.focus() // will trigger the focus code
  }, [])

  const whenYouLike = () => localButtonRef.current?.blur() // will trigger the blur code
  
  const handleOnClick = () => whenYouLike();

  return (
    <ForceFocusElement
        forwardedRef={localButtonRef}
        element={(
            <Button
                testId="record-voice-message-step-button-call"
                variant={ButtonVariant.Success}
                isCircular
                isDisabled={!stepStatuses.callStep.isActive}
                onClick={handleOnClick}
            >
                <PhoneRingingIcon
                    color={theme.icon02}
                    size={theme.iconSize2xs}
                />
            </Button>
        )}
    />)
};