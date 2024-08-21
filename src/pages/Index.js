import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import Tesr from '../components/Tesr';
import TestChat from '../components/TestChat';
import Members from '../components/test/Members';
import Card from '../components/test/Card';
import { change_breadcrum } from '../store/actions/Bredcrum';

class Index extends Component {

    componentDidMount(){
        this.props.dispatch(open_menu('dashboard'));
        this.props.dispatch(open_main_menu('dashboard'));
        this.props.dispatch(change_breadcrum('Overview'));
    }
    render() {
        return (
            <div>
                <Members />
                <Card />

                <div className="card">
                    <div className="card-body">
                        <TestChat />
                    </div>
                </div>
                <button className="btn btn-primary btn-sm">Sample Button</button>
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (Index);