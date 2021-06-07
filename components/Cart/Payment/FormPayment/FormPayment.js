import React, {useState} from 'react';
import {Button, Message} from "semantic-ui-react";
import {useRouter} from "next/router";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {size} from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import {paymentCartApi} from "../../../../api/cart";

export default function FormPayment(props) {
    const {products, address, totalPrice} = props;
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {auth, logout} = useAuth();

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
                auth.idUser,
                address,
                logout
            );

            if(size(response) > 0){
                toast.success("Pedido completado");
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
