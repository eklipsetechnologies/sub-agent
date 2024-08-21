import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSkills from './AddSkills';
import ListSkills from './ListSkills';
import EditSkills from './EditSkills';


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
            return <AddSkills />;
        }else if (current === 'skill_edit') {
            return <EditSkills />;
        }else if (current === 'skill_home') {
            return <ListSkills />;
        }else{
            return <ListSkills />;
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