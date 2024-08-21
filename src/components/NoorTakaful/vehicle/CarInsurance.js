import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home, formatAmount } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

let token = '';

const CarInsurance = (props) => {
  const [loading, setLoading] = useState(false);

  const [InsurancePolicyData, setInsurancePolicyData] = useState([]);
  const [selectedInsurancePolicy, setSelectedInsurancePolicy] = useState([]);
  const [selectedInsurancePolicyData, setSelectedInsurancePolicyData] =
    useState(null);

  const [VehiclePurposeData, setVehiclePurposeData] = useState([]);
  const [selectedVehiclePurpose, setSelectedVehiclePurpose] = useState([]);
  const [selectedVehiclePurposeData, setSelectedVehiclePurposeData] =
    useState(null);

  const [VehicleMakeData, setVehicleMakeData] = useState([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState([]);
  const [selectedVehicleMakeData, setSelectedVehicleMakeData] = useState(null);

  const [VehicleModelData, setVehicleModelData] = useState([]);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState([]);
  const [selectedVehicleModelData, setSelectedVehicleModelData] =
    useState(null);

  const [VehicleColorData, setVehicleColorData] = useState([]);
  const [selectedVehicleColor, setSelectedVehicleColor] = useState([]);
  const [selectedVehicleColorData, setSelectedVehicleColorData] =
    useState(null);

  const [insuranceTypeData, setInsuranceTypeData] = useState([]);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState([]);
  const [selectedInsuranceTypeData, setSelectedInsuranceTypeData] =
    useState(null);

  const [VehicleCategoryData, setVehicleCategoryData] = useState([]);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState([]);
  const [selectedVehicleCategoryData, setSelectedVehicleCategoryData] =
    useState(null);

  const [StateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedStateData, setSelectedStateData] = useState(null);

  const [chassis_number, setChassisNumber] = useState('');
  const [engine_number, setEngineNumber] = useState('');
  const [engine_capacity, setEngineCapacity] = useState('');
  const [year, setYear] = useState('');
  const [plate_number, setPlateNumber] = useState('');
  const [address, setAddress] = useState('');

  const [sum_cover, setValue] = useState('');
  const [quoteData, setQuoteData] = useState(null);

  const [UserData, setUserData] = useState([]);

  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  //initialize useHistory for navigation after successful buy
  const history = useHistory();

  //handle estimate value of car is comprehensive/thirdpary
  // const estimateValue = selectedInsuranceType.description === 'C' ? value : 0;

  // const handleSumCover = () => {
  //   if(  selectedInsuranceType.description === 'C' ){
  //     return sum_cover
  //   }
  // }

  const actualRate =
    selectedInsuranceType.description === 'C'
      ? quoteData?.premium
      : selectedInsuranceType.description === 'T'
      ? quoteData?.insurance?.fixed_rate
      : undefined;

  const sumCover =
    selectedInsuranceType.description === 'C'
      ? sum_cover
      : selectedInsuranceType.description === 'T'
      ? undefined
      : undefined;

  console.log('this is the estimate value', sumCover);
  // const startDate =
  //   selectedInsuranceType.description === 'C' ? quoteData?.start_date : '';
  // const endDate =
  //   selectedInsuranceType.description === 'C' ? quoteData?.end_date : '';

  //Load data of users
  const LoadUserData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));

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
        label: `${user.first_name} ${user.last_name} - ${user.email} -  ${user._id}`,
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

      Axios.get(`${Home}states`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          setStateData(res.data.payload);
          setLoading(false);
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
        value: state.id,
        id: state.id,
        name: state.name,
        noor_identifier: state.noor_identifier,
      }))
    : [];

  const LoadRenewalNew = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=INSURANCE_POLICY&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

          setInsurancePolicyData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  // Update selected Policy Status data when the select changes
  useEffect(() => {
    if (selectedInsurancePolicy && InsurancePolicyData) {
      const policy = InsurancePolicyData.find(
        (policy) => policy.id === selectedInsurancePolicy
      );

      setSelectedInsurancePolicyData(policy);
    } else {
      setSelectedInsurancePolicyData(null);
    }
  }, [selectedInsurancePolicy, InsurancePolicyData]);

  //set the options
  //check if userdata exists before rendering
  const PolicyOptions = InsurancePolicyData
    ? InsurancePolicyData.map((policy) => ({
        label: policy.name,
        value: policy.id,
        id: policy.id,
        name: policy.name,
        code: policy.code,
        description: policy.description,
      }))
    : [];

  // console.log(
  //   'this is the selected vehicle make data',
  //   selectedVehicleMakeData
  // );

  const LoadVehiclePurpose = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_PURPOSE&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

          setVehiclePurposeData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selectedVehicle Purpose when value changes
  useEffect(() => {
    if (VehiclePurposeData && selectedVehiclePurpose) {
      const purpose = VehiclePurposeData.find(
        (purpose) => purpose.id === selectedVehiclePurpose
      );
      setSelectedVehiclePurposeData(purpose);
    } else {
      setSelectedVehiclePurposeData(null);
    }
  }, [VehiclePurposeData, selectedVehiclePurpose]);

  //set options for Selected Vehicle purpose
  const VehiclePurposeOptions = VehiclePurposeData
    ? VehiclePurposeData.map((item) => ({
        label: item.name,
        value: item.id,
        id: item.id,
        type: item.type,
        name: item.name,
        code: item.code,
        description: item.description,
      }))
    : [];

  const LoadVehicleMake = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_MAKE&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

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
    if (selectedVehicleMake.id && localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(
        `${Home}noor-takaful/vehicle-models?vehicle_make_code=${selectedVehicleMake.code}`,
        {
          headers: {
            Authorization: ` Bearer ${token} `,
          },
        }
      )
        .then((res) => {
          console.log('this is the policy data', res);

          setVehicleModelData(res.data.payload);
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
        label: `${selectedVehicleMake.name}-${item.model}`,
        value: item._id,
        vehicle_model_id: item.vehicle_model_id,
        vehicle_make_id: item.vehicle_make_id,
        model: item.model,
        amount: item.amount,
        description: item.description,
      }))
    : [];

  const LoadVehicleColor = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_COLOR&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

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

  const LoadInsuranceType = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=INSURANCE_TYPE&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

          setInsuranceTypeData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selected Insurance Type when value changes
  useEffect(() => {
    if (insuranceTypeData && selectedInsuranceType) {
      const insuranceType = insuranceTypeData.find(
        (type) => type.id === selectedInsuranceType
      );
      setSelectedInsuranceTypeData(insuranceType);
    } else {
      setSelectedInsuranceTypeData(null);
    }
  }, [insuranceTypeData, selectedInsuranceType]);

  //set options for Selected Vehicle color
  const InsuranceTypeOptions = insuranceTypeData
    ? insuranceTypeData.map((item) => ({
        label: item.name,
        value: item.id,
        id: item.id,
        type: item.type,
        name: item.name,
        code: item.code,
        description: item.description,
      }))
    : [];

  const LoadVehicleCategory = () => {
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.get(`${Home}variations?type=VEHICLE_CATEGORY&vendor=NOOR_TAKAFUL`, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
        .then((res) => {
          console.log('this is the policy data', res);

          setVehicleCategoryData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  //update selected Vehicle Category when value changes
  useEffect(() => {
    if (VehicleCategoryData && setVehicleCategoryData) {
      const VehicleCategory = VehicleCategoryData.find(
        (type) => type.id === selectedVehicleCategory
      );
      setSelectedVehicleCategoryData(VehicleCategory);
    } else {
      setSelectedVehicleCategoryData(null);
    }
  }, [VehicleCategoryData, setVehicleCategoryData]);

  //set options for Selected Vehicle color
  const VehicleCategoryOptions = VehicleCategoryData
    ? VehicleCategoryData.map((item) => ({
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
      category: selectedVehiclePurpose.name,
      insurance_slug:
        selectedInsuranceType.description === 'C'
          ? ' comprehensive-auto'
          : selectedInsuranceType.description === 'T'
          ? 'third-party-auto'
          : '',

      cov_period: '1_year',
      value: selectedInsuranceType.description === 'C' ? sum_cover : 0,
      insurance_type:
        selectedInsuranceType.description === 'C'
          ? ' comprehensive-auto'
          : selectedInsuranceType.description === 'T'
          ? 'third-party-auto'
          : '',
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
    console.log(`This is the form details: ${JSON.stringify(quoteRequestData)}
    `);
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
      state_code: selectedState.noor_identifier,
      plate_number: plate_number,
      insurance_policy_code: selectedInsurancePolicy.code,
      vehicle_purpose_code: selectedVehiclePurpose.code,
      vehicle_make_code: selectedVehicleMake.code,
      vehicle_model_code: selectedVehicleModel.vehicle_model_id,
      vehicle_color_code: selectedVehicleColor.code,
      insurance_type_code: selectedInsuranceType.code,
      insured_name: `${selectedUser.first_name} ${selectedUser.last_name}`,
      engine_no: engine_number,
      chassis_no: chassis_number,
      engine_capacity: engine_capacity.trim(),
      year_of_make: year,
      vehicle_category_code: selectedVehicleCategory.code,
      insurance_type_code_description: selectedInsuranceType.description,
      sum_cover: sumCover,
      rate: actualRate,
      phone_number: selectedUser.phone_number,
      type: 'vehicle',
      address: address,
      start_date: quoteData?.duration?.start_date,
      end_date: quoteData?.duration?.end_date,
      transaction_id: randomTransactionID,
    };

    // console.log('this is the item:', items);

    // console.log('Type of selectedUserId:', typeof selectedUser);

    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      setLoading(true);
      Axios.post(`${Home}noor-takaful/buy-policy/vehicle`, items, {
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
          // history.push('/policies');
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

  useEffect(() => {
    LoadUserData();
    LoadStates();
    LoadRenewalNew();
    LoadVehiclePurpose();
    LoadVehicleMake();
    LoadVehicleColor();
    LoadInsuranceType();
    LoadVehicleCategory();
  }, []);

  useEffect(() => {
    LoadVehicleModel();
  }, [selectedVehicleMake]);

  return (
    <>
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
            className='w-50 z-index-1'
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
            className='w-50 z-index-1'
            value={selectedState}
            onChange={(selectedOption) => setSelectedState(selectedOption)}
            options={StateOptions}
            placeholder='Select State'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            Do you want to renew or buy a new policy?
          </label>

          <Select
            isSearchable
            id='policy-select'
            className='w-50 z-index-1'
            value={selectedInsurancePolicy}
            onChange={(selectedOption) =>
              setSelectedInsurancePolicy(selectedOption)
            }
            options={PolicyOptions}
            placeholder='Select Policy State'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What Type of Insurance do you want?
          </label>

          <Select
            isSearchable
            id='insurance-type-select'
            className='w-50 z-index-1'
            value={selectedInsuranceType}
            onChange={(selectedOption) =>
              setSelectedInsuranceType(selectedOption)
            }
            options={InsuranceTypeOptions}
            placeholder='Select Insurance Type'
          />
        </div>

        {selectedInsuranceType.description === 'C' && (
          <div className='form-group flex-column flex mb-2'>
            <label className='form-label' for='car-value'>
              What is the Value of the Car?
            </label>
            <input
              className='form-control'
              id='car-value'
              type='text'
              value={sum_cover}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Car Value'
              required
            />
            <small>
              Car value is required when Insurance type is Comprehensive
            </small>
          </div>
        )}

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            Policy Type?
          </label>

          <Select
            isSearchable
            id='vehicle-purpose-select'
            className='w-50 z-index-1'
            value={selectedVehiclePurpose}
            onChange={(selectedOption) =>
              setSelectedVehiclePurpose(selectedOption)
            }
            options={VehiclePurposeOptions}
            placeholder='Select Policy Type'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What is the Vehicle Make?
          </label>

          <Select
            isSearchable
            id='vehicle-make-select'
            className='w-50 z-index-1'
            value={selectedVehicleMake}
            onChange={(selectedOption) =>
              setSelectedVehicleMake(selectedOption)
            }
            options={VehicleMakeOptions}
            placeholder='Select Vehicle Make'
          />
        </div>
        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What is the Vehicle Model?
          </label>

          <Select
            isSearchable
            id='vehicle-model-select'
            className='w-50 z-index-1'
            value={selectedVehicleModel}
            onChange={(selectedOption) =>
              setSelectedVehicleModel(selectedOption)
            }
            options={VehicleModelOptions}
            placeholder='Select Vehicle Model'
          />
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
            className='w-50 z-index-1'
            value={selectedVehicleColor}
            onChange={(selectedOption) =>
              setSelectedVehicleColor(selectedOption)
            }
            options={VehicleColorOptions}
            placeholder='Select Vehicle Color'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='policy-type'>
            What is the vehicle category?
          </label>

          <Select
            isSearchable
            id='vehicle-category-select'
            className='w-50 z-index-1'
            value={selectedVehicleCategory}
            onChange={(selectedOption) =>
              setSelectedVehicleCategory(selectedOption)
            }
            options={VehicleCategoryOptions}
            placeholder='Select Vehicle Category'
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
          <label className='form-label' for='chassis-number'>
            Engine Number
          </label>
          <input
            className='form-control'
            type='text'
            id='engine-number'
            value={engine_number}
            onChange={(e) => setEngineNumber(e.target.value)}
            placeholder='Engine Number'
          />
        </div>

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='chassis-number'>
            Engine Capacity
          </label>
          <input
            className='form-control'
            type='text'
            id='engine-number'
            value={engine_capacity}
            onChange={(e) => setEngineCapacity(e.target.value)}
            placeholder='Engine Capacity'
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

        <div className='form-group flex-column flex mb-2'>
          <label className='form-label' for='car-value'>
            Address
          </label>
          <input
            className='form-control'
            id='address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Add Address'
          />
        </div>

        <button
          className='btn st-btn2 btn-primary shadow'
          type='button'
          onClick={getQuote}
        >
          Get Quote
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
                    {formatAmount(actualRate)}
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
