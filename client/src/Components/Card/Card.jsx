import React from "react";
import {Link} from "react-router-dom"
import style from "./Card.module.css"

export default function Card({id, name, temperament, image, weight}){
    return (
        <div className={style.card}>
        <div>       
              <img src={`${image}`} alt="There is no img" />
          </div>
          <Link to={`/dogs/${id}`}>
            <h2 className="breedName"> {name} </h2>
         
          <p className="cardTemp"> Temperaments: {temperament} </p>

          <p className="cardW"> Weight: {weight}  Kg </p>
 </Link>
        </div>
    )
}
