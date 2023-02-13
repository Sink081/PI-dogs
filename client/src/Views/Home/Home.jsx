import React, { Fragment } from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../../Redux/Actions";
import {Link} from "react"
import Card from "../Card/Card";

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    useEffect (() => {
        dispatch(getDogs)
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    return(
        <div>
            <Link to = "/dogs"> Create Dogs</Link>
            <h1>Dogs Info</h1>
            <button onClick={e=> {handleClick(e)}}> Reset all Dogs</button>
        <div>
            <select>
                <option value= {"a-z"}>
                    A-Z
                </option>
                <option value={"Z-A"}>
                    Z-A
                </option>
            </select>
            <select>
                <option value={"Order by weight >"}> Order by weight 1</option>
                <option value={"Order by weight <"}> Order by weight 2</option>
            </select>
            <select>
                <option value={"temperament"}>Temperament</option>
                <option value={"default"}>Default</option>
                <option value={"Created"}>Created</option>
            </select>
            {allDogs?.map( (c)=>{
                return (
                    <fragment>
                        <Link to= {"/home/" + c.id}>
                        <Card name={c.name} image= {c.img} temperament= {c.temperament} weight= {c.weight}></Card>
                        </Link>
                        </fragment>
            )})}
            
        </div>

        </div>
    )

    
}