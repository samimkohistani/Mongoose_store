const express = require("express");
const productRouter = express.Router();
const Product = require("../models/products");



module.exports - productRouter;

// seed route

productRouter.get("/products/seed" , function (req, res){
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
})

// INDEX

productRouter.get("/products" , function (req, res){
    Product.find({}, (error, allProducts)=> {
        res.render("index.ejs" , {
            products: allProducts,
        });
    });
});

// NEW

productRouter.get("/products/new" , function (req, res){
    res.render("new.ejs")
});
// DELETE

productRouter.delete("/products/:id" , (req, res)=>{
	// res.send("deleting...")
	Product.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect("/products")
	})
})

// UPDATE

productRouter.put("/products/:id" , function (req , res){

	Product.findByIdAndUpdate(req.params.id, req.body, {
		new:true,
	}, (error, updatedBook) => {
		res.redirect(`/products/${req.params.id}`)
	})
})



// CREATE

productRouter.post("/products" , function (req, res){
    Product.create(req.body, (error, createdProduct) => {
        // res.send(createdProduct)
        res.redirect("/products");
    });
});

// EDIT

productRouter.get("/products/:id/edit" , (req, res)=>{
	Product.findById(req.params.id, (error, foundProduct)=>{
		res.render("edit.ejs" , {
			product: foundProduct,
		});
	});
});

// SHOW

productRouter.get("/products/:id", (req, res)=>{
    Product.findById(req.params.id, (err, foundProduct)=>{
        res.render("show.ejs" , {
            product: foundProduct,
        });
    });
});

// LISTENER
const PORT = process.env.PORT; // calls port variable from .env to protect our data
// note to self: nwws to call this variable AFtER requiring .env or it will show up as undefined

productRouter.listen(PORT, function(){
    console.log(`Let's start selling on port ${PORT}`)
});
