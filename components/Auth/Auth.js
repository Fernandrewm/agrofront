import {useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {

    const {onCloseModal, setTitleModal} = props;
    const [showLogin, setShowLogin] = useState(true);

    //Función para mostrar el formulario de Login
    const showLoginForm = () => {
        setTitleModal("Inicia sesión");
        setShowLogin(true);
    };
    //Función para mostrar el formulario de Login
    const showRegisterForm = () => {
        setTitleModal("Crear nuevo usuario");
        setShowLogin(false)
    };
    
    return showLogin ? <LoginForm showRegisterForm={showRegisterForm}/> : <RegisterForm showLoginForm={showLoginForm}/>
}
