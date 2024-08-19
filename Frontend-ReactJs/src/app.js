import { Login } from './Pages/xtraPages/login.jsx';
import { Route, Routes } from 'react-router';
import { Register } from './Pages/xtraPages/register.jsx';
import { Forgetpassword } from './Pages/xtraPages/forgetpassword.jsx';
import { BrowserRouter } from 'react-router-dom';
import Home from './Pages/xtraPages/homepage.jsx';
// import Navbar from './Pages/xtraPages/navbar';
import Plans from './Pages/xtraPages/plans.jsx';
import Userdashboard from './Pages/UserDashboard/userdashboard.jsx';
import Gymtiming from './Pages/xtraPages/timings.jsx';
import Rules from './Pages/xtraPages/rules.jsx';
import Images from './Pages/xtraPages/images.jsx';

import ContactUsPage from './Pages/xtraPages/contactus.jsx';
import Trainerdashboard from './Pages/TrainerDashboard/trainerdashboard.jsx';
import Admindashboard from './Pages/AdminDashboard/admindashboard.jsx';
import { UserProvider } from './Pages/UserDashboard/usercontext.js';


import { TrainerProvider } from './Pages/TrainerDashboard/trainercontext.js';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminProvider } from './Pages/AdminDashboard/admincontext.js';

function App(){


return (<>
<AdminProvider>
      <TrainerProvider>
      <UserProvider>
      <BrowserRouter>
      <Routes>
          
      {/* <Register type="user"/> */}
      {/* <Register type="trainer"/> */}
      {/* <Login type="user"/> */}
      {/* <Navbar/> */}
      <Route path='/' element= {<Home/>} />
      <Route path='/home' element= {<Home/>} />
      <Route path='/register/User' element= {<Register type="user"/>} />
      <Route path='/register/Trainer' element= {<Register type="trainer"/>} />
      <Route path='/register/Admin' element= {<Register type="admin"/>} />
      <Route path='/login/Admin' element= {<Login type="admin"/>} />
      <Route path='/login/User' element= {<Login type="user"/>} />
      <Route path='/login/Trainer' element= {<Login type="trainer"/>} />
      <Route path='/forgetpassword' element= {<Forgetpassword type="user"/>} />
      <Route path='/plans' element= {<Plans/>} />
      <Route path='/userdashboard' element= {<Userdashboard/>} />
      <Route path='/Timings' element={<Gymtiming/>}/>
      <Route path='/rules' element={<Rules/>}/>
      <Route path='/images' element={<Images/>}/>
      {/* <Route path="/cart" element={<Cart/>} /> */}
      {/* <Route path="/checkout" element={<Checkout />} /> */}
      {/* <Route path="/products" element={<GymProducts/>} /> */}
      <Route path='/contactus' element={<ContactUsPage/>}/> 
      {/* <Route path='/support' element={<SupportPage/>}/>  */}
      <Route path='/trainerdashboard' element={<Trainerdashboard/>}/>
      <Route path='/admindashboard' element={<Admindashboard/>}/> 
      
     </Routes>
     </BrowserRouter>
     <ToastContainer/>
     </UserProvider>
     </TrainerProvider>
     </AdminProvider>
      <ToastContainer/>
      </>
)

}


export default App;