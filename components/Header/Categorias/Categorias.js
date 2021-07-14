import React, { useState, useEffect } from "react";
import Link from "next/link";
import {map} from "lodash";
import {Container, Menu, Grid} from "semantic-ui-react";
import {getCategoriesApi} from "../../../api/category";

export default function Categorias() {
    const [categories, setCategories] = useState([]);

    //Trae las categorias registradas
    useEffect(() => {
        (async () => {
            const response = await getCategoriesApi();
            setCategories(response || []);
        })()
    }, [])

    return (
        <div className="categorias">
            <Container>
                <Grid>
                    <Grid.Column className="categorias__disponibles" width={16}>
                        <ObtenerCategorias categories={categories}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

//Pinta las categorias obtenidas
function ObtenerCategorias(props) {
    const {categories} = props;
    return(
        <Menu>
            {map(categories, (category) => (
                <Link href={`/categorias/${category.url}`} key={category.id}>
                    <Menu.Item as="a" name={category.url}>
                        {category.title}
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    );
}