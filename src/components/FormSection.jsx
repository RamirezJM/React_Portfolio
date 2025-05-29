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
      .email('The e-mail format is invalid.(name@email.com)')
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
    e.preventDefault(); 

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log('Valid submission:', formData);
      alert(`Thanks for your submission ${formData.name}, we will get back to you shortly!`); 
      setFormData({
        name: '',
        email: '',
        inquiryType: '',
        message: '',
      });
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error('Error:', newErrors);
    }
  };


  return(
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="inquiryType">Type of enquiry:</label>
        <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="hireMe">Freelance project proposal</option>
          <option value="openSource">Open source consultancy session</option>
          <option value="other">Other</option>
        </select>
        {errors.inquiryType && <p className="error-message">{errors.inquiryType}</p>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5"></textarea>
        {errors.message && <p className="error-message">{errors.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )

  
}