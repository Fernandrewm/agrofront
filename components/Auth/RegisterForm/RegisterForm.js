import {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {registerApi} from "../../../api/user";

export default function RegisterForm(props) {
    const {showLoginForm} = props;
    const [loading, setLoading] = useState(false);

    //Validación de datos ingresados
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            console.log(formData);
            const response = await registerApi(formData);
            if(response?.jwt){
                toast.success("Usuario creado exitosamente, inicie sesión.");
                showLoginForm();
            } else {
                toast.error("Error al registrar el usuario, inténtelo más tarde.");
            }
            setLoading(false);
        }
    })
    
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="restaurantName"
                type="text"
                placeholder="Nombre del restaurante"
                onChange={formik.handleChange}
                value={formik.values.restaurantName}
                error={formik.errors.restaurantName}
            />
            <Form.Input
                name="restaurantRtn"
                type="text"
                placeholder="RTN del restaurante"
                onChange={formik.handleChange}
                value={formik.values.restaurantRtn}
                error={formik.errors.restaurantRtn}
            />
            <Form.Group widths="equal">
                <Form.Input 
                    name="name" 
                    type="text" 
                    placeholder="Nombre" 
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input 
                    name="lastname" 
                    type="text" 
                    placeholder="Apellido" 
                    onChange={formik.handleChange}
                    error={formik.errors.lastname}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input 
                    name="username" 
                    type="text" 
                    placeholder="Nombre de usuario" 
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
                <Form.Input 
                    name="email" 
                    type="text" 
                    placeholder="Correo electrónico" 
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
            </Form.Group>
            <Form.Input 
                name="password" 
                type="password" 
                placeholder="Contraseña" 
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Input 
                className="termsAndConditions"
                name="agreeTerms"
                type="checkbox"
                label='Estoy de acuerdo con los Términos y Condiciones'
                onChange={formik.handleChange}
                error={formik.errors.agreeTerms}
            />
            <div className="actions">
                <Button type="button" basic onClick={showLoginForm}>
                    Iniciar sesión
                </Button>
                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return{
        restaurantName:"",
        restaurantRtn:"",
        name:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        agreeTerms: false
    }
}

function validationSchema() {
    return{
        restaurantName: Yup.string().required("El nombre del restaurantes es obligatorio"),
        restaurantRtn: Yup.string().required("El RTN del restaurantes es obligatorio"),
        name: Yup.string().required("El nombre es obligatorio"),
        lastname: Yup.string().required("El apellido es obligatorio"),
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        email: Yup.string().email(true).required("Debe ingresar un correo válido"),
        password: Yup.string().required("Debe ingresar una contraseña"),
        agreeTerms: Yup.bool().oneOf([true], 'Debe aceptar los Términos y Condiciones'),
    }
}