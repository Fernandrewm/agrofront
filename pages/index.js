import React, {useState, useEffect} from "react";
import {Loader} from "semantic-ui-react";
import {size} from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import {getLastProductsApi} from "../api/product";
import ListProducts from "../components/ListProducts";

export default function Home() {
  //Guardar los productos obtenidos
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(50);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {/* Si productos es null muestra el Loader */}
      {!products && <Loader active>Cargando productos...</Loader>}
      {/* Si productos tiene contenido y es igual a 0, mostramos que no hay productos */}
      {products && size(products) === 0 && (
        <div>
          <h3>No hay productos.</h3>
        </div>
      )}
      {/* Si productos es mayor que 0 mostramos los productos */}
      {size(products) > 0 && <ListProducts products={products}/>}
    </BasicLayout>
  )
}