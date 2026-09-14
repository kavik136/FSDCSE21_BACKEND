const express = require("express");
const app = express();
app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 25000, category: "Electronics" },
    { id: 3, name: "Tablet", price: 18000, category: "Electronics" },
    { id: 4, name: "Keyboard", price: 1500, category: "Accessories" },
    { id: 5, name: "Mouse", price: 800, category: "Accessories" },
    { id: 6, name: "Monitor", price: 12000, category: "Electronics" },
    { id: 7, name: "Headphones", price: 2500, category: "Accessories" },
    { id: 8, name: "Printer", price: 9000, category: "Electronics" },
    { id: 9, name: "Webcam", price: 3500, category: "Accessories" },
    { id: 10, name: "USB Cable", price: 300, category: "Accessories" },
];


// GET all products
app.get("/products", (req, res) => {
    res.json(products);
});


// GET product by ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});


// POST - Add product
app.post("/products", (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({
            message: "Name, price and category are required"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});


// PUT - Update product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;

    res.json(product);
});



// Start server
app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});