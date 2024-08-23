import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

let token = '';

const CarInsurance = (props) => {
  const handleGoBack = () => {
    history.goBack();
  };

  const [loading, setLoading] = useState(false);
  const [lgaLoading, setLgaLoading] = useState(false);

  const [VehicleMakeData, setVehicleMakeData] = useState([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState([]);
  const [selectedVehicleMakeData, setSelectedVehicleMakeData] = useState(null);

  const [EngineCapacityData, setEngineCapacityData] = useState([]);
  const [selectedEngineCapacity, setSelectedEngineCapacity] = useState([]);
  const [selectedEngineCapacityData, setSelectedEngineCapacityData] =
    useState(null);

  const [VehicleModelData, setVehicleModelData] = useState([]);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState([]);
  const [selectedVehicleModelData, setSelectedVehicleModelData] =
    useState(null);

  const [VehicleColorData, setVehicleColorData] = useState([]);
  const [selectedVehicleColor, setSelectedVehicleColor] = useState([]);
  const [selectedVehicleColorData, setSelectedVehicleColorData] =
    useState(null);

  const [StateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedStateData, setSelectedStateData] = useState(null);

  const [LgaData, setLgaData] = useState([]);
  const [selectedLga, setSelectedLga] = useState([]);
  const [selectedLgaData, setSelectedLgaData] = useState(null);

  const [chassis_number, setChassisNumber] = useState('');

  const [year, setYear] = useState('');
  const [plate_number, setPlateNumber] = useState('');

  const [policy_type, setPolicyType] = useState('');

  const [quoteData, setQuoteData] = useState(null);

  const [UserData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);

  //initialize useHistory for navigation after successful buy
  const history = useHistory();

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
        })
        .catch((err) => console.log(err));
    }
  };

  // Update selected user data when the selected user changes
  useEffect(() => {
    if (selectedUser && UserData) {
      const user = UserData.find((user) => user.id === selectedUser);
      setSelectedUserData(user);
    } else {
      setSelectedUserData(null);
    }
  }, [selectedUser, UserData]);

  //set the options
  //check if userdata exists before rendering
  const userOptions = UserData
    ? UserData.map((user) => ({
        label: `${user.first_name} ${user.last_name} - ${user.email} -  ${user.id}`,
        value: user._id,
        user_id: user._id,
        user_email: user.email,
        phone_number: user.phone_number,
        first_name: user.first_name,
        last_name: user.last_name,
      }))
    : [];

  //Load data of States
  const LoadStates = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

      Axios.get(`${Home}states?vendor=IEI`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // console.log(res);
          setStateData(res.data.payload);
        })
        .catch((err) => console.log(err));
    }
  };

  // Update selected State data when the select changes
  useEffect(() => {
    if (selectedState && StateData) {
      const states = StateData.find((state) => state.id === selectedState);
      setSelectedStateData(states);
    } else {
      setSelectedStateData(null);
    }
  }, [selectedState, StateData]);

  //set the options
  //check if userdata exists before rendering
  const StateOptions = StateData
    ? StateData.map((state) => ({
        label: state.name,
        code: state.code,
        value: state.id,
        vendor: state.vendor,
        id: state.id,
        name: state.name,
      }))
    : [];

  //Load data of LGAs
  const LoadLGA = () => {
    setLgaLoading(true);
    if (selectedState.id && localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      // setLoading(true);
      Axios.get(`${Home}lgas/${selectedState.id}/states?vendor=IEI`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setLgaData(res.data.payload);
          setLgaLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  // Update selected Lga data when the select changes
  useEffect(() => {
    if (selectedLga && LgaData) {
      const lgas = LgaData.find((lga) => lga.id === selectedLga);
      setSelectedLgaData(lgas);
    } else {
      setSelectedLgaData(null);
    }
  }, [selectedLga, LgaData]);

  //set the options
  //check if userdata exists before rendering
  const LgaOptions = LgaData
    ? LgaData.map((lga) => ({
        label: lga.name,
        value: lga.id,
        id: lga.id,
        code: lga.code,
        vendor: lga.vendor,
        state_id: lga.state_id,
        name: lga.name,
      }))
    : [];

  const LoadEngineCapacity = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=ENGINE_CAPACITY&vendor=IEI`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          // console.log('this is the policy data', res);

          setEngineCapacityData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  // Update selected Policy Status data when the select changes
  useEffect(() => {
    if (selectedEngineCapacity && EngineCapacityData) {
      const capacity = EngineCapacityData.find(
        (capacity) => capacity.id === selectedEngineCapacity
      );

      setSelectedEngineCapacityData(capacity);
    } else {
      setSelectedEngineCapacityData(null);
    }
  }, [selectedEngineCapacity, EngineCapacityData]);

  //set the options
  //check if userdata exists before rendering
  const EngineCapacityOptions = EngineCapacityData
    ? EngineCapacityData.map((capacity) => ({
        label: capacity.name,
        value: capacity.id,
        id: capacity.id,
        name: capacity.name,
        code: capacity.code,
        description: capacity.description,
      }))
    : [];

  const LoadVehicleMake = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_MAKE&vendor=IEI`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          // console.log('this is the policy data', res);

          setVehicleMakeData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selectedVehicle Make when value changes
  useEffect(() => {
    if (VehicleMakeData && selectedVehicleMake) {
      const vehicleMake = VehicleMakeData.find(
        (make) => make.id === selectedVehicleMake
      );
      setSelectedVehicleMakeData(vehicleMake);
    } else {
      setSelectedVehicleMakeData(null);
    }
  }, [VehicleMakeData, selectedVehicleMake]);

  //set options for Selected Vehicle make
  const VehicleMakeOptions = VehicleMakeData
    ? VehicleMakeData.map((item) => ({
        label: item.name,
        value: item.id,
        id: item.id,
        type: item.type,
        name: item.name,
        code: item.code,
        description: item.description,
      }))
    : [];

  const LoadVehicleModel = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_MODEL&vendor=IEI`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          // console.log('this is the policy data', res);

          setVehicleModelData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selectedVehicle Model when value changes
  useEffect(() => {
    if (VehicleModelData && selectedVehicleModel) {
      const vehicleModel = VehicleModelData.find(
        (model) => model.id === selectedVehicleModel
      );
      setSelectedVehicleModelData(vehicleModel);
    } else {
      setSelectedVehicleModelData(null);
    }
  }, [VehicleModelData, selectedVehicleModel]);

  //set options for Selected Vehicle model
  const VehicleModelOptions = VehicleModelData
    ? VehicleModelData.map((item) => ({
        label: item.name,
        value: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
      }))
    : [];

  const LoadVehicleColor = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_COLOR&vendor=IEI`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          // console.log('this is the policy data', res);

          setVehicleColorData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selectedVehicle color when value changes
  useEffect(() => {
    if (VehicleColorData && selectedVehicleColor) {
      const vehicleColor = VehicleColorData.find(
        (color) => color.id === selectedVehicleColor
      );
      setSelectedVehicleColorData(vehicleColor);
    } else {
      setSelectedVehicleColorData(null);
    }
  }, [VehicleColorData, selectedVehicleColor]);

  //set options for Selected Vehicle color
  const VehicleColorOptions = VehicleColorData
    ? VehicleColorData.map((item) => ({
        label: item.name,
        value: item.id,
        id: item.id,
        type: item.type,
        name: item.name,
        code: item.code,
        description: item.description,
      }))
    : [];

  //Get Quote before payment
  const getQuote = () => {
    const quoteRequestData = {
      category: policy_type,
      insurance_slug: 'third-party-auto',

      cov_period: '1_year',
      value: 0,
      insurance_type: 'third-party-auto',
    };
    if (quoteRequestData.value === '') {
      toast.error('Value of Car is required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }

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
          const receivedQuoteData = res.data?.payload;
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
        .catch((error) => {
          console.error(error);
          const { data } = error?.response;
          toast.error(data?.message, {
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

    const generateRandomString = (length) => {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const randomTransactionID = generateRandomString(12);

    //the items array with data of the selected user
    const items = {
      email: selectedUser.user_email,
      state_code: selectedState.code,
      lga_code: selectedLga.code,
      plate_number: plate_number,

      policy_type: policy_type,
      vehicle_make_code: selectedVehicleMake.code,
      vehicle_model_code: selectedVehicleModel.code,
      vehicle_color_code: selectedVehicleColor.code,

      insured_name: `${selectedUser.first_name} ${selectedUser.last_name}`,

      chassis_number: chassis_number,

      year: year,
      engine_capacity_code: selectedEngineCapacity.code,

      amount: quoteData?.premium,
      phone_number: selectedUser.phone_number,

      transaction_id: randomTransactionID,
    };

    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.post(`${Home}sub-agent/policies/buy-vehicle-insurance-iei`, items, {
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
          history.push('/policies');
        })
        .catch((err) => {
          console.error(err);
          const { data } = err?.response;
          toast.error(data?.message, {
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

  useEffect(() => {
    LoadUserData();
    LoadStates();
    LoadEngineCapacity();
    LoadVehicleMake();
    LoadVehicleColor();
  }, []);

  useEffect(() => {
    LoadVehicleModel();
    LoadLGA();
  }, [selectedVehicleMake, selectedState]);

  return (
    <>
      <div class='pb-4'>
        <button onClick={handleGoBack} className='btn btn-primary '>
          {' '}
          <ArrowLeft /> Back
        </button>
      </div>
      <form
        onSubmit={handleBuyCarPolicy}
        className='card container w-100 p-5 m-auto flex  flex-column'
      >
        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' htmlFor='user-select'>
            Select User
          </label>
          <Select
            isSearchable
            id='user-select'
            className='w-100 z-index-1'
            value={selectedUser}
            onChange={(selectedOption) => setSelectedUser(selectedOption)}
            options={userOptions}
            placeholder='Select User'
          />
        </div>

        <div className='form-group flex-column flex '>
          <label className='form-label' htmlFor='state-select'>
            Select State
          </label>
          <Select
            isSearchable
            id='state-select'
            className='w-100 z-index-1'
            value={selectedState}
            onChange={(selectedOption) => setSelectedState(selectedOption)}
            options={StateOptions}
            placeholder='Select State'
          />
        </div>

        <div className='form-group flex-column flex'>
          <label className='form-label' htmlFor='lga-select'>
            Select LGA
          </label>
          <Select
            isSearchable
            id='lga-select'
            className='w-100 z-index-1'
            value={selectedLga}
            isLoading={lgaLoading}
            onChange={(selectedOption) => setSelectedLga(selectedOption)}
            options={LgaOptions}
            placeholder='Select Lga'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What is the Vehicle Make?
          </label>

          <Select
            isSearchable
            id='vehicle-make-select'
            className='w-100 z-index-1'
            value={selectedVehicleMake}
            onChange={(selectedOption) =>
              setSelectedVehicleMake(selectedOption)
            }
            options={VehicleMakeOptions}
            placeholder='Select Vehicle Make'
          />
        </div>
        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='vehicle-model'>
            What is the Vehicle Model?
          </label>

          <Select
            isSearchable
            id='vehicle-model-select'
            className='w-100 z-index-1'
            value={selectedVehicleModel}
            onChange={(selectedOption) =>
              setSelectedVehicleModel(selectedOption)
            }
            options={VehicleModelOptions}
            placeholder={'Select Vehicle Model'}
          />
          <small>Select the right Vehicle Model for Vehicle Make</small>
        </div>

        <div className='form-group flex-column flex mb-5'>
          <label className='form-label' for='policy-type'>
            Policy Type?
          </label>

          <select
            id='category'
            style={{ width: '88%' }}
            className='form-control z-index-0'
            value={policy_type}
            onChange={(e) => setPolicyType(e.target.value)}
          >
            <option value='' disabled>
              Select Option
            </option>
            <option value='Private'>Private</option>
            <option value='Commercial'>Commercial</option>
            <option value='Tricycles'>Tricycles</option>
          </select>
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='plate-number'>
            Provide your plate number?
          </label>
          <input
            className='form-control'
            id='plate-number'
            type='text'
            value={plate_number}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder='Plate Number'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What is the Vehicle Color?
          </label>

          <Select
            isSearchable
            id='vehicle-color-select'
            className='w-100 z-index-1'
            value={selectedVehicleColor}
            onChange={(selectedOption) =>
              setSelectedVehicleColor(selectedOption)
            }
            options={VehicleColorOptions}
            placeholder='Select Vehicle Color'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='chassis-number'>
            Chassis Number
          </label>
          <input
            className='form-control'
            type='text'
            id='chassis-number'
            value={chassis_number}
            onChange={(e) => setChassisNumber(e.target.value)}
            placeholder='Chassis Number'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='engine- capacity'>
            Engine Capacity
          </label>
          <Select
            isSearchable
            id='vehicle-color-select'
            className='w-100 z-index-1'
            value={selectedEngineCapacity}
            onChange={(selectedOption) =>
              setSelectedEngineCapacity(selectedOption)
            }
            options={EngineCapacityOptions}
            placeholder='Select Engine Capacity'
          />
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

        <button
          className='btn st-btn2 btn-primary shadow'
          type='button'
          onClick={getQuote}
        >
          {loading ? 'Loading...' : 'Get Quote'}
        </button>

        {quoteData && (
          <div>
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
                    <div>
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
                    </div>
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
            <button className='btn st-btn2 btn-primary shadow' type=''>
              Pay Now
            </button>
            {loading && <Spinner />}
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
