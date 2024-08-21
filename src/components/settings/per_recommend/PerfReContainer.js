import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPerRec from './AddPerRec';
import EditPerfRec from './EditPerfRec';
import ListPerfRec from './ListPerfRec';


class PerfReContainer extends Component {
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
            return <AddPerRec />;
        }else if (current === 'skill_edit') {
            return <EditPerfRec />;
        }else if (current === 'skill_home') {
            return <ListPerfRec />;
        }else{
            return <ListPerfRec />;
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

export default connect(mapStateToProps) (PerfReContainer);