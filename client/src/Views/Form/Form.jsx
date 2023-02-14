import { useState } from "react"

const Form = () => {
    
    const [form, setForm] = useState({
        name: "",
        height: "",
        weight: "",
        lifespan: "",
    }) 
    const changeHandler = (event) =>{
        const property = event.target.name
        const value = event.target.value

        setForm({...form,[property]:value})
    }


    return (
        <form>
            <div>
                <label>Name</label>
                <input type={"text"} value={form.name} onChange={changeHandler} name= {"name"}></input>
            </div>
            <div>
                <label>Height</label>
                <input type={"text"} value={form.height} onChange={changeHandler} height={"height"}></input>
            </div>
            <div>
                <label>Weight</label>
                <input type={"text"} value={form.weight} onChange={changeHandler} weight={"weight"}></input>
            </div>
            <div>
                <label>Lifespan</label>
                <input type={"text"} value={form.lifespan} onChange={changeHandler} lifespan={"lifespan"}></input>
            </div>
    
        </form>
    )
}

export default Form