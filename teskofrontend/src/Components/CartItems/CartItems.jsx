import React, { useEffect, useState } from "react";
import "./CartItems.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { removeFromCart } from "../../actions/cartActions";
import { getDataCart } from "../../actions/cartActions";
import { proceedCartOrder } from "../../actions/cartActions";
import Message from "../Alert/Alert";
import Loader from "../Loader/Loader";

const CardItems = () => {
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const productobj = useParams();
  const productId = productobj.id;

  const qty = window.location.search
    ? Number(window.location.search.split("=")[1])
    : 1;
  const size = window.location.search
    ? window.location.search.split("=")[3]
    : "s";

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  const total_items = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  useEffect(() => {
    dispatch(getDataCart(userInfo.id));
  }, [dispatch,userInfo.id]);

  useEffect(() => {
    if (productId && userInfo && userInfo.id) {
      dispatch(addToCart(userInfo.id, productId, qty, size));
      navigate("/Cart");
    }
  }, [dispatch, productId, userInfo, qty, size,navigate]);

  const removeFromCartHandler = (id, userid) => {
    dispatch(removeFromCart(id, userid));
    dispatch(getDataCart(userInfo.id));
  };

  const checkoutHandler = () => {
    dispatch(
      proceedCartOrder(
        userInfo.id,
        total_items,
        cartItems,
        mobile,
        address,
        postalcode,
        country,
        city
      )
    );
    window.scrollTo(0, 0);
    navigate("/Payment");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <div style={{ marginTop: "20px" }}></div>
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back...</Link>
          </Message>
          <h2>cart Items</h2>
          <Loader />
          <div style={{ height: "80vh" }}></div>
        </>
      ) : (
        <div className="cartitems">
          <h2>cart Items</h2>
          <hr />
          <div className="cartitems-format-main">
            <p style={{ fontWeight: "600", color: "#088178" }}>PRODUCTS</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>TITLE</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>PRICE</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>QUANTITY</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>SIZE</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>TOTAL</p>
            <p style={{ fontWeight: "600", color: "#088178" }}>REMOVE</p>
          </div>
          <hr />
          {userInfo
            ? cartItems.map((item) => {
                return (
                  <div>
                    <div className="cartitems-format cartitems-format-main">
                      <img
                        src={`http://127.0.0.1:8000/${item.image}`}
                        alt=""
                        className="cartitems-produdct-icon"
                      />
                      <p>{item.name}</p>
                      <p>
                        <b>₹ </b>
                        {item.price}
                      </p>
                      <select
                        style={{ width: "80%", height: "50%" }}
                        className="selectsize"
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              userInfo.id,
                              item.productid,
                              e.target.value,
                              item.size
                            )
                          )
                        }
                      >
                        <option value={item.qty}>{item.qty}</option>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            className="selectsize"
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        className="selectsize"
                        style={{ width: "80%", height: "50%" }}
                        name=""
                        id=""
                        value={item.size}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              userInfo.id,
                              item.productid,
                              item.qty,
                              e.target.value
                            )
                          )
                        }
                      >
                        <option value=""> {item.size}</option>
                        <option className="selectsize" value="S">
                          S
                        </option>
                        <option className="selectsize" value="L">
                          L
                        </option>
                        <option className="selectsize" value="XL">
                          XL
                        </option>
                        <option className="selectsize" value="XXL">
                          XXL
                        </option>
                        <option className="selectsize" value="XXXL">
                          XXXL
                        </option>
                      </select>
                      <p>
                        <b>₹ </b>
                        {item.price * item.qty}
                      </p>
                      <i
                        style={{ fontSize: "20px", color: "red" }}
                        className="cartitems-remove-icon fa-solid fa-trash"
                        onClick={() => {
                          removeFromCartHandler(item.productid, userInfo.id);
                        }}
                      ></i>
                    </div>
                    <hr />
                  </div>
                );
              })
            : " "}{" "}
          <div className="cartitems-down">
            <div className="cartitems-total">
              <h2>Cart Totals</h2>
              <hr />
              <div>
                <div className="cartitems-total-item">
                  <p>Total Items</p>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Total</p>
                  <div>
                    {" "}
                    <b>₹</b>
                    {total_items}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="cartitems-promocod">
              <h2>Shipping Address</h2>
              <div className="cont">
                <form>
                  <div className="form-group">
                    <label className="label" for="fname">
                      Mobile
                    </label>
                    <input
                      type="text"
                      id="fname"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" for="fname">
                      Address
                    </label>
                    <input
                      type="text"
                      id="fname"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      placeholder="Address"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" for="lname">
                      City
                    </label>
                    <input
                      type="text"
                      id="lname"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      placeholder="City Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" for="fname">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="fname"
                      value={postalcode}
                      onChange={(e) => {
                        setPostalcode(e.target.value);
                      }}
                      placeholder="Postalcode"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" for="lname">
                      Country
                    </label>
                    <input
                      type="text"
                      id="lname"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      placeholder="Country"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button
            className="barbutton"
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      )}
    </>
  );
};

export default CardItems;
