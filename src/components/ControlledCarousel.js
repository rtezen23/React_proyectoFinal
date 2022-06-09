import { useState } from "react";
import { Carousel } from "react-bootstrap";
import '../styles/carousel.css'

function ControlledCarousel( {img} ) {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
        <>
      <Carousel activeIndex={index} onSelect={handleSelect} className='ec-carousel-container'>

        <Carousel.Item>
          <img
            className="d-block w-100 ec-carousel-img"
            src={img?.[0]}
            alt="First slide"
          />
          {/* <Carousel.Caption><h3>First Image</h3></Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 ec-carousel-img"
            src={img?.[1]}
            alt="Second slide"
          />
          {/* <Carousel.Caption><h3>Second Image</h3></Carousel.Caption> */}
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 ec-carousel-img"
            src={img?.[2]}
            alt="Third slide"
          />
          {/* <Carousel.Caption><h3>Third Image</h3></Carousel.Caption> */}
        </Carousel.Item>

      </Carousel>
      <div className="ec-carousel-navigate">
            <img src={img?.[0]} onClick={()=>handleSelect(0)} alt="img-1" data-bs-target aria-label='Slide 1' className="img-navigate"/>
            <img src={img?.[1]} onClick={()=>handleSelect(1)} alt="img-2" className="img-navigate"/>
            <img src={img?.[2]} onClick={()=>handleSelect(2)} alt="img-3" className="img-navigate"/>
      </div>
      </>
    );
  }
  
  export default ControlledCarousel;