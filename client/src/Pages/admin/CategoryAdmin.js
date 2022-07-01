import styles from "../../Css/category.module.css";
import Navbar from "../../Components/nav/navAdmin";
import Modal from "../../Components/category/modal";
import Edit from "../../Components/category/edit";
import Add from "../../Components/category/add"
import { useState } from "react";
import {API} from "../../config/api"
import {useQuery} from "react-query"
import { Link } from "react-router-dom"

function Category() {
  let [modal, setModal] = useState(false);
  let [edit, setEdit] = useState(false);
  let [add, setAdd] = useState(false);

  let {data: category, isLoading} = useQuery('productData', async () => {
    const response = await API.get('/categories')
    (response.data.data)
    return response.data.data
  })

  (isLoading)

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.catContainer}>
        <button
                      className={styles.addCat}
                      onClick={() => {
                        setAdd(true);
                      }}
                    >
                      Add
                    </button>
          <table className={styles.contentTable}>
            <thead>
              <tr>
                <th>No</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
              {category?.length !==0 && <tbody>
                {category?.map((item,index) => (
                  <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Link to={'/update-category/' + item.id}><button className={styles.edit}>Edit</button></Link>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                ))}
              </tbody> }
          </table>
        </div>
      </div>
      <div>
      {add && <Add />}
      {edit && <Edit />}
      {modal && <Modal closeModal={setModal} />}
      </div>
    </div>
  );
}

export default Category;
