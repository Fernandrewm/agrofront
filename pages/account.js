import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import {getMeApi} from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNameForm";

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

    //Comprobamos si el usuario esta logueado o no (undefined)
    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth]);

    if(user === undefined) return null;

    //Lo devolvemos a la home
    if(!auth && !user){
        router.replace("/");
    }

    //En caso de estar logueado mostramos la pagina
    return (
        <BasicLayout className="account">
            <Configuration
                user={user}
                logout={logout}
                setReloadUser={setReloadUser}
            />
        </BasicLayout>
    )
}

function Configuration(props){
    const { user, logout, setReloadUser } = props;
    return(
        <div className="account__configuration">
            <div className="title">Configuracion</div>
            <div className="data">
            <ChangeNameForm
                user={user}
                logout={logout}
                setReloadUser={setReloadUser}
            />
            </div>
        </div>
    )
}