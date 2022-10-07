const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactGym',{useNewUrlParser: true});
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const port = 80;


const contactSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 



app.get('/', (req, res)=>{
    res.status(200).render('pages/home.ejs');
})

app.get('/price&plans', (req, res)=>{
    res.status(200).render('pages/price&plans.ejs');
})

app.get('/schedule', (req, res)=>{
    res.status(200).render('pages/schedule.ejs');
})

app.get('/contact', (req, res)=>{
    res.status(200).render('pages/contact.ejs');
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        let show = 'show';
        res.status(200).render('pages/contact.ejs',show);
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
    
})


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});