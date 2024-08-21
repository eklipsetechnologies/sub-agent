import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSecurity from './AddSecurity';
import EditSecurity from './EditSecurity';
import ListSecurity from './ListSecurity';


class SecurityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'security_add') {
            return <AddSecurity />;
        }else if (current === 'security_edit') {
            return <EditSecurity />
        }else if (current === 'security_home') {
            return <ListSecurity />
        }else{
            return <ListSecurity />
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

export default connect(mapStateToProps) (SecurityContainer);