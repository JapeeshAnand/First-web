const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    message: String,
});


module.exports = mongoose.model('Contact', ContactSchema);