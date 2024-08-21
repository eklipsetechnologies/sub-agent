import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import LeaveContainer from '../components/leave/LeaveContainer';

class LeavePage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('leave'));
        this.props.dispatch(open_main_menu('leave'));
        this.props.dispatch(change_breadcrum('Leave Management'));
    }
    render() {
        return (
            <div>
                <LeaveContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (LeavePage);