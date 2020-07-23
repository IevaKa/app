import { createGlobalStyle } from "styled-components";
import styled, { keyframes } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
        font-size: 16px;
    font-weight: 400;
  }
`

const darkGray = "rgba(82, 82, 82, 1)";
const lightGray = "rgba(156, 160, 163, 1)";
const ironBlue = "rgba(47, 199, 255, 1)";
const ironPurple = "rgba(135, 79, 255, 1)";
const ironRed = "rgba(248, 90, 91, 1)";
const ironYellow = "rgba(255, 220, 97, 1)";
const ironGreen = "rgba(57, 232, 197, 1)";

const Button = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: ${(props) => (props.primary ? ironPurple : ironRed)};
  border: ${(props) =>
    props.primary ? `2px solid ${ironPurple}` : `2px solid ${ironRed}`};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    color: white;
    background-color: ${(props) =>
      props.primary ? ironPurple : ironRed};
  }
`;

export { GlobalStyles, darkGray, lightGray, ironBlue, ironPurple, ironRed, ironYellow, ironGreen, Button }



