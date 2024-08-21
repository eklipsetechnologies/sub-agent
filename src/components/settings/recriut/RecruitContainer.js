import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRecuit from './AddRecuit';
import ListRecuit from './ListRecuit';
import MatchRecruit from './MatchRecruit';


class RecruitContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'holiday_add') {
            return <AddRecuit />;
        }else if (current === 'holiday_edit') {
            return ''
        }else if (current === 'holiday_job') {
            return <MatchRecruit />
        }else if (current === 'holiday_home') {
            return <ListRecuit />
        }else{
            return <ListRecuit />
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

export default connect(mapStateToProps) (RecruitContainer);