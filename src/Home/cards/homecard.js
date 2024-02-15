import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Carousel } from 'react-bootstrap';
import './homecard.css'

const HomeCards = () => {

  const [trendingPackages, setTrendingPackages] = useState([]);

  useEffect(() => {
    // Fetch trending packages data from backend API
    const fetchTrendingPackages = async () => {
      try {
        const response = await axios.get('/api/trendingPackages');
        setTrendingPackages(response.data);
        console.log(response.data, 'trending packages')
      } catch (error) {
        console.error('Error fetching trending packages:', error);
      }
    };

    fetchTrendingPackages();
  }, []);


  return (
  //   <Carousel id="carouselExampleControls" className="width">
  //   {trendingPackages.map((ele, index) => (
  //     <Carousel.Item key={index}>
  //       <div className="card-wrapper container-fluid d-flex justify-content-around">
  //         <div className="card" style={{ width: '18rem', height: '50vh' }}>
  //           <img src={`http://localhost:3034/Images/${ele.image}`} className="card-img-top" alt={ele.packageName} />
  //         </div>
  //       </div>
  //     </Carousel.Item>
  //   ))}
  // </Carousel>
  <Carousel id="carouselExampleControls" className="width">
  <Carousel.Item>
    <div className="card-wrapper container-fluid d-flex justify-content-around">
      {trendingPackages.slice(0, 3).map((ele, index) => (
        <div className="card" key={index} style={{ width: '18rem', height: '50vh' }}>
          <img src={`http://localhost:3034/Images/${ele.image}`} className="card-img-top" alt={ele.packageName} />
          <h4>{ele.packageName}</h4>
        </div>
      ))}
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div className="card-wrapper container-fluid d-flex justify-content-around">
      {trendingPackages.slice(3).map((ele, index) => (
        <div className="card" key={index} style={{ width: '18rem', height: '50vh' }}>
          <img src={`http://localhost:3034/Images/${ele.image}`} className="card-img-top" alt={ele.packageName} />
        </div>
      ))}
    </div>
  </Carousel.Item>
</Carousel>
  );
};

export default HomeCards
