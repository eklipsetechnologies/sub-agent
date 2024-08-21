import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPayroll from './AddPayroll';
import ListPayroll from './ListPayroll';
// import AddPayroll from './AddPayroll';
import ListSalaryBase from './ListSalaryBase';
import AddSalaryBase from './AddSalaryBase';
import InvoiceContainer from './invoice/InvoiceContainer';


class PayrollContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'pay_add') {
            return <AddPayroll />;
        }else if (current === 'pay_home') {
            return <AddPayroll />
        }else if (current === 'pay_salary_list') {
            return <ListSalaryBase />
        }else if (current === 'pay_salary_add') {
            return <AddSalaryBase />
        }else if (current === 'pay_list') {
            return <ListPayroll />
        }else if (current === 'pay_home') {
            return <InvoiceContainer />
        }else{
            return <InvoiceContainer />
        }
    }
    
    render() {
        return (
            <div>
                {this.Switcher()}
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (PayrollContainer);