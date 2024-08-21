import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import RecuitmentContainer from '../components/recuitement/RecuitmentContainer';

class RecuitmentPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('recuitment'));
        this.props.dispatch(open_main_menu('recuitment'));
        this.props.dispatch(change_breadcrum('Recruitment Management'));
    }
    render() {
        return (
            <div>
                <RecuitmentContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (RecuitmentPage);