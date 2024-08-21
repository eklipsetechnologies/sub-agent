import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BounceRight,FadeIn } from "animate-components";
import UsersReports from './UsersReports';
import { PlusCircle } from 'react-feather';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import LeaveReports from './LeaveReports';
import PayrollReport from './PayrollReport';
import ExitReport from './ExitReport';
import QueryReports from './QueryReports';
import RecruitmentReport from './RecruitmentReport';


class ReportsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'user') {
            return <UsersReports />;
        }else if (current === 'leave') {
            return <LeaveReports />
        }else if (current === 'payroll') {
            return <PayrollReport />
        }else if (current === 'exit') {
            return <ExitReport />
        }else if (current === 'query') {
            return <QueryReports />
        }else if (current === 'recuit') {
            return <RecruitmentReport />
        }else{
            return <UsersReports />
        }
    }

    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.SwitchContent(event.target.value,0)
          }else if (event.target.name === 'type2') {
            // this.Reload(this.state.type,event.target.value);
            // this.props.dispatch(quick_params(event.target.value))
          }
        }
      }
    
    render() {
        return (
            <div>
                 <div className="card border-0 mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    {/* <h6 class="lh-5 mg-b-0">List of {this.state.typZe}</h6> */}
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                            <div className="input-group">
                            
                                <select 
                                onChange={this.handleChange}
                                name="type" value={this.state.type}
                                 className="form-control form-control-sm mr-1">
                                <option value="user">Users Reports</option>
                                <option value="leave">Leave Reports</option>
                                <option value="payroll">Payroll Reports</option>
                                <option value="exit">Exit Reports</option>
                                <option value="query">Query Reports</option>
                                <option value="recuit">Recruitment Reports</option>
                            </select>
                            
                            </div>
                            
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                </div>
                </div>

                {this.Switcher()}
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (ReportsContainer);