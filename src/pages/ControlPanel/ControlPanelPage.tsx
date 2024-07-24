import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLoginContext } from '../../services/LoginContext';
import './ControlPanelPage.css';
import { fetchProductsCollectionData } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import ProductsTableComponent from '../../components/ProductsTable/ProductsTableComponent';

const ControlPanelPage: React.FC = () => {
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
    <div>
      {userData.isAdmin ? (
        <div className="control-panel-container">
          <h2>Panel de control</h2>
          <ProductsTableComponent products={productsData} />
        </div>
        
      ) : (
        <p>Redirigiendo...</p>
      )}
    </div>
  );
};

export default ControlPanelPage;