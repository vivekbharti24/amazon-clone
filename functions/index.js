const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
    'sk_test_51HzNmdDnTHzyHGCJtIKqzI7nY8fvVZykDpOxRANtjbK5f94UX1isqtj3qcNX1n79uyB2cDE6CsPHHaFrSgZhzuAc00ipE29vKV'
)

//app config
const app = express()

//app middleware
app.use( cors( {origin:true} ) )
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.status(200).send('Hello nitish')
})

app.post('/payment/create', async (req, res) => {
    const total = res.query.total

    console.log("Payment request recived BOOM, Total", total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount : total,
        currency: "usd",
    }) 
    res.status(201).send({
        clientSecret: paymentIntent.client_Secret,
    })
})

//listen
exports.api = functions.https.onRequest(app)