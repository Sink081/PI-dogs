import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar(){

    return (
      <div className='NavBar'>

        <div className='landing-link'>
          <div className='dog-logo'></div>
          <Link 
            style={{textDecoration: "none", color:"white", paddingLeft:"15px"}} to="/">
              DogSite
          </Link>
        </div>

          <div className='links-nav' >
            <div className='link-home'>
              <Link 
                style={{textDecoration: "none", color:"white"}} to="/Home">
                  Home
              </Link>
            </div>

            <div  className='link-breed'>
              <Link 
                style={{textDecoration: "none", color:"white"}} to="/create_breed">
                  Create a Breed
              </Link>
            </div>

            <div className='link-about'>
              <Link 
                style={{textDecoration: "none", color:"white"}} to="/About">
                  About
              </Link>
            </div>

          </div>

      </div>
    );
};