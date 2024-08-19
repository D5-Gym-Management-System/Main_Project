import React, { useContext, useState } from 'react';
import './UserStyling/supportpage.css'; // Import the CSS file for styling
import { UserContext } from './usercontext.js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';



const SupportPage = (props) => {
    const [formData, setFormData] = useState({
        name: props.name,
        email: '',
        message: '',
        role:props.role
    });

    const { user } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/support',formData);
        toast.info(`support request raise sucessfully`, {
            autoClose: 1500 // The notification will auto-close after 3 seconds
        });
        console.log('Form submitted:', formData);
    };

    return (
        <div className="support-page">
            <header className="support-header">
                <h1>Support Page</h1>
                <p>We're here to help. Please reach out with any questions or concerns.</p>
            </header>

            <section className="contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </section>

            <section className="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>How can I reset my password?</h3>
                    <p>You can reset your password by clicking the "Forgot Password" link on the login page.</p>
                </div>
                <div className="faq-item">
                    <h3>What is your refund policy?</h3>
                    <p>Our Gym is newly built so we don't entertain any refunds on products.We have a 7 day replacement policy.</p>
                </div>
                <div className="faq-item">
                    <h3>How can I contact support?</h3>
                    <p>You can contact us through this support page or contact us page on main home page or email us directly at bibekmodak123@gmail.com.</p>
                </div>
            </section>
            <ToastContainer/>
        </div>
    );
};

export default SupportPage;
