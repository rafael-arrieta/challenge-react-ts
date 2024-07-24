

import { ProductData } from '../../models/productData.model'
import { FC } from 'react'
import  placeholder  from '../../assets/placeholder.png'
import { Button } from 'react-bootstrap'
import './ProductCardComponent.css'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
    product: ProductData
}

const ProductCardComponent : FC<ProductCardProps> = ({product}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-card-container">
            <img src={placeholder} alt="" className='product-card-image' />
            <h3>{product.make.toLocaleUpperCase()}</h3>
            <h4 className='card-text'>Modelo: {product.model.toLocaleUpperCase()} - Año: {product.year}</h4>
            <h4 className='card-price'>$ {product.price}</h4>
            <Button variant="primary" onClick={handleClick}>Ver detalles</Button>
        </div>
    )
}

export default ProductCardComponent