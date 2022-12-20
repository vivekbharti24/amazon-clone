import React from 'react'
import { useStateValue } from '../../API/StateProvider'
import './Product.css'


function Product( {id, des, price, ratings, image} ) {
    const [ {basket} , dispatch] = useStateValue()
    const addToCart = () => {
        dispatch( {
            type: "ADD_TO_CART",
            item: {
                id: id,
                des: des,
                price: price,
                ratings: ratings,
                image: image
            }
        })
    }

    return (
        <div className="product" >
            <div className="product__info">
                {id}
                <p className="product__des"> {des} </p>
                <small>$</small>
                <big> {price} </big>
               <div className="product__rating">
                    {Array(ratings).fill().map( ( _, i ) => (
                        <p>🌟</p>
                    ))}
               </div>
            </div>
            <img className="product__img" src={image} alt="item"/>
            <button onClick={addToCart} >Add to Cart</button>
        </div>
    )
}

export default Product
