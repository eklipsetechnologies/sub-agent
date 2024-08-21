import React, { Component } from 'react';
import {FadeIn,BounceRight } from "animate-components";
import security from '../../../../assets/svg/whocoded_security.svg'
import secured from '../../../../assets/svg/whocoded_secured.svg'
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';
import Toaster from '../../../../global/Toaster';
import Certificates from './Certificates';
import { quick_param_name } from '../../../../store/actions/QuickParamName';
import { quick_params } from '../../../../store/actions/QuickParams';


class AddCertificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            license:"",
            details:"",
            div:"",
            startDate: new Date(),
            startDate2: new Date(),
            fname:"",
            qualification:"",
            degree:"",
            program:""
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
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
            Axios.post(`${Home}auth/profile/createCertificates`,{
                token:token,
                id:this.props.data.userDetails.hr ? this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null,
                institution:this.state.fname,
                course:this.state.program,
                other:this.state.license,
                certificate:this.state.qualification,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_ED_LIST');
                   this.props.dispatch(quick_param_name("CERT"));
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
            Axios.post(`${Home}auth/profile/req/ReqcreateCertificates`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                institution:this.state.fname,
                course:this.state.program,
                other:this.state.license,
                type:1,
                certificate:this.state.qualification,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_ED_LIST');
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
        if (this.props.data.quick_switch === 'WHOCODED_ED_EDIT') {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
                         <h6 className="lh-5 mg-b-0">{this.props.data.userDetails.employee === 2 ? 'Request Add Certification' :'Add Certification'}  <button onClick={()=>this.QuickSwitcher('WHOCODED_S_LIST')} className="btn btn-sm btn-outline-danger  pull-right">Cancel</button></h6>
                             {this.state.div === "WHOCODED_SECURED"?
                             this.props.data.userDetails.employee === 2 ?

                             <form onSubmit={this.RequestNext} className="mt-5">
                                 <BounceRight duration="1s" timingFunction="ease-out">
                                <center>
                                    <img className="img-fluid empty-width" src={secured} />
                                </center>
                                </BounceRight>
                                <div className="form-group">
                                     <label>Institutal body</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.fname} 
                                     className="form-control" name="fname"
                                      placeholder="Institution" />
                                 </div>
                                 <div className="form-group">
                                     <label>Certification obtained</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.qualification} 
                                     className="form-control" name="qualification"
                                      placeholder="Certification" />
                                 </div>
                                 <div className="form-group">
                                     <label>Field/Course</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.program} 
                                     className="form-control" name="program"
                                      placeholder="Program" />
                                 </div>
                                 <div className="form-group">
                                     <label>License/Qualification date</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.license} 
                                     className="form-control" name="license"
                                      placeholder="" />
                                 </div>
                                 <div className="form-group">
                                        <label>Expiry Date </label>
                                        <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
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
                                     <label>Institutal body</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.fname} 
                                     className="form-control" name="fname"
                                      placeholder="Institution" />
                                 </div>
                                 <div className="form-group">
                                     <label>Certification obtained</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.qualification} 
                                     className="form-control" name="qualification"
                                      placeholder="Certification" />
                                 </div>
                                 <div className="form-group">
                                     <label>Field/Course</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.program} 
                                     className="form-control" name="program"
                                      placeholder="Program" />
                                 </div>
                                 <div className="form-group">
                                     <label>License/Qualification date</label>
                                     <input 
                                     onChange={this.handleChange}
                                     value={this.state.license} 
                                     className="form-control" name="license"
                                      placeholder="" />
                                 </div>
                                 <div className="form-group">
                                        <label>Expiry Date </label>
                                        <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                    </div>
                                  
                                 <div className="form-group">
                                     {this.state.loading?
                                     <Spinner size={40} />
                                    :
                                    <button className="btn btn-primary2 btn-block shadow">Add Now</button>
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
            return <Certificates />
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
export default connect(mapStoreToProps) (AddCertificate);