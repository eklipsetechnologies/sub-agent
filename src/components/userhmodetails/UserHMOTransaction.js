import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import { toast } from 'react-toastify';
import moment from 'moment';

const UserHMOTransaction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [email, setEmail] = useState('');
  const [insurance_plan_id, setInsurancePlanId] = useState('');
  const [active, setActive] = useState('yes');

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    user_email: '',
    user_id: '',
    total_premium: '',
    insurance_slug: '',
    insurance_type: '',
    name: '',
    cov_period: '',
    price: '',
    userIsBeneficiary: '',
    beneficiary_blood_group: '',
    beneficiary_genotype: '',
    beneficiary_userIsBeneficiary: '',
    created_at: '',

    plate_number: '',
    brand: '',
    model: '',
    color: '',
    year: '',
    chassis_number: '',
  });

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
          setResponseData(res.data.payload);
          console.log(responseData);
          setLoading(false);
          $('#hmo').DataTable();
        })
        .catch((err) => console.log('Error fetching HMO data:', err));
    }
  };

  const updateDetails = (userId) => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      const details = {
        ...editedDetails,
      };

      // Make a PUT request to update the status
      Axios.put(
        `${Home}users/hmo`,

        {
          user_hmo_id: userId,
          details: details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          console.log('Status updated successfully:', res.data);

          // Update the responseData state to reflect the new status
          toast.success('Status updated successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          //   setEditedDetails(null);

          // Reload the page to reflect the updated status
          window.location.reload();
          //fetchHmoData()
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditClick = (userId, details) => {
    if (details.status === 'pending') {
      setEditingUserId(userId);
      setEditedDetails(details);
    } else {
      toast.warning(
        'Cannot edit details for users with status other than "pending"',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        }
      );
    }
  };

  const handleInputChange = (userId, field, value) => {
    if (userId === editingUserId && editedDetails.status === 'pending') {
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };

  const handleUpdateDetails = () => {
    if (editingUserId) {
      updateDetails(editingUserId, editedDetails);
    }
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
                  <th>User HMO ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>User ID</th>
                  <th>Total Premium</th>
                  <th>insurance Slug</th>
                  <th>Insurance Type</th>
                  <th>Insurance Name</th>
                  <th>Cover Period</th>
                  <th>Price</th>
                  <th>User is Beneficiary</th>
                  <th>Beneficiary UserIsBeneficiary</th>
                  <th>Beneficiary BloodGroup</th>
                  <th>Beneficiary Genotype</th>

                  <th>Plate Number</th>
                  <th>Brand</th>
                  <th>Model </th>
                  <th>Color </th>
                  <th>Chassis Number</th>

                  <th>Date</th>
                  <th>Status</th>
                  <th>Update Details</th>
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
                    <>
                      <tr>
                        <td key={i}>
                          <div>
                            {/* {user.status === 'pending' ? (
                              <input
                                style={{ width: '150px' }}
                                className='form-control'
                                type='number'
                                value={
                                  editingUserId === user.user_id
                                    ? editedDetails.user_hmo_id
                                    : user.id
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    user.user_id,
                                    'user_hmo_id',
                                    e.target.value
                                  )
                                }
                                placeholder='USER HMO ID '
                              />
                            ) : (
                       
                            )} */}
                            <span>{user.id}</span>
                          </div>
                        </td>

                        <td>
                          <div>
                            {user.status === 'pending' ? (
                              <input
                                style={{ width: '150px' }}
                                className='form-control'
                                type='text'
                                value={
                                  editingUserId === user.id
                                    ? editedDetails.first_name
                                    : user?.user?.first_name
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    user.id,
                                    'first_name',
                                    e.target.value
                                  )
                                }
                                placeholder='First Name'
                              />
                            ) : (
                              <span>{user?.user?.first_name}</span>
                            )}
                          </div>
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.last_name
                                  : user?.user?.last_name
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'last_name',
                                  e.target.value
                                )
                              }
                              placeholder='Last Name'
                            />
                          ) : (
                            <span>{user?.user?.last_name}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='email'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.user_email
                                  : user.details?.user_email
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'email',
                                  e.target.value
                                )
                              }
                              placeholder='Email'
                            />
                          ) : (
                            <span>{user.details?.user_email}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='tel'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.phone_number
                                  : user?.user?.phone_number
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'phone_number',
                                  e.target.value
                                )
                              }
                              placeholder='Phone Number'
                            />
                          ) : (
                            <span>{user?.user?.phone_number}</span>
                          )}
                        </td>

                        <td>
                          <span>{user.details?.user_id}</span>
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.total_premium
                                  : user.details?.total_premium
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'total_premium',
                                  e.target.value
                                )
                              }
                              placeholder='Total Premium'
                            />
                          ) : (
                            <span>{user.details?.total_premium}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.insurance_slug
                                  : user.details?.insurance_slug
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'insurance_slug',
                                  e.target.value
                                )
                              }
                              placeholder='insurance slug'
                            />
                          ) : (
                            <span>{user.details?.insurance_slug}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.insurance_type
                                  : user.details?.insurance_type
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'insurance_type',
                                  e.target.value
                                )
                              }
                              placeholder='insurance type'
                            />
                          ) : (
                            <span>{user.details?.insurance_type}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.name
                                  : user.details?.name
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'name',
                                  e.target.value
                                )
                              }
                              placeholder='Name'
                            />
                          ) : (
                            <span>{user.details?.name}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.cov_period
                                  : user.details?.cov_period
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'cov_period',
                                  e.target.value
                                )
                              }
                              placeholder='Cover Period'
                            />
                          ) : (
                            <span>{user.details?.cov_period}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.price
                                  : user.details?.price
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'price',
                                  e.target.value
                                )
                              }
                              placeholder='Price'
                            />
                          ) : (
                            <span>{user.details?.price}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.userIsBeneficiary
                                  : user.details?.userIsBeneficiary
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'userIsBeneficiary',
                                  e.target.value
                                )
                              }
                              placeholder='User is Beneficiary'
                            />
                          ) : (
                            <span>{user.details?.userIsBeneficiary}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.beneficiary_userIsBeneficiary
                                  : user.details?.beneficiary_userIsBeneficiary
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'beneficiary_userIsBeneficiary',
                                  e.target.value
                                )
                              }
                              placeholder='Beneficiary user is Beneficiary'
                            />
                          ) : (
                            <span>
                              {user.details?.beneficiary_userIsBeneficiary}
                            </span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.beneficiary_blood_group
                                  : user.details?.beneficiary_blood_group
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'beneficiary_blood_group',
                                  e.target.value
                                )
                              }
                              placeholder='Beneficiary Bloog group'
                            />
                          ) : (
                            <span>{user.details?.beneficiary_blood_group}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.beneficiary_genotype
                                  : user.details?.beneficiary_genotype
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'beneficiary_genotype',
                                  e.target.value
                                )
                              }
                              placeholder='Beneficiary Genotype'
                            />
                          ) : (
                            <span>{user.details?.beneficiary_genotype}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.plate_number
                                  : user.details?.plate_number
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.user.id,
                                  'plate_number',
                                  e.target.value
                                )
                              }
                              placeholder='Plate Number'
                            />
                          ) : (
                            <span>{user.details?.plate_number}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.brand
                                  : user.details?.brand
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.user.id,
                                  'brand',
                                  e.target.value
                                )
                              }
                              placeholder='Brand'
                            />
                          ) : (
                            <span>{user.details?.brand}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.model
                                  : user.details?.model
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'model',
                                  e.target.value
                                )
                              }
                              placeholder='Model'
                            />
                          ) : (
                            <span>{user.details?.model}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.color
                                  : user.details?.color
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'color',
                                  e.target.value
                                )
                              }
                              placeholder='Color'
                            />
                          ) : (
                            <span>{user.details?.color}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? editedDetails.chassis_number
                                  : user.details?.chassis_number
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'color',
                                  e.target.value
                                )
                              }
                              placeholder='Chassis Number'
                            />
                          ) : (
                            <span>{user.details?.chassis_number}</span>
                          )}
                        </td>

                        <td>
                          {user.status === 'pending' ? (
                            <input
                              style={{ width: '150px' }}
                              className='form-control'
                              type='text'
                              value={
                                editingUserId === user.id
                                  ? moment(editedDetails.created_at).format(
                                      'MMM Do, YYYY'
                                    )
                                  : moment(user?.created_at).format(
                                      'MMM Do, YYYY'
                                    )
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  user.id,
                                  'created_at',
                                  e.target.value
                                )
                              }
                              placeholder='Date'
                            />
                          ) : (
                            <span>
                              {moment(user?.details?.created_at).format(
                                'MMM Do, YYYY'
                              )}
                            </span>
                          )}
                        </td>

                        <td>
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
                        <td>
                          {user.status === 'pending' ? (
                            editingUserId === user.id ? (
                              <button
                                type='button'
                                className='p-2 rounded btn btn-primary'
                                onClick={handleUpdateDetails}
                              >
                                Update Details
                              </button>
                            ) : (
                              <button
                                type='button'
                                className='p-2 rounded btn btn-secondary'
                                onClick={() => handleEditClick(user.id, user)}
                              >
                                Edit Details
                              </button>
                            )
                          ) : (
                            <span className='text-muted'>Not editable</span>
                          )}
                        </td>
                      </tr>
                    </>
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

export default connect(mapStoreToProps)(UserHMOTransaction);
