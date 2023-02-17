import React from "react";
import {Link} from "react-router-dom"
import style from"./landing.module.css"

export default function LandingPage(){
    return (
        <div className={style.landing}>
            <h1> Welcome to a new DogSite! </h1>
                <Link to="/home">
                    <button className={style.btnLan}> Home </button>
                </Link>
        </div>
    )
}