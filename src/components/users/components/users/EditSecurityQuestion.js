import React, { Component } from 'react';
import {FadeIn,BounceRight } from "animate-components";
import security from '../../../../assets/svg/whocoded_security.svg'
import secured from '../../../../assets/svg/whocoded_secured.svg'
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import SecurityQuestions from './SecurityQuestions';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import { toast } from 'react-toastify';
import Toaster from '../../../../global/Toaster';
import Spinner from '../../../../global/Spinner';
import { quick_param_name } from '../../../../store/actions/QuickParamName';
import { quick_params } from '../../../../store/actions/QuickParams';
class EditSecurityQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details:"",
            div:"",
            question:"",
            title:"",
            data:[]
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
            Axios.post(`${Home}auth/profile/createSecurityAnswer`,{
                token:token,
                id:this.state.question,
                name:this.state.title,
                idd:this.props.data.userDetails.hr ? this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null,
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_S_LIST');
                   this.props.dispatch(quick_param_name("QU"));
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

     LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listSecurityQuestion`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
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
    componentDidMount(){
        this.LoadData()
    }
    
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
    }
    Switcher=()=>{
        if (this.props.data.quick_switch === 'WHOCODED_S_EDIT') {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
        <h6 className="lh-5 mg-b-0">{this.props.data.userDetails.employee == 2 ? 'Request Add Security Questions ' :'Add Security Questions '} <button onClick={()=>this.QuickSwitcher('WHOCODED_S_LIST')} className="btn btn-sm btn-outline-danger  pull-right">Cancel</button></h6>
                             {this.state.div === "WHOCODED_SECURED"?
                             this.props.data.userDetails.employee == 2 ?

                             <form onSubmit={this.RequestNext} className="mt-5">
                                 <BounceRight duration="1s" timingFunction="ease-out">
                                <center>
                                    <img className="img-fluid empty-width" src={secured} />
                                </center>
                                </BounceRight>
                                <div className="form-group">
                                     <label>Security question</label>
                                     <select 
                                        required
                                        value={this.state.question}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="question" >
                                            <option value="">Select</option>
                                            {this.state.data.length > 0 ?
                                          this.state.data.map(qu=>
                                          <option key={qu.id} value={qu.id}>{qu.name}</option>
                                            )  
                                        :''}
                                        </select>
                                 </div>
                                 <div className="form-group">
                                     <label>Answer</label>
                                     <input 
                                        required
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="title" placeholder="Title" />
                                 </div>
                                 
                                 <div className="form-group">
                                     {this.state.loading ?
                                     <Spinner size={30} />
                                    :
                                    <button type="submit" className="btn btn-primary2 btn-block shadow">Confirm Password</button>
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
                                 <label>Security question</label>
                                 <select 
                                    required
                                    value={this.state.question}
                                    onChange={this.handleChange}
                                    className="form-control st-login-f"
                                    name="question" >
                                        <option value="">Select</option>
                                        {this.state.data.length > 0 ?
                                      this.state.data.map(qu=>
                                      <option key={qu.id} value={qu.id}>{qu.name}</option>
                                        )  
                                    :''}
                                    </select>
                             </div>
                             <div className="form-group">
                                 <label>Answer</label>
                                 <input 
                                    required
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    className="form-control st-login-f"
                                    name="title" placeholder="Title" />
                             </div>
                             
                             <div className="form-group">
                                 <button type="submit" className="btn btn-primary2 btn-block shadow">Submit Now</button>
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
            return <SecurityQuestions />
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
export default connect(mapStoreToProps) (EditSecurityQuestion);