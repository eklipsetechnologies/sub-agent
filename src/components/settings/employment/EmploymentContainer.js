import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEmployment from './AddEmployment';
import EditEmployment from './EditEmployment';
import ListEmployment from './ListEmployment';


class EmploymentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'employ_add') {
            return <AddEmployment />;
        }else if (current === 'employ_edit') {
            return <EditEmployment />
        }else if (current === 'employ_home') {
            return <ListEmployment />
        }else{
            return <ListEmployment />
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

export default connect(mapStateToProps) (EmploymentContainer);