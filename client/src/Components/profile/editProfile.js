import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import styles from "../../Css/profile.module.css";
import NavAdmin from "../nav/nav";
import { UserContext } from "../../context/userContext";

function EditProfile() {

  const title = "Profile User";
  document.title = "DumbMerch | " + title;
  
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  
  const [preview, setPreview] = useState(null); //For image preview
  const [profile, setProfile] = useState({}); //Store profile data
  const [form, setForm] = useState({
  image: "",
  phone: "",
    gender: "",
    address: "",
  });
  
  let { data: profiles, refetch } = useQuery("profileCache", async () => {
    const response = await API.get(`/profile/` + state.user.id);
    console.log(response.data.data);
    return response.data.data;
  });

  useEffect(() => {
    if (profiles) {
      setPreview(profiles.image);
      setForm({
        ...form,
        phone: profiles.phone,
        gender: profiles.gender,
        address: profiles.address,
      });
      setProfile(profiles);
    }
  }, [profiles]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log(form);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("phone", form.phone);
      formData.set("gender", form.gender);
      formData.set("address", form.address);
      const response = await API.patch(
        `/profile/` + state.user.id,
        formData,
        config
      );
      console.log(form);
      console.log(response.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  });

  const imgLink = 'http://localhost:5000/uploads/'

  return (
    <div className={styles.editContainer}>
      <NavAdmin />
      <div className={styles.formContainer}>
        <p className={styles.editTitle}>Edit Profile</p>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div>
              <img
                src={imgLink + preview}
                style={{
                  maxWidth: "9rem",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                  borderRadius: "0.3rem",
                }}
                alt={preview}
              />
            </div>
          )}
          <label htmlFor="upImge">
            <p>Upload</p>
            <input
              type="file"
              id="upImge"
              name="image"
              onChange={handleChange}
              hidden
            />
          </label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Phone"
            className="mt-3"
          ></input>
          <select
            aria-label="Default select example"
            name="gender"
            onChange={handleChange}
            className="mt-3"
          >
            <option hidden>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            as="textarea"
            rows={3}
            name="address"
            onChange={handleChange}
            placeholder="Address"
            className="mt-3"
          ></input>
          <button
            style={{
              color: "white",
              height: "2rem",
              borderRadius: "0.2rem",
              fontSize: "1rem",
            }}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
