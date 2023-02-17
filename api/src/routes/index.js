const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {Dog, Temperament} = require('../db.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async() => {
    //const info = (data) =>{
    //    if (data) return data.split(", ")
    //}
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds")
    const spliter = (data) => {
      if (data) return data.split(", ");
    };
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            image: el.image.url,
            id: el.id,
            temperament: spliter(el.temperament),
        }
    });
    return apiInfo
}

const getDbInfo = async () => {
  //creo un array con todos los datos de la tabla DOG
    let breedsDB = await Dog.findAll({
  //paraa que funcione vinculación y asignación   
      include: Temperament, 
    });
  //convierto en una cadena de texto JSON
    breedsDB  = JSON.stringify(breedsDB);
  //analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis
    breedsDB  = JSON.parse(breedsDB); 
  //itero sobre todos los registros de razas para poder asingarle a c/u su temperamento correpondiente
  // con el reduce, concat y map saco del arreglo de temperamentos el nombre de c/u 
  breedsDB  = breedsDB.reduce(
      (acc, el) =>
        acc.concat({
          ...el,
  //me quedo con el name de cada temperamento
          temperament: el.temperaments.map((t) => t.name), 
        }),
      []
    ); 
    return breedsDB;
  };

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const completeInfo = apiInfo.concat(dbInfo);
    return completeInfo
}

router.get("/dogs", async (req,res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    try {
          if (name){
            let dogName = dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send(`The dog doesnt exist`);
          }
          else {
            res.status(200).send(dogsTotal);
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    
})
router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    const allDogs = await getAllDogs()
    try {
            const dogsSelected = allDogs.filter((el) => el.id == id)
            console.log(id)
            if (dogsSelected.length){
                res.status(200).json(dogsSelected)
            } else 
            res.status(200).send(`The breed with the id ${id} doesn't exist`)
    } catch (error) {
       
        res.status(404).json({error: error.message})
    }
});

router.get("/temperament", async (req, res) => {
    try {
      const temperamentsFromDB = await Temperament.findAll();
      if (temperamentsFromDB >= 1) res.json(temperamentsFromDB);
  
      const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds');
      let everyTemperament = apiInfo.data
        ?.map((breed) => (breed.temperament ? breed.temperament : null))
        .map((breed) => breed && breed.split(", ")); 
// El objeto Set le permite almacenar valores únicos de cualquier tipo, ya sea valores primitivos o referencias a objetos
//El método flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada
      const mySet = [...new Set(everyTemperament.flat())]; 
      let temperamentsToDB = mySet.forEach((t) => {
        if (t) {
          Temperament.findOrCreate({
            where: { name: t },
          });
        }
      });
//The Sequelize findAll() method is used to query data from your SQL table to your JavaScript application. 
//The method will return your table rows as an array of objects.
// The findAll() method can be called from a Model that represents the table in your database.
      temperamentsToDB = await Temperament.findAll();
      res.status(200).json(temperamentsToDB);
    } catch (error) {
      res.status(404).send("No temperaments found");
    }
  });


  router.post("/create", async (req, res) => {
    let { name, weight, height, life_span, image, temperament } = req.body;

    if (!name || !weight || !height || !life_span || !temperament)
    res.status(400).json({ msg: "Missing data" });

    try {
    //Busca una entrada en la tabla o la crea cuando no existe, devuelve una array
      const newBreed = await Dog.findOrCreate({
        
        where: {
          name: name,
          weight,
          height,
          life_span,
          image: image,
        },
      });
      //relaciono el ID del temperamento con la raza creada
      await newBreed[0].setTemperaments(temperament); 
      
      res.status(200).json(newBreed);
    } catch (err) {
      res.status(404).send("Couldn't create breed");
    }
  });
  
module.exports = router;
