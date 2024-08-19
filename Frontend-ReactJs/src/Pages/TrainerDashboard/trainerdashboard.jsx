import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import '../../Page_Styling/userdashboard.css';
import Trainersidebar from "./trainerasidebar";
import Trainerprofile from "./profile";
import Trainerhome from "./home";
import SupportPage from "../UserDashboard/support";
import MessagesPage from "../UserDashboard/messages";
import { TrainerContext } from './trainercontext.js'; 
import SubscribersPage from "./subscribers.jsx";
import MySubscribersPage from "./mysubscriber.jsx";

function Trainerdashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('home'); // Manage currently selected component
    const { trainer, setTrainer } = useContext(TrainerContext);

    console.log("trainer context data: " + trainer);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleComponentChange = (componentName) => {
        setCurrentComponent(componentName);
    };

    const handleLogout = () => {
        setTrainer(null); // This will also remove trainer from localStorage
        navigate('/');
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'home':
                return <Trainerhome />;
            case 'profile':
                return <Trainerprofile />;
            case 'support':
                return <SupportPage role="TRAINER" name={trainer.name} />;
            case 'messages':
                return <MessagesPage role="TRAINER" name={trainer.name}/>;
            case 'subscriber':
                return <SubscribersPage />;
            case 'mysubscriber':
                return <MySubscribersPage />;
            case 'logout':
                handleLogout();
                break;
            default:
                return <Trainerhome />;
        }
    };

    return (
        <main id="trainerdashboardmain" className={isSidebarOpen ? 'sidebar-open' : ''}>
            {trainer ? (
                <>
                    <aside>
                        <Trainersidebar
                            sidebarOpen={!isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                            onComponentChange={handleComponentChange}
                        />
                    </aside>
                    <div id="trainermaincontent" className={isSidebarOpen ? 'collapsed' : ''}>
                        <h1>Hello {trainer.name}, Welcome to the trainer dashboard</h1>
                        <hr />
                        {renderComponent()}
                    </div>
                </>
            ) : (
                <div id="trainermaincontent">
                    <h3>Session Timeout or Invalid Access</h3>
                    <button className="btn btn-warning" onClick={() => navigate('/login/Trainer')}>Go back to Login</button>
                    <button className="btn btn-success" onClick={() => navigate('/home')}>Home</button>
                </div>
            )}
        </main>
    );
}

export default Trainerdashboard;
