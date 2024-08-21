import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FadeIn } from 'animate-components';
import Axios from 'axios';
import { Home, formatAmount } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-feather';
import Select from 'react-select';

const BuyWellaBasicPlan = () => {
  const [loading, setLoading] = useState(false);

  const [UserData, setUserData] = useState([]);
  const [hmoOptions, setHmoOptions] = useState([]);
  const [hmoDetail, setHmoDetail] = useState(null);
  const [state, setState] = useState('');

  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);

  //Load data of users
  const LoadUserData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.get(`${Home}enter-ps/user/listUsers/Employees/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setUserData(res.data.payload);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  //Load all Hmos
  const LoadHMOS = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.get(`${Home}get-hmos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setHmoOptions(res.data.payload);
          // this.setState({ loading: false, hmoOptions: res.data.payload });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    LoadUserData();
    LoadHMOS();
  }, []);

  const Calulate = (amount) => {
    return parseInt(amount) + (47 / 100) * parseInt(amount);
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };
  // Update selected user data when the selected user changes
  useEffect(() => {
    if (selectedUser && UserData) {
      const user = UserData.find((user) => user._id === selectedUser.value);
      setSelectedUserData(user);
    } else {
      setSelectedUserData(null);
    }
  }, [selectedUser, UserData]);

  //set the options
  //check if userdata exists before rendering
  const userOptions = UserData
    ? UserData.map((user) => ({
        label: `${user.first_name} ${user.last_name} - ${user.email} -  ${user.phone_number}`,
        value: user._id,
        user_id: user._id,

        phone_number: user.phone_number,
      }))
    : [];

  //buy hmo for user
  const BuyHmoPlan = (e) => {
    e.preventDefault();
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

      //const Detail = JSON.stringify(hmoOptions[hmoDetail]);

      if (selectedUser.length >= 1) {
        const phones = selectedUser.map((user) => String(user.phone_number));
        console.log(typeof JSON.stringify(phones));
        Axios.post(
          `${Home}wellahealth/buy-plans`,
          {
            phones: phones,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => {
            console.log(res);
            setLoading(false);
            toast.success('Buy Wella Plan Hmo was successful', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
            });
            // window.location.href = '/policies';
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  };

  return (
    <FadeIn duration='1s' timingFunction='ease-out'>
      <div className='card border-0'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-5'>
              <h6 className='lh-5 mg-b-0'>Add Policy</h6>
            </div>
            <div className='col-md-7'>
              <div className='pull-right'>
                <FadeIn duration='1s' timingFunction='ease-out'>
                  <button
                    onClick={() => this.SwitchContent('dep_home', [0])}
                    className='btn btn-danger shadow'
                  >
                    <ArrowLeft color='white' size={35} /> Return
                  </button>
                </FadeIn>
              </div>
            </div>
          </div>

          <form onSubmit={BuyHmoPlan} className='mt-4 row'>
            <div className='col-md-12 mt-4'>
              <div className='form-group mt-4'>
                <label>Policy type</label>
                <select
                  required
                  value={state}
                  onChange={handleChange}
                  className='form-control'
                  style={{ width: '1050px' }}
                  name='state'
                >
                  <option value=''>Select one</option>
                  <option value='1'>HMO</option>
                </select>
              </div>
            </div>

            {/* pulling users after Policy type selection */}
            <div className='col-md-12 mt-5'>
              <div className='form-group'>
                <label>Insured</label>
                <Select
                  isSearchable
                  id='user-select'
                  className='w-50 z-index-1'
                  value={selectedUser}
                  onChange={(selectedOption) => setSelectedUser(selectedOption)}
                  options={userOptions}
                  placeholder='Select User'
                />
              </div>
            </div>
            {/* pulling users after Policy type selection End*/}

            {/* Show if Policy type selected is HMO */}
            {state === '1' && (
              <div className='col-md-12 mt-1'>
                <div className='form-group'>
                  <label>HMO Plan</label>
                  <select
                    required
                    value={hmoDetail}
                    onChange={(event) => setHmoDetail(event.target.value)}
                    className='form-control'
                    style={{ width: '1050px' }}
                    name='hmoDetail'
                  >
                    <option value=''>Select one</option>
                    {hmoOptions.length > 0 &&
                      hmoOptions.map((list, index) => (
                        <option key={index} value={index}>
                          {list.productType} {list.planName} (
                          {Calulate(list.price)})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}
            {/* Show if Policy type selected is HMO End*/}

            {/* Displays HMO details after selection */}
            <div className='col-md-12' style={{ marginTop: '3rem' }}>
              {hmoDetail !== null && (
                <div>
                  <table className='table table-sm table-primary table-bordered table-striped'>
                    <tr>
                      <th style={{ width: '30%' }}>Plan Name</th>
                      <td>{hmoOptions[hmoDetail].planName}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Price</th>
                      <td>{formatAmount(hmoOptions[hmoDetail].price)}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Plan Type</th>
                      <td>{hmoOptions[hmoDetail].planType}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Product Type</th>
                      <td>{hmoOptions[hmoDetail].productType}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Number of Months</th>
                      <td>{hmoOptions[hmoDetail].numberOfMonths}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Number of Persons</th>
                      <td>{hmoOptions[hmoDetail].numberOfPersons}</td>
                    </tr>
                    <tr>
                      <th style={{ width: '30%' }}>Benefits</th>
                      <td>
                        {this.ParseBenefit(
                          hmoOptions[hmoDetail].planBenefits
                        ).map((list, index) => (
                          <span
                            className='badge badge-primary badge-pill m-1'
                            value={index}
                          >
                            {list}
                          </span>
                        ))}
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
            {/* Displays HMO details after selection */}

            <div className='col-md-12'>
              <div className='form-group mt-3'>
                {loading ? (
                  <Spinner size={40} />
                ) : (
                  // <FlutterWaveButton
                  //   className="btn st-btn2 btn-primary shadow"
                  //   {...fwConfig}
                  // />
                  <>
                    <button className='btn st-btn2 btn-primary shadow'>
                      Purchase Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </FadeIn>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(BuyWellaBasicPlan);
