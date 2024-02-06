import React from 'react';
import { Carousel } from 'react-bootstrap';
import './homecard.css'

const HomeCards = () => {
  return (
    <Carousel id="carouselExampleControls" className='width'>
      <Carousel.Item>
        <div className="card-wrapper container-fluid d-flex justify-content-around">
          <div className="card"style={{ width: '18rem', height: '50vh'}}>
            <img src="free37.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free36.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free14.jpg" className="card-img-top" alt="..." />
          </div>
        </div>
      </Carousel.Item>

    
      <Carousel.Item>
        <div className="card-wrapper container-fluid d-flex justify-content-around">
        <div className="card"style={{ width: '18rem', height: '50vh'}}>
            <img src="free15.jpg" className="card-img-top" alt="..." />
            {/* <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div> */}
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free23.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free35.jpg" className="card-img-top" alt="..." />
            {/* <div className="card-body">
              <h5 className="card-title">Card title</h5>
            </div> */}
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="card-wrapper container-fluid d-flex justify-content-around">
        <div className="card"style={{ width: '18rem', height: '50vh'}}>
            <img src="free21.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free20.jpg" className="card-img-top" alt="..." />
          </div>
          <div className="card" style={{ width: '18rem', height: '50vh'}}>
            <img src="free35.jpg" className="card-img-top" alt="..." />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCards
