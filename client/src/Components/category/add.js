import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API } from '../../config/api'
import styles from "../../Css/category.module.css";
import Navbar from "../nav/navAdmin";

function AddCategory() {

    let navigate = useNavigate();
    const [category, setCategory] = useState('');
  
    const title = 'Add Category';
    document.title = 'DumbMerch | ' + title;
  
    const handleChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify({ name: category });
  
        // Insert category data
        const response = await API.post('/category', body, config);
        console.log(response)
  
        navigate('/category');
      } catch (error) {
        console.log(error);
      }
    });

  return (
    <div className={styles.editContainer}>
      <Navbar />
        
      <div className={styles.addCatContainer}>
      <form onSubmit={(e) => handleSubmit.mutate(e)} style={{gap: '2rem'}}>
        <h1>Add category</h1>
            <input type="text" name='name' value={category} onChange={handleChange} placeholder="Category name..." />
            <button type="submit">Add</button>
      </form>
      </div>
    </div>
  );
}

export default AddCategory;
