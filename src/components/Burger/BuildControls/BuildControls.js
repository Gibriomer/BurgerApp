import React from 'react'

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat (100g ground beef)', type: 'meat' },
    { label: 'Bacon (3 pcs)', type: 'bacon' },
    { label: 'Cheese (Orange Cheder)', type: 'cheese' },
    { label: 'Salad (Tomato Lettuce & Onion)', type: 'salad' }
];


const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map((ctrl) => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.addToping(ctrl.type)}
                removed={() => props.removeToping(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        })}
        <p className={classes.Price}>total: <strong>${props.price.toFixed(2)}</strong></p>
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderd}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
)

export default BuildControls
