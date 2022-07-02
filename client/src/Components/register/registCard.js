import React, { useState } from 'react';
import { useMutation } from 'react-query'
import { API } from '../../config/api'
import styles from "../../Css/regist.module.css";

function RegistCard() {

  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      
      const config = {
        headers: {
          'Content-type': 'application/json', 
        },
      };
  
      const body = JSON.stringify(form);   

      const response = await API.post('/register', body, config);
      console.log(response.data)

      setMessage(null)
    } catch (error) {
      const alert = (
        <div style={{
          backgroundColor: '#F74D4D',
          fontSize: '0.7rem',
          padding:'0.5rem',
          borderRadius:'0.3rem',
          color:"white",
          fontWeight: 'bold',
          position: 'absolute',
          right: '2rem',
          width: '10rem',
          top: '7.3rem'
        }}>{error.response.data}</div>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className={styles.loginCard}>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className={styles.cardForm}>
          <input onChange={handleChange} name="name" type="text"  value={name} placeholder="Name" id="name" />
          <input onChange={handleChange} name="email" type="email"  value={email} placeholder="Email" id="email" />
          <input onChange={handleChange} name="password" type="password"  value={password} placeholder="Password" id="password" />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegistCard;