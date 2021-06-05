import {toast} from "react-toastify";
import {size, includes, remove, forEach} from "lodash";
import {BASE_PATH, CART} from "../utils/constants";


export function getProductsCart(){
    const cart = localStorage.getItem(CART);

    if(!cart){
        return null;
    } else {
        const products = cart.split(",");
        return products;
    }
}

export function addProductCart(product) {
    const productTemp = product.split("-");
    const cart = getProductsCart();
    
    if (!cart) {
        localStorage.setItem(CART, product);
        toast.success("Producto agregado al carrito.");
    } else {
        const cartTemp = [];
        
        forEach(cart, (cartItem) => {
            const cartItempTemp = cartItem.split("-");
            cartTemp.push(cartItempTemp[0]);
        });

        const productFound = includes(cartTemp, productTemp[0]);
        if (productFound) {
            console.log(productFound);
            toast.warning("El producto ya existe en el carrito.");
        } else {
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("Producto agregado al carrito.");
        }
    }
}

export function countProductsCart(){
    const cart = getProductsCart();

    if(!cart){
        return 0;
    } else {
        return size(cart);
    }
}

export function removeProductCart(product) {
    const cart = getProductsCart();
    console.log(cart);
    const cartTemp = [];
    let indexCart = null;
    
    forEach(cart, (cartItem) => {
        const cartItempTemp = cartItem.split("-");
        cartTemp.push(cartItempTemp[0]);
    });
    
    remove(cartTemp, (item, index) => {
        if(item === product.toString()){
            indexCart = index;
        }
        return item === product.toString();
    });

    console.log(cartTemp);
    console.log(indexCart);
    cart.splice(indexCart,1);
    
  
    if (size(cart) > 0) {
      localStorage.setItem(CART, cart);
    } else {
      localStorage.removeItem(CART);
    }
}