import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateRestaurantNameApi } from "../../../api/user";

export default function ChangeNameRestaurantForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.restaurantName),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateRestaurantNameApi(user.id, formData, logout);
      if (!response) {
        toast.error("Error al actualizar el nombre del Restaurante");
      } else {
        setReloadUser(true);
        toast.success("Nombre del Restaurante actualizado");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-restaurantName-form">
      <h4>Cambia el nombre del Restaurante <span>(El RNT es: {user.restaurantRtn})</span></h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="restaurantName"
            placeholder="El nuevo nombre del Restaurante"
            onChange={formik.handleChange}
            value={formik.values.restaurantName}
            error={formik.errors.restaurantName}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(restaurantName) {
  return {
    restaurantName: restaurantName || "",
  };
}

function validationSchema() {
  return {
    restaurantName: Yup.string().required(true),
  };
}