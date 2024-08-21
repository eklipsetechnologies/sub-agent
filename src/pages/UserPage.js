import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import UsersContainer from '../components/users/components/users/UsersContainer';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu('users'));
    this.props.dispatch(open_main_menu('users'));
    this.props.dispatch(change_breadcrum('Users'));
  }
  render() {
    return (
      <div>
        <div className='mb-4'>
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <UsersContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(UserPage);
