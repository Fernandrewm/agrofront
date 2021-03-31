import React, { useMemo, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import {useRouter} from "next/router";
import AuthContext from "../context/AuthContext";
import {getToken, setToken, removeToken} from "../api/token";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {

  //Funcion que guarda los datos de inicio de sesion en el localstorage y decodifica el jwt
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const token = getToken();
    if(token){
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    });
  }

  //Funcion para desloguear el usuario
  const logout = () => {
    if(auth){
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }

  const authData = useMemo(
    () => ({
      auth: auth,
      login: login,
      logout: logout,
      setRealoadUser: setReloadUser,
    }),
    [auth]
  );

  if(auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )

}