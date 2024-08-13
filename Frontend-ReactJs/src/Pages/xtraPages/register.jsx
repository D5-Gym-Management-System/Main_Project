import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../UserDashboard/usercontext.js';
import '../../Page_Styling/register.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Register(props) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: 0,
    type: "",
    trainerType: "",
    showPassword: false,
    showConfirmPassword: false,
    membershipCost: 0,
  });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  useEffect(() => {
    const updateMembershipCost = () => {
      switch (formData.type) {
        case "PLATINUM":
          setFormData((prevData) => ({
            ...prevData,
            membershipCost: 699,  // Example cost for Platinum
          }));
          break;
        case "GOLD":
          setFormData((prevData) => ({
            ...prevData,
            membershipCost: 499,  // Example cost for Gold
          }));
          break;
        case "SILVER":
          setFormData((prevData) => ({
            ...prevData,
            membershipCost: 299,  // Example cost for Silver
          }));
          break;
        default:
          setFormData((prevData) => ({
            ...prevData,
            membershipCost: 0,  // Default cost
          }));
          break;
      }
    };

    updateMembershipCost();
  }, [formData.type]);

  async function registeruser(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const membershipStart = new Date();
    const membershipEnd = new Date();
    membershipEnd.setMonth(membershipEnd.getMonth() + 1);

    const userdetails = {
      ...formData,
      membershipStart,
      membershipEnd,
    };

    try {
      const response = await axios.post('http://localhost:8080/user', userdetails);
      toast.success("User Registered Successfully", {
        transition: Bounce,
      }); 
      setUser(response.data); // Set user data in context
      console.log(response);
      setTimeout(() => navigate('/userdashboard'), 2000);
    } catch (error) {
      console.error('There was an error registering the user!', error);
      toast.error('There was an error registering the user!');
    }
  }

  return (
    <main id="registerbody">
      <form id="form" onSubmit={registeruser}>
        {props.type === "user" && <h1>Welcome User Registration</h1>}
        {props.type === "trainer" && <h1>Welcome Trainer Registration</h1>}
        
        <br />

        <section>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
            autoFocus
          />
        </section>

        <br />

        <section>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </section>

        <br />

        <section>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleChange}
            value={formData.age}
            required
          />
        </section>

        <br />

        {props.type === "user" && (
          <section>
            <label htmlFor="type">Membership type</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={formData.type}
              required
            >
              <option value="" hidden>Membership</option>
              <option value="PLATINUM">PLATINUM</option>
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
            </select>
            <Link to="/plans" style={{ color: "white" }}>View Plans</Link>
          </section>
        )}

        {props.type === "trainer" && (
          <section>
            <label htmlFor="trainerType">Type of trainer</label>
            <select
              id="trainerType"
              name="trainerType"
              onChange={handleChange}
              value={formData.trainerType}
              required
            >
              <option value="" hidden>Trainer type</option>
              <option value="Cardio">Cardio</option>
              <option value="Zumba">Zumba</option>
              <option value="Full body Trainer">Full body Trainer</option>
              <option value="Personal Trainer">Personal Trainer</option>
              <option value="Diet Trainer">Diet Trainer</option>
            </select>
          </section>
        )}

        <br />

        <section>
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={formData.showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility("showPassword")}
            >
              {formData.showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </section>

        <br />

        <section>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-container">
            <input
              type={formData.showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility("showConfirmPassword")}
            >
              {formData.showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </section>

        <br />

        <section>
          <input type="submit" value="Register" className="btn btn-success" />
          <input type="reset" className="btn btn-warning" />
          <button onClick={() => navigate('/home')} className="btn btn-info">
            Home
          </button>
        </section>
      </form>
      <ToastContainer />
    </main>
  );
}
