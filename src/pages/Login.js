import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { login_layout } from '../store/actions/LoginLayout';

import Spinner from '../global/Spinner';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Home } from '../global/Home';
import Toaster from '../global/Toaster';
import img from '../assets/svg/haba_color.svg';

import { Link } from 'react-router-dom';
import ForgottenPass from '../global/ForgottenPass';
import { passwordStrength } from 'check-password-strength';
import { useHistory } from 'react-router-dom';

const defaultOptions = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 0,
    minLength: 1,
  },
  {
    id: 2,
    value: 'Medium',
    minDiversity: 1,
    minLength: 3,
  },
  {
    id: 3,
    value: 'Strong',
    minDiversity: 3,
    minLength: 4,
  },
];

const Login = () => {
  const dispatch = useDispatch();

  const [switchName, setSwitchName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [type, setType] = useState(true);

  const [css, setCss] = useState('');

  const history = useHistory();

  const ErrorHandler = (message) => {
    console.log(message);
    setLoading(false);
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  const handleChange = (event) => {
    if (event.target.type !== 'files') {
      if (event.target.name === 'password') {
        setStrength(passwordStrength(event.target.value, defaultOptions).value);

        if (
          passwordStrength(event.target.value, defaultOptions).value ===
          'Too weak'
        ) {
          setCss('text-danger');
        } else if (
          passwordStrength(event.target.value, defaultOptions).value === 'Weak'
        ) {
          setCss('text-danger');
        } else if (
          passwordStrength(event.target.value, defaultOptions).value ===
          'Medium'
        ) {
          setCss('text-warning');
        } else if (
          passwordStrength(event.target.value, defaultOptions).value ===
          'Strong'
        ) {
          setCss('text-success');
        }
      }

      switch (event.target.name) {
        case 'email':
          setEmail(event.target.value);
          break;
        case 'password':
          setPassword(event.target.value);
          break;
        case 'first_name':
          setFirstName(event.target.value);
          break;
        case 'last_name':
          setLastName(event.target.value);
          break;
        case 'phone_number':
          setPhoneNumber(event.target.value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios.post(`${Home}agent/auth/${type ? 'login' : 'register'}`, {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        const { data } = res;
        if (res.data.success) {
          localStorage.setItem('userToken', JSON.stringify(data.payload.token));

          history.push('/dashboard');
        } else {
          ErrorHandler(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          const { data } = err.response;
          ErrorHandler(data.message);
        } else {
          ErrorHandler(err.message);
        }
      });
  };

  useEffect(() => {
    dispatch(login_layout('STEPHEN_WHOCODED'));

    return () => {
      dispatch(login_layout(''));
    };
  }, []);

  const Switch = (name) => {
    setSwitchName(name);
  };

  return (
    <>
      {switchName === 'WHOCODED' ? (
        <ForgottenPass close={() => Switch('')} />
      ) : (
        ''
      )}

      <div className=''>
        <Toaster />

        <div className=''>
          <div className='content-l d-flex vh-100 justify-content-center overflow-auto align-items-center bgg'>
            <form onSubmit={handleSubmit} className='login-form  mt-5'>
              <div className='card mb-0'>
                {type ? (
                  <div className='card-body'>
                    <div className='text-center mb-3'>
                      <div className='d-inline-flex align-items-center justify-content-center mb-4 mt-2'>
                        <img className='img-fluid h-48px' src={img} />
                      </div>
                      <h5 className='text-primary2 mg-b-5 text-center'>
                        Login to your account
                      </h5>
                      <p className='text-primary22 mg-b-40 text-muted'>
                        Enter your credentials below
                      </p>
                    </div>

                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Email address
                      </label>
                      <input
                        onChange={handleChange}
                        name='email'
                        value={email}
                        type='email'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder=''
                      />
                    </div>
                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Password
                      </label>
                      <input
                        name='password'
                        value={password}
                        onChange={handleChange}
                        type='password'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder=''
                      />
                      <small style={{ fontSize: '14px' }} className={`${css}`}>
                        {strength}
                      </small>
                    </div>
                    <div
                      className='text-primary22 tx-13 mg-t0 mb-3 tx-center text-right'
                      style={{ fontWeight: '900' }}
                    >
                      <Link
                        onClick={() => Switch('WHOCODED')}
                        className='text-primary3'
                        to='#'
                      >
                        Forgotten password?
                      </Link>
                    </div>
                    <div className='form-group'>
                      {loading ? (
                        <Spinner size={25} />
                      ) : password.length > 0 && email.length > 0 ? (
                        <button
                          type='submit'
                          className='btn btn-primary st-btn shadow btn-block btn-sm'
                        >
                          Login
                        </button>
                      ) : (
                        <button
                          type='button'
                          disabled={false}
                          className='btn btn-primary st-btn btn-sm shadow btn-block'
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='card-body'>
                    <div className='text-center mb-3'>
                      <div className='d-inline-flex align-items-center justify-content-center mb-4 mt-2'>
                        <img className='img-fluid h-48px' src={img} />
                      </div>
                      <h5 className='text-primary2 mg-b-5 text-center'>
                        Create an account
                      </h5>
                      <p className='text-primary22 mg-b-40 text-muted'>
                        Enter your details below to register
                      </p>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label className='text-primary22 st-label'>
                            First name
                          </label>
                          <input
                            onChange={handleChange}
                            name='first_name'
                            value={firstName}
                            type='text'
                            required
                            className='form-control st-login-f'
                            id='inlineFormInputGroup'
                            placeholder=''
                          />
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label className='text-primary22 st-label'>
                            Last name
                          </label>
                          <input
                            onChange={handleChange}
                            name='last_name'
                            value={lastName}
                            type='text'
                            required
                            className='form-control st-login-f'
                            id='inlineFormInputGroup'
                            placeholder=''
                          />
                        </div>
                      </div>
                    </div>

                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Phone Number
                      </label>
                      <input
                        onChange={handleChange}
                        name='phone_number'
                        value={phoneNumber}
                        type='number'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder='+2347060622780'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Email address
                      </label>
                      <input
                        onChange={handleChange}
                        name='email'
                        value={email}
                        type='email'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder=''
                      />
                    </div>
                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Password
                      </label>
                      <input
                        name='password'
                        value={password}
                        onChange={handleChange}
                        type='password'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder=''
                      />
                      <small style={{ fontSize: '14px' }} className={`${css}`}>
                        {strength}
                      </small>
                    </div>

                    <div className='form-group'>
                      <label className='text-primary22 st-label'>
                        Confirm Password
                      </label>
                      <input
                        name='password2'
                        value={password}
                        onChange={handleChange}
                        type='password'
                        required
                        className='form-control st-login-f'
                        id='inlineFormInputGroup'
                        placeholder=''
                      />
                    </div>

                    <div className='form-group'>
                      {loading ? (
                        <Spinner size={25} />
                      ) : password.length > 0 && email.length > 0 ? (
                        <button
                          type='submit'
                          className='btn btn-primary st-btn shadow btn-block btn-sm'
                        >
                          Create account
                        </button>
                      ) : (
                        <button
                          type='button'
                          disabled={false}
                          className='btn btn-primary st-btn btn-sm shadow btn-block'
                        >
                          Create account
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {type ? (
                <div
                  className=' tx-13 mg-t-20 tx-center'
                  style={{ fontWeight: '900', color: '#d1cccc' }}
                >
                  Don't have an account?{' '}
                  <Link
                    className='text-light'
                    onClick={() => setType(!type)}
                    to='#'
                  >
                    Create an account
                  </Link>
                </div>
              ) : (
                <div
                  className=' tx-13 mg-t-20 tx-center'
                  style={{ fontWeight: '900', color: '#d1cccc' }}
                >
                  Already have an account?{' '}
                  <Link
                    className='text-light'
                    onClick={() => setType(!type)}
                    to='#'
                  >
                    Login to your account
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(Login);
