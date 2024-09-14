import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Home/Home"
import Products from "../src/Pages/Products/Products"
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Displayproduct from "../src/Pages/Displayproduct/Displayproduct"
import Cart from './Pages/Cart/Cart';
import Login from "./Pages/Login/Login"
import Signup from './Pages/Signup/Signup';
import Payment from './Components/Payment/Payment';
import MyOrder from './Pages/MyOrder/MyOrder';
import Contactdata from './Pages/Contactdata/Contactdata';
import Reset from './Components/Reset/Reset';
import PasswordReset from './Components/PasswordReset/PasswordReset';

function App() {

  return (
    <>
   
      <BrowserRouter>
        <Navbar />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/myorders" element={<MyOrder />} />
          <Route path="/cart/:id?" element={<Cart/>} />
          <Route path="/products/:data" element={<Products />} />
          <Route path="/displayproduct/:id" element={<Displayproduct />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/Payment" element={<Payment/>} />
          <Route path="/paypal-success" element={<Home />} />
          <Route path="/paypal-cancel" element={<Home />} />
          <Route path="/Contact" element={<Contactdata />} />
          <Route path="/reset" element={<Reset/>} />
          <Route path="/api/users/set-new-password/:uidb64/:token" element={<PasswordReset/>} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
   
  );
}

export default App;
