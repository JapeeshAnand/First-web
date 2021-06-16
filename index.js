const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

mongoose.connect('mongodb://localhost:27017/my-website', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('about')
})

app.get('/makecontact', async (req, res) => {
    const contact = new Contact({ firstname: "fname", lastname: "lname", email: "abcd@gmail.com", message: "best website" });
    await contact.save();
    res.send(contact);
})

app.get('/jsa/about', (req, res) => {
    res.render('about')
})

app.get('/jsa/contact', (req, res) => {
    res.render('contact');
})

app.post('/contacts', async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.redirect('/');
})

app.listen(3000, (req, res) => {
    console.log("LISTENING ON PORT 3000!");
})