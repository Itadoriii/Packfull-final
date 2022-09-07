const express = require('express')
const app = express()
const port = 3000

const productos = [
    {
        id:1,
        name: "Nombre",
        precio: 50,
        imagen: "img/img carrusel/carrusel 3.jpg",
        stock: 30
    },
    {
        id:1,
        name: "Nombre",
        precio: 50,
        imagen: "img/img carrusel/carrusel 3.jpg",
        stock: 30
    },
    {
        id:1,
        name: "Nombre",
        precio: 50,
        imagen: "img/img carrusel/carrusel 3.jpg",
        stock: 30
    },
    {
        id:1,
        name: "Nombre",
        precio: 50,
        imagen: "img/img carrusel/carrusel 3.jpg",
        stock: 30
    },
    {
        id:1,
        name: "Nombre",
        precio: 50,
        imagen: "img/img carrusel/carrusel 3.jpg",
        stock: 30
    }
]

app.get('/api/productos', (req, res) => {
  res.send(productos)
});

app.use('/',express.static("Tienda"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});