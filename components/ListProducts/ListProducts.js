import React, {useState, useEffect} from 'react';
import {Image, Grid, Icon, GridColumn} from "semantic-ui-react";
import Link from "next/link";
import {map, size} from "lodash"; 
import useWindowSize from "../../hooks/useWindowSize";
import {breakpointUpSm, breakpointUpMd, breakpointUpLg} from "../../utils/breakpoint";
import useAuth from "../../hooks/useAuth";
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

    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    
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
            {/* <Link href={`/${product.url}`}> */}
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
                                {product.discount ? (
                                    <span className="discount">-{product.discount}%</span>
                                ) : (
                                    <span className="disappear"/>
                                )}
                                <span className="price">L.{product.price}</span>
                            </div>
                        </div>
                    </div>
                </a>
            {/* </Link> */}
        </Grid.Column>
    )
}