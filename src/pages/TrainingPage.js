import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import UsersContainer from '../components/users/components/users/UsersContainer';
import TrainingContainer from '../components/training/TrainingContainer';

class TrainingPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('training'));
        this.props.dispatch(open_main_menu('training'));
        this.props.dispatch(change_breadcrum('Training Management'));
    }
    render() {
        return (
            <div>
                <TrainingContainer />
               
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (TrainingPage);