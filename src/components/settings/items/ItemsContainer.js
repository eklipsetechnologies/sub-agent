import React, { Component } from 'react';
import { connect } from 'react-redux'
import AddItems from './AddItems';
import EditItems from './EditItems';
import ListItems from './ListItems';


class SkillsContainer extends Component {
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
            return <AddItems />;
        }else if (current === 'skill_edit') {
            return <EditItems />;
        }else if (current === 'skill_home') {
            return <ListItems />;
        }else{
            return <ListItems />;
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

export default connect(mapStateToProps) (SkillsContainer);