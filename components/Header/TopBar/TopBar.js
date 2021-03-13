import {useState} from "react";
import {Container, Grid, Image, Input, Icon, Menu} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";

export default function TopBar() {
    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => setShowModal(true);

    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={4} className="top-bar__left">
                        <Logo/>
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__center">
                        <Search/>
                    </Grid.Column>
                    <Grid.Column width={4} className="top-bar__right">
                        <MenuUsuario onShowModal={onShowModal}/>
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal 
                show={showModal} 
                setShow={setShowModal} 
                title="Inicia Sesión"
                size="small"
            >
                <h2>Contenido de Modal</h2>
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
    const {onShowModal} = props;
    return (
        <Menu>
            <Menu.Item onClick={onShowModal}>
                <Icon name="user outline"/>
                Mi cuenta
            </Menu.Item>
        </Menu>
    )
}