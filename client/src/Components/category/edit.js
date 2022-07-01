import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import {useParams} from "react-router-dom"
import styles from "../../Css/category.module.css";
import Navbar from "../nav/navAdmin";

function EditCategory() {
  let navigate = useNavigate();
  const [category, setCategory] = useState("");

  const title = "Add Category";
  document.title = "DumbMerch | " + title;
 
  const {id} = useParams()

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.patch(
        `/category/` + id,
        body,
        config
      );
      (response);

      navigate("/category");
    } catch (error) {
      (error);
    }
  });
  return (
    <div className={styles.editContainer}>
      <Navbar />
      <div className={styles.editCatContainer}>
        <h1>Edit category</h1>
        <form onSubmit={(e) => handleSubmit.mutate(e)} style={{ gap: "1rem" }}>
          <div className={styles.editForm}>
            <div className={styles.editInput}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Category name..."
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
