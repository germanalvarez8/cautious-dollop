import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';
import productsData from './productsData';

const ProductsModule = () => {
    const [products, setProducts] = useState(productsData);

    const handleAddProduct = (product) => {
        setProducts([...products, product]);
    };

    return (
        <Routes>
            <Route path="/" element={<ProductsView products={products} />} />
            <Route path="crear" element={<ProductForm onSubmit={handleAddProduct} />} />
        </Routes>
    );
};

export default ProductsModule;