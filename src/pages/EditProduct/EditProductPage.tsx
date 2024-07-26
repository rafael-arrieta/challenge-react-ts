
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, saveProduct, createProduct, deleteProduct } from '../../services/fetchProducts.service';
import { Container, Form, Button } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaDeleteLeft } from 'react-icons/fa6';
import ConfirmationModalComponent from '../../components/ConfirmationModalComponent/ConfirmationModalComponent';
import { NewProduct } from '../../models/newProduct';
import './EditProductPage.css';

const validationSchema = Yup.object({
    make: Yup.string().required('La marca es requerida'),
    model: Yup.string().required('El modelo es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    doors: Yup.string().required('La cantidad de puertas es requerida'),
    price: Yup.number().required('El precio es requerido').positive('El precio debe ser positivo'),
    year: Yup.number().required('El año es requerido').integer('El año debe ser entero').min(1960, 'El año debe ser mayor a 1960').max(2024, 'El año debe ser menor a 2024'),
    type: Yup.string().required('El tipo es requerido'),
    images: Yup.array()
});
  
export const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [initialValues, setInitialValues] = useState <NewProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleSubmit = async (values: NewProduct) => {
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

    const handleDelete = () => {
      setShowModal(true)
    };

    
    const handleConfirmDelete = async () => {
      try {
          
          setShowModal(false)
          
          await deleteProduct(id as string);
          navigate('/control-panel');
      } catch (err) {
          setError('Error deleting product');
      }
  };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
        <Container className="edit-product-container">
        <div className="edit-product-header">
          <h2>{id ? 'Edit Product' : 'New Product'}</h2>
          <div>
            <Button variant="light" onClick={() => navigate('/control-panel')}>
              <FaChevronLeft /> Volver
            </Button>
            {id && <Button variant="danger" onClick={handleDelete}>
              <FaDeleteLeft /> Eliminar
            </Button>}
          </div>
        </div>
        <Formik
            initialValues = { initialValues || {
                make: '',
                model: '',
                description: '',
                price: 0,
                doors: 3,
                year: new Date().getFullYear(),
                type: '',
                onDestroy: false,
                booking: false,
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
        {initialValues && showModal &&(
                <ConfirmationModalComponent
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onConfirm={handleConfirmDelete}
                    productMake={initialValues.make}
                />
          )}
      </Container>
    );
  };
  
  export default EditProductPage;