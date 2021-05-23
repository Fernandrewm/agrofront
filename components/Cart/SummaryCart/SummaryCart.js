import React, {useState, useEffect} from 'react';
import {Table, Image, Icon, Tab, Input} from "semantic-ui-react";
import {forEach, map} from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
    const {products, reloadCart, setReloadCart} = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const {removeProductCart} = useCart();

    useEffect(() => {
        let price = 0;
        forEach(products, (product) => {
            price += product.price;
        });
        setTotalPrice(price);
    }, [reloadCart, products])

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
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                            <Table.HeaderCell>Cantidad</Table.HeaderCell>
                            <Table.HeaderCell>Entrega</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product) => (
                            <Table.Row key={product.id} className="summary-cart__product">
                                <Table.Cell>
                                    <Icon name="close" link onClick={() => removeProduct(product.id)}/>
                                    <Image src={product.image.url} alt={product.title}/>
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell>
                                    L.{product.price}
                                </Table.Cell>
                                <Table.Cell>
                                    <Input placeholder="Cantidad" defaultValue='1'/>
                                </Table.Cell>
                                <Table.Cell>
                                    3-7 días
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Total:</Table.Cell>
                            <Table.Cell className="total-price">L.  {(totalPrice).toFixed(2)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
