import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import IssueItemContainer from '../components/issue_items/IssueItemContainer';
import SMSContainer from '../components/sms/SMSContainer';

class SMSPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('SMS'));
        this.props.dispatch(open_main_menu('SMS'));
        this.props.dispatch(change_breadcrum('SMS'));
    }
    render() {
        return (
            <div>
                <div className="mb-4">
                    <center>
                        {/* <img src={data} className="img-fluid" /> */}
                    </center>
                </div>
                {/* <IssueItemContainer /> */}
                <SMSContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SMSPage);