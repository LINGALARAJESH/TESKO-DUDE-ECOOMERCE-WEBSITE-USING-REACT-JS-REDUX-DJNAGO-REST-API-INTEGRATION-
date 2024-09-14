import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
const Card = ({ prods }) => {
  return (
    <>
      <div className="pro">
        <Link to={`/displayproduct/${prods._id}`}>
          <img
            onClick={window.scrollTo(0, 0)}
            src={`http://127.0.0.1:8000/${prods.image}`}
            alt=""
          />
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to={`/displayproducts/${prods._id}`}
        >
          <div className="dis">
            <h5>{prods.name}</h5>
            <span>{prods.brand}</span>
            <Rating prods={prods} />
            <div className="butt">
              <div>
                <h4>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {prods.price}
                  <span>
                    <p style={{ display: "inline", visibility: "hidden" }}>h</p>
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    120.00
                  </span>
                </h4>
              </div>
              <a href="/">
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
