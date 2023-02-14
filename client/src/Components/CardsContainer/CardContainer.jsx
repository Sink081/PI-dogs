import Card from "../Card/Card";
import style from "./CardContainer.module.css"
import {useSelector} from "react-redux"


const CardContainer = () => {
const dogs = useSelector(state => state.dogs)
    return (
    <div className={style.container}>
    {dogs.map(dogs =>{
        return (
            <Card
            id={dogs.id}
            name={dogs.name}
            temperament={dogs.temperament}
            weight={dogs.weight}
            img={dogs.img} 
            />
        )
    })}
    </div>
)
}
export default CardContainer