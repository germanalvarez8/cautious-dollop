import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ProductsView = ({ products }) => {
    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(rowData.price);
    };

    return (
        <div className="container">
            <h1>Gestión de Productos</h1>
            <div className="actions">
                <Link to="/products/crear">
                    <Button
                        label="Nuevo Producto"
                        icon="pi pi-plus"
                        className="p-button-primary"
                    />
                </Link>
            </div>
            <DataTable
                value={products}
                breakpoint="768px"
                stripedRows
                emptyMessage="No hay productos disponibles"
                className="p-datatable-sm"
            >
                <Column field="name" header="Nombre" sortable />
                <Column field="price" header="Precio" body={priceBodyTemplate} sortable />
            </DataTable>
        </div>
    );
};

export default ProductsView;