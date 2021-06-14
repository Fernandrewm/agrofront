import React, {useState, useEffect} from 'react';
import {forEach} from "lodash";
import {Button, Message} from "semantic-ui-react";
import {useRouter} from "next/router";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {size} from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import {updateStockProduct} from "../../../../api/product";
import {paymentCartApi, removeAllProductsCart} from "../../../../api/cart";

export default function FormPayment(props) {
    const {products, address, totalPrice, productsQuantity} = props;
    const [loading, setLoading] = useState(false);
    const [updateStock, setUpdateStock] = useState([]);
    const stripe = useStripe();
    const elements = useElements();
    const {auth, logout} = useAuth();
    console.log(logout);
    const {removeAllProductCart} = useCart();
    const router = useRouter();

    // Definir el nuevo inventario para cada producto del carro
    useEffect(() => {
        forEach(products, (product, index) => {
            let idProduct = product.id;
            let newStock = product.stock - productsQuantity[index];
            updateStock.push([idProduct, newStock]);
        });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if(result.error){
            toast.error(result.error.message);
        } else {
            const response = await paymentCartApi(
                result.token,
                products,
                totalPrice,
                productsQuantity,
                auth.idUser,
                address,
                logout
            );

            if(size(response) > 0){
                for await (const stock of updateStock){
                    updateStockProduct(stock[0], stock[1], logout);
                }
                toast.success("Pedido completado");
                removeAllProductCart();
                router.push("/orders");
            } else {
                toast.error("Error al realizar el pedido.");
            }
        }
        setLoading(false);
    }


    return (
        <form className="form-payment" onSubmit={handleSubmit}>
            <Message
                header="SandBox Stripe - Información de Tarjeta de Testeo"
                content="Número: 4242424242424242 | CVC: 3 dígitos cualquiera | Fecha: Cualquier fecha futura"
            />
            <CardElement/>
            <Button type="submit" loading={loading} disabled={!stripe}>Pagar</Button>
        </form>
    )
}
