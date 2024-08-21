import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import PerformanceContainer from '../components/performance/PerformanceContainer';
class PerformancePage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('performance'));
        this.props.dispatch(open_main_menu('performance'));
        this.props.dispatch(change_breadcrum('Performance Management'));
    }
    render() {
        return (
            <div>
                <PerformanceContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (PerformancePage);