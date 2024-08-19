import '../../Page_Styling/cart.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/CartSlice';
import { Link } from 'react-router-dom';

const Cart = ({ onCheckoutClick }) => {
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleRemoveAll = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  return cartItems.length > 0 ? (
    <div className="cart-container">
      <Link to="/"></Link>
      <center><h2>Your Cart</h2></center>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>₹{item.price.toFixed(2)}</p>
            </div>
            <div className="item-quantity">
              <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        <h4>Total Items: {totalItems}</h4> 
        <button className="checkout-button" onClick={onCheckoutClick}>Checkout</button>
        <button className="remove-all-button btn btn-danger" onClick={handleRemoveAll}>Remove All</button> {/* Remove All button */}
      </div>
    </div>
  ) : (
    <h1>Cart is empty</h1>
  );
};

export default Cart;
