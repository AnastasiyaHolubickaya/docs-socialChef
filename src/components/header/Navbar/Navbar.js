import React from "react";
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";



class Navbar extends React.Component {
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
    /* handleClickItem () {
         this.state.menuDisplay ? this.setState(state =>({menuDisplay: false})) : this.setState(state =>({menuDisplay: true}));
     };
     */




    render(){
        return (
            <div  className={classes.navbarMenu}>
                <div   className={classes.burger} onClick={(e) => this.handleClickBurger(e)}    style={this.state.menuDisplay ?{ backgroundSize: '100%' }:{ backgroundSize:`200%` }} > </div>

                {/*<ListDropdown  menuDisplay={this.state.menuDisplay} callbackClickBurger={this.handleClickBurger}/>*/}

                    <ul className={classes.menu}  >
                        <li  className={classes.menuItem}><NavLink to="/#" activeClassName={classes.active}>Chef</NavLink></li>
                        <li  className={`${classes.menuItem} ${classes.dropdown}`}><NavLink to="/recipes" activeClassName={classes.active}>Рецепты</NavLink></li>
                        <ul className={classes.menuDropdown}>
                            <li className={classes.dropdownItem}><NavLink to="/soup" activeClassName={classes.active}>супы</NavLink> </li>
                            <li className={classes.dropdownItem}><NavLink to="/meet" activeClassName={classes.active}>мясное</NavLink></li>
                            <li className={classes.dropdownItem}><NavLink to="/fish" activeClassName={classes.active}>рыбное</NavLink></li>
                            <li className={classes.dropdownItem}><NavLink to="/bread" activeClassName={classes.active}>хлеб</NavLink></li>
                            <li className={classes.dropdownItem}><NavLink to="/desert" activeClassName={classes.active}>десерты</NavLink></li>
                            <li className={classes.dropdownItem}><NavLink to="/cookis" activeClassName={classes.active}>кондитерка</NavLink></li>
                        </ul>
                        <li  className={`${classes.menuItem} ${classes.li_block}`}><NavLink to="/news">Новости</NavLink>


                        </li>
                        <li  className={classes.menuItem}><NavLink to="/dialogs" activeClassName={classes.active} >чат</NavLink></li>
                        <li  className={classes.menuItem}><NavLink to="/users" activeClassName={classes.active}>Пользователи</NavLink></li>
                    </ul>

            </div>
        );


    }


}
export default Navbar;