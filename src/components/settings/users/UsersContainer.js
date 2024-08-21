import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddU from './AddU';
import EditU from './EditU';
import ListU from './ListU';


class UsersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'skill_add') {
            return <AddU />;
        }else if (current === 'skill_edit') {
            return <EditU />;
        }else if (current === 'skill_home') {
            return <ListU />;
        }else{
            return <ListU />;
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

export default connect(mapStateToProps) (UsersContainer);