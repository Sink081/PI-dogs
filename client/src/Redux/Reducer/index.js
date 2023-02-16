//importo las acciones
import {
    GET_DOGS,
    GET_BY_QUERY,
    GET_DOG_DETAILS,
    ORDER_BY,
    FILTER_TEMPS,
    GET_TEMPS,
    FILTER_DOGS,
    CREATE_DOG,
    } from "../Actions/index";
const initialState = {
    dogs : [],
    filtered: [],
    dogDetails: [],
    temperaments: [],
}
//esta función la hice para poder separar los datos que vienen en un string de peso y altura
//para luego poder sacar un promedio entre el valor inferior y el superior,
//que permitirá el ordenamiento
var average = function(string) {
    var str = string;
    var arr = str.split(" - ");
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += parseInt(arr[i]);
    }
    return sum / arr.length;
  }

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS :
        return{
            ...state,
            dogs : action.payload,
            filtered: action.payload
        }; case GET_BY_QUERY :
        return{
            ...state,
            dogs : action.payload,
        }; case GET_TEMPS :
        return{
            ...state,
            temperaments: action.payload,
        }; case GET_DOG_DETAILS :
        return{
            ...state,
            dogDetails: action.payload,
        };  case ORDER_BY :
        
            if (action.payload === "default") {
                return {
                    ...state,
                    dogs : state.dogs
                };
            }
            if (action.payload === "az"){
                return {
                    ...state,
                    dogs: state.dogs.sort(function(a,b){
                        if ( a.name > b.name){
                            return 1;
                        }
                        if ( b.name > a.name){
                            return -1;
                        }
                        return 0
                    })
                }
            }if (action.payload === "za") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function(a,b){
                        if ( a.name < b.name){
                            return 1;
                        }
                        if ( b.name < a.name){
                            return -1;
                        }
                        return 0
                    })
                }
            }if (action.payload === "asc") {
        
                return {
                  
                  ...state,
                  dogs: state.dogs.sort(function (a, b) {
                  
                    if (average(a.weight) > average(b.weight)) {
                      return 1;
                    }
                    if (average(b.weight) > average(a.weight)) {
                      return -1;
                    }
                    return 0;
                  }),
                };
              }
              if (action.payload === "desc") {
                return {
                  ...state,
                  dogs: state.dogs.sort(function (a, b) {
                    if (average(a.weight) > average(b.weight)) {
                      return -1;
                    }
                    if (average(b.weight) > average(a.weight)) {
                      return 1;
                    }
                    return 0;
                  }),
                };
              } else {
                return {
                  ...state,
                };
              }case FILTER_TEMPS:
              //crea una variable que contiene a todas las razas
                    const allBreeds = state.filtered; 
                    const temperamentFilter =
              // si el payload es igual a all, entonces que me devuelva todos los perros, sino que me devuelva
              // los perros que incluyan el temperament que le estoy pasando por el payload
                      action.payload === "All"
                        ? allBreeds
                        : allBreeds.filter((e) => e.temperament?.includes(action.payload)); 
                    return {
                      ...state,
                      dogs: temperamentFilter,
                    };
                    case FILTER_DOGS:
                        if (action.payload === "created") {
                            if (
                                state.filtered.filter((item) => typeof item.id === "string")
                                .length === 0
                            ) {
                            return alert("no breed");
                            }
                            return {
                            ...state,
                            dogs: state.filtered?.filter((item) => typeof item.id === "string"),
                            };
                        } else {
                            return {
                            ...state,
                            dogs: state.filtered.filter((item) => typeof item.id === "number"),
                            };
                        }  case CREATE_DOG:
                        return {
                          ...state,
                          ...action.payload 
                        };
        
                    default :
                        return state;
                };   
            }



export default rootReducer