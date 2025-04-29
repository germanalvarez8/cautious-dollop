import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onSubmit }) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            price: Yup.number().required('El precio es obligatorio').positive('El precio debe ser mayor a 0'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
            navigate('/products');
        },
    });

    return (
        <div className="container">
            <h1>Nuevo Producto</h1>
            <form onSubmit={formik.handleSubmit} className="unicorn-form">
                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <small className="p-error">{formik.errors.name}</small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="price">Precio</label>
                    <InputNumber
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onValueChange={(e) => formik.setFieldValue('price', e.value)}
                        mode="currency"
                        currency="ARS"
                        locale="es-AR"
                        className={formik.errors.price && formik.touched.price ? 'p-invalid' : ''}
                    />
                    {formik.errors.price && formik.touched.price && (
                        <small className="p-error">{formik.errors.price}</small>
                    )}
                </div>

                <div className="buttons">
                    <Button type="submit" label="Guardar" icon="pi pi-save" className="p-button-primary" />
                    <Button type="button" label="Cancelar" icon="pi pi-times" 
                        className="p-button-secondary" onClick={() => navigate('/products')} />
                </div>
            </form>
        </div>
    );
};

export default ProductForm;