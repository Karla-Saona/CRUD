//Express es el framework que nos permite crear servidores HTTP de forma sencilla en Node.js
const express = require("express");
const app = express(); //express() devuelve un objeto "app" que representa nuestro servidor

//MIDDLEWARES
app.use(express.json()); // permite leer JSON en el body
app.use(express.urlencoded({ extended: true })); //permite leer datos de formularios


//    Simuló una base de datos usando un array de usuarios
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// RUTA DE PRUEBA - GET / Sirve para comprobar que el servidor está funcionando

app.get('/', (req, res) => {
    res.send('hola');
});

//OBTENER TODOS LOS USUARIOS
// GET /usuarios -> Devuelve la lista completa de usuarios en formato JSON
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// GET /usuarios/:nombre -> OBTENER UN USUARIO POR NOMBRE
//:nombre es un parámetro de la URL
//Se busca el usuario ignorando mayúsculas/minúsculas
app.get("/usuarios/:nombre", (req, res) => {
  const { nombre } = req.params;

const user = usuarios.find(
    u => u.nombre.toLowerCase() === nombre.toLowerCase()
  );


// Si no se encuentra el usuario, se devuelve un error 404
if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  return res.json(user);
});

// POST /usuarios -> crear nuevo usuario
app.post("/usuarios", (req, res) => {
const { nombre, edad, lugarProcedencia } = req.body; // Los datos llegan por el body. Funciona gracias a app.use(express.json()).

// Validación básica
//Se valida que no falte ningún campo, error Verifica que no falte ningún dato obligatorio.
//Si falta algo: Devuelve 400 Bad Request
if (!nombre || !edad || !lugarProcedencia) {
    return res.status(400).json({ error: "Faltan campos: nombre, edad, lugarProcedencia" });
}

//id:
//Si ya hay usuarios → toma el último id y suma 1
//Si no hay usuarios → empieza en 1

//edad:
//Se convierte a número por seguridad
//Se construye el objeto completo del nuevo usuario
const nuevo = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    edad: Number(edad),
    lugarProcedencia
};

// guardar usuario. Añade el nuevo usuario al array y Simula guardar en una base de datos
usuarios.push(nuevo);
    res.status(201).json(nuevo);
});



//El servidor empieza a escuchar peticiones HTTP
app.listen(3000, () => {
    console.log('Express esta escuchando en el puerto 3000');
});