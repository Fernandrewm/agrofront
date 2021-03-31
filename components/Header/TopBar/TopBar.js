import React, {useState, useEffect} from "react";
import {Container, Grid, Image, Input, Icon, Menu} from "semantic-ui-react";
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
                    <Grid.Column width={2} className="top-bar__left">
                        <Logo/>
                    </Grid.Column>
                    <Grid.Column width={6} className="top-bar__center">
                        <Search/>
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__right">
                        {user !== undefined && <MenuUsuario onShowModal={onShowModal} user={user} logout={logout}/>}
                    </Grid.Column>
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
                <Image src="/logo.png" alt="AgroApp"/>
            </a>
        </Link>
    );
}

function Search(){
    return <Input id="search-product" icon={{name:"search"}}/>;
}

function MenuUsuario(props) {
    const {onShowModal, user, logout} = props;
    return (
        <Menu>
            {user ? (
            <>
                <Link href="/orders">
                    <Menu.Item as="a">
                        <Icon name="box"/>
                        Mis pedidos
                    </Menu.Item>
                </Link>
                <Link href="/wishlist">
                    <Menu.Item as="a">
                        <Icon name="heart"/>
                        Mis favoritos
                    </Menu.Item>
                </Link>
                <Link href="/account">
                    <Menu.Item as="a">
                        <Icon name="user"/>
                        {user.name}
                    </Menu.Item>
                </Link>
                <Link href="/cart">
                    <Menu.Item as="a" className="m-0">
                        <Icon name="cart"/>
                    </Menu.Item>
                </Link>
                <Menu.Item onClick={logout} className="m-0">
                    <Icon name="power off"/>
                </Menu.Item>
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