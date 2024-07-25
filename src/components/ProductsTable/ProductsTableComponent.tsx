import { FC } from "react"
import { ProductData } from "../../models/productData.model"
import { Table } from "react-bootstrap"
import { TruncateStringFn } from "../../functions/TruncateStringFn"
import './ProductsTableComponent.css'
import { useNavigate } from "react-router-dom"

interface ProductstableProps {
    products: ProductData[]
}

const ProductsTableComponent : FC<ProductstableProps> = ({products}) => {
    const navigate = useNavigate();

    const handleRowClick = (product: ProductData) => {
      
        if(product){
          navigate(`/control-panel/edit-product/${product.id}`);
        }
        console.log(product);
    };
  
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="display-none-col">ID</th>
              <th>Mark</th>
              <th>Model</th>
              <th>Year</th>
              <th className="display-none-col">Description</th>
              <th className="display-none-col">Reservado</th>
              <th >Price</th>
              <th className="display-none-col">Type</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} onClick={() => handleRowClick(product)} style={{ cursor: 'pointer' }}>
                <td className="display-none-col">{product.id}</td>
                <td>{product.make}</td>
                <td>{product.model}</td>
                <td>{product.year}</td>
                <td className="display-none-col">{ TruncateStringFn(product.description, 15) }</td>
                <td>{product.booking ? 'Si' : 'No'}</td>
                <td >{product.price}</td>
                <td className="display-none-col">{product.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  )
}


export default ProductsTableComponent