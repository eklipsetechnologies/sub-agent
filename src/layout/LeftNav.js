import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/svg/haba.svg';
import bar from '../assets/img/bar.png';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { Home, Settings, Users, LogOut, Truck, BookOpen } from 'react-feather';
import { FadeIn } from 'animate-components';

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drop: '',
      mobile: false,
    };
  }

  OpenMenu = (name, main_name) => {
    this.props.dispatch(open_menu(name));
    this.props.dispatch(open_main_menu(main_name));
  };

  OpenMobileMenu = () => {
    if (window.pageYOffset <= 700) {
      this.setState({ mobile: !this.state.mobile });
    }
  };

  render() {
    // console.log(this.props);
    return (
      <>
        <FadeIn duration='1s' timingFunction='ease-out'>
          <aside
            className={`aside aside-fixed ${
              this.state.mobile ? 'mo-aside' : 'de-aside'
            }`}
          >
            <div className='aside-header ' style={{}}>
              <Link
                onClick={() => this.OpenMobileMenu()}
                to='#'
                className='aside-logo'
              >
                <img
                  className='img-fluid st-logo-img-dashboard'
                  src={logo}
                  // style={{ marginLeft: "6px" }}
                  alt='Logo'
                />
              </Link>
              <Link
                onClick={() => this.OpenMobileMenu()}
                to='#'
                className='aside-menu-link only-mo'
              >
                <span>
                  <i>{/* <Codepen color="#ffffff" size={48} /> */}</i>
                  <span>
                    <img className='img-fluid barr' src={bar} />
                    {/* <MaterialIcon icon="menu" /> */}
                  </span>
                </span>
              </Link>
            </div>

            <div className='aside-body st-scroll ps--active-y p-0'>
              <ul
                className='nav nav-aside st-nav-aside'
                style={{ transition: '0.5s' }}
              >
                <li
                  className={`nav-item st-link-hover st-nav-pad ${
                    this.props.data.children === 'dashboard' ? 'show' : ''
                  } ${this.props.data.menu === 'dashboard' ? 'active' : ''}`}
                >
                  <span className='st-link'>
                    <Link to='/dashboard' className='nav-link'>
                      <Home color='#ffffff' size={48} />{' '}
                      <span className='st-link-span'>Dashboard</span>
                    </Link>
                  </span>
                </li>

                {(this.props.data.userDetails &&
                  this.props.data.userDetails.type === 3) ||
                (this.props.data.userDetails &&
                  this.props.data.userDetails.type === 1) ||
                (this.props.data.userDetails &&
                  this.props.data.userDetails.type === 0) ||
                (this.props.data.userDetails &&
                  this.props.data.userDetails.type === 5) ? (
                  <li
                    onClick={() => this.OpenMenu('Control', 'Control')}
                    className={`nav-item st-link-hover st-nav-pad with-sub ${
                      this.props.data.children === 'Control' ? 'show' : ''
                    } ${this.props.data.menu === 'Control' ? 'active' : ''}`}
                  >
                    <span className='st-link'>
                      <Link to='#' className='nav-link'>
                        <Settings color='#ffffff' size={48} />{' '}
                        <span className='st-link-span'>Control Panel</span>
                      </Link>
                    </span>
                    <ul className='mt-1' style={{ transition: '0.5s' }}>
                      {(this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 1) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 0) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 5) ? (
                        <li className='st-motion pl-2'>
                          <Link
                            className={`d-flex text-white ${
                              this.props.data.submenu === '12'
                                ? 'stt-active'
                                : ''
                            }`}
                            to='/settings/products'
                          >
                            <span>&#8592; Products</span>
                          </Link>
                        </li>
                      ) : (
                        ''
                      )}
                    </ul>
                  </li>
                ) : (
                  ''
                )}

                <li
                  className={`nav-item st-link-hover st-nav-pad ${
                    this.props.data.children === 'users' ? 'show' : ''
                  } ${this.props.data.menu === 'users' ? 'active' : ''}`}
                >
                  <span className='st-link'>
                    <Link to='/users' className='nav-link'>
                      <Users color='#ffffff' size={48} />{' '}
                      <span className='st-link-span'>User Management</span>
                    </Link>
                  </span>
                </li>

                <li
                  className={`nav-item st-link-hover st-nav-pad ${
                    this.props.data.children === 'Vendors' ? 'show' : ''
                  } ${this.props.data.menu === 'Vendors' ? 'active' : ''}`}
                >
                  <span className='st-link'>
                    <Link to='/vendors' className='nav-link'>
                      <Truck color='#ffffff' size={48} />{' '}
                      <span className='st-link-span'>Policy Vendors</span>
                    </Link>
                  </span>
                </li>

                {/* addding the coverlist navlink here */}
                <li
                  className={`nav-item st-link-hover st-nav-pad ${
                    this.props.data.children === 'CoverList' ? 'show' : ''
                  } ${this.props.data.menu === 'CoverList' ? 'active' : ''}`}
                >
                  <span className='st-link'>
                    <Link to='/coverlists' className='nav-link'>
                      <BookOpen color='#ffffff' size={48} />{' '}
                      <span className='st-link-span'>Cover Lists</span>
                    </Link>
                  </span>
                </li>

                <li
                  onClick={() => this.OpenMenu('', '')}
                  className={`nav-item st-link-hover st-nav-pad ${
                    this.props.data.children === 'Students' ? 'show' : ''
                  } ${this.props.data.menu === 'Students' ? 'active' : ''}`}
                >
                  <span className='st-link'>
                    <a href='/logout' className='nav-link'>
                      <LogOut color='#ffffff' size={48} />{' '}
                      <span className='st-link-span'>Log out</span>
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
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

export default connect(mapStoreToProps)(LeftNav);
