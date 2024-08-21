import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount(){
        if (localStorage.getItem('userToken')) {
            localStorage.clear('userToken');
        }
        
    }
    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default Logout;