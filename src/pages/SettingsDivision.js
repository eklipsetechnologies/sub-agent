import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import SkillsContainer from '../components/settings/skills/SkillsContainer';
import { submenu } from '../store/actions/SubMenu';
import DivisionContainer from '../components/settings/division/DivisionContainer';

class SettingsDevision extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Division'));
        this.props.dispatch(submenu('21'));
    }
    render() {
        return (
            <div>
                <div className="mb-4">
                    <center>
                        {/* <img src={data} className="img-fluid" /> */}
                    </center>
                </div>
                <DivisionContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsDevision);