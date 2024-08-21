import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddQuery from './AddQuery';
import ListQuery from './ListQuery';
import QueryResponses from './QueryResponses';
import QueryActions from './QueryActions';


class QueryContainer extends Component {
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
            return <AddQuery />;
        }else if (current === 'exit_home') {
            return <ListQuery />
        }else if (current === 'query_res') {
            return <QueryResponses />
        }else if (current === 'query_action') {
            return <QueryActions />
        }else{
            return <ListQuery />
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

export default connect(mapStateToProps) (QueryContainer);