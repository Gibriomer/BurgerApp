import React, { Component } from 'react'

import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

//this could be a function component doesnt have to be a class..
class OrderSummery extends Component {
    
    componentDidUpdate() {
        // console.log('ordering suumery')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return (
                    <li key={igkey}>
                        <span style={{ textTransform: 'capitalize' }}>{igkey}</span>: {this.props.ingredients[igkey]}
                    </li>)
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following topings</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total prics:  ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }


}

export default OrderSummery;
