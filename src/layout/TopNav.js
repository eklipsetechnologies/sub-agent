import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import img from '../assets/img/profile.png';

import { Home } from '../global/Home';
import axios from 'axios';
import { connect } from 'react-redux';
import { user_details } from '../store/actions/UserDetails';
import { Zoom, toast } from 'react-toastify';
import Toaster from '../global/Toaster';
import { ArrowLeftCircle } from 'react-feather';
import { open_right } from '../store/actions/OpenRight';
import ReactHintFactory from 'react-hint';
import 'react-hint/css/index.css';

const ReactHint = ReactHintFactory(React);
class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  LoadUserDetails = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      axios
        .post(
          Home + `enter-ps/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.props.dispatch(user_details(res.data.payload));
          //this.setState({feeds,values:res.data.likes});
        })
        .catch((err) => console.log(err));
    }
  };

  RefreshToken = () => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      axios
        .post(Home + `refresh/token`, {
          token: token,
        })
        .then((res) => {
          console.log('Token', res);
          if (res.data.status) {
            if (res.data.data.access_token) {
              localStorage.setItem(
                'userToken',
                JSON.stringify(res.data.data.access_token)
              );
              // this.props.history.push('/dashboard');
              // console.log('CHANGED')
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadUserDetails();
    // this.RefreshToken()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.data.ToastToggle !== nextProps.data.ToastToggle) {
      if (nextProps.data.ToastMessage.length > 0) {
        if (nextProps.data.isToast) {
          toast.success(this.props.data.ToastMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: Zoom,
          });
        } else {
          toast.error(this.props.data.ToastMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: Zoom,
          });
        }
      } else {
        toast.error('No message payload', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          transition: Zoom,
        });
      }
    }
  }
  OpenRight = (name) => {
    this.props.dispatch(open_right(name));
  };

  CheckLocalStorage = () => {
    if (localStorage.getItem('userToken')) {
      let data = JSON.parse(localStorage.getItem('userToken'));
      if (data.length > 10) {
        return '';
      } else {
        return <Redirect to='/' />;
      }
    } else {
      return <Redirect to='/' />;
    }
  };

  render() {
    let right = 'st--co';
    if (this.props.data.Right === 'Open') {
      right = 'st--co';
    } else {
      right = 'st--co2';
    }
    console.log(this.props);
    return (
      <div>
        <Toaster />
        <ReactHint autoPosition events delay='' />
        {this.props.data.Right === 'Close' ? (
          <span className='xt-2' onClick={() => this.OpenRight('Open')}>
            <ArrowLeftCircle color='#0567d2' size={29} />
          </span>
        ) : (
          ''
        )}

        {this.CheckLocalStorage()}
        <div
          className={`content-header st-sticky ${right}`}
          style={{ paddingTop: '7px' }}
        >
          <div className='st-80'>
            <h3 className='d-inline colo-b st-w600 st-w6001'>
              {this.props.data.breadcrum}
            </h3>
            <div className='aside-loggedin' style={{ float: 'right' }}>
              <div className='d-flex align-items-center justify-content-start'>
                <a
                  href=''
                  className='st-new text-right only-desc ss-d'
                  data-toggle='tooltip'
                  title=''
                  data-original-title='You have 2 unread messages'
                >
                  {/* <Bell color="#0567d2" size={29} /> */}
                </a>
                <Link
                  to='#'
                  className='d-flex align-items-center justify-content-between st-n-pad'
                  data-toggle='collapse'
                >
                  <h6 className='tx-semibold mg-b-0 st-p9 only-desc'>
                    {this.props?.data?.userDetails?.first_name}{' '}
                    {this.props?.data?.userDetails?.last_name}
                  </h6>
                  <br></br>
                </Link>
                <Link to='#' className=''>
                  <img
                    src={
                      typeof this.props.data.userDetails === 'object' &&
                      this.props.data.userDetails.picture !== null
                        ? this.props.data.userDetails.picture
                        : img
                    }
                    className='rounded-circle st-avatar'
                    alt=''
                  />
                  <span className='whocoded-glow'></span>
                </Link>
              </div>

              <div className='aside-loggedin-user aside-loggedin-user2 '>
                {/* <p className="tx-color-03 tx-12 mg-b-0 st-p9">{typeof(this.props.data.userDetails) === 'object' ? this.props.data.userDetails.role :'Loading....'}</p> */}
              </div>
            </div>
          </div>

          <div className='st-20'>
            {/* <a href="/logout" className="text-right only-desc" data-toggle="tooltip" title="" data-original-title="You have 2 unread messages">
                      <MaterialIcon icon="power_settings_new" />
                    </a>
                    */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(TopNav);
