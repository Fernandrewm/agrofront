import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {toast} from "react-toastify";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import {createAddressApi} from "../../../api/address";

export default function AddressForm(props) {
    const {setShowModal} = props;
    const [loading, setLoading] = useState(false);
    const {auth, logout} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
           createAddress(formData);
        }
    });

    const createAddress = async (formData) => {
        setLoading(true);
        console.log(auth.idUser);
        const formDataTemp = {
          ...formData,
          users_permissions_user: auth.idUser,
        };
        const response = await createAddressApi(formDataTemp, logout);
    
        if (!response) {
            toast.warning("Error al crear la dirección");
            setLoading(false);
        } else {
            toast.success("Dirección creada exitosamente.")
            formik.resetForm();
            setLoading(false);
            setShowModal(false);
        }
      };

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="title"
                type="text"
                label="Titulo de la direccion"
                placeholder="Titulo de la direccion"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
                />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y apellidos"
                    placeholder="Nombre y apellidos"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                    />
                <Form.Input
                    name="address"
                    type="text"
                    label="Direccion"
                    placeholder="Direccion"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                    />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    error={formik.errors.city}
                    />
                <Form.Input
                    name="state"
                    type="text"
                    label="Departamento"
                    placeholder="Departamento"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    error={formik.errors.state}
                    />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="postalCode"
                    type="text"
                    label="Codigo Postal"
                    placeholder="Codigo Postal"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                    error={formik.errors.postalCode}
                    />
                <Form.Input
                    name="phone"
                    type="text"
                    label="Numero de telefono"
                    placeholder="Numero de telefono"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
            </Form.Group>
            <div className="actions">
                <Button className="submit" type="submit" loading={loading}>
                    Crear direccion
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        title: "",
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    };
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}