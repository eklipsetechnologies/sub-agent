import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../../global/Home';

import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-feather';
import Select from 'react-select';
import {
  Link,
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom';

import moment from 'moment';
import Loader from '../../Loader';
import '../../../App.css';

const CarInsurance = (props) => {
  const [loading, setLoading] = useState(false);
  const [insurance_type, setInsuranceType] = useState('');
  const [category, setPolicyCategory] = useState('');
  const [plate_number, setPlateNumber] = useState('');
  const [brand, setVehicleMAke] = useState('');
  const [model, setVehicleModel] = useState('');
  const [color, setVehicleColor] = useState('');
  const [cover_period, setCoverPeriod] = useState('');
  const [chassis_number, setChassisNumber] = useState('');

  const [future_cover_date, setFutureCoverDate] = useState('');

  const [year, setYear] = useState('');
  // const [value, setValue] = useState('');
  const [quoteData, setQuoteData] = useState(null);

  const [UserData, setUserData] = useState([]);

  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  //initialize useHistory for navigation after successful buy
  const history = useHistory();

  const resetForm = () => {
    setInsuranceType('');
    setPolicyCategory('');
    setPlateNumber('');
    setVehicleMAke('');
    setVehicleModel('');
    setVehicleColor('');
    setChassisNumber('');
    setYear('');
    // setValue('');

    setFutureCoverDate('');
    setErrorMessage('');
    setFutureCoverDate('');
  };

  //handle the correct date format
  const formattedDate = future_cover_date
    ? moment(future_cover_date).format('DD-MMM-YYYY')
    : '';

  const handleFutureCoverDate = (event) => {
    const inputDate = event.target.value;
    setFutureCoverDate(inputDate || '');
  };
  console.log('this is the Future date:', formattedDate);

  const minDate = moment().add(1, 'days').format('YYYY-MM-DD'); // Minimum date (current date)
  const maxDate = moment().add(2, 'months').format('YYYY-MM-DD'); // Maximum date (2 months from current date)

  //Load data of users
  const LoadUserData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

      Axios.get(`${Home}sub-agent/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // console.log(res);
          setUserData(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    LoadUserData();
  }, []);

  // Update selected user data when the selected user changes
  useEffect(() => {
    if (selectedUser && UserData) {
      const user = UserData.find((user) => user.id === selectedUser);
      setSelectedUserData(user);
    } else {
      setSelectedUserData(null);
    }
  }, [selectedUser, UserData]);

  // console.log('Type of selectedUserId:', selectedUser);
  //set the options
  //check if userdata exists before rendering
  const userOptions = UserData
    ? UserData.map((user) => ({
        label: `${user.first_name} ${user.last_name} - ${user.email} -  ${user.id}`,
        value: user.id,
        user_id: user.id,
        user_email: user.email,
        phone_number: user.phone_number,
        first_name: user.first_name,
        last_name: user.last_name,
      }))
    : [];

  //Get Quote before payment
  const getQuote = () => {
    const quoteRequestData = {
      user_id: selectedUser.user_id,
      user_email: selectedUser.user_email,
      category: category,
      insurance_slug: insurance_type,
      // certificate_no: certificate_no,
      year: year,
      cov_period: cover_period,
      value: '0',
      insurance_type: insurance_type,
    };
    // console.log(`This is the form details: ${JSON.stringify(quoteRequestData)}`);
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.post(`${Home}insurance/get-quote`, quoteRequestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const receivedQuoteData = res.data.payload;
          setQuoteData(receivedQuoteData);

          setLoading(false);

          toast.success('Car Insurance Quote Generated Successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        })
        .catch((err) => {
          console.error(err);
          const { data } = err.response;
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          setLoading(false);
        });
    }
  };

  //Handle the Buy car Policy
  const handleBuyCarPolicy = (e) => {
    e.preventDefault();

    // Check if a user is selected
    if (!selectedUser) {
      toast.error('Please select a user before purchasing car insurance', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }

    // console.log('user:', selectedUser);
    const user = {
      phone_number: selectedUser.phone_number,
      first_name: selectedUser.first_name,
      last_name: selectedUser.last_name,
    };
    //the items array with data of the selected user
    const items = {
      user_id: selectedUser.user_id,
      user_email: selectedUser.user_email,
      user,
      insurance_slug: insurance_type,
      plate_number: plate_number,
      brand: brand,
      model: model,
      color: color,
      year: year,
      future_cover_date: formattedDate,
      name: quoteData?.insurance?.name,
      chassis_number: chassis_number,
      price: quoteData?.premium,
      category: category,
      cov_period: cover_period,
      total_premium: quoteData?.premium,
      insurance_type: insurance_type,
    };

    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.post(`${Home}sub-agent/policies/buy-vehicle-insurance-ag`, items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          toast.success('Buy User Car Policy was successful', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          setLoading(false);
          // console.log(res);
          resetForm();
          history.push('/coverlists');
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.data) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage('An error occurred. Please try again.');
          }

          toast.error(err.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          setLoading(false);
        });
    }
  };

  const handleGoBack = () => {
    history.goBack(); // Go back to the previous URL
  };

  return (
    <>
      <div class='pb-2'>
        <button onClick={handleGoBack} className='btn btn-primary '>
          {' '}
          <ArrowLeft /> Back
        </button>
      </div>
      <form
        // onSubmit={handleBuyCarPolicy}
        className='card container w-100 p-3 p-md-5 m-auto flex  flex-column'
      >
        <div className='form-group flex-column flex mb-5'>
          <label className='form-label' htmlFor='user-select'>
            Select User
          </label>
          <Select
            isSearchable
            id='user-select'
            className='w-100 w-md-50  z-index-1'
            value={selectedUser}
            onChange={(selectedOption) => setSelectedUser(selectedOption)}
            options={userOptions}
            placeholder='Select User'
          />
        </div>

        <div className='form-group flex-column flex mb-5'>
          <label className='form-label' for='policy-type'>
            What type of insurance do you want?
          </label>

          <select
            id='policy-type'
            className='form-control w-75 w-md-50  z-index-0'
            value={insurance_type}
            onChange={(e) => setInsuranceType(e.target.value)}
          >
            <option value='' disabled>
              Select Option
            </option>
            {/* <option value='comprehensive-auto'>
              Comprehensive Auto insurance
            </option> */}
            <option value='third-party-auto'>Third party Auto insurance</option>
          </select>
        </div>

        <div className='form-group flex-column flex mb-5'>
          <label className='form-label' for='category'>
            What category does your car falls into?
          </label>
          <select
            required
            id='category'
            className='form-control w-75 w-md-50  z-index-0'
            value={category}
            onChange={(e) => setPolicyCategory(e.target.value)}
          >
            <option value='' disabled>
              Select Option
            </option>
            <option value='Private'>Private</option>
            <option value='Commercial'>Commercial</option>
          </select>
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='year'>
            What is the manufacture year of your car?
          </label>
          <input
            className='form-control'
            id='year'
            type='text'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder='Year'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='plate-number'>
            Provide your plate number?
          </label>
          <input
            required
            className='form-control'
            id='plate-number'
            maxLength={10}
            type='text'
            value={plate_number}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder='Plate Number'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='vehicle-make'>
            Vehicle Make
          </label>
          <input
            required
            className='form-control'
            id='vehicle-make'
            type='text'
            value={brand}
            onChange={(e) => setVehicleMAke(e.target.value)}
            placeholder='Vehicle Make'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='vehicle-model'>
            Vehicle Model
          </label>
          <input
            required
            className='form-control'
            id='vehicle-model'
            type='text'
            value={model}
            onChange={(e) => setVehicleModel(e.target.value)}
            placeholder='Vehicle Model'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='vehicle-color'>
            Vehicle Color
          </label>
          <input
            required
            className='form-control'
            id='vehicle-color'
            type='text'
            value={color}
            onChange={(e) => setVehicleColor(e.target.value)}
            placeholder='Vehicle Color'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='chassis-number'>
            Chassis Number
          </label>
          <input
            required
            className='form-control'
            type='text'
            id='chassis-number'
            value={chassis_number}
            onChange={(e) => setChassisNumber(e.target.value)}
            placeholder='Chassis Number'
          />
        </div>

        <div className='form-group flex-column flex mb-5'>
          <label className='form-label' for='cover-period'>
            Cover Period
          </label>
          <select
            required
            className='form-control w-75 w-md-50 z-index-0'
            type='text'
            id='cover-period'
            value={cover_period}
            onChange={(e) => setCoverPeriod(e.target.value)}
            placeholder='1_year'
          >
            <option value='' disabled>
              Select Option
            </option>
            <option value='1_year'>1Year</option>
          </select>
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='futureDate'>
            Future Date
          </label>
          <input
            className='form-control'
            id='futureDate'
            type='date'
            value={future_cover_date}
            onChange={handleFutureCoverDate}
            placeholder='dd-MMM-yyyy (e.g., 02-Mar-2024)'
            min={minDate}
            max={maxDate}
          />
          <small>
            <em>
              Future date must be a date in the future from now but must not
              extend beyond a period of two months.
            </em>
          </small>
        </div>

        <button
          className='btn st-btn2 btn-primary shadow'
          type='button'
          onClick={getQuote}
        >
          {loading ? <Loader /> : 'Get Quote'}
        </button>

        {quoteData && (
          <div style={{ overflow: 'auto' }}>
            <h1 className='py-4 text-center font-weight-bold'>
              Quote for the Car
            </h1>
            <table className='table table-sm table-primary table-bordered table-striped'>
              <thead className='text-dark font-weight-bold'>
                <tr>
                  <th className='font-weight-bold'>Insurance Type</th>
                  <th className='font-weight-bold'>Insurance Code</th>
                  <th className='font-weight-bold'> Item Value</th>
                  <th className='font-weight-bold'>From</th>
                  <th className='font-weight-bold'>To</th>
                  <th className='font-weight-bold'>Covers</th>
                  <th className='font-weight-bold'>Exceptions</th>
                  <th className='font-weight-bold'>Guidelines</th>
                  <th className='font-weight-bold'>Total Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=''>{quoteData?.insurance?.name}</td>
                  <td className=''> {quoteData?.insurance?.code}</td>
                  <td className=''>{formatAmount(quoteData?.itemValue)}</td>
                  <td className=''>{quoteData?.duration?.start_date}</td>
                  <td className=''>{quoteData?.duration?.end_date}</td>
                  <td>
                    <div>
                      <ul className='p-2'>
                        <li>
                          {quoteData?.insurance?.covers.map((cover, i) => (
                            <ul key={i} className='list-group'>
                              {/* <li>{cover?.insurance_plan_code}</li> */}
                              <li className='badge badge-primary font-weight-bold mb-2'>
                                {cover?.title}
                              </li>
                              <li className=''>{cover?.description}</li>
                              <li>
                                <img src={cover?.icon} alt='' />
                              </li>
                            </ul>
                          ))}
                        </li>
                      </ul>
                    </div>
                  </td>

                  <td>
                    <ul className='p-2'>
                      <li>
                        {quoteData?.insurance?.exceptions.map(
                          (exception, i) => (
                            <ul key={i} className='list-group'>
                              {/* <li>{cover?.insurance_plan_code}</li> */}
                              <li className='mb-2 badge badge-primary font-weight-bold'>
                                {exception?.title}
                              </li>
                              <ul className='list-group'>
                                {exception?.description.map((des) => (
                                  <li className='list-group-item'> {des}</li>
                                ))}
                              </ul>
                              <li>
                                <img src={exception?.icon} alt='' />
                              </li>
                            </ul>
                          )
                        )}
                      </li>
                    </ul>
                  </td>

                  <td>
                    <div>
                      <ul className='p-2'>
                        <li>
                          {quoteData?.insurance?.guidelines.map(
                            (guideline, i) => (
                              <ul key={i} className='list-group'>
                                {/* <li>{cover?.insurance_plan_code}</li> */}
                                <li className='badge badge-primary font-weight-bold'>
                                  {guideline?.title}
                                </li>
                                <ul className='list-group'>
                                  {guideline?.description.map((des, i) => (
                                    <li key={i} className='list-group-item'>
                                      {' '}
                                      {des}
                                    </li>
                                  ))}
                                </ul>
                                <li>
                                  <img src={guideline?.icon} alt='' />
                                </li>
                              </ul>
                            )
                          )}
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td className='font-weight-bold'>
                    {formatAmount(quoteData?.premium)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='d-flex flex-column item'>
              <button
                onClick={handleBuyCarPolicy}
                className='btn st-btn2 btn-primary shadow'
                type='button'
              >
                {loading ? <Loader /> : 'Purchase Poilcy'}
              </button>

              <p className={`h-5 text-danger`} style={{ fontSize: '20px' }}>
                {errorMessage}
              </p>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(CarInsurance);
