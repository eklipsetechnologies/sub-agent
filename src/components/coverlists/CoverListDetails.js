import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../global/Home';
import Spinner from '../../global/Spinner';
import img from '../../assets/svg/policy.svg';
import moment from 'moment';
import { ArrowLeft } from 'react-feather';
import {
  Link,
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom';

let token = '';
const CoverListDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack(); // Go back to the previous URL
  };

  useEffect(() => {
    // Load token when component mounts
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      LoadData();
    }
  }, [id]);

  const LoadData = () => {
    setLoading(true);
    Axios.get(`${Home}sub-agent/policies/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data.data);

        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div class='pb-2'>
        <button onClick={handleGoBack} className='btn btn-primary '>
          {' '}
          <ArrowLeft /> Back
        </button>
      </div>

      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : data || Object.keys(data).length === 1 ? (
        <div class='container'>
          <div class='row gap-3 mb-4 '>
            <div class='col card p-4 mr-2'>
              <h4>Policy Holder</h4>
              <ul class='list-unstyled lead'>
                <li>
                  First Name: <span>{data?.holder?.first_name} </span>
                </li>
                <li>
                  Last Name: <span>{data?.holder?.last_name}</span>
                </li>
                <li>
                  Email: <span>{data?.holder?.email} </span>
                </li>
                <li>
                  Phone Number: <span> {data?.holder?.phone_number}</span>
                </li>
                <li>
                  <b>Total Premium:</b>{' '}
                  <span>{formatAmount(data?.total_premium)}</span>
                </li>
                <li>
                  <b>Chassis Number:</b>{' '}
                  <span>{data?.transaction?.details?.chassis_number}</span>
                </li>
                <li>
                  <b> Registration Number:</b>{' '}
                  <span>{data?.transaction?.details?.plate_number}</span>
                </li>
                <li>
                  <b>Car Make:</b>
                  <span>
                    {data?.transaction?.details?.brand}{' '}
                    {data?.transaction?.details?.model}
                  </span>
                </li>
                <li>
                  Start Date:
                  <span>
                    {' '}
                    {moment(data?.start_date).format('MMM Do, YYYY')}
                  </span>
                </li>
                <li>
                  End Date:
                  <span> {moment(data?.end_date).format('MMM Do, YYYY')}</span>
                </li>
                <li class='pt-2 '>
                  Status:{' '}
                  <span
                    className={`p-2 text-white rounded-pill ${
                      data?.status === 'success' ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {data.status}
                  </span>
                </li>
              </ul>
            </div>

            <div class='col card p-4 mr-2'>
              <h4>Policy Paid By</h4>
              <ul class='list-unstyled lead'>
                <li>
                  First Name: <span>{data?.paid_by?.first_name}</span>
                </li>
                <li>
                  Last Name: <span>{data?.paid_by?.last_name}</span>
                </li>
                <li>
                  Email: <span>{data?.paid_by?.email} </span>
                </li>
                <li>
                  Phone Number: <span>{data?.paid_by?.phone_number}</span>
                </li>
              </ul>
            </div>

            <div class='col card p-4'>
              <h4>Insurance Plan</h4>
              <ul class='list-unstyled lead'>
                <li>
                  Policy Type: <span>{data?.insurance_plan?.name}</span>
                </li>
                <li>
                  Amount:{' '}
                  <span>
                    {' '}
                    {data?.total_premium
                      ? formatAmount(data?.total_premium)
                      : 'No data found'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-5'>
          <center>
            <img
              style={{ width: '30%' }}
              className='img-fluid w-20'
              src={img}
              alt=''
            />
          </center>
          <div className='pt-4 alert-secondary text-center display-5'>
            No Policy Data to be displayed
          </div>
        </div>
      )}
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(CoverListDetails);
