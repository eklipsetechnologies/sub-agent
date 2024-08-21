import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPerfElement from './AddPerfElement';
import EditPerfElement from './EditPerfElement';
import ListPerfElement from './ListPerfElement';


class PerElemContainer extends Component {
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
            return <AddPerfElement />;
        }else if (current === 'skill_edit') {
            return <EditPerfElement />;
        }else if (current === 'skill_home') {
            return <ListPerfElement />;
        }else{
            return <ListPerfElement />;
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

export default connect(mapStateToProps) (PerElemContainer);