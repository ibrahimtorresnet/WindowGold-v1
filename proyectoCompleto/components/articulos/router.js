const express = require('express');
const router = express.Router();
const response = require('../../response/index.js');
const controller = require('./controller.js');

// Ruta para obtener todas las compras, cambia '/compras' a '/articulos'
router.get('/', (req, res) => {
 controller.getAllArticulos() // Asegúrate de que este método exista en tu controlador
    .then(articulos => res.status(200).json(articulos))
    .catch(err => res.status(500).json({ error: err.toString() }));
});

// Ruta para crear un nuevo artículo, cambia '/' a '/articulos'
router.post('/', (req, res) => {
 const articulo = req.body;
 controller.addArticulo(articulo) // Asegúrate de que este método exista en tu controlador
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.toString() }));
});

// Ruta para actualizar un artículo existente, cambia '/:id' a '/articulos/:id'
router.patch('/:id', (req, res) => {
 const id = req.params.id;
 const articuloData = req.body;
 controller.updateArticulo(id, articuloData) // Asegúrate de que este método exista en tu controlador
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
