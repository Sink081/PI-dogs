import style from'./App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Landing, Home, Form, Details} from "./Views/index"



function App() {
  
  return (
    <BrowserRouter>
    <div className={style.app}>
      
        
        <Route exact path={"/"} component= {Landing}></Route>
        <Route path={"/dogs/:id"} component= {Details}></Route>
        <Route path={"/home"} component= {Home}></Route>
        <Route path={"/create"} component= {Form}></Route>
      
      
    </div>
    </BrowserRouter>
  )
}

export default App;
