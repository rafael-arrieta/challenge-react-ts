
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, saveProduct, createProduct } from '../../services/fetchProducts.service';
import { ProductData } from '../../models/productData.model';
import { Container, Form, Button } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EditProductPage.css';

const validationSchema = Yup.object({
    make: Yup.string().required('La marca es requerida'),
    model: Yup.string().required('El modelo es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    doors: Yup.string().required('La cantidad de puertas es requerida'),
    price: Yup.number().required('El precio es requerido').positive('El precio debe ser positivo'),
    year: Yup.number().required('El año es requerido').integer('El año debe ser entero').min(1960, 'El año debe ser mayor a 1960').max(2022, 'El año debe ser menor a 2024'),
    type: Yup.string().required('El tipo es requerido'),
    images: Yup.array()
});
  
export const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [initialValues, setInitialValues] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            if (!id) return;
            const result = await getProductById(id as string);
            if (result) {
            setInitialValues(result);
            } else {
            setError('Product not found');
            }
        } catch (err) {
            setError('Error fetching product');
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (values: ProductData) => {
        try {
            if(id){
                await saveProduct(values, id);
            }

            if(!id){
                await createProduct(values);
            }
            console.log(values);
            
            navigate('/control-panel'); // Redirige después de guardar el producto
        } catch (err) {
            setError('Error saving product');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
        <Container className="edit-product-container">
        <div className="edit-product-header">
          <h2>{id ? 'Edit Product' : 'New Product'}</h2>
          <Button variant="light" onClick={() => navigate('/control-panel')}>
            <FaChevronLeft /> Volver
          </Button>
        </div>
        <Formik
            initialValues = { initialValues || {
                id: '',
                make: '',
                model: '',
                description: '',
                price: 0,
                doors: 3,
                year: new Date().getFullYear(),
                type: '',
                images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <FormikForm>
              <Form.Group controlId="formMake">
                <Form.Label>Mark</Form.Label>
                <Field
                  type="text"
                  name="make"
                  placeholder="Enter product mark"
                  className="form-control"
                />
                <ErrorMessage name="make" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formModel">
                <Form.Label>Model</Form.Label>
                <Field
                  type="text"
                  name="model"
                  placeholder="Enter product model"
                  className="form-control"
                />
                <ErrorMessage name="model" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter product description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  className="form-control"
                />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Field
                  type="number"
                  name="year"
                  placeholder="Enter product year"
                  className="form-control"
                />
                <ErrorMessage name="year" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formDoors">
                <Form.Label>Puertas</Form.Label>
                <Field
                  type="number"
                  name="doors"
                  placeholder="Cantidad de puertas"
                  className="form-control"
                />
                <ErrorMessage name="doors" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Field
                  type="text"
                  name="type"
                  placeholder="Enter product type"
                  className="form-control"
                />
                <ErrorMessage name="type" component="div" className="text-danger" />
              </Form.Group>
  
              <Form.Group controlId="formImages">
                <Form.Label>Images (Comma separated URLs)</Form.Label>
                <Field
                  type="file"
                  name="images"
                  placeholder="Enter image URLs separated by commas"
                  className="form-control"
                  onChange={(e : any) => setFieldValue('images', e.target.value.split(',').map((url: any) => url.trim()))}
                />
                <ErrorMessage name="images" component="div" className="text-danger" />
              </Form.Group>
  
              <Button variant="primary" type="submit">
                {id ? 'Update Product' : 'Add Product'}
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Container>
    );
  };
  
  export default EditProductPage;