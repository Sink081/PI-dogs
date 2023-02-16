import './App.css';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import { Landing, Home, Form, Details} from "./Views/index"
import NavBar from './Components/NavBar/NavBar';


function App() {
  const location = useLocation();
  return (
    <BrowserRouter>
    <div className='app'>
      
        {location.pathname !== "/" && <NavBar/>}
        <Route exact path={"/"} component= {Landing}></Route>
        <Route path={"/dogs/:id"} component= {Details}></Route>
        <Route path={"/home"} component= {Home}></Route>
        <Route path={"/create"} component= {Form}></Route>
      
      
    </div>
    </BrowserRouter>
  )
}

export default App;
