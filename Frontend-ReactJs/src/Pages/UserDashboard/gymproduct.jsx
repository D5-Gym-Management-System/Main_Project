// src/components/GymProducts.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import React from 'react';
import '../../Page_Styling/gymproduct.css';

const GymProducts = () => {
  // Sample gym products
  const products = [
    { id: 1, name: 'Dumbbells', price: 490.99, image: 'dumbells.jpg', description: 'Set of 2 adjustable dumbbells.' },
    { id: 2, name: 'Yoga Mat', price: 566.99, image: 'mat.jpg', description: 'Non-slip yoga mat.' },
    { id: 3, name: 'Treadmill', price: 599.99, image: 'treadmill.jpg', description: 'High-quality treadmill for home workouts.' },
    { id: 4, name: 'Resistance Bands', price: 140.99, image: 'band.jpg', description: 'Set of resistance bands with different levels.' },
    { id: 5, name: 'protein powder', price: 490.99, image: 'protein_powder.jpg', description: 'Set of 2 adjustable dumbbells.' },
    { id: 6, name: 'shoes', price: 566.99, image: 'gym_shoes.jpg', description: 'Non-slip yoga mat.' },
    { id: 7, name: 'men clothes', price: 599.99, image: 'men-gym-clothes.jpg', description: 'High-quality treadmill for home workouts.' },
    { id: 8, name: 'protein shake', price: 140.99, image: 'protein_shaker.jpg', description: 'Set of resistance bands with different levels.' },
    { id: 9, name: 'protein bar', price: 490.99, image: 'protein_bars.jpg', description: 'Set of 2 adjustable dumbbells.' },
   
  ];

  const Navigate=useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
    return (
      <div className="gym-products-container">
        <h2>Gym Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      
        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-item">
                <img src={`../Resources/product_images/${product.image}`} alt={product.name} className="product-image"/>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-button">Add to Cart</button>
                
              </div>
              
            ))
          ) : (
            <p>No products found</p>
          )}
          
        </div>

        <button className='btn btn-primary' onClick={()=>{Navigate('/')}}>Home</button>
      </div>
    );
  }
  


export default GymProducts;
