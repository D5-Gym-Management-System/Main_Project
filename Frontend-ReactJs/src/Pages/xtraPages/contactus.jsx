import React, { useState } from 'react';
import '../../Page_Styling/contactus.css';
import { useNavigate } from 'react-router-dom';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log('Form data submitted:', formData);
    setSubmitted(true);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thank you for your message! We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className='submit-button'>Submit</button>
        </form>
      )}
      <button onClick={handleNavigateHome} className="home-button">
        Go to Home
      </button>
    </div>
  );
};

export default ContactUsPage;

