import React, {useState} from 'react';
import {Image, Icon} from "semantic-ui-react";
import {keyBy, groupBy, forEach, uniqBy, pick, filter, compact} from "lodash";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";
import { object } from 'yup';

export default function Order(props) {
    const {order} = props;
    // console.log(order);
    // const test = keyBy([order], 'idPayment');
    const {product, totalPayment, created_at, addressShipping, productQuantity, idPayment} = order;
    const {title, image} = product;

    return (
        <>
            <div className="order">
                <div className="order__info">
                    {/* <p>{ordersGroup.undefined[0]}</p> */}
                    {/* <Image src={image.url} alt={title}/>
                    <div className="order__info-data">
                        <h2>{title}</h2>
                        <p>{productQuantity}</p>
                        <p>{idPayment}</p>
                        <p>L.{totalPayment}</p>
                    </div>
                    <div className="order__other">
                        <p className="order__other-date">
                            {moment(created_at).format("L")} - {moment(created_at).format("LT")}
                        </p>
                        <Icon name="eye" circular link onClick={()=> console.log("Ver informacion")}/>
                    </div> */}
                </div>
            </div>
        </>
    )
}
