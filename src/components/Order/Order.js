import React from 'react'
import classes from './Order.module.css';


const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOutput = ingredients.map(ing => {
        return <div
            style={{
                textTransform: 'capitelize',
                display: 'inline-block',
                margin: '8px',
                padding: '8px',
                border: '1px solid #aaa',
                borderRadius: '10px',
                boxShadow: '0 3px 4px #333',
                backgroundColor: '#fff'
            }}
            key={ing.name}>
            {ing.name}: {ing.amount}
        </div>
    })

    return (
        <div className={classes.Order}>
            <div>ingredients: {ingredientOutput}</div>
            <p>price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}



export default Order
