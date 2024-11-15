const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Vamos a definir el equema de nuestro modelo

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80
    },
    email: {
        type: String,
        required: true,
        trim: true, // Quita los espacios adelante y atras
        minlength: 5,
        maxlength: 100,
        unique: true, // Otro usuario no va a poder utilizar este correo
        index: true,// Arma un indice de usuarios mediante el mail
        validate: {
            validator: (value) => {
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

                return regex.test(value)
            }
        }
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 4, 
        maxlength: 80, 
        trim: true 
    },
    birthdate: { 
        type: String,
        required: true,
    },
    number: { 
        type: String,
        required: true,
    },
    province: { 
        type: String,
        required: true,
    },
    comentary: { 
        type: String,
        maxlength: 300
    },
    image: { 
        type: String,
    },
    role: {
        type: String,
        default: "client",
        enum: ["client", "user", "admin", "superadmin"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema)