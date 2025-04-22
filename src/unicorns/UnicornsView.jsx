import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const UnicornsView = ({
    unicorns,
    formData,
    onSubmit,
    onDeleteUnicorn,
    onInputChange,
    onEdit,
    validationSchema
}) => {
    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>

            <div className="unicorns-container">
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                <Form className="unicorn-form">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder="Nombre del unicornio"
                            required
                        />
                        <ErrorMessage name="name" component='div' />
                    </div>
                    <div>
                        <label htmlFor="color">Color</label>
                        <Field
                            type="text"
                            name="color"
                            placeholder="Color del unicornio"
                            required
                        />
                        <ErrorMessage name="color" component='div' />
                    </div>
                    <div>
                        <label htmlFor="age">Edad</label>
                        <Field
                            type="number"
                            name="age"
                            placeholder="Edad del unicornio"
                            required
                        />
                        <ErrorMessage name="age" component='div' />
                    </div>
                    <div>
                        <label htmlFor="power">Poder</label>
                        <Field
                            type="text"
                            name="power"
                            placeholder="Poder del unicornio"
                            required
                        />
                        <ErrorMessage name="power" component='div' />
                    </div>
                    <button type="submit">
                        Agregar Unicornio
                    </button>
                </Form>
            </Formik>
            <div className="products-list">
                <h2>Lista de Productos</h2>
                <DataTable value={unicorns} emptyMessage="No hay unicornios en el inventario">
                    <Column field="name" header="Nombre"></Column>
                    <Column field="color" header="Color"></Column>
                    <Column field="age" header="Edad"></Column>
                    <Column field="power" header="Poder"></Column>
                    <Column body={(rowData) => (
                        <div>
                            <button onClick={() => onEdit(rowData)} className="p-button-warning">
                                Editar
                            </button>
                            <button onClick={() => onDeleteUnicorn(rowData._id)} className="p-button-danger">
                                Eliminar
                            </button>
                        </div>
                    )} header="Acciones"></Column>
                </DataTable>
            </div>
            </div>
        </div>
    );
};

export default UnicornsView; 