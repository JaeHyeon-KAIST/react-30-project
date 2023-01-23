import styled from '@emotion/styled';
import { border, color, layout, display, flexbox, typography, space, position } from 'styled-system';

const Button = styled.button`
  cursor: pointer;
  background-color: white;
  border: #ccc solid 1px;
  height: 32px;
  width: ${({square}) => square ? "32px" : "72px" };
  :hover {
    border-color: #06c;
    color: #06c;
  }
  ${layout}
  ${color}
  ${border}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`

export default Button;