import React from 'react';
import {Image, Grid} from "semantic-ui-react";
import Link from "next/link";
import {map} from "lodash";

export default function ListProducts(props) {
    const {products} = props;

    return (
        <div className="list-products">
            <Grid>
                <Grid.Row columns={5}>
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