import React from "react";
import style from "./Card.module.css"

export default function Card({name, image, temperament, weight}){
    return (
        <div className={style.card}>
        <h3>{name}</h3>
        <h5>{temperament}</h5>
        <h7>{weight}</h7>
        <img source= {image} alt= "img not found" width={"200px"} height={"250px"} />
        </div>
    )
}