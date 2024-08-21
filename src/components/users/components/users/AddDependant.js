import React, { Component } from 'react';
import {FadeIn,BounceRight } from "animate-components";
import security from '../../../../assets/svg/whocoded_security.svg'
import secured from '../../../../assets/svg/whocoded_secured.svg'
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import Dependant from './Dependant';
import Spinner from '../../../../global/Spinner';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Toaster from '../../../../global/Toaster';
import { quick_param_name } from '../../../../store/actions/QuickParamName';
import { quick_params } from '../../../../store/actions/QuickParams';
class AddDependant extends Component {
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
            Axios.post(`${Home}auth/profile/createDependant`,{
                token:token,
                id:this.props.data.userDetails.hr ? this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null,
                email:this.state.email,
                phone:this.state.phone,
                r_address:this.state.address2,
                p_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship
              })
               .then(res => {
                 //console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_E_LIST');
                   this.props.dispatch(quick_param_name("DEP"));
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
            Axios.post(`${Home}auth/profile/req/ReqcreateDependant`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                email:this.state.email,
                phone:this.state.phone,
                r_address:this.state.address2,
                p_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship,
                type:1,
              })
               .then(res => {
                 //console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_E_LIST');
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
        if (this.props.data.quick_switch === 'WHOCODED_E_EDIT') {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
        <h6 className="lh-5 mg-b-0">{this.props.data.userDetails.employee === 2 ? 'Request Add Dependant' :'Add Dependant'}  <button onClick={()=>this.QuickSwitcher('WHOCODED_S_LIST')} className="btn btn-sm btn-outline-danger  pull-right">Cancel</button></h6>
                             {this.state.div === "WHOCODED_SECURED"?
                             this.props.data.userDetails.employee === 2 ?
                             <form onSubmit={this.RequestNext} className="mt-5">
                             <BounceRight duration="1s" timingFunction="ease-out">
                            <center>
                                <img className="img-fluid empty-width" src={secured} />
                            </center>
                            </BounceRight>
                            <div className="form-group">
                                 <label>First Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.fname} 
                                 className="form-control" name="fname"
                                  placeholder="First Name" />
                             </div>
                             <div className="form-group">
                                 <label>Middle Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.mname} 
                                 className="form-control" name="mname"
                                  placeholder="Middle Name" />
                             </div>
                             <div className="form-group">
                                 <label>SurName</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.sname} 
                                 className="form-control" name="sname"
                                  placeholder="SurName" />
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
                             <div className="form-group">
                                 <label>Relationship</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.relationship} 
                                 required
                                 className="form-control" name="relationship"
                                  placeholder="Relationship" />
                             </div>
                             <div className="form-group">
                                 <label>Postal Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address} 
                                 className="form-control" name="address"
                                  placeholder="Postal Address" />
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
                                <button className="btn btn-primary2 btn-block shadow">Submit Request</button>
                                }
                                 
                             </div>
                         </form>
                             :

                             <form onSubmit={this.handleSubmit} className="mt-5">
                             <BounceRight duration="1s" timingFunction="ease-out">
                            <center>
                                <img className="img-fluid empty-width" src={secured} />
                            </center>
                            </BounceRight>
                            <div className="form-group">
                                 <label>First Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.fname} 
                                 className="form-control" name="fname"
                                  placeholder="First Name" />
                             </div>
                             <div className="form-group">
                                 <label>Middle Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.mname} 
                                 className="form-control" name="mname"
                                  placeholder="Middle Name" />
                             </div>
                             <div className="form-group">
                                 <label>SurName</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.sname} 
                                 className="form-control" name="sname"
                                  placeholder="SurName" />
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
                             <div className="form-group">
                                 <label>Relationship</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.relationship} 
                                 required
                                 className="form-control" name="relationship"
                                  placeholder="Relationship" />
                             </div>
                             <div className="form-group">
                                 <label>Postal Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address} 
                                 className="form-control" name="address"
                                  placeholder="Postal Address" />
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
                                <button className="btn btn-primary2 btn-block shadow">Save Now</button>
                                }
                                 
                             </div>
                         </form>
                             
                            :
                            <div className="mt-5">
                                <BounceRight duration="1s" timingFunction="ease-out">
                                 <center>
                                     <img className="img-fluid empty-width" src={security} />
                                 </center>
                                 </BounceRight>
                                 <div className="form-group">
                                     <label>Enter Your password</label>
                                     <input className="form-control" name="password" placeholder="Password" />
                                 </div>
                                 <div className="form-group">
                                     <button onClick={()=>this.setState({div:"WHOCODED_SECURED"})} className="btn btn-primary2 btn-block shadow">Confirm Password</button>
                                 </div>
                             </div>
                            }
 
                             
                         </div>
                     </div>
                     </FadeIn>;
        }else{
            return <Dependant />
        }
    }
    render() {
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
export default connect(mapStoreToProps) (AddDependant);