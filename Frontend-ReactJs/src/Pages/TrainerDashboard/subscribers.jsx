import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './TrainerStyling/subscribers.css';
import { TrainerContext } from './trainercontext.js';

const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [currentSubscribers, setCurrentSubscribers] = useState([]);
  const { trainer } = useContext(TrainerContext);

  useEffect(() => {
    // Fetch initial list of subscribers (mock API call)
    axios.get('http://localhost:8080/user')
      .then(response => setSubscribers(response.data))
      .catch(error => console.error('Error fetching subscribers:', error));
  }, []);


  const handleAddSubscriber =async (userid) => {
    if (currentSubscribers) {
      // Add subscriber (mock API call)
     await axios.post('http://localhost:8080/trainer/traineruser', { "trainer_id": trainer.id,"user_id": userid })
        .then(()=>console.log("user added successfully"))
        .catch(error => console.error('Error adding subscriber:', error));
    }
  };

  const handleDeleteSubscriber =async (userid) => {
    // Delete subscriber (mock API call)
    await axios.delete(`http://localhost:8080/trainer/${trainer.id}/${userid}`)
      .then(() => console.log("User deleted successfully"))
      .catch(error => console.error('Error deleting subscriber:', error));
  };

  useEffect(() => {
    // Fetch initial list of subscribers (mock API call)
    axios.get(`http://localhost:8080/trainer/{trainerId}?trainerId=${trainer.id}`)
      .then(response => setCurrentSubscribers(response.data))
      .catch(error => console.error('Error fetching subscribers:', error));
  }, [handleAddSubscriber,handleDeleteSubscriber]);


  return (
  <div className="subscribers-page">
    <center><h2>Manage Subscribers</h2></center>

      <br/>

      <hr/>
      <h3>All Subscribers</h3>
      <table className="subscribers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>age</th>
            <th>membership</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.age}</td>
              <td>{sub.type}</td>
              <td>
                <button className='btn btn-success' onClick={() => handleAddSubscriber(sub.id)}>Add</button>
                {/* <button className='btn btn-danger' onClick={() => handleDeleteSubscriber(sub.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <hr/>
      {currentSubscribers.length > 0 ? (
      <>
        <h3>Current Subscribers</h3>
        <table className="subscribers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Membership</th>
              <th>Membership Start</th>
              <th>Membership End</th>
              <th>Actions</th>
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
                <td>
                  <button className='btn btn-danger' onClick={() => handleDeleteSubscriber(sub.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <h3>Add Subscribers first</h3>
    )}
    <hr/>
    </div>
    
  );
};

export default SubscribersPage;
