import React, { Component } from 'react';
import { connect } from 'react-redux';
import PerformanceHome from './PerformanceHome';
import ListGoals from './goals/ListGoals';
import AddGoal from './goals/AddGoal';
import ListObjectives from './appraisal/ListObjectives';
import AppraisalComments from './appraisal/AppraisalComments';
import AppraisalCommentsFinal from './appraisal_final/AppraisalCommentsFinal';
import ListObjectivesFinal from './appraisal_final/ListObjectivesFinal';
import Recommendation from './recommendation/Recommendation';


class PerformanceContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'perf_goals') {
            return <ListGoals />;
        }else if (current === 'perf_goals_add') {
            return <AddGoal />
        }else if (current === 'perf_home') {
            return <PerformanceHome />;
        }else if (current === 'perf_obj') {
            return <ListObjectives />;
        }else if (current === 'perf_comments') {
            return <AppraisalComments />;
        }else if (current === 'perf_comments_final') {
            return <AppraisalCommentsFinal />;
        }else if (current === 'perf_obj_final') {
            return <ListObjectivesFinal />;
        }else if (current === 'perf_rec') {
            return <Recommendation />;
        }else{
            return <PerformanceHome />;
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

export default connect(mapStateToProps) (PerformanceContainer);