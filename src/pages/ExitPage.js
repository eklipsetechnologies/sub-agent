import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import UsersContainer from '../components/users/components/users/UsersContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import ExitContainer from '../components/exit/ExitContainer';

class ExitPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('exit'));
        this.props.dispatch(open_main_menu('exit'));
        this.props.dispatch(change_breadcrum('Exit Management'));
    }
    render() {
        return (
            <div>
                <ExitContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (ExitPage);