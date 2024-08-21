import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import IssueItemContainer from '../components/issue_items/IssueItemContainer';

class IssueItemsPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Items'));
        this.props.dispatch(open_main_menu('Items'));
        this.props.dispatch(change_breadcrum('Products'));
    }
    render() {
        return (
            <div>
                <div className="mb-4">
                    <center>
                        {/* <img src={data} className="img-fluid" /> */}
                    </center>
                </div>
                <IssueItemContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (IssueItemsPage);