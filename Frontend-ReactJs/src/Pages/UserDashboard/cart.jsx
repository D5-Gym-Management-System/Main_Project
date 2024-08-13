import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Page_Styling/cart.css';

const Cart = () => {
    // Sample cart items
    const [cartItems, setCartItems] = useState([
      // { id: 1, name: 'Item 1', price: 19.99, quantity: 1 },
      // { id: 2, name: 'Item 2', price: 9.99, quantity: 2 },
      // { id: 3, name: 'Item 3', price: 29.99, quantity: 1 },
    ]);
  
    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    // Handle quantity change
    const handleQuantityChange = (id, quantity) => {
      const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
      const newCartItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(newCartItems);
    };
  
    // Handle item removal
    const handleRemoveItem = id => {
      const newCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(newCartItems);
    };
  
    return (
      (cartItems.length)?  <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          <button className="checkout-button">Checkout</button>
          {/* <Link to="/" className="home-button">Home</Link> */}
        </div>
      </div>:<h1>Cart is empty</h1>
    
        
    );
};

export default Cart;
