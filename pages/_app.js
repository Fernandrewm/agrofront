import React, { useMemo, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import {useRouter} from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import {getToken, setToken, removeToken} from "../api/token";
import {getProductsCart, addProductCart} from "../api/cart";
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

  const addProduct = (product) => {
    const token = getToken();
    if(token){
      addProductCart(product);
    } else {
      toast.warning("Debes iniciar sesión para comprar productos.");
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: 0,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductsCart,
      removeProductCart: () => null,
      removeAllProductCart: () => null,
    }),
    []
  );

  if(auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  )

}