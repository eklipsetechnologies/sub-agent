import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListExit from './ListExit';
import AddExit from './AddExit';
import AcMail from './AcMail';
import SendInterViewLink from './SendInterViewLink';
import AcceptanceMail from './AcceptanceMail';
import StackholderMail from './StackholderMail';
import ExitFinalAdviceMail from './ExitFinalAdviceMail';
import ExitBenefits from './ExitBenefits';
import ExitBox from './ExitBox';
import ExitReport from '../reports/ExitReport';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import { ArrowLeft } from 'react-feather';


class ExitContainer extends Component {
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
        if (current === 'exit_add') {
            return <AddExit />;
        }else if (current === 'exit_home') {
            return <ListExit />
        }else if (current === 'exit_ac_mail') {
            return <AcMail />
        }else if (current === 'exit_interview_link') {
            return <SendInterViewLink />
        }else if (current === 'exit_acceptance_mail') {
            return <AcceptanceMail />
        }else if (current === 'exit_stackholder_mail') {
            return <StackholderMail />
        }else if (current === 'exit_advice_mail') {
            return <ExitFinalAdviceMail />
        }else if (current === 'exit_report') {
            return <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                    <h6 class="lh-5 mg-b-0">List of exit request</h6>
                    </div>
                    <div className="col-md-8">
                        <div className="pull-right">
                        
                        <button onClick={()=>this.SwitchContent('',[0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                            
                        </div>
                        
                    </div>
                </div>
                    <ExitReport />
                </div>
            </div>
        }else if (current === 'exit_benefit') {
            return <ExitBenefits />
        }else{
            return <ExitBox />
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

export default connect(mapStateToProps) (ExitContainer);