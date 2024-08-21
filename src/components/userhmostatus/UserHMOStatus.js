import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import img from '../../assets/svg/policy.svg';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { toast } from 'react-toastify';
import moment from 'moment';

const UserHMOStatus = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [email, setEmail] = useState('');
  const [insurance_plan_id, setInsurancePlanId] = useState('');
  const [active, setActive] = useState('yes');

  const fetchHmoData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.get(`${Home}users/hmo/${active}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data.payload);
          setResponseData(res.data.payload);
          setLoading(false);
          $('#hmo').DataTable();
          if (res.data && res.data.payload) {
            res.data.payload.forEach((policy) => {
              const { insurance_plan_id, email } = policy;
              if (email) {
                setEmail(email);
                console.log(`"this is the Email": ${email}`); // Log the holder's email
              } else {
                console.error('Email not found in the response object.');
              }
              if (insurance_plan_id) {
                setInsurancePlanId(insurance_plan_id);
                console.log(`This is the insurance ID :${insurance_plan_id}`); // Log the insurance plan ID
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
    }
  };

  const updateStatus = (emailToUpdate, insurancePlanIdToUpdate) => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      const updatedStatus = 'success'; // Set the updated status value

      // Make a PUT request to update the status
      Axios.put(
        `${Home}users/hmo/${emailToUpdate}/${insurancePlanIdToUpdate}`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          console.log('Status updated successfully:', res.data);

          // Update the responseData state to reflect the new status
          const updatedData = responseData.map((user) => {
            if (
              user.email === emailToUpdate &&
              user.insurance_plan_id === insurancePlanIdToUpdate
            ) {
              return { ...user, status: updatedStatus };
            }
            return user;
          });
          setResponseData(updatedData);
          toast.success('Status updated successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });

          // window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const updateStatusForUser = (email, insurance_plan_id) => {
    updateStatus(email, insurance_plan_id);
  };

  useEffect(() => {
    fetchHmoData();
  }, []);

  const cleanUpObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        try {
          obj[key] = JSON.parse(obj[key].replace(/'/g, '"'));
        } catch (error) {
          // It's not valid JSON, so leave it as a string.
        }
      } else if (typeof obj[key] === 'object') {
        obj[key] = cleanUpObject(obj[key]); // Recursively clean up nested objects.
      }
    }
    return obj;
  };

  const cleanedBody = cleanUpObject(responseData);

  return (
    <div>
      {loading ? (
        <div className='p-5'>
          <Spinner size={70} />
        </div>
      ) : cleanedBody &&
        Array.isArray(cleanedBody) &&
        cleanedBody.length > 0 ? (
        <div className=''>
          <div className='table-responsive'>
            <table className='' id='hmo'>
              <thead className='display-5' style={{}}>
                <tr>
                  <th>Name</th>
                  <th>Beneficiary Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Insurance ID</th>
                  <th>Details</th>
                  <th>Buying For Someone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cleanedBody.map((user, i) => {
                  const { details } = user;
                  const { meta, beneficiary } = details;

                  let parsedMeta = null;

                  if (meta) {
                    // Remove the additional single quotes from the string before parsing it as JSON
                    try {
                      const cleanedMeta = cleanUpObject(meta);
                      parsedMeta = JSON.parse(JSON.stringify(cleanedMeta));
                      console.log(parsedMeta);
                      console.log(`Meta data: ${JSON.stringify(parsedMeta)}`);
                    } catch (error) {
                      console.error('Error parsing meta:', error);
                    }
                  }

                  return (
                    <tr key={i}>
                      <td style={{ width: '200px' }}>
                        {user.user.first_name} {user.user.last_name}
                      </td>
                      <td style={{ width: '200px' }}>{details?.user?.name}</td>
                      <td style={{ width: '200px' }}>{user.email}</td>
                      <td style={{ width: '200px' }}>
                        {details?.user?.phone_number}
                      </td>
                      <td>{user?.insurance_plan_id}</td>
                      <td style={{ width: '200px' }}>
                        <div>
                          Name: {details.name}
                          <br />
                          Plan: {details?.plan}
                          <br />
                          Coverage Period: {details?.cov_period}
                          <br />
                          Insurance Type: {details?.insurance_type}
                          <br />
                          User ID: {details?.user_id}
                          <br />
                          Total Premium: {details?.total_premium}
                          <br />
                          Date:{' '}
                          {moment(user?.updated_at).format('MMM Do, YYYY')}
                          {beneficiary && (
                            <div>
                              Beneficiary: {beneficiary.userIsBeneficiary}{' '}
                              <br />
                              Beneficiary Blood Group:{' '}
                              {beneficiary.beneficiary_blood_group}
                              <br />
                              Beneficiary Genotype:{' '}
                              {beneficiary.beneficiary_genotype}
                              <br />
                            </div>
                          )}
                        </div>
                      </td>

                      <td style={{ width: '200px' }}>
                        <div>
                          {parsedMeta && (
                            <div>
                              Plan Name: {parsedMeta?.planName}
                              <br />
                              Plan Type: {parsedMeta?.planType}
                              <br />
                              Plan Code: {parsedMeta?.planCode}
                              <br />
                              Price: {parsedMeta?.price}
                              <br />
                              Number of Persons: {parsedMeta?.numberOfPersons}
                              <br />
                              Number of Months: {parsedMeta?.numberOfMonths}
                              <br />
                              Product Type: {parsedMeta?.productType}
                              <br />
                              {parsedMeta?.planBenefits &&
                              parsedMeta?.planBenefits.length > 0 ? (
                                <div>
                                  <p>Plan Benefits:</p>
                                  <ul>
                                    {parsedMeta?.planBenefits.map(
                                      (benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              ) : (
                                <p>No plan benefits found.</p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ width: '200px' }}>
                        <span
                          className={`p-2 text-white rounded-pill ${
                            user.status === 'success'
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
                          onClick={() =>
                            updateStatusForUser(
                              user.email,
                              user.insurance_plan_id
                            )
                          }
                          disabled={user.status === 'success'}
                        >
                          {user.status === 'success'
                            ? 'Status Updated'
                            : 'Update Status'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {responseData && !Array.isArray(responseData) ? (
            <div>Data is not in the expected array format</div>
          ) : (
            <div>No data to display</div>
          )}
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

export default connect(mapStoreToProps)(UserHMOStatus);
