import * as Yup from 'yup'
import { useState } from 'react';
export default function FormSection(){
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '', 
    message: '',
  });
   const [errors, setErrors] = useState({});

   const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('The name is required.')
      .min(2, 'The name must have at least 2 characters.'),
    email: Yup.string()
      .email('The e-mail format is invalid.')
      .required('The email is required.'),
    inquiryType: Yup.string()
      .required('You must select an option.'),
    message: Yup.string()
      .required('The message is required.')
      .min(10, 'The message must have at least 10 characters.'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
     if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  }

   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de recargar la página

    try {
      // Validar los datos del formulario con Yup
      await validationSchema.validate(formData, { abortEarly: false });
      // Si la validación es exitosa, los errores se limpian
      setErrors({});
      // Aquí puedes enviar los datos (por ejemplo, a una API)
      console.log('Formulario válido, enviando datos:', formData);
      alert(`Thanks for your submission ${formData.name}, we will get back to you shortly!`); // Notificación al usuario
      // Opcional: Resetear el formulario después del envío exitoso
      setFormData({
        name: '',
        email: '',
        inquiryType: '',
        message: '',
      });
    } catch (validationErrors) {
      // Si la validación falla, Yup lanza un error con los detalles
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error('Errores de validación:', newErrors);
    }
  };


  return(
    <form onSubmit={handleSubmit} noValidate /* style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }} */>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          /* style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} */
        />
        {errors.name && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          /* style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} */
        />
        {errors.email && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="inquiryType">Type of enquiry:</label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          /* style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} */
        >
          <option value="">Select an option</option>
          <option value="hireMe">Freelance project proposal</option>
          <option value="openSource">Open source consultancy session</option>
          <option value="other">Other</option>
        </select>
        {errors.inquiryType && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.inquiryType}</p>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          /* style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} */
        ></textarea>
        {errors.message && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.message}</p>}
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  )

  
}