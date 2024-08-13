import React, { useState } from 'react';
import './UserStyling/messagespage.css'; // Import the CSS file for styling

const MessagesPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Alice', content: 'Hey there! How are you?' },
        { id: 2, sender: 'Bob', content: 'Can we schedule a meeting?' },
        { id: 3, sender: 'Charlie', content: 'Don’t forget about the project deadline.' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <div className="messages-page">
            <header className="messages-header">
                <h1>Messages</h1>
                <p>View and send messages to stay connected.</p>
            </header>

            <section className="messages-list">
                {messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">{message.content}</div>
                    </div>
                ))}
            </section>

            <section className="send-message">
                <h2>Send a New Message</h2>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Type your message here..."
                        required
                    />
                    <button type="submit" className="btn btn-primary">Send</button>
                </form>
            </section>
        </div>
    );
};

export default MessagesPage;
