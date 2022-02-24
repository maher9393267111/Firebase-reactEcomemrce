import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Products from './Products'

import {auth} from '../firebase/firebase'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
function Home({user}) {

const history =useHistory();

  useEffect(() => {
    // forcing user to signup
    auth.onAuthStateChanged(user => {
        if (!user) {
            history.push('/login');
        }
    })
})




  return (
    <div>

  
<Navbar user={user}/>

<Products/>



    </div>
  )
}



export default Home
