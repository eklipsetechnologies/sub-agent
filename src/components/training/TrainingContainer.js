import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrainBox from './TrainBox';
import TrainAllocation from './TrainAllocation';
import AddAllocation from './AddAllocation';
import ListCourse from './ListCourse';
import AddTraining from './AddTraining';
import ListAssesment from './aseesments/ListAssesment';
import NewAssessment from './aseesments/NewAssessment';
import TrainingCalender from './TrainingCalender';
import AllAssesments from './assesment_answer/AllAssesments';
import QuizPer from './assesment_answer/QuizPer';


class TrainingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'train_al') {
            return <TrainAllocation />;
        }else if (current === 'train_al_new') {
            return <AddAllocation />
        }else if (current === 'train_list_course') {
            return <ListCourse />
        }else if (current === 'train_add_course') {
            return <AddTraining />
        }else if (current === 'train_list_ex') {
            return <ListAssesment />
        }else if (current === 'train_list_nex') {
            return <NewAssessment />
        }else if (current === 'train_calender') {
            return <TrainingCalender />
        }else if (current === 'asess') {
            return <AllAssesments />
        }else if (current === 'asess_quiz') {
            return <QuizPer />
        }else{
            return <TrainBox />
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

export default connect(mapStateToProps) (TrainingContainer);