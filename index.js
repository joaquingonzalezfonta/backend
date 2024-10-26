require('dotenv').config();

const app = require('./app');
const reset = "\x1b[0m";

const PORT = 3000;
const mongoose = require('mongoose');



const DATABASE_URL = process.env.MONGO_URI;

mongoose.connect(DATABASE_URL).then(() => {
    console.log(`\x1b[35m Conexion a la base de datos exitosa! ${reset}`);
    
    app.listen(PORT, () => {
        console.log(`\x1b[34m Server is running on port ${PORT} ${reset}`);
    })

}).catch(error => console.log("Error al conectar a la DB!", error))
