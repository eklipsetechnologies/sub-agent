import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListBranches from './ListBranches';
import AddBranches from './AddBranches';
import EditBranch from './EditBranch';


class BranchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'branch_add') {
            return <AddBranches />;
        }else if (current === 'branch_edit') {
            return <EditBranch />
        }else if (current === 'branch_home') {
            return <ListBranches />
        }else{
            return <ListBranches />
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

export default connect(mapStateToProps) (BranchContainer);