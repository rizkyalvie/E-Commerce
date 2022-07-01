import Navbar from "../../Components/nav/nav";
import styles from "../../Css/home.module.css";
import ProductCard from "../../Components/product/productCard";
import { Link } from "react-router-dom";
import {API} from "../../config/api"
import {useQuery} from 'react-query'

function Home() {

  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;

  let {data: products, isLoading} = useQuery('productData', async () => {
    const response = await API.get('/products')
    (response.data.data)
    return response.data.data.products
  })

  (isLoading)
  return (
    <div className={styles.homeBg}>
      <Navbar />
      <div className={styles.productTitle}>
        <h1>Product</h1>
      </div>
      
      {products?.length !== 0 && 
      <div className={styles.productHeader}>
        {products?.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))}
      </div>
      }
    </div>
  );
}

export default Home;
