import styles from "../../Css/modal.module.css";

function Modal({ handleClose, show, closeModal, setConfirmDelete }) {

  const handleDelete = () => {
    setConfirmDelete(true)
}

  return (
    <div className={styles.modalbg}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h1>Delete Data</h1>
        </div>
        <div className={styles.modalBody}>
          <p>Are you sure want to delete this data?</p>
        </div>
        <div className={styles.modalFooter}>
          <button id="yes" onClick={handleDelete}>Yes</button>
          <button id="no" onClick={() => closeModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
