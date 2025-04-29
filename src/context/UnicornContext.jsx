import { createContext, useContext, useState, useEffect } from 'react';

// Exportar el contexto directamente
export const UnicornContext = createContext();

export const useUnicornContext = () => {
    const context = useContext(UnicornContext);
    if (!context) {
        throw new Error('useUnicornContext must be used within a UnicornProvider');
    }
    return context;
};

export const UnicornProvider = ({ children }) => {
    const url = 'https://crudcrud.com/api/bada7a5136694c45acced3ab7ca5e66f/unicorns';
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUnicorns = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const data = await response.json();
            setUnicorns(data);
        } catch (err) {
            setError('Error al cargar los unicornios, error:' + err);
        } finally {
            setLoading(false);
        }
    };

    const createUnicorn = async (values) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const newUnicorn = await response.json();
            setUnicorns([...unicorns, newUnicorn]);
            return newUnicorn;
        } catch (err) {
            setError('Error al crear el unicornio, error:' + err);
            throw err;
        }
    };

    const editUnicorn = async (id, values) => {
        try {
            await fetch(url + `/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            fetchUnicorns();
        } catch (err) {
            setError('Error al editar el unicornio, error:' + err);
            throw err;
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            await fetch(url + `/${id}`, {
                method: 'DELETE',
            });
            setUnicorns(unicorns.filter(unicorn => unicorn._id !== id));
            fetchUnicorns();
        } catch (err) {
            setError('Error al eliminar el unicornio, error:' + err);
            throw err;
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
        fetchUnicorns
    };

    return (
        <UnicornContext.Provider value={value}>
            {children}
        </UnicornContext.Provider>
    );
};