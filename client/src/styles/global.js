import { createGlobalStyle } from "styled-components";
import styled, { keyframes } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
        font-size: 16px;
    font-weight: 400;
  }
`;

const darkGray = "rgba(82, 82, 82, 1)";
const lightGray = "rgba(156, 160, 163, 1)";
const ironBlue = "rgba(47, 199, 255, 1)";
const ironPurple = "rgba(135, 79, 255, 1)";
const ironRed = "rgba(248, 90, 91, 1)";
const ironYellow = "rgba(255, 220, 97, 1)";
const ironGreen = "rgba(57, 232, 197, 1)";

const lightBlue = "rgba(47, 199, 255, 0.3)";
const lightRed = "rgba(248, 90, 91, 0.25)";
const lightPurple = "rgba(135, 79, 255, 0.2)";
const lightYellow = "rgba(255, 220, 97, 0.2)";

const evenLighterGray = "rgba(82, 82, 82, 0.15)";

const darkBlue = "rgba(18, 129, 231, 1)";

const Button = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background: ${(props) => (props.primary ? ironRed : "transparent")};
  font-size: 16px;
  border-radius: 50px;
  color: ${(props) => (props.primary ? "white" : "black")};
  border: ${(props) =>
    props.primary ? `1px solid ${ironRed}` : `1px solid ${"black"}`};
  margin: 0.7em;
  padding: 0.25em 1em;
  width: 250px;
  height: 60px;
  box-shadow: ${(props) =>
    props.primary
      ? `0px 10px 10px ${lightRed}`
      : `0px 10px 10px ${evenLighterGray}`};
  transition: 0.2s all ease-out;

  &:hover {
    color: white;
    background-color: black;
    border: 1px solid black;
    width: 260px;
    box-shadow: 0px 10px 10px ${evenLighterGray};
  }

  &:focus {
    outline: none;
  }
`;

export {
  GlobalStyles,
  darkGray,
  lightGray,
  ironBlue,
  ironPurple,
  ironRed,
  ironYellow,
  ironGreen,
  Button,
};
