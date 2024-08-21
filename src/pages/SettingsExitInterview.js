import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import InterViewContainer from '../components/settings/Exit_interview/InterViewContainer';
import { submenu } from '../store/actions/SubMenu';

class SettingsExitInterview extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Exit Interview'));
        this.props.dispatch(submenu('14'));
    }
    render() {
        return (
            <div>
                <InterViewContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsExitInterview);