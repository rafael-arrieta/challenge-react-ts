import { useEffect, useState } from 'react';
import './HomePage.css'
import { fetchProductsCollectionData } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import ProductCardComponent from '../../components/ProductCard/ProductCardComponent';


export const HomePage = () => {
  const [productsData, setProductsData]: [ProductData[], any] = useState([]);
  
  useEffect(() => {
    fetchProductsCollectionData().then((resp: ProductData[] | undefined) => {
      setProductsData(resp);
        //console.log(resp);
      }
    );

  }, []);
  //console.log(productsData);
  return (
    <div className="home-page-container">

      <div className="home-page-cards-container">
        {productsData.map((product: ProductData) => (
          <ProductCardComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
