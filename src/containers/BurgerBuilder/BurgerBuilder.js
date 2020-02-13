import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import classes from './BurgerBuilder.module.css';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxi';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetRedirectAuthPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHendler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Somthing went wrong</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addToping={this.props.onIgredientAdded}
                        removeToping={this.props.onIgredientRemoved}
                        price={this.props.price}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchase(this.props.ings)}
                        orderd={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            )
            orderSummary = <OrderSummery
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHendler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price} />;
        };

        return (
            <div className={classes.Burger}>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHendler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIgredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIgredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectAuthPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
