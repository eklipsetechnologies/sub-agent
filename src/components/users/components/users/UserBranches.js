import React, { Component } from 'react';
import { GitBranch } from 'react-feather';
import {FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import ChangeUserBranch from './ChangeUserBranch';
import { Home } from '../../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../../global/Spinner';
import empty from '../../../../assets/svg/whocoded_empty.svg'
import { toast } from 'react-toastify';

class EducationalHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            data:[],
            active:"",
        }
    }
    ErrorHandler=(message)=>{
        //console.clear();
        console.log(message)
        this.setState({loading:false})
        toast.error('Error',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/users/listBranches`,{
               token: token,
               id:this.props.self === 'WHOCODED'?this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null
            })
           .then(res => {
            // console.log('TEQYUQWY',res);
           this.setState({loading:false,});
           this.setState({data:res.data})
           
           })
        .catch(err =>this.ErrorHandler(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            //this.setState({loading:true});
            Axios.post(`${Home}auth/users/listBranches`,{
               token: token,
               id:this.props.self === 'WHOCODED'?this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null,
               active:'yes'
            })
           .then(res => {
           console.log('Two',res);
           this.state.data.unshift(res.data.data[0]);
          this.setState({data:this.state.data});
           })
        .catch(err =>this.ErrorHandler(err));
        }
    }
    
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
    }

    componentDidMount(){
        this.LoadData();
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.data.quick_params !== this.props.data.quick_params) {
            if (nextProps.data.quick_param_name === 'BRANCH') {
                this.LoadData();
            }
        }
    }
    Switcher=(name)=>{
        let active = this.state.active
        if (this.props.data.quick_switch === 'WHOCODED_UB_EDIT') {
            return <ChangeUserBranch />
        }else{
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                        <div className="card-body">
                            <h6 className="lh-5 mg-b-0">User Branches 
                            {this.props.self === 'WHOCODED'?
                            <button onClick={()=>this.QuickSwitcher('WHOCODED_UB_EDIT')} className="btn btn-sm btn-outline-primary  pull-right">Assign/Change</button>
                        :''}
                            
                            </h6>
                            {this.state.loading ?
                         <div className="mt-5">
                             <Spinner size={74} />
                         </div>   
                        :
                        this.state.data.length < 1 ?
                          <div className="mt-5">
                              <center>
                              <img className="img-fluid empty-width" src={empty} />
                              </center>
                          </div>
                        :
                        this.state.data.map((branch,i)=>
                            <div key={branch.key} className="media mt-5">
                                <div className={`wd-80 ht-80 bg-ui-04 ${branch.status === 1?'bg-success-light':''} rounded d-flex align-items-center justify-content-center`}>
                                  <GitBranch color="#365d7d" size={35} />
                                </div>

                                <div className="media-body pd-l-25">
                                    <h5 className="mg-b-5">{branch.branch}</h5>
                                    <p className="mg-b-3"><span className="tx-medium tx-color-02">Start Date: </span> {branch.date}</p>
                                    {/* <span className="d-block tx-13 tx-color-03">{branch.end_date}</span> */}
                              </div>
                              {branch.status === 1?
                              <div className="st-branch-current">
                                  <span className="badge badge-pill badge-success shadow">Current Branch</span>
                              </div>
                            :''}
                              
                            </div>
                            )
                        
                        }
                        </div>
                    </div>
                    </FadeIn>;
        }
    }
    render() {
        //console.log(this.state);
        return (
            <div>
                {this.Switcher()}
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (EducationalHistory);