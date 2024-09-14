import React from "react";
import "./Newcollection.css";
import s2 from "../../Asserts/shoes/s2.jpeg"
import s3 from "../../Asserts/shoes/s3.jpeg"
import s4 from "../../Asserts/shoes/s4.jpeg"
import sa1 from "../../Asserts/shoes/sa1.jpeg"
import sa2 from "../../Asserts/shoes/sa2.jpeg"
import sa3 from "../../Asserts/shoes/sa3.jpeg"
import sh1 from "../../Asserts/shoes/sh1.jpeg"
import sh2 from "../../Asserts/shoes/sh2.jpeg"
import sh3 from "../../Asserts/shoes/sh3.jpeg"

const Newcollection = () => {
  return (
    <>
        <section id="product1" className="section-p1">
    <h2>New Collections</h2>
    <p>Summer collection  New Morden Design</p>
    </section>
      <section className="Main">
        
        <div className="Content">
          <h1>
            <i className="fa-solid fa-shirt"></i>-SUITS
          </h1>

          <div className="star">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            (5.0)
          </div>

          <div className="range">
            <p>
              <i className="fa-solid fa-indian-rupee-sign"></i> 500 -{" "}
              <i className="fa-solid fa-indian-rupee-sign"></i> 9,9999[Limited Time]
            </p>
          </div>
          <h1>Description:</h1>
          <hr />
          <p>
            For a personalized touch, explore made-to-measure wedding suits.
            Brands like Hockerty offer customizable options, allowing you to
            choose fabrics, colors, and details that suit your style.
          </p>
        </div>
        <div className="container">
          <div className="card">
            <img src={s4} alt="" />
          </div>
          <div className="card">
            <img src={s2} alt="" />
          </div>

          <div className="card">
            <img src={s3} alt="" />
          </div>
        </div>
      </section>
      <section className="Main">
        <div className="Content">
          <h1>
            <i className="fa-solid fa-shirt"></i>-SAREERS
          </h1>

          <div className="star">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            (5.0)
          </div>

          <div className="range">
            <p>
              <i className="fa-solid fa-indian-rupee-sign"></i> 500 -{" "}
              <i className="fa-solid fa-indian-rupee-sign"></i> 9,9999[Limited Time]
            </p>
          </div>
          <h1>Description:</h1>
          <hr />
          <p>
            For a personalized touch, explore made-to-measure wedding suits.
            Brands like Hockerty offer customizable options, allowing you to
            choose fabrics, colors, and details that suit your style.
          </p>
        </div>
        <div className="container">
          <div className="card">
            <img src={sa1} alt="" />
          </div>
          <div className="card">
            <img src={sa2} alt="" />
          </div>

          <div className="card">
            <img src={sa3} alt="" />
          </div>
        </div>
      </section>
      <section className="Main">
      <div className="Content">
          <h1>
            <i className="fa-solid fa-shirt"></i>-SHOES
          </h1>

          <div className="star">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            (5.0)
          </div>

          <div className="range">
            <p>
              <i className="fa-solid fa-indian-rupee-sign"></i> 500 -{" "}
              <i className="fa-solid fa-indian-rupee-sign"></i> 9,9999[Limited Time]
            </p>
          </div>
          <h1>Description:</h1>
          <hr />
          <p>
            For a personalized touch, explore made-to-measure wedding suits.
            Brands like Hockerty offer customizable options, allowing you to
            choose fabrics, colors, and details that suit your style.
          </p>
        </div>
        <div className="container">
          <div className="card">
            <img src={sh1} alt="" />
          </div>
          <div className="card">
            <img src={sh2} alt="" />
          </div>

          <div className="card">
            <img src={sh3} alt="" />
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Newcollection;
