import styles from "../../Css/profile.module.css";
import Navbar from "../../Components/nav/navAdmin";
import profile from "../../Images/me.jpg";
import product from "../../Images/product1.jfif";

function Profile() {
  return (
    <div className={styles.Container}>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileHeading}>
            <h1>My Profile</h1>
          </div>
          <div className={styles.bio}>
            <div className={styles.bioImage}>
              <img src={profile} alt="" />
            </div>
            <div className={styles.bioData}>
              <div>
                <h1>Name</h1>
                <p>Ananda Rizky Alvie Nuryahya</p>
              </div>
              <div>
                <h1>Email</h1>
                <p>alvienuryahya@gmail.com</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>089541346500</p>
              </div>
              <div>
                <h1>Gender</h1>
                <p>Attack Helicopter</p>
              </div>
              <div>
                <h1>Address</h1>
                <p>
                  Jl.Maju Jaya No.69420, Desa Quandale, Kelurahan Dingle, Depok,
                  Jawa Tengah
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.transaction}>
          <div className={styles.transactionHeading}>
            <h1>My Transaction</h1>
          </div>
          <div className={styles.transactionDetail}>
            {/* TD = Transaction Detail */}
            <div className={styles.TDLeft}>
              <div className={styles.TDImage}>
                <img src={product} alt="" />
              </div>
              <div className={styles.TDetails}>
                <div className={styles.TDTitle}>
                  <h1>KYT Falcon FR</h1>
                </div>
                <div className={styles.TDStock}>
                  <h2>Stock: 235</h2>
                </div>
                <div className={styles.TDPrice}>
                  <p>Rp.700.000</p>
                </div>
                <div className={styles.TDTotal}>
                  <p>Sub Total: Rp.700.000</p>
                </div>
              </div>
            </div>
            <div className={styles.TDRight}>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
