import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';

const LabeledInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input> and alse replace ErrorMessage entirely.
   const [field, meta] = useField(props);
   return (
      <>
         <label htmlFor={props.id || props.name}>{label}</label>
         <input className="text-input" {...field} {...props} />
         {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
      </>
   );
};


export default function New({ history }) {

   async function handleSubmit(event, values/*, { setSubmitting }*/){        
      event.preventDefault(); //para evitar que o form se recarregue após o submit, que seria o comportamento defaul dele        

      const user_id = localStorage.getItem('user');
      const data = new FormData();

      data.append('thumbnail',thumbnail);
      data.append('company',values.company);
      data.append('techs',values.techs);
      data.append('price',values.price);


      await api.post('/spots', data, {
          headers: { user_id }
      })
      .then((response) => {
          history.push('/dashboard');
      })
      .catch((error) => {
          if (error.response){
              alert(error.response.data.error)
          } else {
              alert("fatal error")
          }            
      });
  }

  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

   return (
      <Formik
         initialValues={{ company: '', techs: [], price: '' }}
         /*onSubmit={(values, { setSubmitting }) => {     
             handleSubmit(values, { setSubmitting })       
            /*setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
            }, 400);
         }}*/
         validationSchema={Yup.object().shape({            
            company: Yup.string()
               .required('Preencha o nome da empresa'),
            techs: Yup.string()
               .required('Preencha as tecnologias'),
            price: Yup.number()
               .typeError("Valor inválido")     
         })}
      >
         {({
            values,
            /*errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,*/
            isSubmitting,
            /* and other goodies */
         }) => (
               <form onSubmit={/*handleSubmit*/(event) => handleSubmit(event, values)/*, {setSubmitting})*/}>
                  <label 
                      id="thumbnail"
                      style={{ backgroundImage: `url(${preview})` }}
                      className={thumbnail ? 'has-thumbnail' : ''}                
                  > 
                      <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                      <img src={camera} alt="Selecione uma imagem"/>
                  </label>                  

                  <LabeledInput
                     label="EMPRESA *"
                     name="company"
                     placeholder="Sua empresa incrível"
                  />
                  <LabeledInput
                     label="TECNOLOGIAS * (separadas por virgula)" 
                     name="techs"
                     placeholder="Quais tecnologias utilizam?"
                  />
                  <LabeledInput
                     label="VALOR DA DIÁRIA * (em branco para GRATUITO)"
                     name="price"    
                     placeholder="Valor cobrado por dia"
                  />                  
                  <button type="submit" className="btn" disabled={isSubmitting}>
                     Cadastrar
                  </button>
               </form>
            )}
      </Formik>


    /* Forma como foi ensinado no curso OmnieStack. Sem Formik, sem Yup e sem validações.
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function handleSubmit(event){
        event.preventDefault(); //para evitar que o form se recarregue após o submit, que seria o comportamento defaul dele        

        const user_id = localStorage.getItem('user');
        const data = new FormData();

        data.append('thumbnail',thumbnail);
        data.append('company',company);
        data.append('techs',techs);
        data.append('price',price);

        await api.post('/spots', data, {
            headers: { user_id }
          })
          .then((response) => {
              history.push('/dashboard');
          })
          .catch((error) => {
              if (error.response){
                  alert(error.response.data.error)
              } else {
                  alert("fatal error")
              }            
        });
    }

        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            > 
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione uma imagem"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
              required
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span> </label>
            <input 
                id="techs"
                placeholder="Quais tecnologias utilizam?"
                value={techs}
              required
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span> </label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
              required
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
                

      </form>*/
    )
}