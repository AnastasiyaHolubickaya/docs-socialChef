import React from "react";
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import MenuDropdown from "./MenuDropdown";


const Navbar = ({menuItems})=> {

    const drawMenu  = (mass) => {
        return    ( mass.map(m =>
            <li key={m.id} className={classes.menuItem}><NavLink to={m.path} activeClassName={classes.active}>{m.title}</NavLink></li>
         ))
    };

        return (
            <div  className={classes.navbarMenu}>
                   <div className={classes.burger}>
                       <MenuDropdown mass = {menuItems} />
                   </div>

                <ul className={classes.menu} >
                   { drawMenu(menuItems)}
                </ul>
            </div>
        );

};
export default Navbar;

/*class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDisplay: false
        };
        this.handleClickBurger = this.handleClickBurger.bind(this);
    }

    handleClickBurger () {
        this.state.menuDisplay ? this.setState(state =>({menuDisplay: false})) : this.setState(state =>({menuDisplay: true}));
    };
     <div   className={classes.burger} onClick={(e) => this.handleClickBurger(e)}    style={this.state.menuDisplay ?{ backgroundSize: '100%' }:{ backgroundSize:`200%` }} > </div>
   <MenuBurger mass = {mass}/>
    */