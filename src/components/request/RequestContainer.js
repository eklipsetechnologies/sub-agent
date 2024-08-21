import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrainingRequest from './training/TrainingRequest';
import RequestList from './RequestList';
import LeaveRequest from './leave/LeaveRequest';
import PerformanceRequest from './perform/PerformanceRequest';
import ExitRequest from './exit/ExitRequest';
import DeciplineRequest from './decipline/DeciplineRequest';
import PayrollRequest from './payroll/PayrollRequest';
import ProfileRequest from './profile/ProfileRequest';
import RecrutmentRequest from './recuit/RecrutmentRequest';


class RequestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'req_train') {
            return <TrainingRequest />;
        }else if (current === 'req_leave') {
            return <LeaveRequest />
        }else if (current === 'req_home') {
            return <RequestList />
        }else if (current === 'req_perf') {
            return <PerformanceRequest />
        }else if (current === 'req_exit') {
            return <ExitRequest />
        }else if (current === 'req_query') {
            return <DeciplineRequest />
        }else if (current === 'req_pay') {
            return <PayrollRequest />
        }else if (current === 'req_profile') {
            return <ProfileRequest />
        }else if (current === 'req_rec') {
            return <RecrutmentRequest />
        }else{
            return <ProfileRequest />
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

export default connect(mapStateToProps) (RequestContainer);