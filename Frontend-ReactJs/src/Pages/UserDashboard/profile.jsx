import React, { useContext, useState } from 'react';
import '../../Page_Styling/profile.css'; // Import your CSS file for styling
import { Bounce, Slide, Zoom, ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './usercontext.js';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

const Profile = (e) => {
    const { user, setUser } = useContext(UserContext);  // Get user details from context
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });  // Initialize formData with context data
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility
    const navigate=useNavigate();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setUser({ ...formData });  // Update the user context with the new form data
        setIsEditing(false);
        
        try {
            const response = await axios.put(`http://localhost:8080/user/${user.id}`, formData); // Use formData for the request
            console.log(response.data);
            toast(`User ${user.name} updated successfully`, {
                transition: Flip,
                autoClose: 2000,
            });

        } catch (error) {
            console.error("Data could not be updated, error -> " + error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/user/${user.id}`); // Use formData for the request
            console.log(response.data);
            toast(`User ${user.name} deleted successfully`, {
                transition: Zoom,
                autoClose: 2000,
            });
            setTimeout(()=>navigate('/'),2000);
            // Handle successful deletion (e.g., redirect or clear user data)
        } catch (error) {
            console.error("Data could not be updated, error -> " + error);
        }
        setShowModal(false);  // Hide the modal after deletion
    };
    
    const handleCancelClick = () => {
        setFormData({ ...user });  // Reset form data to the original user data
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
                <h1 className="profile-name">{user.name}</h1>
            </div>
            <div className="profile-details">
                <p>Email: {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleChange} /> : user.email}</p>
                <p>Age: {isEditing ? <input type="number" name="age" value={formData.age} onChange={handleChange} /> : user.age}</p>
                <p>Membership Type: 
                {isEditing ? (<select name="type" value={formData.type} onChange={handleChange}>
                        <option value="PLATINUM">Platinum</option>
                        <option value="GOLD">Gold</option>
                        <option value="SILVER">Silver</option>
                    </select>) : (user.type)}</p>
                <p>Membership End: {isEditing ? <input type='date' name="membershipEnd" value={formData.membershipEnd} onChange={handleChange} /> : user.membershipEnd}</p>
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
