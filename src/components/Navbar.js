import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { Icon } from 'react-icons-kit'

import {cart} from 'react-icons-kit/entypo/cart'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
function Navbar({user}) {
 const logo = 'https://raw.githubusercontent.com/HamzaAnwar1998/EcommercsWithReactAndFirebase/73ff13dd433f0c38ee71409befcd9df5be5b4ca0/src/images/ecommerce.svg'

    //  const [user] = useAuthState(auth)
const history = useHistory();


    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }



  return (
    <div className='navbox'>
    <div className='leftside'>
        <img src={logo} alt="" />
    </div>
    {!user && <div className='rightside'>
        <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
        <span><Link to="login" className='navlink'>LOGIN</Link></span>
    </div>}
    {user && <div className='rightside'>
        <span><Link to="/" className='navlink'>{user}</Link></span>
        <span><Link to="cart" className='navlink'><Icon icon={cart} /></Link></span>
        <span className='no-of-products'>totalQty</span>
        <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
    </div>}
</div>
  

  )
}


export default Navbar
