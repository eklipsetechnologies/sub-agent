import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListDepartment from './ListDepartment';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';


class DepartmentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'dep_add') {
            return <AddDepartment />;
        }else if (current === 'dep_edit') {
            return <EditDepartment />
        }else if (current === 'dep_home') {
            return <ListDepartment />
        }else{
            return <ListDepartment />
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

export default connect(mapStateToProps) (DepartmentContainer);