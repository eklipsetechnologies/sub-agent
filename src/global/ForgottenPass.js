import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import {Home} from '../global/Home';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
// import Toaster from '../components/response/Toaster';

class ForgottenPass extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            status: true,
          home:false,
          sroller:false,
          login:true,
          startDate: new Date(),
          email:"",
          REmail:"",
          fetching:false,
          type:[],
          switch:"",
          code:"",
          password:"",
          switch2:""
        }
        this.changeStyle = this.changeStyle.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
      }
  
  
      onChange2 = startDate => this.setState({ startDate })
  
      handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }
  
      ChaneBTN =(bool)=>{
        this.setState({formReady:bool});
     }
  
     handleError = (name)=>{
      this.ChaneBTN(false);
    
    
      if (name === 'email') {
          if (!validator.isEmail(this.state.email)) {
            this.setState({isEmail:"Not a valid email"})
          }else{
            
              this.setState({isEmail:""});
          }
  
  
      }else if(name === 'password'){
          if (validator.isEmpty(this.state.password)) {
            this.setState({isPassword:"Password cant be empty"})
          }else{
            this.setState({isPassword:""})
          }
      }else if(name === 'firstName'){
          if (validator.isEmpty(this.state.firstName)) {
            this.setState({isFirstName:"First Name is required"})
          }else if(!validator.isAlpha(this.state.firstName)){
            this.setState({isFirstName:"Only Aphabets is allowed"})
          }else{
            this.setState({isFirstName:""})
          }
  
      }else if(name === 'lastName'){
        if (validator.isEmpty(this.state.lastName)) {
            this.setState({isLastName:"Last Name is required"})
          }else if(!validator.isAlpha(this.state.lastName)){
            this.setState({isLastName:"Only Aphabets is allowed"})
          }else{
            this.setState({isLastName:""})
          }
  
    }else if(name === 'gender'){
      if (this.state[name] === "") {
        this.setState({isGender:"Gender is required"})
      }else{
        this.setState({isGender:""})
      }
  }
    
      if (!this.state.login) {
        if (validator.isEmail(this.state.email) || validator.isEmpty(this.state.password) || validator.isEmpty(this.state.firstName) || !validator.isAlpha(this.state.firstName)
        || validator.isEmpty(this.state.lastName)  || !validator.isAlpha(this.state.lastName)) {
          return false;
        }else{
          return true;
        }
      }else{
     
        if (validator.isEmail(this.state.email) || validator.isEmpty(this.state.password)) {
          return false;
        }else{
          return true;
        }
  
      }
      
    
    }
    
  
    NewValidation=()=>{
        if (!validator.isEmail(this.state.email)) {
          this.setState({isEmail:"Not a valid email",})
        }else{
          this.setState({isEmail:""})
        }
        if (!validator.isEmail(this.state.email)) {
          return false;
        }else{
          return true;
        }
    }
  
    NewValidation2=()=>{
      if (!validator.isNumeric(this.state.email)) {
        this.setState({isNumber:"Not a valid number",})
      }else{
        this.setState({isNumber:""})
      }
      if (!validator.isNumeric(this.state.email)) {
        return false;
      }else{
        return true;
      }
  }
  
    handleSubmit = (event) =>{
      event.preventDefault();
      const check = true;
  
      let validation = this.NewValidation();
        if (!validation) {
          return false;
        }
        this.setState({fetching: true});
        axios.post(Home+`ResetPassword`, 
        { 
          type:1,
          email: this.state.email,
         })
         .then(res => {
  
          this.setState({fetching: false});
         if(res.data.success){
          const details = res.data;
          this.setState({REmail:details.email,type:1,switch:"WHOCODED"});
          
         }else{
           this.setState({type:0})
            toast.error(res.data.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false
              });
         }
        })
    }
  
  
    handleSubmit2 = (event) =>{
      event.preventDefault();
        this.setState({fetching: true});
        axios.post(Home+`checkcode`, 
        { 
          type:1,
          email: this.state.email,
          code:this.state.code
         })
         .then(res => {
  
          this.setState({fetching: false});
         if(res.data.success){
          const details = res.data;
          this.setState({REmail:details.email,type:1,switch:"WHOCODED_RESET"});
          
         }else{
           this.setState({type:0})
            toast.error(res.data.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false
              });
         }
        })
    }
  
  
    handleSubmit3 = (event) =>{
      event.preventDefault();
        this.setState({fetching: true});
        axios.post(Home+`changepassword`, 
        { 
          type:1,
          email: this.state.email,
          code:this.state.code,
          password:this.state.password
         })
         .then(res => {
  
          this.setState({fetching: false});
         if(res.data.success){
          const details = res.data;
          this.setState({REmail:details.email,type:1,switch:"WHOCODED_RESET",switch2:"WHOCODED_DONE"});
          
         }else{
           this.setState({type:0})
            toast.error(res.data.message,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false
              });
         }
        })
    }
  
      LoadHome(){
          this.setState({home:true});
      }
  
      
  
    changeStyle(){
        if (this.state.style === 'st-imgbg3') {
          this.setState({style:"st-imgbg2"});
        }else if (this.state.style === 'st-imgbg2') {
          this.setState({style:"st-imgbg3"});
        }
      
   }
  
   trackScrolling = () => {
    if (window.pageYOffset >= 200) {
      this.setState({sroller:true});
    }else{
      this.setState({sroller:false});
    }
  }
  
  

  
  switchtabs(bool){
    if (bool) {
      this.setState({login:bool});
    }else{
      this.setState({login:bool});
    }
  }
  
  handleChangeDate(date) {
    this.setState({
        startDate: date,
    });
  }
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }
    componentDidMount(){
          this.interval = setTimeout(() => this.changeStyle('show'), 5);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }

        
    render() {
        return (
            <div>
                <div className={'modal effect-rotate-bottom '+this.state.style} id="exampleModalCenter"  role="dialog" style={{display:'block',background:'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <div style={{borderRadius:'10px'}} className="modal-content bg-white card explore-feature border-0 rounded bg-white shadow">
                    {/* <div className="modal-header">
                        <h4 className="modal-title">Recover your password</h4>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                    <div className="modal-bod bg-">
                      <form>
                      <div>
                           {this.state.switch ==='WHOCODED' ?
                           
                           <form onSubmit={this.handleSubmit2}>
                       <div style={{borderRadius:'10px'}} className="ui-block card shadow-lg">
                           <div className="ui-block-title card-body">
                               <h5 className="title text-primary2">Enter the reset code</h5>
                           </div>
                           <div className="ui-block-cont">

                              
                              {this.state.fetching ?
                              <Spinner />
                            :''}
                               <div className="form-group">
                                    <label className="control-label st-label">Enter the reset code sent to you email</label> 
                                    <input 
                                    name="code"
                                    className={this.state.emailError+' form-control st-login-f'} 
                                    placeholder="" type="number"
                                    value={this.state.code}
                                    onChange={this.handleChange}
                                    required
                                    />
                                    <small className="text-danger">{this.state.isEmail}</small>
                                 </div>

                               <div className="form-group">
                               {this.state.fetching ?
                               <button type="button" className="btn btn-lg btn-primary btn-block">Loading...</button>
                            :
                            <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
                            }
                            <center>
                             <Link onClick={this.props.close} to="#" className="forgot text-danger">Close</Link>
                            </center>
                           
                                    
                                   </div>  
                           </div>
                       </div>
                    </form>

                        :""
                          }



                          {this.state.switch === 'WHOCODED_RESET' ?
                           
                           <form onSubmit={this.handleSubmit3}>
                       <div style={{borderRadius:'10px'}} className="ui-block card shadow-lg">
                           <div className="ui-block-title card-body">
                               <h5 className="title text-primary2">Reset your password</h5>
                           </div>
                           {this.state.switch2 === 'WHOCODED_DONE' ?
                           
                           <div className="ui-block-content card-body">
                                <center>
                                  {/* <img src={success} style={{width:'200px'}} className="img-fluid" /> */}
                                  <p className="mt-1">
                                    Password changed. You can login with your new password
                                  </p>
                                  <Link onClick={this.props.close} to="/" className="forgot text-danger mt-2">Close</Link>
                                </center>
                           </div>
                          :
                          
                           <div className="ui-block-content card-body">

                              
                              {this.state.fetching ?
                              <Spinner />
                            :''}
                               <div className="form-group">
                                    <label className="control-label st-label">Choose a new passord</label> 
                                    <input 
                                    name="password"
                                    className={this.state.emailError+' form-control st-login-f'} 
                                    placeholder="" type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                    />
                                    <small className="text-danger">{this.state.isEmail}</small>
                                 </div>

                               <div className="form-group">
                               {this.state.fetching ?
                               <button type="button" className="btn btn-lg btn-primary btn-block">Loading...</button>
                            :
                            <button className="btn btn-lg btn-primary btn-block">Submit</button>
                            }
                            <center>
                             <Link onClick={this.props.close} to="#" className="forgot text-danger">Close</Link>
                            </center>
                           
                                    
                                   </div>  
                           </div>
                   }
                       </div>
                    </form>

                        :""
                          }

                        {
                          this.state.switch ==='' ?
                        <form onSubmit={this.handleSubmit}>
                       <div style={{borderRadius:'10px'}} className="ui-block card shadow-lg">
                           <div className="ui-block-title card-body">
                               <h5 className="title text-primary2">Change Password</h5>
                           </div>
                           <div className="ui-block-content card-body">

                              
                              {this.state.fetching ?
                              <Spinner />
                            :''}
                               <div className="form-group label-floating">
                                    <label className="control-label st-label">Enter Your Email address</label> 
                                    <input 
                                    name="email"
                                    className={this.state.emailError+' form-control st-login-f sth-5'} 
                                    placeholder="" type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    onBlur={()=>this.NewValidation()}
                                    required
                                    />
                                    <small className="text-danger">{this.state.isEmail}</small>
                                 </div>

                               <div className="form-group">
                               {this.state.fetching ?
                               <button type="button" className="btn btn-lg btn-primary btn-block">Loading...</button>
                            :
                            <button onClick={this.handleSubmit} type="button" className="btn btn-lg btn-primary btn-block">Submit</button>
                            }
                            <center>
                             <Link onClick={this.props.close} to="#" className="forgot text-danger">Close</Link>
                            </center>
                                    
                                   </div>  
                           </div>
                       </div>
                    </form>
                   :''
                        }
                        
                       </div>
                      </form>
                    </div>
                    {/* <div className="modal-footer bg-white">
                        <button onClick={this.props.close} type="button" className="btn btn-sm st-btn shadow btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary st-btn btn-sm shadow" data-dismiss="modal">Submit Now</button>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ForgottenPass;