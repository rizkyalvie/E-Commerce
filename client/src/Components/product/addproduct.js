import styles from "../../Css/product.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import NavbarAdmin from '../nav/navAdmin';
import { API } from '../../config/api'
import {UserContext} from '../../context/userContext'


function AddProduct() {

  const [state] = useContext(UserContext);

    const title = 'Add Product';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); 
  const [categoryId, setCategoryId] = useState([]);
  const [preview, setPreview] = useState(null); 

  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  });

  
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      (error);
    }
  };
  
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
  
      
      const formData = new FormData();
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('image', form.image[0], form.image[0].name);
      
      const response = await API.post('/addproduct', formData, config);
      (response)
  
      navigate('/product')
    } catch (error) {
      (error);
    }
  });

  const checkAuth = () => {
    if (state.isLogin === true) {
      if(!state.user.status == "admin"){
        navigate('/')
      }
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() =>{
    checkAuth()
  },[state])

  return (
    <div>
        <div className={styles.addContainer}>
      <NavbarAdmin />
      <div className={styles.addCatContainer}>
        <h1>add Product</h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
        {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '9rem',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      marginBottom: '1rem',
                      borderRadius: '0.3rem'
                    }}
                    alt={preview}
                  />
                </div>
              )}
        <div className={styles.addUpCon}>
        
          <label htmlFor="upImge">
            <p>Upload Image</p>
            <input type="file" id="upImge" name="image" onChange={handleChange} hidden />
          </label>
        </div>
        <input type="text" name="name" onChange={handleChange} placeholder="Product name..." />
        <textarea name="desc" onChange={handleChange} id="desc">
        </textarea>
        
        <input type="number" name="price" onChange={handleChange} placeholder="Product price..." />
        <input type="text" name="qty" onChange={handleChange} placeholder="Product quantity..." />
        <h4 style={{
              color:'white',
              fontWeight:'bold'
            }}>Category</h4>
            <div style={{
            display: 'flex',
            width: '100%',
          }}>
        {categories?.map((item, index) => (
          
                  <div>
                    <label style={
                    {display: 'flex',
                     gap: '0.5rem',
                     color: 'white',
                     fontSize: '1rem',
                     width: '9.5rem',
                     alignItems:'center',
                     padding: '0',
                     margin:'1rem 0rem'
                  }

                  } key={index}>
                    <input
                      type="checkbox"
                      name="category"
                      value={item?.id}
                      onClick={handleChangeCategoryId}
                    /><p>{item?.name}</p>
                  </label>
                    </div>
          
                ))}
                </div>
        <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
