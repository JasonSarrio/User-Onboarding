import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Formik, withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const UserForm = ({values, touched, errors, handleSubmit, handleChange, status, isSubmitting}) => {
    const [form, setForm] = useState([])

    useEffect(() => {
        status && setForm(form => [...form, status])
    },[status])
   // console.log(handleChange)
    
    return(
        <Formik
          initialValues={{ uName: '',  email: '', password: '', terms: false}}
          render={props => {
            return(
            <div className="form-list">
              <Form className='form' onSubmit={handleSubmit}>
            <div>
                {touched.uName && errors.uName && (
                    <p>Error: {errors.uName}</p>
                    )} 
                    <Field name='uName' type='text' placeholder='enter name' value={values.uName} onChange={handleChange} />
            </div>
                    <label>Name</label>

            <div>
                {touched.email && errors.email && (
                    <p>Error: {errors.email}</p>
                    )} 
                    <Field name='email' type='text' placeholder='enter email' value={values.email} onChange={handleChange} />
            </div>
                    <label>Email</label>

            <div>
                {touched.password && errors.password && (
                    <p>Error: {errors.password}</p>
                    )}
                    <Field name='password' type='text' placeholder='enter password' value={values.password} onChange={handleChange} />
            </div>
                    <label>Password</label>

            <div>
                <Field component="select" name="role" value={values.role} onChange={handleChange}>
                  <option>Select Your Role!</option>
                  <option >FrontEnd</option>
                  <option >UI/UX</option>
                  <option >BackEnd</option>
                </Field>
            </div>

            <div>
                {touched.terms && errors.terms && (
                    <p>Error: {errors.terms}</p>
                    )}
                    <label className='terms-label'>Agree to our terms</label>
                    <br/>
                    <Field type='checkbox' id='terms' name='terms' checked={values.terms} onChange={handleChange} />
            </div>
    
                <button className='submit' type="submit" >Submit</button>
              </Form>
              
              {form.map(form => (
                  <div className='user-card'>
                  <h3>Name: {form.uName}</h3>
                  <h3>Email: {form.email}</h3>
                  <h3>Password: {form.password}</h3>
                  <h3>Role: {form.role}</h3>
                  </div>
              ))}
              </div>
            )
          }}
        />
      );

}
const formikUserForm = withFormik({
    mapPropsToValues({uName, email, password, terms}){
        console.log()
        return {
          uName: uName || "",
          email: email || "",
          password: password ||  "",
          terms: terms
        };
    },
      validationSchema: yup.object().shape({
          uName: yup.string()
          .required()
          .min(2)
          .max(18),

          email: yup.string()
          .email()
          .required(),

          password: yup.string()
          .min(6)
          .required(),
          terms: yup.bool().required("Must accept our terms")
     }),
    handleSubmit:(values, { setStatus, setErrors}) => {
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
          } else {
        axios.post('https://reqres.in/api/users', values)
          .then(res => {
              console.log(res.data);
              setStatus(res.data)   
          })
          .catch(err => console.log(err.respons))

    }


}})(UserForm);

export default formikUserForm;