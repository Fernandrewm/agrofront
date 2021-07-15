import React, { useMemo, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import {useRouter} from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import {getToken, setToken, removeToken} from "../api/token";
import {getProductsCart, addProductCart, countProductsCart, removeProductCart, removeAllProductsCart} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {

  //Funcion que guarda los datos de inicio de sesion en el localstorage y decodifica el jwt
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();
  
  //Verifica si el usuario esta logueado o no
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

  //Watcher para los productos en el carrito
  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  //Guarda en variable el set del token del usuario
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

  //Agrega un producto al carrito
  const addProduct = (product) => {
    const token = getToken();
    if(token){
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Debes iniciar sesión para comprar productos.");
    }
  }

  //Elimina un producto del carrito
  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  //Guarda los datos de inicio de sesion del usuario para usarlos en toda la app
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  //Guarda en variable el contexto del carro para usarlo a lo largo de la app
  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  //Valida si un usuario esta logeado o no
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