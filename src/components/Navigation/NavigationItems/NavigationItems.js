import React from 'react'

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {props.isLogin
            ? <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/' exact>Login</NavigationItem>}
        <NavigationItem link='/burger-builder'>Burger Builder</NavigationItem>
        {props.isLogin ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
        
    </ul>
)

export default NavigationItems;
