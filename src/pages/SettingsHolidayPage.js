import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import HolidayContainer from '../components/settings/holiday/HolidayContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import { submenu } from '../store/actions/SubMenu';

class SettingsHolidayPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Public Holidays'));
        this.props.dispatch(submenu('7'));
    }
    render() {
        return (
            <div>
                {/* <ComingSoon /> */}
                <HolidayContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsHolidayPage);