import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUsers from './ListUsers';
import AddUser from './AddUser';
import UserProfile from './UserProfile';
// import App from '../../invoicePdf/App';

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      current: 'List',
    };
  }

  Switcher = () => {
    let current = this.props.data.switch;
    if (current === 'user_add') {
      return <AddUser />;
    } else if (current === 'user_edit') {
      return <AddUser />;
    } else if (current === 'user_home') {
      return <ListUsers />;
    } else if (current === 'user_profile') {
      return <UserProfile />;
    } else {
      return <ListUsers />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(UsersContainer);
