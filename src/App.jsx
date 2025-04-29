import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UnicornProvider } from './context/UnicornContext';
import UnicornsModule from './unicorns';
import ProductsModule from './products';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li>
                            <Link to="/unicorns">Unicornios</Link>
                        </li>
                        <li>
                            <Link to="/products">Productos</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route path="/unicorns/*" element={
                            <UnicornProvider>
                                <UnicornsModule />
                            </UnicornProvider>
                        } />
                        <Route path="/products/*" element={<ProductsModule />} />
                        <Route path="/" element={
                            <UnicornProvider>
                                <UnicornsModule />
                            </UnicornProvider>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
