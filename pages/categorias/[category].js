import React, {useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {useRouter} from "next/router";
import {size} from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import {getProductsCategoryApi} from "../../api/product";
import ListProducts from "../../components/ListProducts";

const limitPerPage = 10;

export default function Category() {
    const {query} = useRouter();

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            if (query.category){
                const response = await getProductsCategoryApi(query.category, limitPerPage, 0);
                setProducts(response);
            }
        })()
    }, [query]);

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
        </BasicLayout>
    )
}
