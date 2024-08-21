import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import RecruitContainer from '../components/settings/recriut/RecruitContainer';
import ComingSoon from '../components/users/components/ComingSoon';
import { submenu } from '../store/actions/SubMenu';

class SettingsRecruitPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Recuitment'));
        this.props.dispatch(submenu('8'));
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

export default connect(mapStoreToProps) (SettingsRecruitPage);