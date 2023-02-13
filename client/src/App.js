import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from "./Views/landing/Landing"
import Home from './Views/Home/Home';


function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Switch>
        <Route exact path={"/"} component= {Landing}></Route>
        <Route path={"/home"} component= {Home}></Route>
      </Switch>
      
    </div>
    </BrowserRouter>
  )
}

export default App;
