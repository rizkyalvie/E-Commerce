import styles from "../../Css/detail.module.css";
import Navbar from "../../Components/nav/navAdmin";
import convertRupiah from "rupiah-format"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";

function Detail() {
    let history = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    console.log(response.data.data)
    return response.data.data.products;
  });

  
  useEffect(()=>{
    
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    
    const myMidtransClientKey = "SB-Mid-client-4fo-5Pa0JvZkR1X6";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  },[])

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.seller.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post('/transaction', body, config);

      // Create variabel for store token payment from response here ...
      const token = response.data.payment.token
      console.log(token)

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      })
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.detailContainer}>
        <div className={styles.productDetail}>
          <div className={styles.leftDetail}>
            <img src={product?.image} alt="Product" />
          </div>
          <div className={styles.rightDetail}>
            <div className={styles.productTitle}>
              <h1>{product?.name}</h1>
            </div>
            <div className={styles.productStock}>
              <small>Stock: {product?.qty}</small>
            </div>
            <div className={styles.productDesc}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>Description:</p>
              <p>
                {product?.desc}
              </p>
            </div>
            <div className={styles.productPrice}>{convertRupiah.convert(product?.price)}</div>
          </div>
        </div>
      </div>
      <button onClick={(e) => {handleBuy.mutate(e)}}>Buy</button>
    </div>
  );
}

export default Detail;
