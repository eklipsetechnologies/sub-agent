import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddSpecial from './AddSpecial';
import ListSpecial from './ListSpecial';
import EditSpecial from './EditSpecial';


class SpecialContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'sep_add') {
            return <AddSpecial />;
        }else if (current === 'sep_edit') {
            return <EditSpecial />
        }else if (current === 'sep_home') {
            return <ListSpecial />
        }else{
            return <ListSpecial />
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

export default connect(mapStateToProps) (SpecialContainer);