import axios from "axios";

export const GET_DOGS = "GET_DOGS"
export const GET_TEMPS = "GET_TEMPS";
export const GET_BY_QUERY = "GET_BY_QUERY";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const FILTER_TEMPS = "FILTER_TEMPS";
export const FILTER_DOGS = "FILTER_BREED";
export const ORDER_BY = "ORDER_BY"
export const CREATE_DOG = "CREATE_DOG"


export function getDogs(){
    return async function (dispatch){
        var dogs = await axios.get("/dogs");
        dispatch ({
            type : GET_DOGS,
            payload : dogs.data,
        })
    }
}

export function getTemps() {
    return async function (dispatch){
        var temps = await axios.get("/temperament", {});
        dispatch({
            type: GET_TEMPS,
            payload: temps.data,
        })
    }
}

export function getByQueryName(name) {
    return async function (dispatch){
        var particularDog = await axios.get (`/dogs?name=${name}`);
        dispatch({
            type: GET_BY_QUERY,
            payload: particularDog.data,
        })
    }
}

export function getDogDetailsById (id){
    return async function (dispatch){
        try{
        var dogId = await axios.get (`/dogs/${id}`)
        dispatch({
            type: GET_DOG_DETAILS,
            payload: dogId.data[0], 
        })
    }catch (error) {
        alert(error);
      }
    };
  }
  export function orderBy(payload) {
    return {
      type: ORDER_BY,
      payload,
    };
  }
  
  export function filterByTemperaments(payload) {
    return function (dispatch) {
      console.log(payload);
      dispatch({ type: FILTER_TEMPS, payload });
    };
  }
  
  export function filterByDogs(payload) {
    return {
      type: FILTER_DOGS,
      payload,
    };
  }
  
  export function createDog(payload) {
    return async function (dispatch) {
      try {
        await axios.post("/create", payload);
        return dispatch({
          type: CREATE_DOG,
        });
      } catch (error) {
        alert("Post failed");
      }
    };
  }
  
  
    
