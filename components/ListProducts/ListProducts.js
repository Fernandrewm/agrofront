import React, {useState, useEffect} from 'react';
import {Image, Grid, Icon, GridColumn, Button, Input} from "semantic-ui-react";
import {toast} from "react-toastify";
import {map, size} from "lodash"; 
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
    console.log(quantity);
    
    //Valida las cantidades del producto a comprar
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
    
    //Obtiene los productos favoritos de un usuario
    //if auth arregla el error pero rompe el login
    // if(auth){
        useEffect(() => {
            (async () => {
                const response = await isFavoriteApi(auth.idUser, product.id, logout);
                if(size(response) > 0) setIsFavorite(true);
                else setIsFavorite(false);
            })();
            setReloadFavorite(false);
        }, [product, reloadFavorite]);
    // }

    //Agregar productos a favoritos de un usuario
    const addFavorite = async () => {
        if(auth){
            await addFavoriteApi(auth.idUser, product.id, logout);
            setReloadFavorite(true);
        }
    }

    //Elimina productos la lista favorita de un usuario
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
                            <div className="list-products__product-price">
                                {product.stock ? (
                                    <span className="stock">Stock: {product.stock}</span>
                                ) : (
                                    <span className="stock-out">Sin stock</span>
                                )}
                                <span className="price">L.{product.price}</span>
                            </div>
                            <div className="list-products__product-addCart">
                                <Input 
                                    onChange={handleChangeQuantity}
                                    type='text'
                                    value={quantity}
                                    min = "1"
                                    placeholder='Cantidad'
                                />
                                <Button 
                                    onClick={ () =>
                                        {product.stock && quantity != "" ? (
                                            addProductCart(product.id.toString()+"-"+quantity)
                                        ) : (
                                            toast.error("Cantidad m??nima de compra es 1 o no hay stock.")
                                        )}
                                    }
                                >Agregar al carrito</Button>
                            </div>
                        </div>
                    </div>
                </a>
        </Grid.Column>
    )
}