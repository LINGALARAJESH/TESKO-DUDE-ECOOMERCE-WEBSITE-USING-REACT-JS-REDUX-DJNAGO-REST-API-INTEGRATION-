import React from "react";
import "./Header.css";
import Carousel from "react-bootstrap/Carousel";
import img4 from "../../Asserts/images/img4.jpg";
import img5 from "../../Asserts/images/img5.jpg";
import img6 from "../../Asserts/images/img6.jpg";
import img7 from "../../Asserts/images/img7.jpg";
import img8 from "../../Asserts/images/img8.jpg";
import img9 from "../../Asserts/images/img9.jpg";
import img10 from "../../Asserts/images/img10.jpg";
import img11 from "../../Asserts/images/img11.jpg";
import img12 from "../../Asserts/images/img12.jpg";
import img14 from "../../Asserts/images/img11.jpg";
import img13 from "../../Asserts/images/img12.jpg";

const Header = () => {
  return (
    <div className="hhh">

      <Carousel fade className="maining">
        <Carousel.Item interval={3000}>
          <img className="cimg" src={img4} alt="" />
          <Carousel.Caption>
            <h3>Shift Dress:</h3>
            <p>
              Simple, boxy shape, often sleeveless. Perfect for color blocking
              or print details. Style with a duster jacket or knee-high boots
              for a '60s flair
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img5} alt="" />
          <Carousel.Caption>
            <h3>Wrap Dress</h3>
            <p>
              Front closure with fabric wrapped and tied at the waist or back.
              Classic silhouette, great for athletic body shapes.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img6} alt="" />
          <Carousel.Caption>
            <h3>A-Line Dress</h3>
            <p>
              Fitted at the hips and flares out toward the hem, creating an “A”
              shape. Suited for casual wear and flattering for pear-shaped
              bodies
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img7} alt="" />
          <Carousel.Caption>
            <h3>Appearance</h3>
            <p>: Describe how the shoes look in person.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img8} alt="" />
          <Carousel.Caption>
            <h3>DOUSSPRT Women’s Water Shoes</h3>
            <p>
              Quick-drying sports aqua shoes suitable for water activities.
              Rated 4.8 stars out of 5 by 228 shoppers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img9} alt="" />
          <Carousel.Caption>
            <h3>PAIGE Wilmer Short Sleeve Button-Up Shirt</h3>
            <p>
              Sale price: $116.35 – $179.00
              <br />
              Versatile and stylish1.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img10} alt="" />
          <Carousel.Caption>
            <h3>rag & bone Classic Flame Polo</h3>
            <p>
              Sale price: $87.00 – $145.00
              <br />
              Perfect for a casual yet polished look1
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="cimg " src={img11} alt="" />
          <Carousel.Caption>
            <h3>
              Faherty The Movement Geometric Print Short Sleeve Button-Up Shirt
            </h3>
            <p>
              Price: $148.00
              <br />
              Unique geometric pattern for a standout look1. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img12} alt="" />
          <Carousel.Caption>
            <h3>Vince Classic Fit Short Sleeve Linen Shirt/h3</h3>
            <p>
Price: $195.00
<br/>
Comfortable linen fabric for warm days1.
 
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img13} alt="" />
          <Carousel.Caption>
            <h3>PAIGE Wilmer Short Sleeve Button-Up Shirt</h3>
            <p>
Sale price: $116.35 – $179.00
<br/>
Versatile and stylish1.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="cimg " src={img14} alt="" />
          <Carousel.Caption>
            <h3>didas Cloudfoam Pure Shoes</h3>
            <p> White women’s originals shoes. 
            <br/>
            Rated 4.9 stars out of 5 by 15 shoppers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Header;
