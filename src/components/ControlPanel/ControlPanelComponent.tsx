import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLoginContext } from '../../services/LoginContext';
import './ControlPanelComponent.css';
import { fetchProductsCollectionData } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import ProductsTableComponent from '../ProductsTable/ProductsTableComponent';
import { Button } from 'react-bootstrap';
import { FaChevronLeft, FaPlus } from 'react-icons/fa'

const ControlPanelComponent: React.FC = () => {
  const navigate = useNavigate(); 
  const { getUserData } = useLoginContext();
  const userData = getUserData();

  const [productsData, setProductsData]: [ProductData[], any] = useState([]);
 
  
  useEffect(() => {
    if (!userData.isAdmin) {
      navigate('/');
    }
    fetchProductsCollectionData().then((resp: ProductData[] | undefined) => {
      setProductsData(resp);
        console.log(resp);
      }
    );
  }, [userData.isAdmin, navigate]);

  return (
    
      <div className="control-panel-container">
        <div className="control-panel-header">
          <Button variant="light" onClick={() => navigate('/')}>
            <FaChevronLeft/> Inicio</Button>
          <h2>Panel de control</h2>
          <Button variant="primary" onClick={() => navigate('/control-panel/new-product')}>
            <FaPlus/>Añadir producto </Button>
        </div>
        <ProductsTableComponent products={productsData} />
      </div>
                         
      
  );
};

export default ControlPanelComponent;