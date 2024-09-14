import React from 'react'
import "./Contact.css"
const Contact = () => {
  return (
    <>
    <div>
      <section id="page-header" className="about-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of Tesko Dude for good products or contact us today.</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="bi bi-geo-alt-fill"></i>
              <p>56 Glassford Street Glasgow G1 1UL New York.</p>
            </li>
            <li>
              <i className="bi bi-envelope-fill"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="bi bi-telephone-fill"></i>
              <p>+000 123 000 77 88</p>
            </li>
            <li>
              <i className="bi bi-alarm-fill"></i>
              <p>Monday to Saturday: 9.00am to 4.00pm</p>
            </li>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60710.79354208219!2d79.51014115166831!3d18.00548822525114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f75c05023ed%3A0x2352eaaf6fe897ea!2sHanamkonda%2C%20Telangana!5e0!3m2!1sen!2sin!4v1726199987736!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title='address'
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section id="form-details">
        <form action="">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Subject" />
          <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
          <button className="normal">Submit</button>
        </form>
        <div className="people">
          <div>
            <img src="https://raw.githubusercontent.com/tech2etc/Build-and-Deploy-Ecommerce-Website/main/img/people/1.png" alt="John Doe" />
            <p><span>John Doe</span> Senior Marketing Manager <br /> phone: +000 123 000 77 88 <br /> Email: contact@example.com</p>
          </div>
          <div>
            <img src="https://raw.githubusercontent.com/tech2etc/Build-and-Deploy-Ecommerce-Website/main/img/people/2.png" alt="William Smith" />
            <p><span>William Smith</span> Senior Marketing Manager <br /> phone: +000 123 000 77 88 <br /> Email: contact@example.com</p>
          </div>
          <div>
            <img src="https://raw.githubusercontent.com/tech2etc/Build-and-Deploy-Ecommerce-Website/main/img/people/3.png" alt="Emma Stone" />
            <p><span>Emma Stone</span> Senior Marketing Manager <br /> phone: +000 123 000 77 88 <br /> Email: contact@example.com</p>
          </div>
        </div>
      </section>

      <section id="newsletter" className="section-p1">
        <div className="newstext">
          <h4>Signup For Newsletters</h4>
          <p>Get E-mail updates about our latest shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your email address" />
          <button className="normaldd">Sign up</button>
        </div>
      </section>
    </div>
  </>
  )
}

export default Contact