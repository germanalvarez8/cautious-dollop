import { Routes, Route } from 'react-router-dom';
import UnicornsView from './UnicornsView';
import UnicornForm from './UnicornForm';
import { useContext } from 'react';
import { UnicornContext } from '../context/UnicornContext';

const UnicornsModule = () => {
    const { unicorns, loading, error, createUnicorn, editUnicorn, deleteUnicorn, fetchUnicorns } = useContext(UnicornContext);

    return (
        <Routes>
            <Route path="/" element={<UnicornsView
                unicorns={unicorns}
                loading={loading}
                error={error}
                deleteUnicorn={deleteUnicorn}
            />} />
            <Route path="/create" element={<UnicornForm onSubmit={createUnicorn} />} />
            <Route path="/edit/:id" element={<UnicornForm onSubmit={editUnicorn} />} />
        </Routes>
    );
};

export default UnicornsModule;