import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogDetailsById} from "../../Redux/Actions";
import style from "./Detail.module.css"
   
    const Details = () => {
        const {id} = useParams();   
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getDogDetailsById(id))
            }, [dispatch, id]);
        const dogDetails = useSelector((state) => state.dogDetails)
    
            
    

    return (
        <div className={style.detailsBackground}>
            <div className={style.detailsCss}>
            <h2> {dogDetails.name} </h2>
            <div className={style.detailsContainer}>
                <img src={dogDetails.image} alt= {"Loading..."} />
            </div>
            {dogDetails.temperament ? <p> <b>Temperaments: </b> {dogDetails.temperament}</p> : null}
            <div className={style.weightCss}>
                <p>Weight : {dogDetails.weight} Kg.</p>
            </div>
            <p className={style.heightCss}>Height: {dogDetails.height} cm</p>
            <p className={style.lifeCss}>Life span: {dogDetails.life_span} </p>
            <Link to= {"/home"}>
                <button>Back </button>
            </Link>
            </div>
        </div>

    )
}

export default Details