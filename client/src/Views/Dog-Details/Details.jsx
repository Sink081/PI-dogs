import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogDetailsById} from "../../Redux/Actions";

   
    const Details = () => {
        const {id} = useParams();   
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getDogDetailsById(id))
            }, [dispatch, id]);
        const dogDetails = useSelector((state) => state.dogDetails)
    
            
    

    return (
        <div>
            <h2> {dogDetails.name} </h2>
            <div>
                <img src={dogDetails.image} alt= {"Loading..."} />
            </div>
            {dogDetails.temperament ? <p> <b>Temperaments: </b> {dogDetails.temperament}</p> : null}
            <div>
                <p>Weight : {dogDetails.weight} Kg.</p>
            </div>
            <p>Height: {dogDetails.height} cm</p>
            <p>Lifespan: {dogDetails.lifespan} </p>
            <Link to= {"/home"}>
                <button>Back </button>
            </Link>
        </div>
    )
}

export default Details