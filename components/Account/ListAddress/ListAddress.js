import React, {useState, useEffect} from 'react';
import {Grid, Button} from "semantic-ui-react";
import {map, size} from "lodash";
import { getAddressesApi, deleteAddressApi } from '../../../api/address';
import useAuth from "../../../hooks/useAuth";
import { toast } from 'react-toastify';

export default function ListAddress(props) {
    const {reloadAddresses, setReloadAddresses} = props;
    const [addresses, setAddresses] = useState(null);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddresses(false);
        })()
    }, [reloadAddresses]);

    if(!addresses) return null;
            
    return (
        <div className="list-address">
            {size(addresses) === 0 ? (
                <h3>No hay ninguna direccion registrada.</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) =>(
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                            <Address address={address} logout={logout} setReloadAddresses={setReloadAddresses}/>
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    )
}

function Address(props) {
    const {address, logout, setReloadAddresses} = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteAddress = async () => {
        setLoadingDelete(true);
        const response = await deleteAddressApi(address.id, logout);
        if(response) {
            toast.success("Direccion eliminada correctamente.");
            setReloadAddresses(true);
        } else {
            toast.error("Error al eliminar la direccion.");
        }
        setLoadingDelete(false);
    };

    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state}, {address.city}, {address.postalCode}</p>
            <p>{address.phone}</p>
            <div className="actions">
                <Button primary>Editar</Button>
                <Button onClick={deleteAddress} loading={loadingDelete}>Eliminar</Button>
            </div>
        </div>
    )
}