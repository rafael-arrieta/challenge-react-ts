
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { FavoritesPage } from './pages/Favorites/FavoritesPage';
import { LoginPage } from './pages/Login/LoginPage';
import NavbarComponent from './components/Navbar/NavbarComponent';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import ControlPanelPage from './pages/ControlPanel/ControlPanelPage';
import { LoginProvider } from './services/LoginContext';
import { EditProductPage } from './pages/EditProduct/EditProductPage';
import ControlPanelComponent from './components/ControlPanel/ControlPanelComponent';
import ChatPage from './pages/ChatPage/ChatPage';

const App = () => {
  return (
    <> 
    <LoginProvider>
      <Router>
          <NavbarComponent/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/product/:id" element={<ProductDetailPage/>} />
            <Route path="/favorites" element={<FavoritesPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/messages/:id" element={<ChatPage/>} />
            <Route path="/control-panel" element={<ControlPanelPage/>}>
              <Route path="" element={<ControlPanelComponent/>} />
              <Route path="edit-product/:id" element={<EditProductPage/>} />
              <Route path="new-product/" element={<EditProductPage/>} />
            </Route>
          </Routes>
      </Router>
    </LoginProvider>
    </>
  );
};

export default App;