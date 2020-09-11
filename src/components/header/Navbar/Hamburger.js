import  React from "react";
import styled from "styled-components";
//import MenuBurger from "./MenuDropdown";

const StyledHamburger = styled.button`
  position: fixed;
   left: 12rem;
  top: 25px;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;
  div {
    position: relative;
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: #FF8E88;
     transition: all 0.3s linear;
    transform-origin: 1px;
  
    :first-child {
      transform: ${({ open }) =>
    (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) =>
    (open ? "translateX(20px)":"translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) =>
    (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media (max-width: 576px) {
   left:10rem;
  }
`;



const Hamburger = (props) => (
    <StyledHamburger
        open={props.open}
        onClick={() => props.setOpen(!props.open)}
    >
        <div />
        <div />
        <div />
    </StyledHamburger>
);

export default Hamburger;