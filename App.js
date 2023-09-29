const express = require("express")
const app = express();
const Errors = require("./Errors");
const {users} = require("./objects");
const dotenv = require('dotenv');


dotenv.config(); // Cargar las variables de entorno desde .env

//Importar módulos de enrutamiento
const listEditRouter = require("./list-edit-router");
const listViewRouter = require("./list-view-router");


//Importar libreria jwt
const jwt = require("jsonwebtoken");

// Importar dotenv
require("dotenv").config();

// Importar variable secreto
const secretKey = process.env.JWT_SECRET;

// Middleware para recibir y analizar solicitudes en formato JSON
app.use(express.json());

// Middleware para validar el método http
const validateMethod = (req, res, next) => {
    const validsMethods = ["POST", "GET", "PUT", "DELETE"];
    if (!validsMethods.includes(req.method)) {
        return res.status(405).json({ error: Errors.invalidMethod});
    }
    next();
};

// Middleware para manejo global de errores
const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({ error: "Serve error"});
};

//Middleware para validar el token
const authToken = (req, res, next) => {
    const headerToken = req.headers.authorization;

    // Verficiar que la solicitud tenga token
    if(!headerToken) {
        return res.status(401).json({error: "No se registro ningún token"});
    }

    // Utilizar  jwt.verify para verificar la validez del token utilizando el secreto.
    /**
     * Si el token es válido, el ID del usuario se agrega  "req" para poder ser utilizado en las rutas protegidas
     */
    jwt.verify(headerToken, secretKey, (error, decoded) => {
        if (error) {
            return res.status(400).json({error: "Token inválido"});
        }

        // El id del usuario se agrega  "req" para poder ser utilizado en las rutas protegidas
        req.userId = decoded.id;
        next();
    });
}
// Crear Ruta de inició de sesión con POST login
app.post("/login", (req, res) => {
    const {username, password} = req.body;

    // Verificar si el usuario existe y si los datos son correctas
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas"});
    }

    // Crear el token JWT con la información del usuario
    const token = jwt.sign({ id: user.id }, secretKey);

    // Devolver el token en la respuesta
    res.json({ token });
});

// Ruta protegida
app.get("/protected", authToken, (req, res) => {
    // Obtener el id del usuario desde el token verificado
    const userId = req.userId;

    // Realizar alguna operación protegida 
    res.json({message: "Ruta protegida alcanzada", userId});
});

// Registrar módulos de enrutamiento
app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

// Aplicar Middleware de validación de método HTTP a todas las rutas
app.use(validateMethod);
// Aplicar middleware de manejo global de errores a todas las rutas
app.use(errorHandler);

// Servidor escuchando en el puerto 8000
app.listen(8000, () => {
    console.log("Servidor corriendo en puerto 8000")
});