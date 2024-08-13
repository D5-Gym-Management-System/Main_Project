import React, { useState } from 'react';
import './UserStyling/supportpage.css'; // Import the CSS file for styling

const SupportPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
                    <p>Our refund policy can be found on the "Refund Policy" page under the "Help" section.</p>
                </div>
                <div className="faq-item">
                    <h3>How can I contact support?</h3>
                    <p>You can contact us through this support page or email us directly at support@example.com.</p>
                </div>
            </section>
        </div>
    );
};

export default SupportPage;
