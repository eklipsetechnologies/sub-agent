import React, { Component } from 'react';
import {FadeIn,BounceRight } from "animate-components";
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import UserBranches from './UserBranches';
import { Home } from '../../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../../global/Spinner';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import { toast } from 'react-toastify';
import { GitBranch } from 'react-feather';
import { refresh } from '../../../../store/actions/QuickRefresh';
import { quick_params } from '../../../../store/actions/QuickParams';
import { quick_param_name } from '../../../../store/actions/QuickParamName';
class ChangeUserBranch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details:"",
            div:"",
            loading:false,
            data:[],
            branch:""
        }
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listBranch`,{
               token: token
            })
           .then(res => {
           // console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }

      handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/users/createBranch`,{
                token:token,
                active:'yes',
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                branch_key:this.state.branch,
              })
               .then(res => {
                // console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                    this.props.dispatch(toast_trigger(true)); 
                    this.props.dispatch(quick_param_name("BRANCH"));
                    this.props.dispatch(quick_params(true)); 
                    this.QuickSwitcher('WHOCODED_UB_LIST');
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                    this.props.dispatch(toast_trigger(false)); 
                    this.props.dispatch(refresh('')); 
                }
                 
               })
                .catch(err =>
                    this.ErrorHandler(err)
               //console.log(err.response.data.message),
              );
        }         
     }
     ErrorHandler=(message)=>{
        //console.clear();
        console.log('error')
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
    
    componentDidMount(){
        this.LoadData()
    }
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
    }
    Switcher=()=>{
        if (this.props.data.quick_switch === 'WHOCODED_UB_EDIT') {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
                             <h6 className="lh-5 mg-b-0">Change Branch  <button onClick={()=>this.QuickSwitcher('WHOCODED_UB_LIST')} className="btn btn-sm btn-outline-danger  pull-right">Cancel</button></h6>
                             
                             <div className="mt-5">
                                 <BounceRight duration="1s" timingFunction="ease-out">
                                <center>
                                <GitBranch color="#0567d2" size={100} />
                                </center>
                                </BounceRight>
                                <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                     <label>Select another branch</label>
                                     <select 
                                    required
                                    value={this.state.branch}
                                    onChange={this.handleChange}
                                    className="form-control st-login-f"
                                    name="branch"
                                    >
                                        <option value="">Select one</option>
                                        {this.state.data.length > 0 ?
                                    this.state.data.map(dep=>
                                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                                        )  
                                    :''}
                                    </select>
                                 </div>
                                 
                                 <div className="form-group">
                                 {this.state.loading ?
                                    <Spinner size={40} />
                                :
                                <button className="btn btn-primary2 shadow">Change branch for user</button>
                                }
                                 </div>
                                 </form>
                             </div>
                            
 
                             
                         </div>
                     </div>
                     </FadeIn>;
        }else{
            return <UserBranches />
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

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }
export default connect(mapStoreToProps) (ChangeUserBranch);