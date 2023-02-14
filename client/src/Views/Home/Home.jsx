import CardContainer from "../../Components/CardsContainer/CardContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDogs } from "../../Redux/Actions"
const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDogs())
    }, [])
    return (
        <>
    <h1>Welcome to the best dogsite</h1>
    <CardContainer></CardContainer>
    </>
    )
}

export default Home