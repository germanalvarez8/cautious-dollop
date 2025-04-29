import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const UnicornsView = ({ unicorns, deleteUnicorn, loading, error }) => {
    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <Link to={`/unicorns/edit/${rowData._id}`}>
                    <Button icon="pi pi-pencil" className="p-button-info p-button-sm" />
                </Link>
                <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    onClick={() => deleteUnicorn(rowData._id)}
                />
            </div>
        );
    };

    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>
            <div className="actions">
                <Link to="/unicorns/create">
                    <Button label="Crear Nuevo Unicornio" icon="pi pi-plus" className="p-button-primary" />
                </Link>
            </div>
            <div className="unicorns-list">
                <DataTable
                    value={unicorns}
                    emptyMessage="No hay unicornios en el inventario"
                    breakpoint="768px"
                    stripedRows
                    className="p-datatable-sm"
                >
                    <Column field="name" header="Nombre" sortable />
                    <Column field="color" header="Color" sortable />
                    <Column field="age" header="Edad" sortable />
                    <Column field="power" header="Poder" sortable />
                    <Column body={actionBodyTemplate} header="Acciones" style={{ width: '8rem' }} />
                </DataTable>
            </div>
        </div>
    );
};

export default UnicornsView;