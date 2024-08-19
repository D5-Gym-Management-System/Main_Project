import React, { useState, useEffect, useContext } from 'react';
import './UserStyling/messagespage.css'; // Import the CSS file for styling
import axios from 'axios';
import { UserContext } from './usercontext.js';
import { toast, ToastContainer } from 'react-toastify';


const MessagesPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { user } = useContext(UserContext);


    // Handle new message input change
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    // Handle form submission for sending a new message
    const handleMessagesSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMessageData = {
                message: newMessage,
                role: props.role, // Replace with the appropriate role if needed
                name: props.name, // Replace with actual name or leave as a placeholder
            };
            await axios.post('http://localhost:8080/messages', newMessageData);
           
            toast.arguments(`message sent successfully`, {
                autoClose: 1500 // The notification will auto-close after 3 seconds
            });
            console.log("Message successfully inserted");

            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

      // Fetch all messages when the component loads
      useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/messages');
                setMessages(response.data);
                console.log("All messages fetched");
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [handleMessagesSubmit]);

    return (
        <div className="messages-page">
            <header className="messages-header">
                <h1>Messages</h1>
                <p>View and send messages to stay connected.</p>
            </header>

            <section className="messages-list">
                {messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <div className="message-sender">{message.name}{" ("}{message.role}{") "}</div>
                        <div className="message-content">{message.message}</div>
                    </div>
                ))}
            </section>

            <section className="send-message">
                <h2>Send a New Message</h2>
                <form onSubmit={handleMessagesSubmit}>
                    <textarea
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Type your message here..."
                        id="message"
                        required
                    />
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </section>
            <ToastContainer/>
        </div>
    );
};

export default MessagesPage;
