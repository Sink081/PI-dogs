import React from "react";
import { Link } from "react-router-dom";
import "../landing/landing.css"

export default function landing() {
    return (
        <div className = "container">
            <div className = "link-home">
                <Link to ="/home">
                    <h2>Welcome to your favourite place for dogs info!</h2><br/>
                        <button className="access-btn">ENTER!</button>
                </Link>
            </div>
        </div>
    )
}
