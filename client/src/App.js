import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home';
import Landing from './Views/landing/Landing'
import Create from './components/Create';
import DogDetails from './components/DogDetails';
import About from './components/About';
function App() {
  
  //const dispatch = useDispatch();

  //useEffect(() => {
  //dispatch(obtainDogs()) // >>> crear la function para obtener los perros del estado del reducer.
  //}, [dispatch]);
  
  
  return (
    <BrowserRouter>
      <div className='App'>
      <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route path='/create_breed' component= {Create}/>
          <Route path='/home/:id' component= {DogDetails}/>
          <Route exact path='/about' component={About} />
        </Switch>  
      </div>  
    </BrowserRouter>
  );
}

export default App;
