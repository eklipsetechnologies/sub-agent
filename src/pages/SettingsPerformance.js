import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import PerformContainer from '../components/settings/performance/PerformContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import { submenu } from '../store/actions/SubMenu';

class SettingsPerformance extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Performance Cycle'));
        this.props.dispatch(submenu('0'));
    }
    render() {
        return (
            <div>
                <ComingSoon />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsPerformance);