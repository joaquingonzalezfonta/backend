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
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        index: true,
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
        maxlength: 70, 
        trim: true 
    },
    bornDate: { 
        type: String,
        required: true,
    },
    location: { 
        type: String,
        required: true, 
        minlength: 3,
        maxlength: 100
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

module.exports = mongoose.model("User", userSchema)