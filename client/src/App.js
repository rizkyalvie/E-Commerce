import "./Css/app.css";
import { useContext, useEffect } from 'react'
import { UserContext } from './context/userContext'
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Auth from "./Pages/customer/Auth";
import HomeAdmin from "./Pages/admin/HomeAdmin";
import DetailAdmin from "./Pages/admin/DetailProductAdmin";
import Category from "./Pages/admin/CategoryAdmin";
import Product from "./Pages/admin/ProductAdmin";
import ComplainAdmin from "./Pages/admin/ComplainAdmin";
import Home from "./Pages/customer/Home";
import Detail from "./Pages/customer/DetailProduct";
import Profile from "./Pages/customer/Profile";
import Complain from "./Pages/customer/Complain";

// Components but also pages
import AddProduct from "./Components/product/addproduct"
import UpdateProduct from "./Components/product/editproduct"
import AddCategory from "./Components/category/add"
import UpdateCategory from "./Components/category/edit"
import UpdateProfile from "./Components/profile/editProfile"

import {API, setAuthToken} from "./config/api"

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  console.clear();
  
  (state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'admin') {
        navigate('/home-admin');
      } else if (state.user.status === 'user') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      (error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  


  return (
          <Routes>
            {/* user */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/update-profile" element={<UpdateProfile/>}></Route>
            <Route path="/complain" element={<Complain />}></Route>
            {/* admin */}
            <Route path="/home-admin" element={<HomeAdmin/>}></Route>
            <Route path="/addcategory" element={<AddCategory/>}></Route>
            <Route path="/detail-admin/:id" element={<DetailAdmin />}></Route>
            <Route path="/complain-admin" element={<ComplainAdmin />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path="/update-category/:id" element={<UpdateCategory/>}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/update-product/:id" element={<UpdateProduct/>}></Route>
            <Route path="/add-product" element={<AddProduct/>}></Route>
            <Route path="/complain" element={<Complain />}></Route>
          </Routes>
  );
}

export default App;
