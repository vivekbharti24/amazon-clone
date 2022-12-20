import React from 'react'
import './SubTotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../../API/StateProvider'
import { getTotalAmount } from '../../../API/reducer'
import { useHistory } from 'react-router-dom'

function SubTotal() {
    const [{basket}, dispatch] = useStateValue()
    const history = useHistory()

    return (
        <div className='subtotal'>
           <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            SubTotal ({basket.length} items ): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />
                            This order contains a gift
                        </small>
                    </>
                )}
                decimalScale = {2}
                value = {getTotalAmount(basket)}
                displayType = {"text"}
                thousandSeparator = {true}
                prefix = {"$"}   
           />
           <button  onClick={ (e)=> history.push('/payment') }> Proceed to checkout </button>
        </div>
    )
}

export default SubTotal
