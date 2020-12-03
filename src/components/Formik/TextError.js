import React from 'react'
import styled from "styled-components";


const StyledDiv = styled.div`
  font-size: 1rem;
  color: red;
  font-weight: 900;
`;
const TextError =(props)=>{
    return(
        <StyledDiv> {props.children}</StyledDiv>
    )
};
export default TextError;