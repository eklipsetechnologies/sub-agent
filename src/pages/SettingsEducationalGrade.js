import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import DepartmentContainer from '../components/settings/department/DepartmentContainer';
import data from '../assets/img/data_storage.png'
import SpecialContainer from '../components/settings/specializations/SpecialContainer';
import EduContainer from '../components/settings/Educational_grade/EduContainer';
import { submenu } from '../store/actions/SubMenu';

class SettingsEducationalGrade extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Control'));
        this.props.dispatch(open_main_menu('Control'));
        this.props.dispatch(change_breadcrum('Educational Grades'));
        this.props.dispatch(submenu('11'));
    }
    render() {
        return (
            <div>
                <div className="mb-4">
                    <center>
                        {/* <img src={data} className="img-fluid" /> */}
                    </center>
                </div>
                <EduContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SettingsEducationalGrade);