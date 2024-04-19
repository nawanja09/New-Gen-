import React from "react";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import loginImg from "../../assets/login.svg";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
const Home = () => {
  return (


    
    <div>
      
      <section className="container hero">
        <div className="hero-text">
          <h2>welcome to NGC</h2>
          <p>
            you can login or register now
          </p>
         
          <div className="hero-buttons --flex-start">
            <button className="--btn --btn-danger">
              <Link to="/register">Register</Link>
            </button>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          
          </div>
        </div>

        <div className="hero-image">
          <img src={home} alt="Auth" />
        </div>
      </section>
    </div>
  );
};

export default Home;
