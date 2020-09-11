import React, {useEffect, useRef} from "react";
import {useState} from "react";
//import classes from './Navbar.module.css'
//import {NavLink} from "react-router-dom";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const StyledMenu = styled.nav `
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-color: rgba(226, 215, 195, 0.8);
  z-index: 1;
  padding: 80px 0;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")};
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) =>
    (open ? "translateX(0)" :"translateX(-100%)")};
    @media (max-width: 524px) {
   width: 60%;
  }
`;
const StyledLink = styled(NavLink) `
  padding: 10px;
  font-size: 1rem;
  color: #000000;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  
  :hover {
    color: #ffffff;
    background-color:#FF7A73;
    cursor: pointer;
  }
`;
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },[ref, handler]
    );
}
const MenuBurger = ({mass})=> {

    const [open, setVisible] = useState(false);
    const close = () => setVisible(false);
    const ref = useRef();
    useOnClickOutside(ref, () => setVisible(false));
    const drawDropdownMenu  = (mass) => {
        return    ( mass.map(m =>
                <StyledLink key={m.id} onClick={() => close()} to={m.path} activeClassName={classes.active}>{m.title}</StyledLink>
        )

        )
    };


    return (
        <div ref={ref}>
            <StyledMenu open={open}>
                {drawDropdownMenu(mass)}
            </StyledMenu>
            <Hamburger open={open} setOpen={setVisible} />

        </div>
    );





};
export default MenuBurger;
/*<StyledLink onClick={() => close()}>Link 1</StyledLink>
                <StyledLink onClick={() => close()}>Link 2</StyledLink>
                <StyledLink onClick={() => close()}>Link 3</StyledLink>*/