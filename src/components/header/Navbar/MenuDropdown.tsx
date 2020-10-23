import React, {RefObject, useEffect, useRef} from "react";
import {useState} from "react";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {menuItemsType} from "../../../redux/types/types";

const StyledMenu = styled.nav <{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-color: rgb(255, 255, 255, 0.9);
  z-index: 1;
  padding: 80px 0;
  flex-direction: column;
  text-align: left;
  display: ${({ open }) => (open ? "flex" : "none")};
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) =>
    (open ? "translateX(0)" :"translateX(-100%)")};
    @media (max-width: 524px) {
   width:60%;
  }
`;
const StyledLink = styled(NavLink)`
  padding: 10px;
  font-size: 1rem;
  color: #00BCDF;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.5s ease 0s;
  
  :hover {
    color: #ffffff;
    background-color:#00BCDF;
    color: #ffffff;
    cursor: pointer;
  }
`;
function useOnClickOutside(ref:RefObject<HTMLDivElement>, handler:(event: MouseEvent|TouchEvent)=>void) {
    useEffect(
        () => {
            const listener = (event: MouseEvent|TouchEvent) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target as Node)) {
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

type propsType={
    mass: Array<menuItemsType>
}

const MenuBurger:React.FC<propsType> = ({mass})=> {

    const [open, setVisible] = useState(false);
    const close = () => setVisible(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setVisible(false));
    const drawDropdownMenu  = (mass: Array<menuItemsType>) => {

        return    ( mass.map(m =>
                // @ts-ignore
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