import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://api.valantis.store:40000/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, console.log([]));

    // Проверяю, что products является массивом
    if (Array.isArray(products)) {
        // Применяю метод map() к products
        const productItems = products.map((product) => {
            return (

                <li className='product__list' key={product.id}>
                    <p className='product__number'>ID: {product.id}</p>
                    <h2 className='product__title'>Название: {product.title}</h2>
                    <p className='product__price'>Цена: {product.price}</p>
                    <p className='product__brend'>Бренд: {product.brend}</p>
                </li>

            );
        });

        return (
            <section className='product'>
                <h1 className='product__content'>Список товаров</h1>
                <ul className='product__lists'>
                    {productItems}
                </ul>
            </section>
        );
    } else {
        return <p>Данные о продуктах не найдены</p>;
    }
}


export default ProductList