import React, { useState, useEffect } from 'react';
import CartContext from './utils/CartContext';
import { Box } from 'rebass';
import Shop from './pages/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyCart from './pages/MyCart';
import Consumer from './pages/Consumer-Dashboard';
import Admin from './pages/Admin-Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faSignInAlt, faShoppingCart, faHome, faSignOutAlt, faChalkboardTeacher, faUser, faWarehouse, faChartLine, faChartPie, faDollarSign, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ProductPage from './pages/ProductPage';
import WithAuth from './components/WithAuth';
import API from './utils/API';
import './index.css'


library.add(faEnvelope, faKey, faSignInAlt, faShoppingCart, faHome, faSignOutAlt, faChalkboardTeacher, faGithub, faUser, faWarehouse, faChartLine, faChartPie, faDollarSign, faMoneyCheck);


function App() {
  const [user, setUser] = useState({});

  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState({
    items: [],
    addItem: (item) => setCart((curr) => ({ ...curr, items: [...curr.items, item] })),
    removeItem: (item) => setCart((curr) => ({ ...curr, items: [...curr.items.splice(...curr.items.indexOf(item), 1)] }))
  });
  useEffect(() => {
    API.loggedIn()
      .then(results => {
        console.log(results.data)
        setUser(results.data)
        setLoaded(true);
      })
      .catch(err => {
        console.log(err)
        setLoaded(true)
      })
  }, [])

  const handleLogout = () => {
    setUser({});
    API.logOut();
  }

  return (
    <>
      <CartContext.Provider value={cart}>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}>
            <div className="bg"></div>
            <Box
              sx={{
                p: 3
              }}>
              <Header />
            </Box>
            <Box
              sx={{
                flex: '1 1 auto',
                p: 3
              }}>
              {loaded ? (
                <Switch>
                  <WithAuth exact path="/" user={user} component={Shop} />
                  <Route exact path="/login" render={(props) => <Login {...props}
                    setUser={setUser}
                    user={user}
                  />
                  } />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/logout" logOut={handleLogout} />
                  <Route exact path="/shop" user={user} component={Shop} />
                  <Route exact path="/shop/:id" user={user} component={Shop} />
                  <Route exact path="/products/:ItemId"
                    render={(props) => <ProductPage {...props} user={user} />}
                  />
                  <Route exact path="/dashboard" user={user} component={Consumer} />
                  <Route exact path="/admin" user={user} component={Admin} />
                  <Route exact path="/cart" user={user} component={MyCart} />
                </Switch>) :
                (<h1> Loading... </h1>)
              }
            </Box>
            <Box
              sx={{
                p: 3
              }}>
              <Footer />
            </Box>
          </Box>
        </Router>
      </CartContext.Provider>
    </>
  );
}

export default App;
