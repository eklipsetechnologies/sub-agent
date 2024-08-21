import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListSMS from './ListSMS';


class SMSContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'exit_add') {
            return <ListSMS />;
        }else if (current === 'exit_home') {
            return <ListSMS />
        }else{
            return <ListSMS />
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

export default connect(mapStateToProps) (SMSContainer);