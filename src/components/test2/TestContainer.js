import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListTest from './ListTest';


class TestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"List"
        }
    }

    Switcher=()=>{
        let current = this.props.data.switch;
        if (current === 'Chat_Open') {
            return <h1>Coming Soon</h1>;
        }else if (current === 'Chat_home') {
            return <ListTest />
        }else{
            return <ListTest />
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

export default connect(mapStateToProps) (TestContainer);