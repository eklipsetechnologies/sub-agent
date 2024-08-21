import React, { Component } from 'react';
import {FadeIn,BounceRight } from "animate-components";
import security from '../../../../assets/svg/whocoded_security.svg'
import secured from '../../../../assets/svg/whocoded_secured.svg'
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import NextOfKin from './NextOfKin';
import Spinner from '../../../../global/Spinner';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import { toast } from 'react-toastify';
import Toaster from '../../../../global/Toaster';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import { quick_param_name } from '../../../../store/actions/QuickParamName';
import { quick_params } from '../../../../store/actions/QuickParams';
class EditNextOfKin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details:"",
            div:"",
            fname:"",
            mname:"",
            sname:"",
            loading:false,
            email:"",
            phone:"",
            address:"",
            address2:"",
            relationship:""
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
            this.setState({loading:true});
            Axios.post(`${Home}enter-ps/user/updateKin`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[0]._id : 0,
                email:this.state.email,
                phone_number:this.state.phone,
                r_address:this.state.address2,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                last_name:this.state.sname,
                gender:this.state.gender
              },{
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                //    this.QuickSwitcher('WHOCODED_NK_LIST');
                   this.props.dispatch(quick_param_name("NEXT"));
                    this.props.dispatch(quick_params(true)); 
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
               })
                .catch(err =>
                    this.ErrorHandler(err)
               //console.log(err.response.data.message),
              );
        }
        
     }


     RequestNext=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/req/ReqcreateNextOfKin`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                email:this.state.email,
                phone_number:this.state.phone,
                r_address:this.state.address2,
                p_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship,
                type:1
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_NK_LIST');
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
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
        console.log(message)
        this.setState({loading:false})
        toast.error(message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
    }
    
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
    }
    Switcher=()=>{ 
        if (this.props.data.quick_switch !== 'WHOCODED_NK_EDIT') {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
                         <h6 className="lh-5 mg-b-0">{this.props.data.userDetails.employee === 2 ? 'Request Add Next of Kin' :'Edit Next of Kin Details'} <button onClick={()=>this.QuickSwitcher('WHOCODED_NK_LIST')} className="btn btn-sm btn-outline-danger  pull-right">Cancel</button></h6>
                         <form onSubmit={this.handleSubmit} className="mt-5">
                             
                             <div className="form-group">
                                  <label>First Name</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.fname} 
                                  className="form-control" name="fname"
                                   placeholder="First Name" />
                              </div>
                              <div className="form-group">
                                  <label>Last Name</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.sname} 
                                  className="form-control" name="sname"
                                   placeholder="Last Name" />
                              </div>
                              <div className="form-group">
                                  <label>Other Name</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.mname} 
                                  className="form-control" name="mname"
                                   placeholder="Middle Name" />
                              </div>
                              
                              <div className="form-group">
                                  <label>Email</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.email} 
                                  className="form-control" name="email"
                                   placeholder="Email" />
                              </div>
                              <div className="form-group">
                                  <label>Phone Number</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.phone} 
                                  className="form-control" name="phone"
                                   placeholder="Phone Number" />
                              </div>
                              <div className="form-group mb-5">
                                  <label>Gender</label>
                                  <select 
                                  style={{
                                     width:"97%"
                                  }}
                                  onChange={this.handleChange}
                                  value={this.state.gender} 
                                  required
                                  className="form-control" name="gender"
                                   placeholder="Relationship">
                                     <option>Select</option>
                                     <option value={"Male"}>Male</option>
                                     <option value={"Female"}>Female</option>
                                   </select>
                              </div>
                              <div className="form-group">
                                  <label>Resitendial Address</label>
                                  <input 
                                  onChange={this.handleChange}
                                  value={this.state.address2} 
                                  className="form-control" name="address2"
                                   placeholder="Resitendial Address" />
                              </div>
                              <div className="form-group">
                                  {this.state.loading?
                                  <Spinner size={40} />
                                 :
                                 <button className="btn btn-primary btn-block shadow">Save Now</button>
                                 }
                                  
                              </div>
                          </form>
 
                             
                         </div>
                     </div>
                     </FadeIn>;
        }else{
            return <NextOfKin />
        }
    }

    componentDidMount(){
        if (this.props.data.params.length > 0) {
            let data = this.props.data.params[0];
           this.setState({
            email:data?.userProfile?.next_of_kin_email,
            phone:data?.userProfile?.next_of_kin_phoneLine1,
            address2:data?.userProfile?.next_of_kin_address,
            fname:data?.userProfile?.next_of_kin_lastName,
            mname:data?.userProfile?.next_of_kin_otherName,
            sname:data?.userProfile?.next_of_kin_firstName,
            gender:data?.userProfile?.next_of_kin_gender
           }) 
        }
    }
    render() {
    //   console.log(this.props.data.params.length > 0 ? this.props.data.params[0] : 0);
        return (
            <div>
                <Toaster />
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
export default connect(mapStoreToProps) (EditNextOfKin);