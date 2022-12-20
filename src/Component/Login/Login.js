import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import './Login.css'

function Login() {
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const history = useHistory()

    //User  Login
    const userLogin = (e) => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then( (auth) => {
                if(auth){
                    history.push('/')
                }
            } ).catch( (err) => alert(err.message) ) 
    }

    //User Registration
    const registerUser = (e) => {
        e.preventDefault()

        auth
            .createUserWithEmailAndPassword( email, password)
            .then( (auth) => {
                if(auth) {
                    history.push('/')
                }
            }).catch( (err) => alert(err.message) )
    }


    return (
        <div className="login" >
            <img className="login__logo" src="https://purepng.com/public/uploads/large/amazon-logo-s3f.png" />
            <div className="login__credentials">
                <h1> Sign In </h1>

                <form>
                    <h5> E-mail </h5>
                    <input type="text" placeholder="Enter Your E-mail"  value={email}  onChange={ (e) => (setEmail(e.target.value))} />
                    <h5> Password </h5>
                    <input type="password" placeholder="Enter Your Password" value={password} onChange={ (e) => setPassword(e.target.value)} />
                </form>

                <button className="login__singhInbtn" onClick={userLogin} > Login  </button>

                <p> By continuing, you agree to Amazon's <a href="#"> Conditions of Use </a> and <a href="#"> Privacy Notice. </a> </p>

                <button className="login__register" onClick={registerUser} > Create Your Amazon Account </button>

            </div>
        </div>
    )
}

export default Login
