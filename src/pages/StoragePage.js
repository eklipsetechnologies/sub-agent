import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import IssueItemContainer from '../components/issue_items/IssueItemContainer';
import DatabaseContainer from '../components/database/DatabaseContainer';
import StorageContainer from '../components/storage/StorageContainer';
import StorageCon from '../components/storage/StorageCon';

class StoragePage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('Storage'));
        this.props.dispatch(open_main_menu('Storage'));
        this.props.dispatch(change_breadcrum('Storage'));
    }
    render() {
        return (
            <div>
                <div className="mb-4">
                    <center>
                        {/* <img src={data} className="img-fluid" /> */}
                    </center>
                </div>
                <StorageCon />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (StoragePage);