// import img1 from '../Resources/Gym_images/img1.webp';
// import img2 from '../Resources/Gym_images/img2.jpg';
// import img3 from '../Resources/Gym_images/img3.jpeg';
// import img4 from '../Resources/Gym_images/img4.jpeg';
// import img5 from '../Resources/Gym_images/img5.webp';
// import img6 from '../Resources/Gym_images/img6.jpg';

import { useNavigate } from 'react-router';
import '../../Page_Styling/images.css'

function Images() {
  const imgs = ["img1.webp", "img2.jpg", "img3.jpeg", "img4.jpeg", "img5.webp", "img6.jpg"];

  const navigate=useNavigate();

  return (
    <main id='imagesmain'>
      
      <div id='header'>
      <h1 >Gym Images</h1>
      </div>
    <div id="mainpageimage">
      {
        imgs.map((val, idx) => (
          <img 
            key={idx} 
            src={`../Resources/Gym_images/${val}`} 
            alt={`Gym ${idx}`} 
          />
        ))
      }
    </div>
    <a onClick={()=>navigate("/home")} className='btn btn-primary'>Home</a>
    </main>
  );
}

export default Images;
