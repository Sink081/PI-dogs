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
    if (name) {
        let dogName = dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send(`The dog $[name] doesnt exist`);
    }
    else {
        res.status(200).send(dogsTotal);
    }
})
module.exports = router;
