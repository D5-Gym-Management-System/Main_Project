import { Login } from './Pages/xtraPages/login';
import { Route, Routes } from 'react-router';
import { Register } from './Pages/xtraPages/register';
import { Forgetpassword } from './Pages/xtraPages/forgetpassword';
import { BrowserRouter } from 'react-router-dom';
import Home from './Pages/xtraPages/homepage';
// import Navbar from './Pages/xtraPages/navbar';
import Plans from './Pages/xtraPages/plans';
import Userdashboard from './Pages/UserDashboard/userdashboard';
import Gymtiming from './Pages/xtraPages/timings';
import Rules from './Pages/xtraPages/rules';
import Images from './Pages/xtraPages/images';
import Cart from './Pages/UserDashboard/cart';
import GymProducts from './Pages/UserDashboard/gymproduct';
import ContactUsPage from './Pages/xtraPages/contactus';
import Trainerdashboard from './Pages/TrainerDashboard/trainerdashboard';
import Admindashboard from './Pages/AdminDashboard/admindashboard';
import { UserProvider } from './Pages/UserDashboard/usercontext.js';
import SupportPage from './Pages/UserDashboard/support.jsx';

function App(){


return (
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
      <Route path="/cart" element={<Cart/>} />
      <Route path="/products" element={<GymProducts/>} />
      <Route path='/contactus' element={<ContactUsPage/>}/> 
      <Route path='/support' element={<SupportPage/>}/> 
      <Route path='/trainerdashboard' element={<Trainerdashboard/>}/>
      <Route path='/admindashboard' element={<Admindashboard/>}/> 
      
     </Routes>
     </BrowserRouter>
     </UserProvider>

)

}


export default App;