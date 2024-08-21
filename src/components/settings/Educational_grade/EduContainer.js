import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEdu from './AddEdu';
import ListEdu from './ListEdu';
import EditEdu from './EditEdu';


class EduContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'edu_add') {
            return <AddEdu />;
        }else if (current === 'edu_edit') {
            return <EditEdu />
        }else if (current === 'edu_home') {
            return <ListEdu />
        }else{
            return <ListEdu />
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

export default connect(mapStateToProps) (EduContainer);