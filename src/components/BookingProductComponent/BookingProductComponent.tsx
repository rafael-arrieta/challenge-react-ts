

import { FC } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import './BookingProductComponent.css';

interface BookingProductProps {
    onSubmit: (amount: number) => void;
    totalValue: number;
}

export const BookingProductComponent: FC<BookingProductProps> = ({ onSubmit, totalValue }) => {
    const validationSchema = Yup.object({
        amount: Yup.number()
            .required('El monto es requerido')
            .min(totalValue * 0.2, `El monto debe ser al menos ${totalValue * 0.2}`)
            .max(totalValue, `El monto debe ser como máximo ${totalValue}`)
    });

    return (
        <Formik
            initialValues={{ amount: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(Number(values.amount));
                resetForm();
            }}
        >
            {({  }) => (
                <>
                    <FormikForm className="booking-product-container">
                        <div className="booking-product-form-group">
                            <label htmlFor="amount">Monto</label>
                            
                            <Field
                                type="number"
                                name="amount"
                                placeholder={`Ingresar monto`}
                                className="form-control"
                            />
                            <ErrorMessage name="amount" component="div" className="text-danger" />
                        </div>
                        <Button variant="success" type="submit" className="booking-product-button">
                            Pagar
                        </Button>
                    </FormikForm>
                    <p className="booking-product-text"> Monto mínimo: ${totalValue * 0.2} (20%) - Monto máximo: ${totalValue}</p>
                </>
            )}
        </Formik>
    );
};

export default BookingProductComponent;