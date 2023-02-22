import React from "react";
import {Link} from "react-router-dom"
import style from "./Card.module.css"

export default function Card({id, name, temperament, image, weight}){
    return (
        <div className={style.card}>
        <div className= {style.breedsContainer}>
            <div className= {style.breedsCard}> 
                <div className= {style.breedImage}>      
              <img className="image" src={`${image}`} alt="There is no img" />
          </div>
          <Link to={`/dogs/${id}`}>
            <h2 className={style.breedName}> {name} </h2>
         
          <p className={style.cardTemp}> Temperaments: {temperament + ","} </p>

          <p className={style.cardW}> Weight: {weight}  Kg </p>
            </Link>
                </div>
            </div>
        </div>
    )
}
