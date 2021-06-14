import React, {useState, useEffect} from 'react';
import {Table, Image, Icon, Tab, Input} from "semantic-ui-react";
import {forEach, map} from "lodash";
import useCart from "../../../hooks/useCart";
import {ISV, COMISSION, ENVIO} from "../../../utils/constants";
import AddressShipping from "../AddressShipping";
import Payment from "../Payment";

export default function SummaryCart(props) {
    const {products, reloadCart, setReloadCart, productsQuantity} = props;
    const [subTotal, setSubTotal] = useState(0);
    const [commission, setCommission] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState(null);
    const {removeProductCart} = useCart();

    //Calculo de subtotal
    useEffect(() => {
        let price = 0;
        forEach(products, (product, index) => {
            let priceTemp = Math.floor((product.price * ISV)*100)/100;
            price += priceTemp * productsQuantity[index];
        });
        setSubTotal(price);
    }, [reloadCart, products])

    //Calculo de comision
    useEffect(() => {
        let priceComission = Math.floor((subTotal * COMISSION)*100)/100;
        setCommission(priceComission);
    }, [subTotal])

    //Calculo precio final
    useEffect(() => {
        let priceTotal = Math.floor((subTotal + commission + ENVIO)*100)/100;
        setTotalPrice(priceTotal);
    }, [subTotal, commission])

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    };

    return (
        <div className="summary-cart">
            <div className="title">
                Resumen del carrito
            </div>
            <div className="data">
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Producto</Table.HeaderCell>
                            <Table.HeaderCell>Precio (ISV 15%)</Table.HeaderCell>
                            <Table.HeaderCell>Cantidad</Table.HeaderCell>
                            <Table.HeaderCell>Entrega</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product, index) => (
                            <Table.Row key={product.id} className="summary-cart__product">
                                <Table.Cell>
                                    <Icon name="close" link onClick={() => removeProduct(product.id)}/>
                                    <Image src={product.image.url} alt={product.title}/>
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>
                                    L.{(product.price * 1.15).toFixed(2)}
                                </Table.Cell>
                                <Table.Cell>
                                    <p>{productsQuantity[index]}</p>
                                </Table.Cell>
                                <Table.Cell>
                                    3-7 días
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Sub-Total:</Table.Cell>
                            <Table.Cell className="total-price">L.{subTotal}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Comisióm (9%):</Table.Cell>
                            <Table.Cell className="total-price">L.  {commission}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Envió:</Table.Cell>
                            <Table.Cell className="total-price">L.  {ENVIO}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="summary-cart__resume-TotalPayment">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Total a pagar:</Table.Cell>
                            <Table.Cell className="total-price">L.  {totalPrice}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <AddressShipping setAddress={setAddress}/>
            {address && 
                <Payment 
                products={products} 
                address={address} 
                totalPrice={totalPrice}
                productsQuantity={productsQuantity}/>}
        </div>
        
    )
}
