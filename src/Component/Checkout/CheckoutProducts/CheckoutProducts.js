import React from 'react'
import { useStateValue } from '../../../API/StateProvider'
import './CheckoutProducts.css'

function CheckoutProducts( {id, des, image, price, ratings} ) {
    const [ {basket}, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id
        })
    }
    return (
        <div className="cp" >
            <img className="cp__img" src={image} />
            <div className="cp__info">
                <p className="cp__des"> {des} </p>
                <span>
                <small>$</small>
                <strong> {price} </strong>    
                </span> 
                <div className="cp__rating">
                    {Array(ratings).fill().map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                <button onClick={removeFromBasket}> Remove from basket </button>
            </div>       
        </div>
    )
}

export default CheckoutProducts
