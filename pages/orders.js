import React, {useState, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {map, size} from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import {getOrdersApi} from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout);
            setOrders(response || []);
        })()
    }, [])

    return (
        <BasicLayout className="orders">
            <div className="orders__block">
                <div className="title">Mis pedidos</div>
                <div className="data">
                    {size(orders) === 0 ? (
                        <h2 style={{textAlign: "center"}}>
                            Todavía no has realizado ninguna compra.
                        </h2>
                    ) : (
                        <OrderList orders={orders}/>
                    )}
                </div>
            </div>
        </BasicLayout>
    )
}

function OrderList(props) {
    const {orders} = props;
    return (
        <div>
            <Grid>
                {map(orders, (order, index) => (
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Order order={order}/>
                    </Grid.Column>

                ))}
            </Grid>
        </div>
    )
}