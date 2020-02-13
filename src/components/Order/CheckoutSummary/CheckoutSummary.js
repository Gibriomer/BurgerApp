import React from 'react'

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div className={classes.Relayout}>
                <Burger ingredients={props.ingredients} />
            </div>
            <p><strong>Total: ${props.totalPrice}</strong></p>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        totalPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(CheckoutSummary);
