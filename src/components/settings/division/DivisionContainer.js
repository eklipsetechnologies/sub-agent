import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddDevision from './AddDevision';
import EditDevision from './EditDevision';
import ListDivision from './ListDivision';


class DevisionContainer extends Component {
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
            return <AddDevision />;
        }else if (current === 'skill_edit') {
            return <EditDevision />;
        }else if (current === 'skill_home') {
            return <ListDivision />;
        }else{
            return <ListDivision />;
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

export default connect(mapStateToProps) (DevisionContainer);