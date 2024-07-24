import { FC } from "react"
import { ProductData } from "../../models/productData.model"
import { Table } from "react-bootstrap"
import { TruncateStringFn } from "../../functions/TrucateString/TruncateStringFn"

interface ProductstableProps {
    products: ProductData[]
}

const ProductsTableComponent : FC<ProductstableProps> = ({products}) => {

    const handleRowClick = (product: ProductData) => {
        console.log(product);
    };
  
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mark</th>
              <th>Model</th>
              <th>Description</th>
              <th>Price</th>
              <th>Year</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} onClick={() => handleRowClick(product)} style={{ cursor: 'pointer' }}>
                <td>{product.id}</td>
                <td>{product.make}</td>
                <td>{product.model}</td>
                <td>{ TruncateStringFn(product.description, 15) }</td>
                <td>{product.price}</td>
                <td>{product.year}</td>
                <td>{product.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  )
}


export default ProductsTableComponent