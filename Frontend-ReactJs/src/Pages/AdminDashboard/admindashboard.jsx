
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import '../../Page_Styling/userdashboard.css';
import Adminsidebar from "./adminasidebar";

function Admindashboard() {
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]); 
    const [users, setUsers] = useState([]); 

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // First axios request to get trainers
        axios.get('http://localhost:8080/trainer')
            .then(response => {
                setTrainers(response.data);
            })
            .catch(error => {
                console.error("Data could not be fetched, error -> " + error);
            });
    
        // Second axios request to get users
        axios.get('http://localhost:8080/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Data could not be fetched, error -> " + error);
            });
    }, []); // Empty dependency array to run this effect only once
    
     // Empty dependency array ensures this runs only once
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    
    console.log(users);
    console.log(trainers);


    let name = 'bibek admin';

    return (
        <main id="admindashboardmain" className={isSidebarOpen ? 'sidebar-open' : ''} >

            <aside>
                <Adminsidebar sidebarOpen={!isSidebarOpen} toggleSidebar={toggleSidebar} />
            </aside>
            <div id="adminmaincontent" className={isSidebarOpen ? 'collapsed' : ''}>
            <h1>Hello {name}</h1>
            <br /><br />
            <h1> Welcome to admin dashboard</h1>
            <hr/>
            <h2>Trainers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>age</th>
                        <th>password</th>
                        {/* <th>budget</th> */}
                    </tr>  
                </thead>
                <tbody>
                    {trainers.map((trainer) => (
                        <tr key={trainer.id}>
                            <td>{trainer.id}</td>
                            <td>{trainer.name}</td>
                            <td>{trainer.email}</td>
                            <td>{trainer.age}</td>
                            <td>{trainer.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <hr/>
            <h2>Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>age</th>
                        <th>Membership Type</th>
                        <th>Date</th>
                        {/* <th>budget</th> */}
                    </tr>  
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{(user.firstName)+' '+(user.lastName)}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.type}</td>
                            <td>{user.membershipStart}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-warning" onClick={() => { navigate('/login') }}>Go back to Login</button>

            </div>
        </main>
    );
}

export default Admindashboard;
