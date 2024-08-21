import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPayrollElem from './AddPayrollElem';
import EditPayrollElem from './EditPayrollElem';
import ListPayrollElem from './ListPayrollElem';


class PayrollContainer extends Component {
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
            return <AddPayrollElem />;
        }else if (current === 'skill_edit') {
            return <EditPayrollElem />;
        }else if (current === 'skill_home') {
            return <ListPayrollElem />;
        }else{
            return <ListPayrollElem />;
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

export default connect(mapStateToProps) (PayrollContainer);