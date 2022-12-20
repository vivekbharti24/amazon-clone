import './App.css';
import  Header from './Component/Header/Header'
import Home from './Component/Home/Hmoe'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Component/Checkout/Checkout';
import Login from './Component/Login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './API/StateProvider';
import Payment from './Component/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const promise = loadStripe("pk_test_51HzNmdDnTHzyHGCJyq8J4FPJPlU6iw6yLpIK5zItWQ7lK0IkhDD4xD4FuoeYgDT6Xo8SrJEUWdMysETe7J2raBJK00ReWU2Oj0")

function App() {
 const [ {basket}, dispatch] = useStateValue()

  useEffect( () => {
    auth.onAuthStateChanged( authUser =>{

      if(authUser){
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }else{
        dispatch({
          type:"SET_USER",
          user: authUser
        })
      }

    } )

  }, [] )

  return (
    <Router>
      <div className="app">
          <Switch>
            <Route path="/payment"> 
              <Header />
              <Elements stripe={promise} >
                <Payment />
              </Elements>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>  
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
