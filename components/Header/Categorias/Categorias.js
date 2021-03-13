import {Container, Menu, Grid, Icon, Label} from "semantic-ui-react";
import Link from "next/link";

export default function Categorias() {
    return (
        <div className="categorias">
            <Container>
                <Grid>
                    <Grid.Column className="categorias__disponibles" width={16}>
                        <ObtenerCategorias/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

function ObtenerCategorias() {
    return(
        <Menu>
            <Link href="#">
                <Menu.Item as="a">
                    Verduras
                </Menu.Item>
            </Link>
            <Link href="#">
                <Menu.Item as="a">
                    Carnes
                </Menu.Item>
            </Link>
            <Link href="#">
                <Menu.Item as="a">
                    Frutas
                </Menu.Item>
            </Link>
        </Menu>
    );
}