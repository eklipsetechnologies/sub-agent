import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddJob from './AddJob';
import ListJobs from './ListJobs';
import EditJob from './EditJob';


class JobContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'job_add') {
            return <AddJob />;
        }else if (current === 'job_edit') {
            return <EditJob />
        }else if (current === 'job_home') {
            return <ListJobs />
        }else{
            return <ListJobs />
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

export default connect(mapStateToProps) (JobContainer);