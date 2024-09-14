import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
<section className="footer" id="aboutus">
  <div className="box-container">
    <div className="box">
      <h3>About us</h3>
      <p><b>Brand Story:</b> Share the origin story of your business. Explain why you started it and what drives your passion. Make it memorable and personal so that customers can relate to your journey1.<br/>
      <br />
<b>Audience Focus:</b> Clearly state what you offer and who your products or services are for. Help shoppers understand the value you provide and how you solve their problems or meet their needs1.<br/>
<br />
<b>Unique Selling Points (USPs):</b> Highlight what sets your brand apart. Whether it’s exceptional quality, eco-friendly practices, or outstanding customer service, emphasize what makes you unique</p>
    </div>
    <div className="box">
      <h3>Branch locations</h3>
      <a href="/"><i className="fa-solid fa-indian-rupee-sign"></i> -India</a>
      <a href="/"><i className="fa-solid fa-hand-holding-dollar"></i>-USA</a>
      <a href="/"><i className="fa-solid fa-circle"></i>-Japan</a>
      <a href="/"><i className="fa-solid fa-franc-sign"></i>-France</a>
    </div>
    <div className="box">
      <h3>Quick links</h3>
      <a href="/"><div className="icon"><i className="fa-solid fa-house"></i>- Home</div></a>
      <a href="/"><div className="icon"><i className="fa-solid fa-shirt"></i>-Products</div></a>
      <a href="/"><div className="icon"><i className="fa-solid fa-list"></i>-Myorders</div></a>
      <a href="/"><div className="icon"><i className="fa-solid fa-address-card"></i>-About us</div></a>
      <a href="/"><div className="icon"><i className="fa-solid fa-phone"></i>-Contact</div></a>
      <a href="/"><div className="icon"><i className="fa-solid fa-cart-shopping"></i>-Mycart</div></a>
    </div>
    <div className="box">
      <h3>Follow us</h3>
      <a href="/"><i className="bi bi-facebook"></i><i className="fa-brands fa-facebook"></i>-Facebook</a>
      <a href="/"><i className="bi bi-instagram"></i><i className="fa-brands fa-instagram"></i>-Instagram</a>
      <a href="/"><i className="bi bi-twitter"></i><i className="fa-brands fa-twitter"></i>-Twitter</a>
      <a href="/"><i className="bi bi-linkedin"></i><i className="fa-brands fa-linkedin"></i>-Linkedin</a>
    </div>
    <div className="box">
      <h3>Contact us</h3>
      <p>Roadno:xxxxxx<br/>Area:xxxxx<br/>Mobile no:+9193469058xx<br/>India<br/>Telangana<br/>india</p>
    </div>
    <div className="box">
            <h4>Install App</h4>
            <p>Form App Store or Google Play</p>
            <div className="roww">
            <img src="https://i.imgur.com/dBcUhHh.jpg" alt=""/>
            <img src="https://i.imgur.com/XNTYnRQ.jpg" alt=""/>
            </div>
            <p>Secured Payment Gateways</p>
            <img src="https://i.imgur.com/rSYpzYx.png" alt=""/>
        </div>
  </div>
</section>
  )
}

export default Footer