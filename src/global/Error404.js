import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IosAlertOutline from 'react-ionicons/lib/IosAlertOutline'
import { BounceUp,FadeIn,BounceLeft } from "animate-components";
import { connect } from 'react-redux';
import { change_breadcrum } from '../store/actions/Bredcrum';

class Error404 extends Component {
    componentDidMount(){
        
        this.props.dispatch(change_breadcrum('Unknown'));
    }
    render() {
        return (
            <>
            <BounceUp duration="1s" timingFunction="ease-out">
            <div className="ht-100p d-flex flex-column align-items-center justify-content-center">
                <div className="wd-70p wd-sm-250 wd-lg-300 mg-b-15">
                    <center>
                    <IosAlertOutline shake={true}  fontSize="200px" color="#dc3545" />
                    </center>
                

                </div>
                <h1 className="tx-color-01 tx-24 tx-sm-32 tx-lg-36 mg-xl-b-5">404 Page Not Found</h1>
                <h5 className="tx-16 tx-sm-18 tx-lg-20 tx-normal mg-b-20">Oopps. The page you were looking for doesn't exist.</h5>
                <Link to="/dashboard" className="btn btn-primary2 shadow" style={{textDecoration:'none'}}>Return Home</Link>
            </div>
            </BounceUp>
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }
export default connect(mapStoreToProps) (Error404);