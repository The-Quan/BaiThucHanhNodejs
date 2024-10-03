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
        const sortBy = req.query.sortBy || 'ProductStoreCode'; // Sắp xếp theo 'ProductStoreCode' mặc định
        const sortOrder = req.query.order === 'asc' ? 1 : -1;  // 'asc' = 1 (tăng dần), 'desc' = -1 (giảm dần)

        console.log('Sắp xếp theo:', sortBy, 'Thứ tự:', sortOrder);

        // Lấy sản phẩm từ cơ sở dữ liệu và sắp xếp
        const products = await Product.find().sort({ [sortBy]: sortOrder });

        // Trả về kết quả sản phẩm đã sắp xếp và hiển thị trong trang
        res.render('index', {
            products,
            sortBy,
            order: req.query.order || 'desc',  // Mặc định 'desc' (giảm dần)
            message: req.query.message || ''   // Thông báo nếu có
        });
    } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        res.status(400).json({ error: 'Lỗi khi lấy sản phẩm: ' + err.message });
    }
};





module.exports = { getAllProducts, createProduct, deleteProduct };
