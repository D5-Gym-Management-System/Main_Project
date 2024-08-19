import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TrainerStyling/subscribers.css';
import { TrainerContext } from './trainercontext.js';

const MySubscribersPage = () => {
  const [currentSubscribers, setCurrentSubscribers] = useState([]);
  const { trainer } = useContext(TrainerContext);



  useEffect(() => {
    // Fetch initial list of subscribers (mock API call)
    axios.get(`http://localhost:8080/trainer/{trainerId}?trainerId=${trainer.id}`)
      .then(response => setCurrentSubscribers(response.data))
      .catch(error => console.error('Error fetching subscribers:', error));
  }, []);


  return (
    <div className="subscribers-page">
     <center> <h2>Current Subscribers</h2> </center>
     <br/>

      <table className="subscribers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
            <th>age</th>
            <th>membership</th>
            <th>membership Start</th>
            <th>membership End</th>
          </tr>
        </thead>
        <tbody>
          {currentSubscribers.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.email}</td>
              <td>{sub.age}</td>
              <td>{sub.type}</td>
              <td>{sub.membershipStart}</td>
              <td>{sub.membershipEnd}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <br/>
          <hr/>
    </div>
  );
};

export default MySubscribersPage;
