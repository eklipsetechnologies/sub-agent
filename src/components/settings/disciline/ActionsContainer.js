import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddActions from './AddActions';
import EditActions from './EditActions';
import ListActions from './ListActions';


class ActionsContainer extends Component {
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
            return <AddActions />;
        }else if (current === 'skill_edit') {
            return <EditActions />;
        }else if (current === 'skill_home') {
            return <ListActions />;
        }else{
            return <ListActions />;
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

export default connect(mapStateToProps) (ActionsContainer);