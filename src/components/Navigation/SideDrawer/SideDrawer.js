import React from 'react'

import classes from './SideDrawer.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxi';
import BackDrop from '../../UI/Backdrop/Backdrop'


const SideDrawer = (props) => {
    var attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.Nav}>
                    <NavigationItems isLogin={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
