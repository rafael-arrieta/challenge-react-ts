import { FC,  } from "react"
import { ProductData } from "../../models/productData.model"

import { Button } from "react-bootstrap";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { deleteFavorite } from "../../services/fetchFavorites.service";
import { useNavigate } from "react-router-dom";
import "./FavoriteCardComponent.css";
import { CapitalizeFirstLetter } from "../../functions/CapitalizeFirstLetter";

interface FavoriteCardProps{
    product: ProductData,
    favoriteId: string,
    removeFavorite: () => void
}

const FavoriteCardComponent: FC<FavoriteCardProps> = ({product, favoriteId, removeFavorite}) => {

    const navigate = useNavigate();

    const handleRemoveFavorite = async () => {
        try { 
            await deleteFavorite(favoriteId);
            removeFavorite();
        } catch (err) {
            
        }
      };
    return (
        <div className="favorite-card-container">
            <div className="favorite-card-data">
                <p><strong>Marca: </strong><br/>{CapitalizeFirstLetter(product.make)}</p>
                <p><strong>Modelo: </strong><br/>{CapitalizeFirstLetter(product.model)}</p>
                <p><strong>Año: </strong><br/>{product.year}</p>
                <p><strong>Precio: </strong><br/>$ {product.price}</p>
            </div>
            <div className="favorite-card-buttons">
                <Button variant="warning" onClick={handleRemoveFavorite}><FaHeart/> Eliminar de favoritos</Button>
                <Button variant="primary" onClick={() => navigate(`/product/${product.id}`)}><FaCheckCircle/> Ver detalles</Button>
            </div>

        </div>
    )
}

export default FavoriteCardComponent