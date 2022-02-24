
import { Cashout } from './pages/Cashout'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
 import { CartContextProvider } from './Global/CartContext'
import { ProductsContextProvider } from './Global/ProductsContext'
import './App.css';
import { auth, db } from './firebase/firebase.js'
import { useState,useEffect } from 'react';
import { Cart } from './pages/Cart'
import Home from './pages/Home'
import AddProducts from './pages/AddProducts'
import Signup from './pages/SignUp'
import Login from './pages/Login'

function App(){

const [usernow,setUser] = useState('')





 // to check firebase auth state
 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
 
    if (user) {
      db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
          setUser(snapshot.data().Name)
      })
  }
  else {
     setUser(null)
  }



    
  });
  // cleanup
  return () => unsubscribe();
}, []);





  return (
    <ProductsContextProvider>
         <CartContextProvider>
      <BrowserRouter>


        <Switch>
          {/* <Route exact path='/' component={Home} /> */}
          <Route exact path='/' component={() => <Home user={usernow} />} />
          <Route path="/addproducts" component={AddProducts} />
          <Route path="/signup" component={Signup} />

   {/* login */}
   <Route path="/login" component={Login} />
   <Route path="/cart" component={() => <Cart user={usernow} />} />
   <Route path='/cash' component={() => <Cashout user={usernow} />} />

        </Switch>
      </BrowserRouter >
      </CartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
