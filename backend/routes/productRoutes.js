const express = require('express');
const router = express.Router();
const multer = require('multer')
const Product = require('../models/productModel');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })// limits max 5MB - upload image upload limit

//Product Post Method
router.post("/", upload.single("image"), async (req, res) => {

    try {
        const base64 = req.file.buffer.toString("base64");
        const newProduct = new Product({
            image: base64,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            actualPrice: req.body.actualPrice
        });
        await newProduct.save();
        console.log(newProduct)
        res.json({ success: true, message: "Product Upload Successfully" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.msg })
    }
})

//Product Get Method
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.msg })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        const products = await Product.find({
            name: { $regex: q, $options: "i" }
        });
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Get single product by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//Product Update Method
router.put('/:id', upload.single("image"), async (req, res) => {
    try {
        const { image, name, description, price, actualPrice } = req.body;
        const updateData = { image, name, description, price, actualPrice }
        if (req.file) {
            updateData.image = req.file.buffer.toString("base64");
        }
        const id = req.params.id
        const updateProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ message: "Product Updated Successfully", product: updateProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
})

//Product Delete Method
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err.msg })
    }
})

module.exports = router;