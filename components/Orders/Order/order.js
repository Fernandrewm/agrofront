import React from 'react';
import {map} from "lodash";
import {Image, Icon, Divider} from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";

export default function Order(props) {
    const {order} = props;

    return (
        <>
            <div className="order">
                <div className="order__info">
                    <p>Fecha del pedido: {moment(order[0].created_at).format("L")}</p>
                    <span>Total: L. {order[0].totalPayment}</span>
                    
                    {map(order, (orderItem, index) => (
                        <div className="order__info-item">
                            <Image src={orderItem.product.image.url} alt={orderItem.product.title} />
                            <p>{orderItem.product.title}</p>
                        </div>
                    ))}

                    <Divider/>
                    <div className="destination">
                        <Icon name="shipping"/>
                        <p>Enviado a: {order[0].addressShipping.title}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
