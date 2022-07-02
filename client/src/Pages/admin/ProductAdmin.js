import styles from "../../Css/product.module.css";
import Navbar from "../../Components/nav/navAdmin";
import {API} from "../../config/api"
import Modal from "../../Components/category/modal"
import {useQuery, useMutation} from 'react-query'
import {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'

function Product() {
  const [modal, setModal] = useState(false)
  let navigate = useNavigate()

  const title = 'Product Admin';
  document.title = 'DumbMerch | ' + title;

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    console.log(response.data.data.products[0].image)
    return response.data.data.products
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };


  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/` + id);
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.catContainer}>
          {products?.length !==0 && 
          <table className={styles.contentTable}>
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Product Desc</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {products?.map((item, index) => (
                <tr key={index}> 
                  <td>{index + 1}</td>
                  <td><a href={item.image} target="_blank">Click to see</a></td>
                  <td>{item.name}</td>
                  <td><div style={{
                    overflow: 'hidden',
                    height: '3.9rem',
                    width: '20rem'
                }}>{item.desc}</div></td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>
                  <Link to={`/update-product/` + item.id}>
                  <button className={styles.edit}>Edit</button>
                  </Link>
                  <button
                    className={styles.delete}
                    onClick={() => { setModal(true); }}
                  >
                    Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody> 
        </table>}
        </div>
      </div>
      {modal && <Modal 
      setConfirmDelete={setConfirmDelete}
      closeModal={setModal}/>}
    </div>
  );
}

export default Product;
