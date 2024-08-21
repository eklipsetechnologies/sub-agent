import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddLeave from './AddLeave';
import ListLeave from './ListLeave';
import ApprovalLetter from './ApprovalLetter';
import LeaveHandOverNote from './LeaveHandOverNote';
import LeaveCalender from './LeaveCalender';
import LeaveBox from './LeaveBox';
import LeaveReports from '../reports/LeaveReports';
import { ArrowLeftCircle } from 'react-feather';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';


class LeaveContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'leave_add') {
            return <AddLeave />;
        }else if (current === 'leave_home') {
            return <ListLeave />
        }else if (current === 'leave_ac_mail') {
            return <ApprovalLetter />
        }else if (current === 'leave_hand') {
            return <LeaveHandOverNote />
        }else if (current === 'leave_calender') {
            return <LeaveCalender />
        }else if (current === 'leave_report') {
            return <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                    <h6 class="lh-5 mg-b-0">List of leave request</h6>
                    </div>
                    <div className="col-md-8">
                        <div className="pull-right">
                        
                        <button onClick={()=>this.SwitchContent('',[0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeftCircle color="white" size={35} /> Return</button>
                            
                        </div>
                        
                    </div>
                </div>
                    <LeaveReports />
                </div>
            </div>
        }else{
            return <LeaveBox />
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

export default connect(mapStateToProps) (LeaveContainer);