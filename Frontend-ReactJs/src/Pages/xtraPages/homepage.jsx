import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../../Page_Styling/homepage.css';
import gymBackground1 from '../../Resources/gym_bcg.jpg';
import gymBackground2 from '../../Resources/Gym_images/img2.jpg';
import gymBackground3 from '../../Resources/Gym_images/img5.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div id="homepage">
      
      <Navbar />
      <main id="homecarousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item">
              <img className="d-block w-100" src={gymBackground1} alt="First slide" 
              style={{ objectFit: 'cover' }}/>
            </div>
            <div className="carousel-item">
            <img className="d-block w-100" 
            src={gymBackground2} alt="Second slide" 
            style={{ height: '100vh', objectFit: 'cover' }} />
            </div>
            <div className="carousel-item active">
              <img className="d-block w-100" src={gymBackground3} alt="Third slide"
              style={{ height: '100vh', objectFit: 'cover' }} />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </main>
      
    {/* <div>
      <h1>Home page content1</h1>
      </div>
      
    <div>
      <h1>Home page content2</h1>
      </div>
      
    <div>
      <h1>Home page content3</h1>
      </div> */}

    </div>
  );
}

export default Home;
