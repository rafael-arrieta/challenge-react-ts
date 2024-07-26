import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './formComponent.css';

// Definir el esquema de validación
const schema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  phone: Yup.string().required('El teléfono es requerido').matches(/^[0-9]+$/, 'El teléfono debe ser un número'),
  message: Yup.string().required('El mensaje es requerido'),
});

const FormComponent = ({ onSubmit }) => {
  // Configurar useForm con yupResolver
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  // Función para manejar el envío del formulario
  const handleFormSubmit = (data) => {
    const { name, email, phone, message } = data;

    const subject = 'WEB COSTA BRAVA PISCINAS';
    const mailtoLink = `mailto:costabravapiscinas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nombre: ${name}\nCorreo electrónico: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
    )}`;

    window.location.href = mailtoLink;
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='form-container'>
      <label className='form-label'>
        Nombre:
        <input className='form-input' type="text" {...register('name')} />
        {errors.name && <p className='error-message'>{errors.name.message}</p>}
      </label>
      <label className='form-label'>
        Correo electrónico:
        <input className='form-input' type="email" {...register('email')} />
        {errors.email && <p className='error-message'>{errors.email.message}</p>}
      </label>
      <label className='form-label'>
        Teléfono:
        <input className='form-input' type="text" {...register('phone')} />
        {errors.phone && <p className='error-message'>{errors.phone.message}</p>}
      </label>
      <label className='form-label'>
        Mensaje:
        <textarea className='form-textarea' {...register('message')} />
        {errors.message && <p className='error-message'>{errors.message.message}</p>}
      </label>
      <input type="submit" value="Enviar" className="form-btn-submit"/>
    </form>
  );
};

export default FormComponent;