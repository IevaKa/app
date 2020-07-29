import { createGlobalStyle } from "styled-components";
import styled from "styled-components";


const darkGray = "rgba(82, 82, 82, 1)";
const lightGray = "rgba(156, 160, 163, 0.5)";
const ironBlue = "rgba(47, 199, 255, 1)";
const ironPurple = "rgba(135, 79, 255, 1)";
const ironRed = "rgba(248, 90, 91, 1)";
const ironYellow = "rgba(255, 215, 73, 1)";
const ironGreen = "rgba(57, 232, 197, 1)";

const lightBlue = "rgba(47, 199, 255, 0.2)";
const lightRed = "rgba(248, 90, 91, 0.25)";
const lightPurple = "rgba(135, 79, 255, 0.2)";
const lightYellow = "rgba(255, 220, 97, 0.1)";

const evenLighterGray = "rgba(245, 245, 245, 1)";

const darkBlue = "rgba(18, 129, 231, 0.2)";


const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
  }

  a {
  color: black;
  text-decoration: none;
  }

  a:hover {
    color: black;
    text-decoration: none;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background: ${(props) => (props.primary ? ironRed : "transparent")};
  font-size: 16px;
  border-radius: 50px;
  color: ${(props) => (props.primary ? "white" : "black")};
  border: ${(props) =>
    props.primary ? `2px solid ${ironRed}` : `2px solid ${"black"}`};
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
    border: 2px solid black;
    width: 260px;
    box-shadow: 0px 10px 10px ${evenLighterGray};
  }

  &:focus {
    outline: none;
  }
`;

const IronButton = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background: ${(props) => (props.negative ? ironRed : ironBlue)};
  font-size: 16px;
  border-radius: 50px;
  color: ${(props) => (props.negative ? 'white' : 'white')};
  border: ${(props) => (props.negative ? ironRed : `2px solid ${ironBlue}`)};
  margin: 2em 0.7em 0.7em 0.7em;
  padding: 0.15em 1em;
  width: 250px;
  height: 60px;
  box-shadow: ${(props) => (props.negative ? `0px 10px 10px ${darkBlue}` : `0px 10px 10px ${lightBlue}`)};
  transition: 0.2s all ease-out;

  &:hover {
    color: white;
    background-color: black;
    border: 2px solid black;
    width: 260px;
    box-shadow: 0px 10px 10px ${evenLighterGray};
  }

  &:focus {
    outline: none;
  }
`;

const StyledLink = styled.a`
  background: linear-gradient(to bottom, lightYellow 0%, lightYellow 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  color: black;
  text-decoration: none;
  transition: background-size 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background-size: 1px 30px;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export {
  GlobalStyles,
  evenLighterGray,
  darkGray,
  lightGray,
  ironBlue,
  ironPurple,
  ironRed,
  ironYellow,
  ironGreen,
  lightRed,
  lightBlue,
  lightYellow,
  lightPurple,
  Button,
  IronButton,
  StyledLink
};
