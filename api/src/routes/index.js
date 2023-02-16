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
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            lifespan: el.lifespan,
            image: el.image.url,
            id: el.id,
            temperament: el.temperament,
        }
    });
    return apiInfo
}

const getDbInfo = async() => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        },
    });
}

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
        const api = await axios.get('https://api.thedogapi.com/v1/breeds')
        const breeds = await api.data.map (el => el.temperament)
        let breedsSplit = await breeds.join().split(',')
        let breedsTrim = await breedsSplit.map(temper => temper.trim())
        await breedsTrim.forEach( async (temper) => {
            if(temper.length > 0){
                await Temperament.findOrCreate({
                    where : {name : temper}
                })
            }
        })
        const allTemperament = await Temperament.findAll()
       
        return res.status(200).json(allTemperament)
    }catch (error){
         res.status(404).send({error: 'There are no temperaments'})
     }
})

    router.post("/create", async (req, res) => {
        let { name, life_span, weight, height, image, temperament } = req.body;
        
        try {
          const newBreed = await Dog.findOrCreate({
            
             
              name: name,
              weight : weight,
              height : height,
              life_span : life_span,
              image: image,
            
          });
          await newBreed.setTemperaments(temperament); 
          
          res.status(200).json(newBreed);
        } catch (err) {
          res.status(404).send("Couldn't create breed");
        }
      });

module.exports = router;
