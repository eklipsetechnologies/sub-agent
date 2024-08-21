import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { launch_toaster } from '../../store/actions/IsToast';

class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8]
        }
    }

    Toaster=(message,bool)=>{
        this.props.dispatch(launch_toaster(message));
        this.props.dispatch(toast_trigger(bool));
    }
    
    render() {
        return (
        <div>
                {/* <div className="container-fluid">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Current</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Filter 2</a>
                    </li>
                </ul>
                </div> */}
            
            <div className="row mb-4">
                {this.state.list.map(l=>
                    <div key={l} className="col-md-3 mb-3">
                    <div className="card card-profile st-member">
                        <div className="card-body tx-13">
                            <center>
                                <div className="avatar avatar-lg">
                                <span className="">
                                    <img className="avatar-initial rounded-circle" src="https://picsum.photos/200/300" />
                                </span>
                               </div>
                               <h5><a href="">Human Resources</a></h5>
                               <p>1,232,099 Members</p>
                               <hr></hr>
                               <button onClick={()=>this.Toaster('Testing message',true)} className="btn btn-primary btn-primary2 btn-sm shadow">View profile</button>
                            </center>
                            
                        </div>
                    </div>
                </div>
                    
                    )}
                
            </div>
        </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});
export default connect(mapStateToProps) (Members);