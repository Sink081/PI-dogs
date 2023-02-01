const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const Temperament = require('../models/Temperament');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`)
}

const getDbInfo = async() => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes[],
            }
        },
    })
}
module.exports = router;
