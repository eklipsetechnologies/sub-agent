import React, { Component } from 'react';
import { BounceRight, FadeIn, Zoom } from 'animate-components';
import { connect } from 'react-redux';
import { switch_content } from '../../../../store/actions/SwitchContent';
import { props_params } from '../../../../store/actions/PropsParams';
import { PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import { Home } from '../../../../global/Home';
import Axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      switch: '',
      name: '',
      loading: false,
      data: [],
      data2: [],
      details: [],
      lg: [],
      lgs: '',
      department: '',
      level: '',
      step: 1,
      first_name: '',
      middle_name: '',
      surname: '',
      email: '',
      number: '',
      gender: '',
      religion: '',
      m_status: '',
      blood_group: '',
      r_address: '',
      address: '',
      local: '',
      state: '',
      country: '',
      languages: '',
      hobbies: '',
      height: '',
      weigth: '',
      nysc: 'yes',
      nysc_certificate: '',
      nysc_year: '',
      dob: '',
      postal_address: '',
      user: '',
      dep: [],
      dep2: '',
    };
  }

  LoadDatae = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      // this.setState({loading:true});
      Axios.post(`${Home}auth/settings/listDepartment`, {
        token: token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ dep: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  onChange2 = (startDate) => {
    this.setState({ startDate });
  };
  LoadData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      Axios.post(`${Home}hr/department/datatable`, {
        token: token,
      })
        .then((res) => {
          //console.log(res);
          this.setState({ data: res.data.data });
        })
        .catch((err) => console.log(err));
    }
  };

  ErrorHandler = (eror, message) => {
    this.setState({ loading: false });
    console.log(eror?.response, eror?.data);
    let { response } = eror;
    if (response && response.data) {
      toast.error(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      toast.error(eror.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  handleChange = (event) => {
    if (event.target.type !== 'files') {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === 'state') {
        if (this.state.details[event.target.value].lgas) {
          this.setState({ lg: this.state.details[event.target.value].lgas });
        }
      }
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };

  mainHandleSubmit = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      this.setState({ loading: true });
      Axios.post(
        `${Home}agent/users`,
        {
          token: token,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone_number: this.state.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
          if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.SwitchContent('', [0]);
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
          }
        })
        .catch(
          (err) => this.ErrorHandler(err, 'Error')
          //console.log(err.response.data.message),
        );
    }
  };

  ChangeStep = (number) => {
    this.setState({ step: number });
  };

  LeftButton = () => {
    if (this.state.step === 1) {
      return (
        <li class='disabled' aria-disabled='true'>
          <Link to='#' role='menuitem'>
            Previous
          </Link>
        </li>
      );
    } else if (this.state.step === 2) {
      return (
        <li onClick={() => this.ChangeStep(1)} aria-disabled='false'>
          <Link to='#' role='menuitem'>
            Previous
          </Link>
        </li>
      );
    } else if (this.state.step === 3) {
      return (
        <li onClick={() => this.ChangeStep(2)} aria-disabled='false'>
          <Link to='#' role='menuitem'>
            Previous
          </Link>
        </li>
      );
    }
  };

  RightButton = () => {
    if (this.state.step === 0) {
      return (
        <li onClick={() => this.ChangeStep(2)} aria-disabled='false'>
          <a href='#' role='menuitem'>
            Next
          </a>
        </li>
      );
    } else {
      return (
        <li onClick={() => this.mainHandleSubmit()} aria-disabled='false'>
          <a href='#' role='menuitem'>
            Submit Now
          </a>
        </li>
      );
    }
  };

  LoadLocations = () => {
    Axios.get(`${Home}locations`).then((res) => {
      //console.log('Locations',res);
      this.setState({ details: res.data });
    });
  };

  componentDidMount() {
    this.LoadDatae();
    this.LoadData();
    this.LoadLocations();
    Axios.get(`https://restcountries.eu/rest/v2/all`)
      .then((res) => {
        console.log(res);
        const data2 = res.data;
        this.setState({ data2 });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <>
        <FadeIn duration='1s' timingFunction='ease-out'>
          <div className='card border-0'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-5'>
                  <h6 className='lh-5 mg-b-0'>
                    Add new {this.props.data.quick_params} user
                  </h6>
                </div>
                <div className='col-md-7'>
                  <div className='pull-right'>
                    <FadeIn duration='1s' timingFunction='ease-out'>
                      <button
                        onClick={() => this.SwitchContent('user_home', [0])}
                        className='btn btn-danger btn-sm shadow'
                      >
                        <ArrowLeft color='white' size={35} /> Return
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className='mt-4'>
                <div className='wizard clearfix' id='wizard2'>
                  <div className='steps clearfix'>
                    <ul className='steps'>
                      <li
                        className={`step-item ${
                          this.state.step === 1 ? 'active' : ''
                        } ${this.state.step > 1 ? 'complete' : ''}`}
                      >
                        <Link to='#' className='step-link'>
                          <span className='step-number'>1</span>
                          <span className='step-title'>
                            Personal Information
                          </span>
                        </Link>
                      </li>
                      <li
                        className={`step-item ${
                          this.state.step === 2 ? 'active' : ''
                        } ${this.state.step > 2 ? 'complete' : ''}`}
                      >
                        <Link to='#' className='step-link'>
                          <span className='step-number'>2</span>
                          <span className='step-title'>
                            Next Of Kin Information
                          </span>
                        </Link>
                      </li>
                      {/* <li className={`step-item ${this.state.step === 3?'active':''} ${this.state.step > 3 ? 'complete':''}`}>
                                <Link to="" className="step-link">
                                <span className="step-number">3</span>
                                <span className="step-title">Payment Information</span>
                                </Link>
                            </li> */}
                    </ul>
                  </div>

                  <div className='content- -clearfix card-body'>
                    {this.state.step === 1 ? (
                      <FadeIn duration='1s' timingFunction='ease-out'>
                        <h3
                          id='wizard2-h-0'
                          tabindex='-1'
                          class='title current'
                        >
                          Personal Information
                        </h3>
                        <section className='body current'>
                          <p class='mg-b-20'>
                            Try the keyboard navigation by clicking arrow left
                            or right!
                          </p>
                          <div className='row'>
                            <div className='col-md-6 mt-4'>
                              <div className='form-group'>
                                <label>First Name</label>
                                <input
                                  required
                                  value={this.state.first_name}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='first_name'
                                  placeholder='First Name'
                                />
                              </div>
                            </div>

                            <div className='col-md-6 mt-4'>
                              <div className='form-group'>
                                <label>Last Name</label>
                                <input
                                  required
                                  value={this.state.last_name}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='last_name'
                                  placeholder='Last Name'
                                />
                              </div>
                            </div>

                            <div className='col-md-6 '>
                              <div className='form-group'>
                                <label>Phone Number</label>
                                <input
                                  required
                                  value={this.state.phone_number}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='phone_number'
                                  placeholder='07060622780'
                                />
                              </div>
                            </div>

                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label>Email</label>
                                <input
                                  required
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='email'
                                  placeholder='Email Address'
                                  type='email'
                                />
                              </div>
                            </div>

                            {/* <div className='col-md-6'>
                              <div className='form-group mb-3'>
                                <label>Gender</label>
                                <select
                                  value={this.state.gender}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f23'
                                  name='gender'
                                >
                                  <option value=''>Select one</option>
                                  <option value='Male'>Male</option>
                                  <option value='Female'>Female</option>
                                </select>
                              </div>
                            </div> */}

                            {/* <div className='col-md-6'>
                              <div className='form-group'>
                                <label>Address</label>
                                <input
                                  required
                                  value={this.state.address}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='address'
                                  placeholder=' Address'
                                />
                              </div>
                            </div> */}
                          </div>
                        </section>
                      </FadeIn>
                    ) : (
                      ''
                    )}

                    {this.state.step === 2 ? (
                      <FadeIn duration='1s' timingFunction='ease-out'>
                        <h3
                          id='wizard2-h-0'
                          tabindex='-1'
                          class='title current'
                        >
                          Next Of Kin Information
                        </h3>
                        <section className='body current'>
                          <p class='mg-b-20'>
                            Try the keyboard navigation by clicking arrow left
                            or right!
                          </p>
                          <div className='row'>
                            <div className='col-md-6 mt-4'>
                              <div className='form-group'>
                                <label>First Name</label>
                                <input
                                  required
                                  value={this.state.first_name}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='first_name'
                                  placeholder='First Name'
                                />
                              </div>
                            </div>

                            <div className='col-md-6 mt-4'>
                              <div className='form-group'>
                                <label>Last Name</label>
                                <input
                                  required
                                  value={this.state.last_name}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='last_name'
                                  placeholder='Last Name'
                                />
                              </div>
                            </div>

                            <div className='col-md-6 '>
                              <div className='form-group'>
                                <label>Phone Number</label>
                                <input
                                  required
                                  value={this.state.phone_number}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='phone_number'
                                  placeholder='07060622780'
                                />
                              </div>
                            </div>

                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label>Email</label>
                                <input
                                  required
                                  value={this.state.email}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='email'
                                  placeholder='Email Address'
                                />
                              </div>
                            </div>

                            <div className='col-md-6'>
                              <div className='form-group mb-3'>
                                <label>Gender</label>
                                <select
                                  value={this.state.gender}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f23'
                                  name='gender'
                                >
                                  <option value=''>Select one</option>
                                  <option value='Male'>Male</option>
                                  <option value='Female'>Female</option>
                                </select>
                              </div>
                            </div>

                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label>Address</label>
                                <input
                                  required
                                  value={this.state.address}
                                  onChange={this.handleChange}
                                  className='form-control st-login-f'
                                  name='address'
                                  placeholder=' Address'
                                />
                              </div>
                            </div>
                          </div>
                        </section>
                      </FadeIn>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className='actions clearfix'>
                    <ul>
                      {this.LeftButton()}

                      {this.RightButton()}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </FadeIn>
      </>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(AddUser);
