import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Catalog from './pages/Catalog';
import AnimalDetails from './pages/AnimalDetails';
import AddAnimal from './pages/AddAnimal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/animals" element={<Catalog />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />
        <Route path="/add" element={<AddAnimal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
