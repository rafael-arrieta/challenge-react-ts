import { useEffect, useState } from 'react';
import './HomePage.css'
import { fetchFilteredProductsCollectionData, fetchProductsCollectionData } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import ProductCardComponent from '../../components/ProductCard/ProductCardComponent';
import FiltersComponent from '../../components/FiltersComponent/FiltersComponent';
import { Filter } from '../../models/filter.model';


export const HomePage = () => {
  const [productsData, setProductsData]: [ProductData[], any] = useState([]);
  
  useEffect(() => {
    fetchProductsCollectionData().then((resp: ProductData[] | undefined) => {
      setProductsData(resp);
        //console.log(resp);
      }
    );

  }, []);

  const handleFilters = (data: Filter) => {
    fetchFilteredProductsCollectionData(data).then((resp: ProductData[] | void) => {
        setProductsData(resp);
      }
    );
  }

  return (
    <div className="home-page-container">

      <FiltersComponent onSubmit={handleFilters} />

      <div className="home-page-cards-container">
        {productsData.map((product: ProductData) => (
          !product.booking && <ProductCardComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
