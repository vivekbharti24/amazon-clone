import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from '../../API/StateProvider'
import CheckoutProducts from '../Checkout/CheckoutProducts/CheckoutProducts'
import { getTotalAmount } from '../../API/reducer'
import CurrencyFormat from 'react-currency-format'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import axios from '../../axios'

function Payment() {
    const [ {basket, user}, dispatch ] = useStateValue()
    const history = useHistory()

    const stripe = useStripe()
    const element = useElements()

    const [processing, setProcessing] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [err, setErr] = useState(null)
    const [clientSecret, setClientSecret] = useState(true)

    useState( () => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payment/create?total=${getTotalAmount(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket] )

    console.log("the secret is", clientSecret)

    const handlesubmit= async (e) =>{
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe
            .confirmCardPayment( clientSecret, {
                payment_method : {
                    card: element.getElement(CardElement)
                }
            } ).then(({paymentIntent}) => {
                history.replaceState('/orders')

                setSucceeded(true)
                setErr(false)
                setProcessing(false)
            })
    }

    const handleCard = e => {
        setDisabled(e.empty)
        setErr( e.err ? e.err.message : "")
    }

    return (
        <div className="payment" >
            <h2> Checkout {basket.length} items </h2>
            <div className="payment__container">
                <div className="payment__title">
                    <p> Delivery & payment address </p>
                </div>
                <div className="payment__address">
                    <strong> {user? user.email : "Sign In to place order"} </strong>
                </div>
            </div>
            <div className="payment__container">
                <div className="payment__title">
                    <p> Products and prices </p>
                </div>
                <div className="payment__products">
                    {basket.map( item => (
                        <CheckoutProducts 
                            id={item.id}
                            des={item.des}
                            price={item.price}
                            ratings={item.ratings}
                            image={item.image}
                        />
                     ) )}
                </div>
            </div>
            <div className="payment__container">
                <div className="payment__title">
                    <p> Enter Your Card Details </p>
                </div>
                <div className="payment__details">
                    <form onSubmit={handlesubmit}>
                        <CardElement onChange={handleCard} />
                        <div className="payment__card">
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <>
                                        <p>
                                            Total Amount ({basket.length} items ): <strong>{value}</strong>
                                        </p>
                                    </>
                                )}
                                decimalScale = {2}
                                value = {getTotalAmount(basket)}
                                displayType = {"text"}
                                thousandSeparator = {true}
                                prefix = {"$"}   
                            />
                            <button disabled={processing || disabled || succeeded} > {processing? "Processing" : "Buy Now"} </button>
                        </div>
                    </form>   
                </div>
            </div>
        </div>
    )
}

export default Payment
