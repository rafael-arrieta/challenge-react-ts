import { useParams } from "react-router-dom";
import { getProductById } from "../../services/fetchProducts.service";
import { useEffect, useState } from "react";
import { ProductData } from "../../models/productData.model";
import { CapitalizeFirstLetter } from "../../functions/CapitalizeFirstLetter";
import  placeholder  from '../../assets/placeholder.png'
import "./ProductDetailPage.css";
import { useLoginContext } from "../../services/LoginContext";
import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { createFavorite, deleteFavorite, fetchFavoritesByUserId } from "../../services/fetchFavorites.service";
import { FavoriteData } from "../../models/favoriteData.model";
import { BookingProductComponent } from "../../components/BookingProductComponent/BookingProductComponent";


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteError, setFavoriteError ] = useState<string | null>(null);
  const [btnFavorite, setBtnFavorite] = useState('añadir a favoritos');
  const [isFavorite, setIsFavorite] = useState<FavoriteData | null>(null);
  const [showBookingPanel, setShowBookingPanel] = useState(false);


  const { getUserData } = useLoginContext();
  const userData = getUserData();

  useEffect(() => {
    const fetchProduct = async () => {
    try {
        if (!id) return;
        const result = await getProductById(id as string);

        
        if (result) {
          setProduct(result);
        }
        
        if (userData.id) {
          const isFavorite = await fetchFavoritesByUserId(userData.id);
          const doc = isFavorite.find((favorite) => favorite.productId === id);
          if (doc) {
            setBtnFavorite('Quitar favoritos');
            setIsFavorite(doc);
          }
        }
    } catch (err) {
        setError('Error fetching product');
    } finally {
        setLoading(false);
    }
    };

    fetchProduct();
  }, [id]);

  const handleSaveFavorite = async () => {
    try {
        if (!userData.id && !userData.token && !userData.name) {
            setFavoriteError('Debes iniciar sesión para agregar a favoritos');
            return;
        }

        if (userData.id && id) {
            if (isFavorite) {  // Si el producto ya está en favoritos
                await deleteFavorite(isFavorite.id);
                setBtnFavorite('Añadir a favoritos');
                setIsFavorite(null);
            } else {  // Si el producto no está en favoritos
                await createFavorite(id, userData.id);
                setBtnFavorite('Quitar favoritos');
                const updatedFavorites = await fetchFavoritesByUserId(userData.id);
                const doc = updatedFavorites.find((favorite) => favorite.productId === id);
                if (doc) setIsFavorite(doc);
            }
        }
    } catch (err) {
        setFavoriteError('Error al agregar a favoritos');
    }
  };

  const handlePayment = () => {
    setShowBookingPanel(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Se produjo un error:{error}</p>;

  return (
    <div className="product-detail-page-container">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={placeholder}/>
        </div>
        <div className="product-detail-content">
          { product && <>
            <h3><strong>Marca: </strong>{CapitalizeFirstLetter(product.make)}</h3>
            <h4><strong>Modelo: </strong>{CapitalizeFirstLetter(product.model)}</h4>
            <h5><strong>Año: </strong> {product.year}</h5>
            <h5><strong>Tipo: </strong> {product.type}</h5>
            <p>
              <strong>Descripción del producto: </strong> 
              { CapitalizeFirstLetter(product.description)}
            </p>
            <h2>Precio: ${product.price}</h2>
            <div>
              <div className="product-detais-buttons">
                {
                  userData?.id && 
                  <>
                    { showBookingPanel ? 
                      <Button variant="danger" onClick={ () => setShowBookingPanel(false)}>Cancelar reserva</Button> :
                      <Button onClick={ () => setShowBookingPanel(true)}>Reservar</Button>
                    }
                  </>
                }
                <Button variant="warning" onClick={handleSaveFavorite}><FaHeart/> {btnFavorite}</Button>
              </div>
              <p className="favorite-error">{favoriteError && favoriteError}</p>


              { showBookingPanel && <BookingProductComponent onSubmit={handlePayment} totalValue={product.price}/> }
            </div>
          </>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage