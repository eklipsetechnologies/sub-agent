import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
// import ComingSoon from '../components/users/components/ComingSoon';
import PayrollConatiner from '../components/payroll/PayrollConatiner';

class PayrollPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('payroll'));
        this.props.dispatch(open_main_menu('payroll'));
        this.props.dispatch(change_breadcrum('Payroll Management'));
    }
    render() {
        return (
            <div>
                <PayrollConatiner />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (PayrollPage);