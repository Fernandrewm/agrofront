import React from 'react';
import {Image, Grid} from "semantic-ui-react";
import Link from "next/link";
import {map} from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import {breakpointUpSm, breakpointUpMd, breakpointUpLg} from "../../utils/breakpoint";

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
    return (
        <Grid.Column className="list-products__product">
            <Link href={`/${product.url}`}>
                <a>
                    <div className="list-products__product-image">
                        <Image src={product.image.url} alt={product.title}/>
                        <div className="list-products__product-info">
                            <h2>{product.title}</h2>
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
            </Link>
        </Grid.Column>
    )
}