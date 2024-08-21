import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddGrade from './AddGrade';
import ListGrade from './ListGrade';
import EditGrade from './EditGrade';


class GradeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'grade_add') {
            return <AddGrade />;
        }else if (current === 'grade_edit') {
            return <EditGrade />
        }else if (current === 'grade_home') {
            return <ListGrade />
        }else{
            return <ListGrade />
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

export default connect(mapStateToProps) (GradeContainer);