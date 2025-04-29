import { Formik, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UnicornContext } from '../context/UnicornContext';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

const UnicornForm = ({ onSubmit }) => {
    const { unicorns } = useContext(UnicornContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const initialValues = isEditMode
        ? unicorns.find(unicorn => unicorn._id === id) || {
            name: '', color: '', age: 0, power: '',
        }
        : { name: '', color: '', age: 0, power: '' };

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es requerido'),
        color: Yup.string().required('El color es requerido'),
        age: Yup.number().required('La edad es requerida'),
        power: Yup.string().required('El poder es requerido'),
    });

    const handleSubmit = async (values) => {
        try {
            if (isEditMode) {
                await onSubmit(id, values);
            } else {
                await onSubmit(values);
            }
            navigate('/unicorns');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1>{isEditMode ? 'Editar Unicornio' : 'Crear Unicornio'}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form className="unicorn-form">
                        <div className="field">
                            <label htmlFor="name">Nombre</label>
                            <InputText
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className={errors.name && touched.name ? 'p-invalid' : ''}
                            />
                            <ErrorMessage name="name" component="small" className="p-error" />
                        </div>

                        <div className="field">
                            <label htmlFor="color">Color</label>
                            <InputText
                                id="color"
                                name="color"
                                value={values.color}
                                onChange={handleChange}
                                className={errors.color && touched.color ? 'p-invalid' : ''}
                            />
                            <ErrorMessage name="color" component="small" className="p-error" />
                        </div>

                        <div className="field">
                            <label htmlFor="age">Edad</label>
                            <InputNumber
                                id="age"
                                name="age"
                                value={values.age}
                                onValueChange={(e) => setFieldValue('age', e.value)}
                                className={errors.age && touched.age ? 'p-invalid' : ''}
                            />
                            <ErrorMessage name="age" component="small" className="p-error" />
                        </div>

                        <div className="field">
                            <label htmlFor="power">Poder</label>
                            <InputText
                                id="power"
                                name="power"
                                value={values.power}
                                onChange={handleChange}
                                className={errors.power && touched.power ? 'p-invalid' : ''}
                            />
                            <ErrorMessage name="power" component="small" className="p-error" />
                        </div>

                        <div className="buttons">
                            <Button type="submit" label={isEditMode ? 'Actualizar' : 'Crear'} icon="pi pi-save" />
                            <Button type="button" label="Cancelar" className="p-button-secondary" 
                                    onClick={() => navigate('/unicorns')} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UnicornForm;