import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import TestChat from '../components/TestChat';
import Members from '../components/test/Members';
import Card from '../components/test/Card';
import TestContainer from '../components/test2/TestContainer';
import { change_breadcrum } from '../store/actions/Bredcrum';

class TestPage extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('dashboard'));
        this.props.dispatch(open_main_menu('dashboard'));
        this.props.dispatch(change_breadcrum('Testing Page'));
    }
    render() {
        return (
            <div>
                <TestContainer />
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (TestPage);