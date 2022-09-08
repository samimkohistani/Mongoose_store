// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require("./models/products");
const methodOverride = require("method-override");


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



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

// see route

app.get("/products/seed" , function (req, res){
    Product.deleteMany({}, (error, Products) => {});
    Product.create([
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: "It's just a bag of bones.",
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        }
      ],
      (error, data) => {
        res.redirect('/products');
    }

    )
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


app.delete("/products/:id" , (req, res)=>{
	// res.send("deleting...")
	Product.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect("/products")
	});
});

// UPDATE

app.put("/products/:id" , function (req , res){

	Product.findByIdAndUpdate(req.params.id, req.body, {
		new:true,
	}, (error, updatedBook) => {
		res.redirect(`/products/${req.params.id}`)
	});
});

// CREATE

app.post("/products" , function (req, res){
    Product.create(req.body, (error, createdProduct) => {
        // res.send(createdProduct)
        res.redirect("/products")
    });
});

//Edit

app.get("/products/:id/edit" , (req, res)=>{
	Product.findById(req.params.id, (error, foundProduct)=>{
		res.render("edit.ejs" , {
			product: foundProduct,
		});
	});
});


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
