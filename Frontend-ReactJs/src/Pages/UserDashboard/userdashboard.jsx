import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Usersidebar from "./userasidebar";
import '../../Page_Styling/userdashboard.css';
import Cart from './cart';
import GymProducts from './gymproduct';  // Example component
import Profile from './profile'; // Example component
import Userhome from './home';
import { UserContext } from './usercontext.js'; 
import SupportPage from './support.jsx';
import MessagesPage from './messages.jsx';
import Checkout from './checkout.jsx';

function Userdashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('home'); // Manage currently selected component
    const { user, setUser } = useContext(UserContext); // User data from context

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleComponentChange = (componentName) => {
        setCurrentComponent(componentName);
    };

    const handleLogout = () => {
        setUser(null); // This will also remove user from localStorage
        navigate('/');
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'home':
                return <Userhome />;
            case 'cart':
                return <Cart onCheckoutClick={() => handleComponentChange('checkout')} />;
            case 'products':
                return <GymProducts onCartClick={() => handleComponentChange('cart')} />;
            case 'profile':
                return <Profile />;
            case 'checkout':
                return <Checkout />;
            case 'support':
                return <SupportPage role="USER" name={user.name} />;
            case 'messages':
                return <MessagesPage role="USER"  name={user.name}/>;
            case 'logout':
                handleLogout();
                break;
            default:
                return <Userhome />;
        }
    };

    return (
        <main id="userdashboardmain" className={isSidebarOpen ? 'sidebar-open' : ''}>
            {user ? (
                <>
                    <aside>
                        <Usersidebar
                            sidebarOpen={!isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                            onComponentChange={handleComponentChange}
                        />
                    </aside>
                    <div id="maincontent" className={isSidebarOpen ? 'collapsed' : ''}>
                        <h1>Hello {user.name}, Welcome to the user dashboard</h1>
                        <hr />
                        {renderComponent()}
                    </div>
                </>
            ) : (
                <div id="maincontent">
                    <h3>Session Timeout or Page Got Refreshed</h3>
                    <button className="btn btn-warning" onClick={() => navigate('/login/User')}>Go back to Login</button>
                    <button className="btn btn-success" onClick={() => navigate('/home')}>Home</button>
                </div>
            )}
        </main>
    );
}

export default Userdashboard;
