import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import md5 from 'md5';

function App() {
    useEffect(() => {
        //ввод пароля
        const password = "Valantis"
        //таймшамп в формате "год месяц день"
        const timestamp = new Date().toDateString().slice(0, 10).replace(/-/g, "");
        //авторизация
        const authString = md5(`${password}_${timestamp}`)
        console.log(Date());

        const fetchData = async () => {
            try {
                const res = await fetch("http://api.valantis.store:40000", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth': authString,
                    },
                    body: JSON.stringify({
                        "action": "get_ids",
                        "params": { "offset": 0, "limit": 10 },
                    }),
                });
                if (res.status === 200) {
                    return res.json();
                } else if (res.status === 401) {
                    throw new Error('UnauthorixedErrorCode');
                } else if (res.status === 400) {
                    throw new Error('ErrorCode')
                }
            } catch (err) {
                console.error(err);
            }
        };
        //массив для монтирования компонента
        fetchData();
    }, []);



    return (
        <div className="page">
            <div className="page__content">
                <Routes>
                    <Route exac path="/valantis-test" element={<ProductList />} >
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;