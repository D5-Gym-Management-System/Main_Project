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

function Userdashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('home'); // Manage currently selected component
    const { user } = useContext(UserContext); // User data from context

    // Fetch user data if needed (comment out if not required)
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/user'); // Adjust endpoint as needed
    //             console.log(response.data);
    //             // If you need to update state with fetched data
    //             // setUsers(response.data);
    //         } catch (error) {
    //             console.error("Data could not be fetched, error -> " + error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleComponentChange = (componentName) => {
        setCurrentComponent(componentName);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'home':
                return <Userhome />;
            case 'cart':
                return <Cart />;
            case 'products':
                return <GymProducts />;
            case 'profile':
                return <Profile />;
            case 'support':
                return <SupportPage />;
            case 'messages':
                return <MessagesPage />;
            default:
                return <Cart />;
        }
    };

    return (
        <main id="userdashboardmain" className={isSidebarOpen ? 'sidebar-open' : ''}>
            <aside>
                <Usersidebar 
                    sidebarOpen={!isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                    onComponentChange={handleComponentChange} 
                />
            </aside>
            <div id="maincontent" className={isSidebarOpen ? 'collapsed' : ''}>
                {user ? (
                    <>
                        <h1>Hello {user.name}, Welcome to the user dashboard</h1>
                        <hr/>
                        {renderComponent()}
                    </>
                ) : (
                    <p>Loading...</p>
                    
                )}
                <button className="btn btn-warning" onClick={() => navigate('/login')}>Go back to Login</button>
                <button className="btn btn-success" onClick={() => navigate('/home')}>Home</button>
            </div>
        </main>
    );
}

export default Userdashboard;
