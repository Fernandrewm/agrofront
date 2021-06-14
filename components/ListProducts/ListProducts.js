import React, {useState, useEffect} from 'react';
import {Image, Grid, Icon, GridColumn, Button, Input} from "semantic-ui-react";
import {toast} from "react-toastify";
import Link from "next/link";
import {map, set, size} from "lodash"; 
import useWindowSize from "../../hooks/useWindowSize";
import {breakpointUpSm, breakpointUpMd, breakpointUpLg} from "../../utils/breakpoint";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import {isFavoriteApi, addFavoriteApi, deleteFavoriteApi} from "../../api/favorite";

export default function ListProducts(props) {
    const {products} = props;
    const {width} = useWindowSize();

    //Calcula cuantas columnas va renderizar en cada size
    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 5;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <div className="list-products">
            <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    {map(products, (product) => (
                        <Product product={product}/>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
}

function Product(props) {
    const {product} = props;
    const {auth, logout} = useAuth();
    const {addProductCart} = useCart();
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const [quantity, setQuantity] = useState("");
    
    const handleChangeQuantity = (e) => {
        if(!isNaN(e.target.value) && (e.target.value)>0 && (e.target.value) <= product.stock){
            setQuantity(e.target.value);
        }else if ((e.target.value) > product.stock){
            toast.error("La cantidad deseada es mayor al stock disponible.")
        } else {
            toast.warning("La cantidad minima de compra es 1.")
            setQuantity("");
        }
    };
    
    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth.idUser, product.id, logout);
            if(size(response) > 0) setIsFavorite(true);
            else setIsFavorite(false);
        })();
        setReloadFavorite(false);
    }, [product, reloadFavorite]);

    const addFavorite = async () => {
        if(auth){
            await addFavoriteApi(auth.idUser, product.id, logout);
            setReloadFavorite(true);
        }
    }

    const deleteFavorite = async () => {
        if(auth){
            await deleteFavoriteApi(auth.idUser, product.id, logout);
            setReloadFavorite(true);
        }
    }

    return (
        <Grid.Column className="list-products__product">
                <a>
                    <div className="list-products__product-image">
                        <Image src={product.image.url} alt={product.title}/>
                        <div className="list-products__product-info">
                            <div className="list-products__product-info-header">
                                <h2>{product.title}</h2>
                                <Icon 
                                    name={isFavorite ? "heart" : "heart outline"}
                                    link
                                    onClick = {isFavorite ? deleteFavorite : addFavorite}
                                />
                            </div>
                            {/* Si el producto tiene descuento se muestra * */}
                            <div className="list-products__product-price">
                                {product.stock ? (
                                    <span className="stock">Stock: {product.stock}</span>
                                ) : (
                                    <span className="disappear"/>
                                )}
                                <span className="price">L.{product.price}</span>
                            </div>
                            <div className="list-products__product-addCart">
                                <Input 
                                    // onChange={(_, data) => setQuantity(data.value)} 
                                    onChange={handleChangeQuantity}
                                    type='text'
                                    value={quantity}
                                    min = "1"
                                    placeholder='Cantidad'
                                />
                                <Button onClick={()=> addProductCart(product.id.toString()+"-"+quantity)}>Agregar al carrito</Button>
                            </div>
                        </div>
                    </div>
                </a>
        </Grid.Column>
    )
}