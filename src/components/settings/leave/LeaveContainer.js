import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddLeave from './AddLeave';
import EditLeave from './EditLeave';
import ListLeave from './ListLeave';


class LeaveContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'leave_add') {
            return <AddLeave />;
        }else if (current === 'leave_edit') {
            return <EditLeave />
        }else if (current === 'leave_home') {
            return <ListLeave />
        }else{
            return <ListLeave />
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