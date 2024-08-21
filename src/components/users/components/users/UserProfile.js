import React, { Component } from 'react';
import { BounceRight, FadeIn } from 'animate-components';
import { connect } from 'react-redux';
import { switch_content } from '../../../../store/actions/SwitchContent';
import { props_params } from '../../../../store/actions/PropsParams';
import {
  PlusCircle,
  Edit,
  Trash2,
  BookOpen,
  HelpCircle,
  UserMinus,
  Twitch,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  MapPin,
  PhoneCall,
  Mail,
} from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import img from '../../../../assets/img/profile.png';
import { open_right } from '../../../../store/actions/OpenRight';
import { change_breadcrum } from '../../../../store/actions/Bredcrum';
import empty from '../../../../assets/svg/whocoded_empty.svg';
import SecurityQuestions from './SecurityQuestions';
import EducationalHistory from './EducationalHistory';
import PreviousEmployment from './PreviousEmployment';
import Dependant from './Dependant';
import UserBranches from './UserBranches';
import { toast } from 'react-toastify';
import NextOfKin from './NextOfKin';
import Certificates from './Certificates';
import UploadProfilePicture from './UploadProfilePicture';
import EmployeeEditProfile from '../../profile/EmployeeEditProfile';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditNextOfKin from './EditNextOfKin';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      data: [],
      details: '',
      branch: '',
      show: '',
      id: 0,
      name: '',
      win: '',
      switcher: 'person',
    };
  }

  Delete(key) {
    if (window.confirm('❌ are you sure you want to delete this job?')) {
      let token = '';
      if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
        this.setState({ loading: true });
        Axios.post(`${Home}hr/job/delete`, {
          token: token,
          job_key: key,
        })
          .then((res) => {
            // console.log(res);
            if (res.data.status) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.LoadData();
            } else {
              this.setState({ loading: false });
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(false));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  LoadData = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      this.setState({ loading: true });
      Axios.post(
        `${Home}enter-ps/user/viewUser`,
        {
          id:
            this.props.data.params.length > 0
              ? this.props.data.params[0]._id
              : 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, details: res.data.payload });
          if (res.data.success) {
            //  this.props.dispatch(open_right('Close'));
          } else {
            toast.error(res.data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  ErrorHandler = (message) => {
    //console.clear();
    console.log(message);
    this.setState({ loading: false });
    toast.error('Error', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  OpenModal = (name, id) => {
    if (name.length < 2) {
      this.setState({ show: '' });
      this.interval = setTimeout(() => this.setState({ name: name }), 600);
    } else {
      this.setState({ name: name });
      this.interval = setTimeout(() => this.setState({ show: 'show' }), 100);
    }
    this.setState({ id: id });
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };
  OpenEdit = (name) => {
    this.setState({ win: name });
  };

  componentDidMount() {
    //this.props.dispatch(change_breadcrum('Profile Page'));
    this.LoadData();
  }
  componentWillUnmount() {
    this.props.dispatch(open_right('Open'));
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.quick_params !== this.props.data.quick_params) {
      this.LoadData();
    }
  }

  Switcher = (switcher) => {
    this.setState({ switcher });
  };

  SwipeRender = () => {
    if (this.state.switcher === 'person') {
      return (
        <div className='card  border-0 mb-3'>
          <div className='card-body'>
            <div className=''>
              <div className='col-sm-3 col-md-2 col-lg'>
                <div
                  onClick={() => this.OpenModal('WHOCODED', 0)}
                  className='avatar avatar-xxl avatar-online st-click'
                >
                  <img
                    src={
                      this.state.details?.picture === null
                        ? img
                        : this.state.details?.picture
                    }
                    className='rounded-circle'
                    alt=''
                  />
                </div>
              </div>

              <div className='col-sm-8 col-md-7 col-lg mg-t-20 mg-sm-t-0 mg-lg-t-25'>
                <h5 className='mg-b-2 tx-spacing--1'>{`${this.state.details.first_name} ${this.state.details.last_name}`}</h5>
                <p className='tx-color-03 mg-b-25'>
                  @
                  {this.state.details.company_id
                    ? this.state.details?.companyDetails?.name
                    : 'no company yet'}
                </p>
                <div className='d-flex mg-b-25'>
                  <button
                    onClick={() => this.Switcher('next')}
                    className='btn btn-xs btn-outline-secondary flex-fill'
                  >
                    Edit next of kin details
                  </button>
                  <button
                    onClick={() => this.OpenEdit('EDIT_WHOCODED')}
                    className='btn btn-xs btn-primary flex-fill mg-l-10'
                  >
                    Edit User
                  </button>
                </div>
              </div>

              <div className='col-sm-6 col-md-5 col-lg mg-t-40'>
                <label className='tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15'>
                  Personal Information
                </label>
                <table className='table table-striped table-bordered table-primary table-hover'>
                  <tbody>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Name: </th>
                      <td className='tx-color-02 pl-2'>{`${this.state.details.first_name} ${this.state.details.last_name}`}</td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>DOB: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.date_of_birth
                          ? moment(this.state.details?.date_of_birth).format(
                              'MMM Do YYYY'
                            )
                          : 'Set Date of Birth'}
                      </td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Gender: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.userProfile?.gender}
                      </td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Email Address: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details.email}
                      </td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Phone Number: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details.phone_number}
                      </td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Residentail address: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.userProfile?.address}
                      </td>
                    </tr>

                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Next of Kin Name: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.userProfile?.next_of_kin_firstName}{' '}
                        {this.state.details?.userProfile?.next_of_kin_lastName}
                      </td>
                    </tr>
                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Next of Kin Address: </th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.userProfile?.next_of_kin_address}
                      </td>
                    </tr>

                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Next of Kin Phone Number: </th>
                      <td className='tx-color-02 pl-2'>
                        {
                          this.state.details?.userProfile
                            ?.next_of_kin_phoneLine1
                        }
                      </td>
                    </tr>

                    <tr className='pt-2 pb-2'>
                      <th className='st-color-g'>Next of Kin Email:</th>
                      <td className='tx-color-02 pl-2'>
                        {this.state.details?.userProfile?.next_of_kin_email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.switcher === 'contact') {
      return (
        <div className='card border-0 mb-3'>
          <div className='card-body'>
            <div className=''>
              <h6 className='lh-5 mg-b-0'>Contact Information </h6>

              <ul className='list-unstyled profile-info-list mt-5'>
                <li>
                  <MapPin color='#007bff' size={15} />
                  <span className='tx-color-03 pl-2'>
                    {this.state.details?.userProfile?.address}
                  </span>
                </li>
                <li>
                  <PhoneCall color='#007bff' size={15} />
                  <span className='tx-color-03 pl-2'>
                    {this.state.details.phone_number}
                  </span>
                </li>
                <li>
                  <Mail color='#007bff' size={15} />
                  <span className='tx-color-03 pl-2'>
                    {this.state.details.email}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (this.state.switcher === 'next') {
      return (
        <>
          <EditNextOfKin />{' '}
        </>
      );
    } else if (this.state.switcher === 'nysc') {
      return (
        <div className='card border-0 mb-3'>
          <div className='card-body'>
            <div className=''>
              <h6 className='lh-5 mg-b-0'>NYSC Information </h6>

              <ul className='list-unstyled profile-info-list mt-5'>
                <li className='pt-2 pb-2'>
                  <strong className='st-color-g'>Status: </strong>
                  <span className='tx-color-02 pl-2'>
                    {this.state.details.nysc}
                  </span>
                </li>

                <li className='pt-2 pb-2'>
                  <strong className='st-color-g'>Year: </strong>
                  <span className='tx-color-02 pl-2'>
                    {this.state.details.nysc_year}
                  </span>
                </li>
                <li className='pt-2 pb-2'>
                  <strong className='st-color-g'>Certificate Number: </strong>
                  <span className='tx-color-02 pl-2'>
                    {this.state.details.nysc_number}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (this.state.switcher === 'next') {
      return <NextOfKin self='WHOCODED' />;
    } else if (this.state.switcher === 'dep') {
      return <Dependant self='WHOCODED' />;
    } else if (this.state.switcher === 'sec') {
      return (
        <SecurityQuestions emp={this.state.details.employee} self='WHOCODED' />
      );
    } else if (this.state.switcher === 'emp') {
      return <PreviousEmployment self='WHOCODED' />;
    } else if (this.state.switcher === 'branch') {
      return <UserBranches self='WHOCODED' />;
    }
  };

  render() {
    return (
      <>
        {this.state.name === 'WHOCODED' ? (
          <UploadProfilePicture
            other='WHOCODED'
            show={this.state.show}
            close={() => this.OpenModal('', 0)}
            id={this.state.details.id}
          />
        ) : (
          ''
        )}
        {this.state.win === 'EDIT_WHOCODED' ? (
          <div className='st-e-ful'>
            <EmployeeEditProfile
              other='WHOCODED'
              id={this.state.details._id}
              close={() => this.OpenEdit('')}
            />
            <div className='p5'>
              <div className='m-5'></div>
            </div>
          </div>
        ) : (
          ''
        )}
        <FadeIn duration='1s' timingFunction='ease-out'>
          <div className='card  border-0 mb-4'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-5'>
                  <h6 className='lh-5 mg-b-0'>
                    {this.state.loading
                      ? 'Loading...'
                      : `${this.state.details.first_name} ${this.state.details.last_name}`}{' '}
                    Profile
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
            </div>
          </div>
          {this.state.loading ? (
            <div className='p-5'>
              <Spinner size={70} />
            </div>
          ) : (
            <>
              <div style={{ overflow: 'scroll' }}>
                <ul
                  className='nav nav-pills nav-fill mb-3'
                  style={{ width: 'max-content' }}
                >
                  <li className='nav-item'>
                    <Link
                      onClick={() => this.Switcher('person')}
                      className={`nav-link ${
                        this.state.switcher === 'person' ? 'active' : ''
                      }`}
                      to='#'
                    >
                      Personal Information
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      onClick={() => this.Switcher('contact')}
                      className={`nav-link ${
                        this.state.switcher === 'contact' ? 'active' : ''
                      }`}
                      to='#'
                    >
                      Contact Information
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                        <Link onClick={()=>this.Switcher('edu')} className={`nav-link ${this.state.switcher === 'edu'?'active':''}`} to="#"> Educational/Certification qualifications</Link>
                      </li> */}
                  {/* <li className="nav-item">
                        <Link onClick={()=>this.Switcher('nysc')} className={`nav-link ${this.state.switcher === 'nysc'?'active':''}`} to="#">NYSC Information</Link>
                      </li> */}
                  <li className='nav-item'>
                    <Link
                      onClick={() => this.Switcher('next')}
                      className={`nav-link ${
                        this.state.switcher === 'next' ? 'active' : ''
                      }`}
                      to='#'
                    >
                      Next of kin details
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                        <Link onClick={()=>this.Switcher('dep')} className={`nav-link ${this.state.switcher === 'dep'?'active':''}`} to="#">Dependent details </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('emp')} className={`nav-link ${this.state.switcher === 'emp'?'active':''}`} to="#">Employment History </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('sec')} className={`nav-link ${this.state.switcher === 'sec'?'active':''}`} to="#">Security Question </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('branch')} className={`nav-link ${this.state.switcher === 'branch'?'active':''}`} to="#">Branch/Branch History </Link>
                      </li> */}
                </ul>
              </div>
              <div className='row'>
                <div className='col-md-12 mt-2'>{this.SwipeRender()}</div>
              </div>
            </>
          )}
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

export default connect(mapStoreToProps)(UserProfile);
