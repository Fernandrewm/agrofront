import React, {useState, useEffect} from "react";
import {Container, Grid, Image, Input, Icon, Menu} from "semantic-ui-react";
import {useRouter} from "next/router";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from '../../Auth';
import useAuth from "../../../hooks/useAuth";
import {getMeApi} from "../../../api/user";

export default function TopBar() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Iniciar Sesión");
    const [user, setUser] = useState(undefined);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })()
    }, [auth]);

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Row>
                        <Grid.Column width={6} className="top-bar__left">
                            <Logo/>
                        </Grid.Column>
                        <Grid.Column width={10} className="top-bar__center">
                            <Search/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} className="top-bar__right">
                            {user !== undefined && <MenuUsuario onShowModal={onShowModal} user={user} logout={logout}/>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <BasicModal 
                show={showModal} 
                setShow={setShowModal} 
                title={titleModal}
                size="small"
            >
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
            </BasicModal>
        </div>
    )
}

function Logo(){
    return (
        <Link href="/">
            <a>
                <Image src="https://agroapp-bucket.s3.us-east-2.amazonaws.com/AgroAppLogo.png" alt="AgroApp"/>
            </a>
        </Link>
    );
}

function Search(){
    const [searchStr, setSearchStr] = useState("");
    const [load, setLoad] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(load) {
            router.push(`/search?query=${searchStr}`)
        }
        setLoad(true);
    }, [searchStr])

    return (
        <Input 
            id="search-product"
            icon={{name:"search"}}
            value={router.query.query}
            onChange={(_, data)=> setSearchStr(data.value)}
        />
    );
}

function MenuUsuario(props) {
    const {onShowModal, user, logout} = props;
    return (
        <Menu>
            {user ? (
            <>
                <Grid columns="equal">
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Link href="/orders">
                                <Menu.Item as="a">
                                    <Icon name="box"/>
                                    Mis pedidos
                                </Menu.Item>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={5}>            
                            <Link href="/wishlist">
                                <Menu.Item as="a">
                                    <Icon name="heart"/>
                                    Mis favoritos
                                </Menu.Item>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Link href="/account">
                                <Menu.Item as="a">
                                    <Icon name="user"/>
                                    {user.name}
                                </Menu.Item>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Link href="/cart">
                                <Menu.Item as="a" className="m-0">
                                    <Icon name="cart"/>
                                    Carrito
                                </Menu.Item>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Menu.Item onClick={logout} className="m-0">
                                <Icon name="power off"/>
                                Cerrar Sesión
                            </Menu.Item>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
            ) : (
                <Menu.Item onClick={onShowModal}>
                    <Icon name="user outline"/>
                    Mi cuenta
                </Menu.Item>
            )}
        </Menu>
    )
}