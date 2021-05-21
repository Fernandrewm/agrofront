import React, {useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {size, forEach} from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import {getFavoriteApi} from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListProducts from "../components/ListProducts";

export default function wishlist() {
    const [products, setProducts] = useState(null);
    const {auth, logout} = useAuth();

    // console.log(products);

    useEffect(() => {
        (async () => {
            const response = await getFavoriteApi(auth.idUser, logout);
            // setProducts(response);
            if(size(response) > 0){
                const productsList = [];
                forEach(response, (data) => {
                    productsList.push(data.product);
                });
                setProducts(productsList);
            } else {
                setProducts([]);
            }
        })()
    }, [])

    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="title">Lista de favoritos</div>
                <div className="data">
                    {!products && <Loader active>Cargando productos...</Loader>}
                    {products && size(products) === 0 && (
                        <div className="data__not-found">
                            <h3>No tienes ningun producto en favoritos.</h3>
                        </div>
                    )}
                    {size(products) > 0 && (
                        <ListProducts products={products}/>
                    )}
                </div>
            </div>
        </BasicLayout>
    )
}
