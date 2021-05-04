import React, {useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {useRouter} from "next/router";
import {size} from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import {getProductsCategoryApi, getTotalProductCategoryApi} from "../../api/product";
import ListProducts from "../../components/ListProducts";
import Pagination from "../../components/Pagination";

const limitPerPage = 10;

export default function Category() {
    const {query} = useRouter();
    const [products, setProducts] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);

    //We indicate from which product number to start (it is used for pagination).
    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if (!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage; 
    }
    console.log(getStartItem());

    //We obtain all products by category
    useEffect(() => {
        (async () => {
            if (query.category){
                const response = await getProductsCategoryApi(query.category, limitPerPage, getStartItem());
                setProducts(response);
            }
        })()
    }, [query]);

    //We obtain the total number of products per category (it is used for pagination).
    useEffect(() => {
        ( async () => {
            const response = await getTotalProductCategoryApi(query.category);
            setTotalProducts(response);
        })()
    }, [query])

    return (
        <BasicLayout className="category">
            {!products && <Loader active>Cargando productos...</Loader>}
            {products && size(products) === 0 && (
                <div>
                    <h3>No hay productos.</h3>
                </div>
            )}
            {size(products) > 0 && (
                <ListProducts products={products}/>
            )}

            {totalProducts ? (
                <Pagination 
                    totalProducts={totalProducts} 
                    page={query.page ? parseInt(query.page) : 1}
                    limitPerPage={limitPerPage}
                />
            ) : null}
        </BasicLayout>
    )
}
