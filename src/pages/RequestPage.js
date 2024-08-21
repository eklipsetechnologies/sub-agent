import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import UsersContainer from '../components/users/components/users/UsersContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import RequestContainer from '../components/request/RequestContainer';

class RequestPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('request'));
        this.props.dispatch(open_main_menu('request'));
        this.props.dispatch(change_breadcrum('Request Management'));
    }
    render() {
        return (
            <div>
                <RequestContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (RequestPage);