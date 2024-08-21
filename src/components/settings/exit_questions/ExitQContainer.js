import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEQ from './AddEQ';
import ListEQ from './ListEQ';
import EditEQ from './EditEQ';


class ExitQContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'eq_add') {
            return <AddEQ />;
        }else if (current === 'eq_edit') {
            return <EditEQ />;
        }else if (current === 'eq_home') {
            return <ListEQ />;
        }else{
            return <ListEQ />;
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

export default connect(mapStateToProps) (ExitQContainer);