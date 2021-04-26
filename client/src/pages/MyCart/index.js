import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { Button } from "rebass";
import CartContext from "../../utils/CartContext";
import API from "../../utils/API";

const MyCart = () => {
  const cart = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    console.log(cart);
    let totalVal = 0;
    for (let i = 0; i < cart.items.length; i++) {
      totalVal += cart.items[i].fake_price;
    }
    setCartTotal(totalVal);
  }, [cart]);

  const handleCheckout = e => {
    e.preventDefault();

    API.postTransactions
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
  }

  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    // setCart(hardCopy);
  };

  return (
    <div className="cart">
      <h1>My Cart</h1>
      {/* <p>{cartItems}</p> */}
      <h3>Total: ${parseFloat(cartTotal)}</h3>
      <Button className="btn" onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default MyCart;
