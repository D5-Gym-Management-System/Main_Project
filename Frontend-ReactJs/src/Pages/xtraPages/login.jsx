import { Bounce, Slide, Zoom, ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import '../../Page_Styling/login.css';
import { Link, useNavigate } from 'react-router-dom';
// import Loginnavbar from './loginnavbar';
import { UserContext } from '../UserDashboard/usercontext.js';
import axios from 'axios';

export function Login(data) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function afterlogin(event) {
    event.preventDefault();
      try {
        console.log("inside try afterlogin page");
        const userdetails = await axios.get(`http://localhost:8080/user/${username}/${password}`);
        toast.success("User Logged In", {
          transition: Slide,
          autoClose:1500
        }); 
        setUser(userdetails.data); // Set user data in context
        console.log(userdetails.data);
        setTimeout(() => navigate('/userdashboard'), 1500);
      } catch (error) {
        console.error('There was an error registering the user!', error);
        toast.error('There was an error registering the user!');
      }
      // setUser(userdetails); // Set user data in context
      // navigate('/userdashboard');
      // toast.success("success", {
      //   transition: Slide,
      //   autoClose: 3000,
      // });
    }
    // else if(username==="trainer" && password==="trainer")
    // {
    //   navigate('/trainerdashboard');
    // }
    // else if(username==="admin" && password==="admin")
    //   {
    //     navigate('/admindashboard');
    //   }
    //   else {
    //   toast.error("Invalid login Info", {
    //     transition: Slide,
    //     autoClose: 3000,
    //   });
    // }
  

  return (
    <div id="loginpage">
      <ToastContainer />
      {/* <Loginnavbar/> */}
      <form id="loginform" onSubmit={afterlogin}>
        {data.type === "user" ? (
          <h1>Welcome User Login</h1>
        ) : null}
        {data.type === "trainer" ? (
          <h1>Welcome Trainer Login</h1>
        ) : null}
        <br />
        <section>
          <label htmlFor="name">User Name</label>
          <input type="text" id="name" onChange={(e) => setUsername(e.target.value)} required autoFocus placeholder=''/>
        </section>
        <br />
        <section>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required placeholder=''/>
        </section>
        <br />
        <h5>Forget Password? Change from <Link to="/forgetpassword" style={{color:"orange"}}>Here</Link></h5>
        <section id="loginbtn">
          <input type="submit" value="Login" className="btn btn-success" />
          <input type="reset" className="btn btn-warning" />
          <button onClick={() => navigate('/home')} className="btn btn-primary l">Home</button>
        </section>
      </form>
    </div>
  );
}
