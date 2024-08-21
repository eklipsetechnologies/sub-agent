import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import BranchContainer from '../components/settings/branches/BranchContainer';
import { submenu } from '../store/actions/SubMenu';

class SettingsBranchPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Branches'));
        this.props.dispatch(submenu('1'));
    }
    render() {
        return (
            <div>
                <BranchContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsBranchPage);