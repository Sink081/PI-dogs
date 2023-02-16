import React from "react";
import {Link} from "react-router-dom"
import style from "./Card.module.css"

export default function Card(props){
    return (
        <div className={style.card}>
        <div>       
              <img src={props.image} alt="There is no img" />
          </div>
          <Link to={`/dogs/${props.id}`}>
            <h2 className="breedName"> {props.name} </h2>
         
          <p className="cardTemp"> Temperaments: {props.temperament} </p>

          <p className="cardW"> Weight: {props.weight}  Kg </p>
 </Link>
        </div>
    )
}
