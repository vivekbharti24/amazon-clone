import React from 'react'
import { useStateValue } from '../../API/StateProvider'
import './Checkout.css'
import CheckoutProducts from './CheckoutProducts/CheckoutProducts'
import SubTotal from './SubTotal/SubTotal'

function Checkout() {
    const [ {basket}, dispatch] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://mywifequitherjob.com/blog/wp-content/uploads/2013/08/AmazonProductAdsBanner.jpg" alt="ads" />
                <div className="checkout__yourItems">
                    <p className="checkout__title">
                        Your Basket List
                    </p>
                    <div className="checkout__products" >
                        {basket?.map( item => (
                            <CheckoutProducts 
                                id = {item.id}
                                des = {item.des}
                                image = {item.image}
                                price = {item.price}
                                ratings = {item.ratings}
                            />
                        ) )}
                    </div>
                </div>

            </div>
            <div className="checkout__right">
                <SubTotal />
            </div>
           
        </div>
    )
}

export default Checkout
