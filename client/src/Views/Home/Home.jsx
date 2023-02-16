import CardContainer from "../../Components/CardsContainer/CardContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDogs, getTemps } from "../../Redux/Actions"

const Home = () => {
    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch(getDogs())
        dispatch(getTemps())
    }, [dispatch])
    return (
        <>
    <h1>Welcome to the best dogsite</h1>
    
    <CardContainer></CardContainer>
    </>
    )
}

export default Home