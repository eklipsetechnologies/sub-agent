import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../global/Home';
import Spinner from '../../global/Spinner';
import moment from 'moment';
import img from '../../assets/svg/policy.svg';
import { toast } from 'react-toastify';

// import { useHistory } from 'react-router-dom';

let token = '';

const ReferralTransactions = () => {
  // const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [transaction_id, setTransactionId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [typeQuery, setTypeQuery] = useState('');

  const LoadData = (page = currentPage) => {
    setLoading(true);
    Axios.get(`${Home}customer-care/transactions?page=${page}`, {
      params: {
        type: typeQuery,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setTotalPages(res.data.meta.last_page);
        setLoading(false);
        if (res.data && res.data.data) {
          res.data.data.forEach((transaction) => {
            const { id } = transaction;

            if (id) {
              setTransactionId(id);
              // console.log(`This is the insurance ID :${id}`); // Log the insurance plan ID
            } else {
              console.error('Insurance plan ID not found in the response.');
            }
          });
        } else {
          console.error(
            'Unexpected response structure or policies not found in the response.'
          );
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Load token when component mounts
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      LoadData();
    }
  }, []);

  const handleRedeemTransaction = (transactionIdToUpdate) => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

      Axios.post(
        `${Home}customer-care/transactions/${transactionIdToUpdate}/redeem-point`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
            });
          }

          window.location.reload();
        })
        .catch((err) => {
          console.error('Error redeeming referral:', err);
        });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      LoadData(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      LoadData(currentPage + 1);
    }
  };

  const handleSearch = () => {
    console.log('search triggered');
    //reset pages before performing search
    setCurrentPage(1);
    // If search query is empty, reset to default

    if (!typeQuery) {
      setCurrentPage(1); // Reset to first page
      LoadData();
    } else {
      // Convert each search query to string and trim whitespace
      const type = typeQuery.toString().trim();

      // Create an object to hold search parameters
      const searchParams = {
        page: 1, // Start with the first page
      };
      console.log('Search Params:', searchParams);
      // Add each search query to the corresponding parameter only if it's not empty

      if (type) searchParams.type = type;

      // Perform search based on query parameters
      setLoading(true);
      Axios.get(`${Home}customer-care/transactions`, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log('Search Response:', res.data);
          setData(res.data.data);
          setTotalPages(res.data.meta.last_page);
          setLoading(false);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.error(err);
          console.error('Search Error:', err);
          setLoading(false);
        });
    }
  };

  const resetSearch = () => {
    // setLoading(true);

    setTypeQuery('');
    setCurrentPage(1);
    LoadData(1);
  };

  //console.log(this.props)
  return (
    <div>
      <div class='col-md-12 card p-4 mb-4'>
        <div class='row'>
          <div class='col mr-2 '>
            <select
              className='form-control form-control-sm'
              name='status'
              value={typeQuery}
              onChange={(e) => setTypeQuery(e.target.value)}
            >
              <option selected value=''>
                Select Type
              </option>
              <option value='COMMISSION'>Commision </option>
              <option value='WITHDRAWAL'>Withdrawal </option>
              <option value='PURCHASE'>Purchase </option>
            </select>
          </div>

          <div class='col'>
            <button class='btn btn-primary mr-2' onClick={handleSearch}>
              Search
            </button>
            <button onClick={resetSearch} className='btn btn-danger '>
              Reset
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : data.length > 0 ? (
        <div>
          <div className='table-responsive card p-4'>
            <table className='table '>
              <thead className='display-5' style={{}}>
                <tr>
                  <th scope='col'>Fullname</th>
                  <th scope='col'>Phone Number</th>

                  <th scope='col'>Policy Type</th>
                  <th scope='col'>Policy Number</th>
                  <th scope='col'>Policy Amount</th>
                  <th scope='col'>Commision Amount</th>
                  <th scope='col'>Referral Code </th>

                  <th scope='col'>Date Created</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Redeem Referral</th>
                </tr>
              </thead>

              <tbody>
                {data.map((user, i) => (
                  <tr key={i}>
                    <td style={{ width: '200px' }}>
                      <span>
                        {user?.user?.first_name} {user?.user?.last_name}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>{user?.user?.phone_number}</span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>{user?.service?.insurance_type}</span>
                    </td>
                    <td style={{ width: '200px' }}>
                      {user?.service?.policy_number}
                    </td>
                    <td style={{ width: '200px' }}>
                      {user?.service?.total_premium}
                    </td>
                    <td style={{ width: '200px' }}>
                      <span>{formatAmount(user.amount)} </span>
                    </td>

                    <td style={{ width: '200px' }}>
                      <span>{user?.user?.referral_code} </span>
                    </td>

                    <td style={{ width: '200px' }}>
                      <span>
                        {' '}
                        {moment(user?.created_at).format('MMM Do, YYYY')}
                      </span>
                    </td>
                    <td style={{ width: '200px' }}>
                      <span
                        className={`p-2 text-white rounded-pill ${
                          user?.status === 'success'
                            ? 'bg-success'
                            : 'bg-danger'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td style={{ width: '200px' }}>
                      <button
                        type='button'
                        className={`p-2 rounded ${
                          user.status === 'success'
                            ? 'btn btn-secondary'
                            : 'btn btn-primary'
                        }`}
                        onClick={() => handleRedeemTransaction(user?.id)}
                        disabled={user.status === 'success'}
                      >
                        {user.status === 'success'
                          ? 'Status Updated'
                          : 'Update Status'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className='d-flex align-items-center mt-2'>
              <button
                class='btn btn-primary'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className='mx-2'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                class='btn btn-primary'
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
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
            No company Referral Transactions of Type Selected Found!!
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

export default connect(mapStoreToProps)(ReferralTransactions);
