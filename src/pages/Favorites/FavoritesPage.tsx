import { useEffect, useState } from 'react';
import './FavoritesPage.css'
import { fetchFavoritesByUserId } from '../../services/fetchFavorites.service';
import { useLoginContext } from '../../services/LoginContext';

import { ProductData } from '../../models/productData.model';
import { getProductById } from '../../services/fetchProducts.service';
import FavoriteCardComponent from '../../components/FavoriteCardComponent/FavoriteCardComponent';
import { FavoriteData } from '../../models/favoriteData.model';

export const FavoritesPage = () => {
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([]);

  const { getUserData } = useLoginContext();
  const userData = getUserData();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await fetchFavoritesByUserId(userData.id);
        setFavoritesData(favorites);
        const products: ProductData[] = [];
        if (favorites) {        
          for (const favorite of favorites) {
            let product = await getProductById(favorite.productId);
            if (product) {
              product.id = favorite.productId;
              products.push(product);
            }
          }
        }

        setProductsData(products);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }; 
    fetchFavorites();
  }, [userData.id]);

  

  return (
    <div className="favorites-page-container">
      <h1>Favoritos</h1>
      {productsData.length > 0 && (
        productsData.map((product: ProductData) => (
          <FavoriteCardComponent 
            key={product.id} 
            product={product} 
            favoriteId={favoritesData.find(favorite => favorite.productId === product.id)?.id || ''}
            removeFavorite={() => setProductsData(productsData.filter(p => p.id !== product.id))}
            />
        ))
      )}

    </div>
  );
};