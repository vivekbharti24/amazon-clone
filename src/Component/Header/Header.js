import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import { ShoppingBasket } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../API/StateProvider'
import { auth } from '../../firebase'


function Header() {
    const [ {basket, user} , dispatch] = useStateValue()

    const userSignOut = () => {
        if(user){
            auth.signOut()
        }
    }
    
    return (
        <div className="header">
            <Link to="/">
              <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"/>
              </Link>
           
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav" >
                <Link to={!user && '/login'}>
                    <div className="header__option" onClick={userSignOut} >
                        <span className="header__lineOne"> {user ? `${user.email}` : "Guest" } </span>
                        <span className="header__lineTwo"> {user ? "Sign Out" : "Sign In"} </span>
                    </div>
                </Link>
                <div className="header__option" >
                    <span className="header__lineOne"> Returns </span>
                  <span className="header__lineTwo"> & Orders </span>
                </div>
                <div className="header__option" >
                     <span className="header__lineOne"> Your </span>
                    <span className="header__lineTwo"> Prime </span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasket />
                        <span className="header__lineTwo header__basketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
