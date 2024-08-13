import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import '../../Page_Styling/userdashboard.css';
import Trainersidebar from "./trainerasidebar";
import Trainerprofile from "./profile";
import Trainerhome from "./home";
import SupportPage from "../UserDashboard/support";
import MessagesPage from "../UserDashboard/messages";

function Trainerdashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]); // Using state to store projects
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('home'); // Manage currently selected component



    useEffect(() => {
        axios.get('http://localhost:8080/api/trainers')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error("Data could not be fetched, error -> " + error);
            });
    }, []); // Empty dependency array ensures this runs only once
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleComponentChange = (componentName) => {
        setCurrentComponent(componentName);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'home':
                return <Trainerhome/>;
            case 'profile':
                return <Trainerprofile/>;
            case 'support':
                return <SupportPage />;
            case 'messages':
                return <MessagesPage />;
            default:
                return <Trainerhome />;
        }
    };

    
    console.log(projects)

   

    return (
        <main id="trainerdashboardmain" className={isSidebarOpen ? 'sidebar-open' : ''} >

            <aside>
                <Trainersidebar sidebarOpen={!isSidebarOpen} toggleSidebar={toggleSidebar} 
                onComponentChange={handleComponentChange}/>
            </aside>
            <div id="trainermaincontent" className={isSidebarOpen ? 'collapsed' : ''}>
         
            <h1>Hello, Welcome to the Trainer dashboard</h1>
                <hr/>

                {renderComponent()}
            <button className="btn btn-warning" onClick={() => { navigate('/login') }}>Go back to Login</button>
            <button className="btn btn-success" onClick={() => { navigate('/home') }}> Home</button>

            </div>
        </main>
    );
}

export default Trainerdashboard;
