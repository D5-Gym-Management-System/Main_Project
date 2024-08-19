import React, { useContext, useState } from 'react';
import '../../Page_Styling/profile.css'; // Import your CSS file for styling
import { UserContext } from '../UserDashboard/usercontext.js';
import { Bounce, Slide, Zoom, ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { TrainerContext } from './trainercontext.js';
import { useNavigate } from 'react-router';
const Profile = (e) => {
    // const { user, setUser } = useContext(UserContext);  // Get user details from context
    
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility
    const { trainer ,setTrainer} = useContext(TrainerContext);
    const [formData, setFormData] = useState({ ...trainer });  // Initialize formData with context data
    const navigate=useNavigate();
   
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setTrainer({ ...formData });  // Update the user context with the new form data
        setIsEditing(false);
        
        try {
            const response = await axios.put(`http://localhost:8080/trainer/${trainer.id}`, formData); // Use formData for the request
            console.log(response.data);
            toast(`Trainer ${trainer.name} updated successfully`, {
                transition: Zoom,
                autoClose: 1000,
            });

        } catch (error) {
            console.error("Data could not be updated, error -> " + error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/trainer/${trainer.id}`); // Use formData for the request
            console.log(response.data);
            toast(`Trainer ${trainer.name} deleted successfully`, {
                transition: Zoom,
                autoClose: 2000,
            });
            setTimeout(()=>navigate('/'),2000);
        } catch (error) {
            console.error("Data could not be updated, error -> " + error);
        }
        setShowModal(false);  // Hide the modal after deletion
    };
    
    const handleCancelClick = () => {
        setFormData({ ...trainer });  // Reset form data to the original user data
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img
                    src="https://via.placeholder.com/150" // Replace with actual user image
                    alt="Profile"
                    className="profile-image"
                />
                <h1 className="profile-name">{trainer.name}</h1>
            </div>
            <div className="profile-details">
                <p>Email:  {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : trainer.email}</p>
                <p>Age:  {isEditing ? <input type="number" name="age" value={formData.age} onChange={handleChange} /> : trainer.age}</p>
                <p>Trainer Type:  {isEditing ? (<select name="type" value={formData.trainerType} onChange={handleChange}>
                    <option value="CARDIO">Cardio</option>
              <option value="ZUMBA">Zumba</option>
              <option value="FULL_BODY">Full body Trainer</option>
              <option value="PERSONAL_TRAINER">Personal Trainer</option>
              <option value="FLEXIBILITY">Flexibility Trainer</option>
              <option value="STRENGTH">Strength Trainer</option>
              <option value="NUTRITION">Nutrition Trainer</option>
            </select>) :  trainer.trainerType}</p>
                <p>Salary: {isEditing ?<input type='text' name="salary" value ={formData.salary} onChange={handleChange} />:trainer.salary}</p>
                <p>Joining Date: {<input type='date' name="joiningDate" value={trainer.joinDate} disabled />}</p>
                <p>In Time: {<input type='time' name="inTime" value ={trainer.inTime} disabled />}</p>
                <p>Out Time: {<input type='time' name="outTime" value ={trainer.outTime} disabled />}</p>
            </div>
            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick} className="btn btn-primary">Save</button>
                        <button onClick={handleCancelClick} className="btn btn-secondary">Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setShowModal(true)} className="btn btn-danger">Delete</button>
                        <button onClick={handleEditClick} className="btn btn-edit">Edit</button>
                    </>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete your account permanently?</p>
                            </div>
                            <div className="modal-footer">
                            <div className="row w-100">
                                <div className="col-6 text-start">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"onClick={()=>setShowModal(false)}>Cancel</button>
                                </div>
                                <div className="col-6 text-end">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default Profile;
