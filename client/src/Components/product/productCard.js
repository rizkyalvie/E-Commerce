import styles from "../../Css/home.module.css";
import {Link} from "react-router-dom"
import convertRupiah from 'rupiah-format'

export default function ProductCard({item}){
    return(
        <div className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={item.image} alt="" />
          </div>
          <div className={styles.productName}>
            <Link to={`/detail/${item.id}`}>
              <h2>{item.name}</h2>
            </Link>
          </div>
          <div className={styles.productDetail}>
            <small>{convertRupiah.convert(item.price)}</small>
            <small>Stock: {item.qty}</small>
          </div>
        </div>
      )
}