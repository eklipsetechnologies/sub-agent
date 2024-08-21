import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPerform from './AddPerform';
import EditPerform from './EditPerform';
import ListPerform from './ListPerform';


class PerformContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'perform_add') {
            return <AddPerform />;
        }else if (current === 'perform_edit') {
            return <EditPerform />
        }else if (current === 'perform_home') {
            return <ListPerform />
        }else{
            return <ListPerform />
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

export default connect(mapStateToProps) (PerformContainer);