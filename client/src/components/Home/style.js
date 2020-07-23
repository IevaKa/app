import styled from "styled-components";
import {

  ironPurple,
  ironYellow,

} from "../../styles/global.js";

export const Box = styled.div`
  display: inline-block;
  background: ${ironPurple};
  width: 200px;
  height: 200px;
  transition: all 300ms ease-in-out;

  &:hover {
    width: 250px;
    height: 250px;
  }
`;

export const Test = styled.p`
  display: inline-block;
  background: ${ironYellow};
  width: 200px;
  height: 200px;
  transition: all 300ms ease-in-out;

`;

export const Hidden = styled.div`
  display: ${props => props.visibility ? 'block' : 'none'};
  position: absolute;
  top: 25vh;
  left: 25vw;
  background: ${ironYellow};
  width: 50vw;
  height: 50vh;
  transition: all 300ms ease-in-out;

`;

// export { Box, Test }
