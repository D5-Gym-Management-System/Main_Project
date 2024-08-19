import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import '../../Page_Styling/gymproduct.css';
import { FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const GymProducts = ({ onCartClick }) => {
    const products = [
        { id: 1, name: 'Dumbbells', price: 4090.99, image: 'dumbells.jpg', description: 'Set of 2 adjustable dumbbells.' },
        { id: 2, name: 'Yoga Mat', price: 796.99, image: 'mat.jpg', description: 'Non-slip yoga mat.' },
        { id: 3, name: 'Treadmill', price: 55999.99, image: 'treadmill.jpg', description: 'High-quality treadmill for home workouts.' },
        { id: 4, name: 'Resistance Bands', price: 240.99, image: 'band.jpg', description: 'Set of resistance bands with different levels.' },
        { id: 5, name: 'Protein Powder', price: 490.99, image: 'protein_powder.jpg', description: 'Protein powder for muscle growth.' },
        { id: 6, name: 'Shoes', price: 866.99, image: 'gym_shoes.jpg', description: 'Non-slip gym shoes.' },
        { id: 7, name: 'Men Clothes', price: 1299.99, image: 'men-gym-clothes.jpg', description: 'High-quality gym clothes for men.' },
        { id: 8, name: 'Protein Shake', price: 440.99, image: 'protein_shaker.jpg', description: 'Protein shake for fitness.' },
        { id: 9, name: 'Protein Bar', price: 350.99, image: 'protein_bars.jpg', description: 'Delicious protein bars.' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.cartItems);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleAddToCart = (product) => {
        toast.info(`${product.name} added to cart`, {
            autoClose: 1500 // The notification will auto-close after 3 seconds
        });
        dispatch(addToCart(product));
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="gym-products-container">
            <div className="header">
                <h1>Gym Products</h1>
                <div className="cart-container1">
                    <button onClick={onCartClick}>
                        <FaShoppingCart className="cart-icon" />
                    </button>
                    <span className="cart-count">{totalItems}</span>
                </div>
            </div>

            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
                autoFocus
            />

            <div className="products-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={`../Resources/product_images/${product.image}`} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>₹{product.price.toFixed(2)}</p>
                        <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default GymProducts;
