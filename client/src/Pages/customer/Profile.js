import styles from "../../Css/profile.module.css";
import Navbar from "../../Components/nav/nav";
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import {Link} from 'react-router-dom'
import { Col, Row, Card, Button } from 'react-bootstrap'
import dateFormat from 'dateformat';

function Profile() {

  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  console.log(state.user)

  let { data: profile } = useQuery('profileCache', async () => {
    const response = await API.get(`/profile/` + state.user.id);
    console.log(response.data)
    return response.data.data;
  });

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    console.log(response.data)
    return response.data.data;
  });

  const imgLink = ''

  return (
    <div className={styles.Container}>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          <div className={styles.profileHeading}>
            <h1>My Profile</h1>
            <Link to='/update-profile'><button>Edit Profile</button></Link>
          </div>
          <div className={styles.bio}>
            <div className={styles.bioImage}>
              <img src={profile?.image} alt="" />
            </div>
            <div className={styles.bioData}>
              <div>
                <h1>Name</h1>
                <p>{state.user.name}</p>
              </div>
              <div>
                <h1>Email</h1>
                <p>{state.user.email}</p>
              </div>
              <div>
                <h1>Phone</h1>
                <p>{profile?.phone ? profile?.phone : '-'}</p>
              </div>
              <div>
                <h1>Gender</h1>
                <p>{profile?.gender ? profile?.gender : '-'}</p>
              </div>
              <div>
                <h1>Address</h1>
                <p>
                  {profile?.address ? profile?.address : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4" style={{ padding: '0', position:'absolute', top: '17%', right: '15%' }}>
                <p className='user-text' style={{
                  fontSize: '2.5rem',
                  color:'var(--merch)',
                  fontWeight: 'bold'
                }}>My Transaction</p>
                {transactions?.map((item, index) => (
                    <Card className='mb-2 history-card' style={{backgroundColor: "#s1s1s1"}} key={index}>
                        <Row>
                            <Col sm={3}>
                                <img src={imgLink + item.product.image} alt="" className="img-history" style={{width: '7.5rem', height: '11rem', objectFit:'cover', borderRadius:'0.2rem'}} />
                            </Col>
                            <Col sm={5}>
                                <p className='card-title-text' style={{ marginTop: '10px' }}>{item.product.name}</p>
                                <p className='history-card-date'>{dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}</p>
                                <p className='history-card-text' style={{ marginTop: '10px' }}>Price: Rp. {item.price}</p>
                                <p className='history-card-text' style={{ marginTop: '20px' }}><b>Sub Total: Rp. {item.price} </b></p>
                            </Col>
                            <Col sm={4}>
                            <div
                            className={`status-transaction-${item.status} rounded h-100 w-100 d-flex align-items-center justify-content-center`}
                          >
                            {item.status}
                          </div>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
      </div>
    </div>
  );
}

export default Profile;
