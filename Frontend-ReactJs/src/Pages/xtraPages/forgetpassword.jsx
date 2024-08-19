import { useState, useEffect, useRef } from "react";
import "../../Page_Styling/login.css";  
import React from 'react';
import { Bounce, Slide, Zoom, ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import axios from "axios";

export function Forgetpassword( data ) {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userData,setUserData]=useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate=useNavigate();
    const modalRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        Afteremailmatch(email);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user'); // Adjust endpoint as needed
                console.log(response.data);
                setUserData(response.data);
                // If you need to update state with fetched data
                // setUsers(response.data);
            } catch (error) {
                console.error("Data could not be fetched, error -> " + error);
            }
        };
        fetchUserData();
    }, []);

    const Afteremailmatch = (emaill) => {
        // debugger 
        let found=false;
        // const emailFromDB = "admin@gmail.com"; // Replace this with an actual API call

        userData.forEach((elem)=>{
          if (emaill === elem.email) {
              toast.success("Email found.", {
                  autoClose: 2000,
                  transition: Flip,
              });
              setShowModal(true);
              found=true;
              
          } 
        });
        
        if(!found)
              toast.error("Email not found", {
                  transition: Slide,
                  autoClose: 3000,
              });
          
      };
  
      const handleModalSubmit =async (e) =>  {
          e.preventDefault();
          if (password !== confirmPassword) {
              toast.warning("Oops, password didn't match", {
                  transition: Slide,
                  autoClose: 3000,
              });
          } else {
                try {
                    const response = await axios.patch(`http://localhost:8080/user/${email}`,  null, {
                        params: {
                            password: password // Send password as a query parameter
                        }
                    }); // Use formData for the request
                    console.log(response.data);
                    
              setShowModal(false);
              setTimeout(()=>{
                navigate('/');},2000)
              console.log("Password:", password, "Confirm Password:", confirmPassword);
        
                } catch (error) {
                    console.error("Password could not be updated, error -> " + error);
                }
                toast("Password changed successfully! Redirecting in 3 secs", {
                  transition: Zoom,
                  autoClose: 1900,
              });
          }
      };
  
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            window.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            <div id="loginpage">
                <form id="loginform" onSubmit={handleSubmit}>
                    {data.type === "user" ? (
                        <h1>Reset Password</h1>
                    ) : null}
                    {data.type === "trainer" ? (
                        <h1>Welcome Trainer Reset password</h1>
                    ) : null}
                    <br />
                    <section>
                        <label htmlFor="email">Enter Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            placeholder="admin@gmail.com"
                        />
                    </section>
                    <br />
                    <section>
                        <input type="submit" value="Submit" className="btn btn-success" />
                        <input type="reset" className="btn btn-warning" />
                        <button onClick={()=>navigate('/home')} className="btn btn-primary">Home</button>
                    </section>
                </form>
            </div>

            {showModal && (
                <div className="modall">
                    <div className="modall-content" ref={modalRef}>
                        <h2>Reset Password</h2>
                        <form onSubmit={handleModalSubmit}>
                            <section>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </section>
                            <section>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </section>
                            <section className="modallbtn"> 
                                <input type="submit" value="Submit" className="btn btn-success" />
                                <button type="button" className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
                                
                            </section>
                        </form>
                    </div>
                </div>
            )}
             <ToastContainer />
        </>
    );
}
