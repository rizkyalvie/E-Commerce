import styles from "../../Css/product.module.css";
import NavbarAdmin from '../nav/navAdmin';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import {API} from '../../config/api'

function EditProduct() {
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data

  // Create Variabel for store product data here ...
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data

  // Fetching detail product data by id from database
let { data: products, refetch } = useQuery('productCache', async () => {
  const response = await API.get('/product/' + id);
  console.log(response.data.data)
  return response.data.data.products;
});

// Fetching category data
let { data: categoriesData, refetch: refetchCategories } = useQuery(
  'categoriesCache',
  async () => {
    const response = await API.get('/categories');
    return response.data.data;
  }
);

useEffect(() => {
  if (products) {
    setPreview(products.image);
    setForm({
      ...form,
      name: products.name,
      desc: products.desc,
      price: products.price,
      qty: products.qty,
    });
    setProduct(products);
  }

  if (categoriesData) {
    setCategories(categoriesData);
  }
}, [products]);

  // Create function for handle if category selected here ...
  // For handle if category selected
const handleChangeCategoryId = (e) => {
  const id = e.target.value;
  const checked = e.target.checked;

  if (checked == true) {
    // Save category id if checked
    setCategoryId([...categoryId, parseInt(id)]);
  } else {
    // Delete category id from variable if unchecked
    let newCategoryId = categoryId.filter((categoryIdItem) => {
      return categoryIdItem != id;
    });
    setCategoryId(newCategoryId);
  }
};

  // Create function for handle change data on form here ...
  // Handle change data on form
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      });

      // Create image url for preview
      if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

  // Create function for handle submit data ...

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
  
      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('categoryId', categoryId);
  
      // Insert product data
      const response = await API.patch(
        '/product/' + product.id,
        formData,
        config
      );
      console.log(response.data);
  
      navigate('/home-admin');
    } catch (error) {
      console.log(error);
    }
  });

  // Get category id selected
  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
    <div>
        <div className={styles.addContainer}>
      <NavbarAdmin />
      <div className={styles.addCatContainer}>
        <h1>Edit Product</h1>
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
            {/* <div>
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
                </div> */}
                </div>
        <button type="submit">Edit Product</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default EditProduct;
