import React, { Component } from 'react';
import { connect } from 'react-redux';
import StorageContainer from './StorageContainer';
import HRStorage from './HRStorage';
import AdminStorage from './AdminStorage';


class StorageCon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        
        if (current === 'hr') {
            return <HRStorage />;
        }else if (current === 'admin') {
            return <AdminStorage />
        }else{
            return <StorageContainer />
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

export default connect(mapStateToProps) (StorageCon);