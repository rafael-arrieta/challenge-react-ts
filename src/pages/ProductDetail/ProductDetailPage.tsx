import { useParams } from "react-router-dom";
import { getProductById } from "../../services/fetchProducts.service";
import { useEffect, useState } from "react";
import { ProductData } from "../../models/productData.model";
import "./ProductDetailPage.css";


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
    try {
        if (!id) return;
        const result = await getProductById(id as string);
        if (result) {
          setProduct(result);
        }
    } catch (err) {
        setError('Error fetching product');
    } finally {
        setLoading(false);
    }
    };

    fetchProduct();
}, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail-page-container">
      {product && <h2>{product.make}</h2>}
    </div>
  )
}

export default ProductDetailPage