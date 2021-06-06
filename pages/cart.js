import React, {useState, useEffect} from 'react';
import {forEach} from "lodash"; 
import BasicLayout from "../layouts/BasicLayout";
import {getProductByIdApi} from "../api/product";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import Payment from "../components/Cart/Payment";

export default function Cart() {
    const {getProductCart} = useCart();
    const products = getProductCart();

    return !products ? <EmptyCart/> : <FullCart products={products}/>
}

function EmptyCart(){
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito.</h2>
        </BasicLayout>
    )
}

function FullCart(props){
    const {products} = props;
    const [productsData, setProductsData] = useState(null);
    const [productsQuantity, setProductsQuantity] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    // const [address, setAddress] = useState(null);

    //Obtenemos los datos de los productos del carrito mediante el id
    useEffect(() => {
        (async () => {
            const productsTemp = [];
            for await (const product of products){
                const data = await getProductByIdApi(product);
                productsTemp.push(data);
            }
            setProductsData(productsTemp);
        })();
        setReloadCart(false);
    }, [reloadCart])

    //Obtenemos los datos de las cantidades del carrito del localstorage
    useEffect(() => {
        const quantityTemp = [];
        forEach(products, (product) => {
            const productTemp = product.split("-");
            quantityTemp.push(productTemp[1]);
        });
        setProductsQuantity(quantityTemp);
        setReloadCart(false);
    }, [reloadCart])
    
    return (
        <BasicLayout className="empty-cart">
            <SummaryCart 
                products={productsData}
                productsQuantity={productsQuantity}
                reloadCart={reloadCart}
                setReloadCart={setReloadCart}
            />
            {/* <AddressShipping setAddress={setAddress}/>
            {address && <Payment  products={productsData} address={address}/>} */}
        </BasicLayout>
    )
}