import styled from 'styled-components';

const ForceFocusWrapper = styled.span<{ isForceFocused: boolean }>`
  outline: ${({ isForceFocused, theme }) => (isForceFocused ? theme.focusOutline : 'none')};
`;

export default ForceFocusWrapper;