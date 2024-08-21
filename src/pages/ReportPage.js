import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import BranchContainer from '../components/settings/branches/BranchContainer';
import ReportsController from '../components/reports/ReportsController';

class ReportPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('reports'));
        this.props.dispatch(open_main_menu('reports'));
        this.props.dispatch(change_breadcrum('Reports'));
    }
    render() {
        return (
            <div>
                <ReportsController />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (ReportPage);