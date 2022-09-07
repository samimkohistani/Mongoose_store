// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require("./models/products")

// middleware
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//testing server

app.get("/", function (req, res){
    res.send("Welcome to mongoose_store")
});


//Index

app.get("/products" , function (req, res){
    Product.find({}, (error, allProducts)=> {
        res.render("index.ejs" , {
            products: allProducts,
        });
    });
});

//New


app.get("/products/new" , function (req, res){
    res.render("new.ejs")
});

// DELETE

// UPDATE

// CREATE

app.post("/products" , function (req, res){
    Product.create(req.body, (error, createdProduct) => {
        // res.send(createdProduct)
        res.redirect("/products")
    });
});

//Edit


//Show
app.get("/products/:id", (req, res)=>{
    Product.findById(req.params.id, (err, foundProduct)=>{
        res.render("show.ejs" , {
            product: foundProduct,
        });
    });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));