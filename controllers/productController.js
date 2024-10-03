const Product = require('../models/productModel');

// Insert a new product
const createProduct = async (req, res) => {
    try {
        const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
        const newProduct = new Product({
            ProductCode,
            ProductName,
            ProductDate,
            ProductOriginPrice,
            Quantity,
            ProductStoreCode,
        });
        await newProduct.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error in creating product');
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error in deleting product');
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Kiểm tra xem có tham số yêu cầu sắp xếp không
        const sortBy = req.query.sortBy || 'ProductStoreCode'; // Sắp xếp theo ProductStoreCode
        const sortOrder = req.query.order || 'asc';  // Nếu không có tham số order, mặc định là 'asc'

        // Sắp xếp dựa trên sortBy và order (1: tăng dần, -1: giảm dần)
        const products = await Product.find().sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });
        
        // Truyền products, sortBy, order vào view để hiển thị kết quả
        res.render('index', { products, sortBy, order: sortOrder });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


  

module.exports = { getAllProducts, createProduct, deleteProduct, getAllProductsSort };
