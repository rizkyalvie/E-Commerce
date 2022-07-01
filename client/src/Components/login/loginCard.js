import styles from "../../Css/login.module.css";
import {useNavigate} from "react-router-dom"
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useMutation } from 'react-query'
import { API } from '../../config/api'



function LoginCard() {
  let navigate = useNavigate()

  const title = 'Login';
  document.title = 'DumbMerch | ' + title;

  const [state, dispatch] = useContext(UserContext);

  (state)

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

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
  
      const response = await API.post('/login', body, config);
  
      const userStatus = response.data.user.status

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.user
      })
      
      if(userStatus == 'user'){
        navigate('/')
      } else if(userStatus == 'admin' ){ 
        navigate('/home-admin')
      }
      
      setMessage(null);
    } catch (error) {

      const alert = (
        <div style={{
          backgroundColor: '#F74D4D',
          fontSize: '1rem',
          padding:'0.5rem',
          borderRadius:'0.3rem',
          color:"white",
          fontWeight: 'bold',
          position: 'absolute',
          right: '2rem',
          width: '14rem',
          top: '7rem'
        }}>{error.response.data.message}</div>
      )
      setMessage(alert)
    }
  });

  
  return (
    <div className={styles.loginCard}>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <div className={styles.cardForm}>
          {message && message}
          <input onChange={handleChange} name="email" type="text" value={email} placeholder="Email" />
          <input onChange={handleChange} name="password" value={password} type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginCard;
