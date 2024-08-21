import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import UsersContainer from '../components/users/components/users/UsersContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import QueryContainer from '../components/querry/QueryContainer';

class QueryPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('query'));
        this.props.dispatch(open_main_menu('query'));
        this.props.dispatch(change_breadcrum('Query Management'));
    }
    render() {
        return (
            <div>
                <QueryContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (QueryPage);