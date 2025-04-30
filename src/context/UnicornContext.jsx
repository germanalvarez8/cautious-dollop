import { createContext, useContext, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

export const UnicornContext = createContext();
export const useUnicornContext = () => {
    const context = useContext(UnicornContext);
    if (!context) {
        throw new Error('useUnicornContext must be used within a UnicornProvider');
    }
    return context;
};

export const UnicornProvider = ({ children }) => {
    const url = 'https://crudcrud.com/api/ebdcfe34cac74b83b736dd1aea9e45c5/unicorns';
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUnicorns = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url)
                .then(function (response) {
                    setUnicorns(response.data);
                })
                .catch(function (error) {
                    throw new Error('Error al obtener los datos de la API' + error);
                });
        } catch (err) {
            setError('Error al cargar los unicornios, error:' + err);
        } finally {
            setLoading(false);
        }
    };

    const createUnicorn = async (values) => {
        try {
            axios.post(url, values)
                .then(function (response) {
                    console.log('RESPONSE', response);
                    setUnicorns([...unicorns, response.data]);
                })
                .catch(function (error) {
                    throw new Error('Error al obtener los datos de la API' + error);
                });
        } catch (err) {
            setError('Error al crear el unicornio, error:' + err);
            throw err;
        }
    };

    const editUnicorn = async (id, values) => {
        try {
            const { _id, ...updateData } = values;
            axios.put(`${url}/${id}`, updateData)
                .then(function (response) {
                    console.log('RESPONSE', response);
                    setUnicorns(unicorns.map(unicorn =>
                        unicorn._id === id ? { ...unicorn, ...updateData, _id: id } : unicorn
                    ));
                })
                .catch(function (error) {
                    throw new Error('Error al editar unicornio' + error);
                });
        } catch (err) {
            console.error('Error al editar el unicornio:', err);
            throw err;
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            axios.delete(`${url}/${id}`)
                .then(function (response) {
                    console.log('RESPONSE', response);
                    setUnicorns(unicorns.filter(unicorn => unicorn._id !== id));
                    fetchUnicorns();
                })
                .catch(function (error) {
                    throw new Error('Error al eliminar unicornio' + error);
                });
        } catch (err) {
            setError('Error al eliminar el unicornio, error:' + err);
            throw err;
        }
    };

    const exportToPDF = () => {
        try {
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text('Informe de Unicornios', 14, 22);
            doc.setFontSize(11);
            doc.text(`Fecha de exportación: ${new Date().toLocaleDateString('es-AR')}`, 14, 30);
            const tableColumn = ["Nombre", "Color", "Edad", "Poder"];
            const tableRows = [];

            unicorns.forEach(unicorn => {
                const unicornData = [
                    unicorn.name,
                    unicorn.color,
                    unicorn.age,
                    unicorn.power
                ];
                tableRows.push(unicornData);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 40,
                theme: 'striped',
                headStyles: {
                    fillColor: [63, 81, 181],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240]
                }
            });

            doc.save(`unicornios_${new Date().toISOString().split('T')[0]}.pdf`);

            return true;
        } catch (err) {
            console.error('Error al exportar a PDF:', err);
            setError('Error al exportar a PDF: ' + err);
            return false;
        }
    };

    useEffect(() => {
        fetchUnicorns();
    }, []);

    const value = {
        unicorns,
        loading,
        error,
        createUnicorn,
        editUnicorn,
        deleteUnicorn,
        fetchUnicorns,
        exportToPDF
    };

    return (
        <UnicornContext.Provider value={value}>
            {children}
        </UnicornContext.Provider>
    );
};