import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./FormPayment";
import { STRIPE_TOKEN } from "../../../utils/constants";

//Establece la primera comunicacion entre front y stripe
const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment(props) {
    const {products, address, totalPrice} = props;
    return (
        <div className="payment">
            <div className="title">Pago</div>
            <div className="data">
                <Elements stripe={stripePromise}>
                    <FormPayment 
                        products={products} 
                        address={address} 
                        totalPrice={totalPrice}/>
                </Elements>
            </div>
        </div>
    )
}
