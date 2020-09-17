import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {CartProvider} from './contexts/CartContext';
import { getFirestore } from './firebase';

import './App.css';

/* HEADER */
import NavBar from './components/NavBar/NavBar.js'
/* HOME */
import Home from './containers/Home/Home.js'
/* ITEM DETAIL*/
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer.js'
/* CART */
import Cart from './containers/Cart/Cart.js'
/* ITEMS X CATEGORY */
import ListItemCategories from './containers/ListCategories/ListItemCategories.js'

function App() {
  const [categories, setCategories] = useState(null);
  useEffect(()=>{
    const db = getFirestore();
    const itemCollection = db.collection('categories');
    itemCollection.get().then((querySnapshot) => {
      setCategories(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
      console.log('Categorias encontradas');
    })
  }, [])
  return (
    <BrowserRouter>
      <CartProvider value={[]} maxSize={15}>
        <div className="App">
          <header className="App-header">
            <NavBar categories={categories}/>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Home greeting="Bienvenido a HALLO"/>
              </Route>
              <Route path="/categories/:categoryId">
                <ListItemCategories />
              </Route>
              <Route path="/cart">
                <Cart/>
              </Route>
              <Route path="/item/:id">
                <ItemDetailContainer/>
              </Route>
            </Switch>
          </main>
          {/* FOOTER */}
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
