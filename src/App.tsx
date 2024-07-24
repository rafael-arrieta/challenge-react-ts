import { useState, useEffect } from 'react';
import { PruebaData } from './models/pruebaData.model';
import { fetchPruebaCollectionData } from './services/fetchPrueba.service';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { FavoritesPage } from './pages/Favorites/FavoritesPage';
import { LoginPage } from './pages/Login/LoginPage';
import NavbarComponent from './components/Navbar/NavbarComponent';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import ControlPanelPage from './pages/ControlPanel/ControlPanelPage';
import { LoginProvider } from './services/LoginContext';



const App = () => {
  const [pruebaData, setPruebaData]: [PruebaData[], any] = useState([]);

  useEffect(() => {
    
    
    fetchPruebaCollectionData().then((resp: PruebaData[] | undefined) => {
      setPruebaData(resp);
        console.log(pruebaData);
      }
    );

  }, []);

  return (
    <> 
    <LoginProvider>
      <Router>
        <div>
          <NavbarComponent/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>} />
            <Route path="/favorites" element={<FavoritesPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/control-panel" element={<ControlPanelPage/>}/> 
          </Routes>
        </div>
      </Router>
    </LoginProvider>
    </>
  );
};

export default App;