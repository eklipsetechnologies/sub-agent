import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddHoliday from './AddHoliday';
import EditHoliday from './EditHoliday';
import ListHoliday from './ListHoliday';


class HolidayContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'leave_add') {
            return <AddHoliday />;
        }else if (current === 'holiday_edit') {
            return <EditHoliday />
        }else if (current === 'holiday_home') {
            return <ListHoliday />
        }else{
            return <ListHoliday />
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

export default connect(mapStateToProps) (HolidayContainer);