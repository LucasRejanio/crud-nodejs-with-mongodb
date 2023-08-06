const express = require('express')
const { connectMongoDB } = require('./src/connector/mongodb')
const Product = require('./src/model/product-model')

const app = express();
app.use(express.json());
const port = 3000;

connectMongoDB()

app.get('/products', async (req, res) => { //http://localhost:3000/products/
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/products/:id', async (req, res) => { //http://localhost:3000/products/1
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/product', async (req, res) => {
    try {
        const {name, price, quantity} = req.body;
        const product = new Product({name, price, quantity});
        await product.save();
        res.json({
            message: `Product ${productId} has been registred!`,
            success: true
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }

        const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        if (!updateProduct) {
            throw new Error('Failed to update product');
        }
        
        res.json({
            message: `Product ${productId} has been updated!`,
            success: true
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error('Failed to delete product');
        }

        res.json({
            message: `Product ${productId} has been deleted!`,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

app.listen(port, () => {
    console.log(`API server started on port ${port}`);
})