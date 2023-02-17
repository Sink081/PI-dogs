import React,{ useState, useEffect } from "react";
//Hooks
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  orderBy,
  filterByTemperaments,
  getTemps,
  filterByDogs, 
} from "../../Redux/Actions/index";
import Pagination from "../../Components/Paginado/Paginado";
import SearchBar from "../../Components/SearchBar/SearchBar";
import style from "./Home.module.css";
import Card from "../../Components/Card/Card";

// renderiza el componente Home
export default function Home() {
  
//permite renderizar las acciones
  const dispatch = useDispatch(); 
//permite usar el estado
  const allDogs = useSelector((state) => state.dogs); 
//permite usar el estado
  const temperaments = useSelector((state) => state.temperaments); 
//permite ordenar
  const [, setOrder] = useState("All"); 
//permite filtrar por raza
  const [, setDogs] = useState("All"); 
//permite comenzar en la página 1
  const [currentPage, setCurrentPage] = useState(1); 
//asigno la cantidad de cards por página
  const [dogsPerPage] = useState(8); 
//detrmino la última raza de la página
  const indexOfLastDog = currentPage * dogsPerPage;
//detrmino la primera raza de la página
  const indexOfFirstDogs = indexOfLastDog - dogsPerPage;
//determino la cantidad de razas que se muestran por página  
  const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDog); 
//permite filtrar por temperamento  
  const [temperament, setTemperament] = useState("All"); 

  const pagination = (currentPageNumber) => {
//permite actualizar cuando se cambia de página
    setCurrentPage(currentPageNumber); 
  };
//permite que se ejecute la acción cuando se renderiza la página
  useEffect(() => {
//permite que se actualice cuando cambia de página  
    setCurrentPage(1); 
//ejectuta el estado cuando se actualiza
  }, [allDogs]); 

  useEffect(() => {
    if (allDogs.length === 0) {
//trae las razas
      dispatch(getDogs()); 
//trae los temperamentos
      dispatch(getTemps()); 
    }
//ejecuta cuando cambia
  }, [dispatch, allDogs.length]); 
//permite el ordenamiento
  function handleClick(e) {
//permite que no se recargue la página
    e.preventDefault(); 
    dispatch(getDogs());
  }
//permite ordenar
  function handleSort(e) {
    dispatch(orderBy(e.target.value));
//permite que cuando cambie de página se actualize 
    setCurrentPage(1); 
//permite que se actualice el estado
    setOrder(e.target.value); 
  }
//permite filtrar por temperamento
  function handleFilterByTemp(e) {
    
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setTemperament(e.target.value);
  }

  function handleFilterByDogs(e) {
    e.preventDefault();
    dispatch(filterByDogs(e.target.value));
    setCurrentPage(1);
    setDogs(e.target.value);
  }

  return (
    <div className={style.homeDiv}>
      <div className={style.title}>
        <h1> Dogs Library</h1>
      </div>
     
        
      
        <div className={style.CardContainer}>
          {currentDogs?.map((dog) => { //lógica de ternarios
            console.log(dog)
            return (
              <div>
                <Card
                  id={dog.id}
                  name={dog.name}
                  image={dog.image}
                  temperament={dog.temperament.join(", ")}
                  weight={dog.weight}
                  height={dog.height}
                />
              </div>
            );
          })}
          
        </div>
      
      <div className={style.buttonCont}>
      <div>
        <Link to="/create">
          <button className={style.createButton} type="button">
            Create Dog
          </button>
        </Link>
      </div>
      <div>
      <button
          className={style.refBtn}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>

      </div>
      <div className={style.buttonCont}>
      
      <div className={style.searchBar}>
        <SearchBar />
      </div>
     
      <div>
        <select className={style.sortBy} onChange={(e) => handleSort(e)}>
          <option value="default"> Sort by... </option>
          <option value="az"> A-Z</option>
          <option value="za"> Z-A </option>
          <option value="asc"> Lightest </option>
          <option value="desc"> Heaviest </option>
        </select>
      </div>

      <div>
        <select
          className={style.filterTemps}
          value={temperament}
          onChange={(e) => handleFilterByTemp(e)}
        >
          <option value="All"> All temperaments </option>
          {temperaments?.map((temp, index) => (
            <option onClick={(e) => handleClick(e)} key={index}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          className={style.filterDogs}
          onChange={(e) => {
            handleFilterByDogs(e);
          }}
        >
          <option value="all">All Dogs</option>
          <option value="created">Your created Dogs</option>
          <option value="api"> Library Dogs</option>
        </select>
      </div>
      </div>
      
      <div className={style.Pagination}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
      <div>
      <h4>By Juan Bertolotti (y asociados)</h4>
      </div>
      </div>
  );
}