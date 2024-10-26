const mongoose = require('mongoose')

const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: { type: String, required: true },
    viewValue: { type: String, require: true },
    description: { type: String }
})



module.exports = mongoose.modelNames('Category', categorySchema)