import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecuitmentHome from './RecuitmentHome';
import ConnectToPortal from './portal/ConnectToPortal';
import CreatePortal from './portal/CreatePortal';
import PublishJob from './portal/PublishJob';
import AddExcercise from './excercise/AddExcercise';
import Onboarding from './onboarding/Onboarding';
import CreateMail from './mails/CreateMail';
import AllAssesments from './assesments/AllAssesments';
import QuizPer from './assesments/QuizPer';
import ViewCandidateApplication from './onboarding/ViewCandidateApplication';
import AcLetter from './onboarding/AcLetter';


class RecruitmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'rec_portal') {
            return <ConnectToPortal />;
        }else if (current === 'rec_home') {
            return <RecuitmentHome />
        }else if (current === 'rec_prtal_cr') {
            return <CreatePortal />
        }else if (current === 'rec_job') {
            return <PublishJob />
        }else if (current === 'rec_exc_add') {
            return <AddExcercise />
        }else if (current === 'rec_on_list') {
            return <Onboarding />
        }else if (current === 'rec_on_view') {
            return <ViewCandidateApplication />
        }else if (current === 'can_letter') {
            return <AcLetter />
        }else if (current === 'rec_mail') {
            return <CreateMail />
        }else if (current === 'asess') {
            return <AllAssesments />
        }else if (current === 'asess_quiz') {
            return <QuizPer />
        }else{
            return <RecuitmentHome />
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

export default connect(mapStateToProps) (RecruitmentContainer);