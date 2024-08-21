import React,{Component} from 'react';
import { connect } from "react-redux";
import { login_layout } from "../store/actions/LoginLayout";
import { Key, Mail } from 'react-feather';
import Particles from 'react-particles-js';
import Spinner from '../global/Spinner';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Home } from '../global/Home';
import Toaster from '../global/Toaster';
import img from '../assets/img/h.png'
import img2 from '../assets/img/LOGOW.png'
import { BounceUp,FadeIn } from "animate-components";
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
        super(props);
        this.state ={
            switch:"",
            email:"",
            password:"",
            loading:false
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

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }

      handleSubmit=(event)=>{
         event.preventDefault();
         this.setState({loading:true});
          Axios.post(`${Home}auth/login`,{
            type:2,
            email:this.state.email,
            password:this.state.password,
            remember_me:"yes"
          })
           .then(res => {
             console.log(res);
             this.setState({loading:false,});
             if (res.data.success) {
                localStorage.setItem('userToken',JSON.stringify(res.data.token));
                this.props.history.push('/dashboard');
                
             }else{
                this.ErrorHandler(res.data.message);
             }
             
           })
            .catch(err =>
                this.ErrorHandler(err)
           //console.log(err.response.data.message),
          );
         
      }

    Switch=(name)=>{
        this.setState({switch:name});
    }

    componentDidMount(){
        this.props.dispatch(login_layout('STEPHEN_WHOCODED'));
    }

    componentWillUnmount(){
        this.props.dispatch(login_layout(''))
        
    }
    render() {
        return (
            <div className="st-h-100">
                <Toaster />
                {/* <div className="ss-m ssdds">
                    <div className="container sufu">
                    <form onSubmit={this.handleSubmit} className=" ">
                        <h2 className="text-primary mg-b-5 text-center">Sign In</h2>
                        <p className="text-primary22 tx-16 mg-b-40 text-center">on your account</p>
                            <div className="form-group">
                                <label className="text-primary22">Email Address</label>
                                <input 
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                                autoFocus={true} 
                                type="email" 
                                required
                                className="form-control st-login-f" 
                                id="inlineFormInputGroup" placeholder="Email Address"/>
                            </div>
                            <div className="form-group">
                                <label className="text-primary22">Password</label>
                                <input 
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                required
                                 className="form-control st-login-f" 
                                 id="inlineFormInputGroup"
                                  placeholder="Email Address"/>
                            </div>
                            <div className="form-group">
                                {this.state.loading ? 
                                <Spinner size={40} />
                            :
                            this.state.password.length > 0 && this.state.email.length > 0 ?
                            <button type="submit" className="btn btn-primary st-btn shadow btn-block"> <strong>Sign In</strong></button>
                            :
                            <button type="button" disabled={true} className="btn btn-primary st-btn shadow btn-block"> <strong>Sign In</strong></button>
                            }
                                
                            </div>
                        </form>
                        
                    </div>
                </div> */}
                <div className="row ss-dd">

                <div className="col-md-6 bg--b st-h-100 ">
                        <div className="bgbg"></div>
                    <div className="ss-d">
                        
                    <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 200,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 4,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />

                    </div>
                    <BounceUp duration="4s" timingFunction="ease-out">
                        <div className="img-container-block ss-d">
                            <img style={{width:'300px'}} className="img-container-inline" src={img} />
                            {/* <span className="whocoded-glow2"></span> */}
                        </div>
                    </BounceUp>
                    
                    </div>


                    <div className="col-md-6 App-header ">
                        
                        <form onSubmit={this.handleSubmit} className="container content content-fixed content-auth-alt login-f " style={{marginTop: '-17px',}}>
                        <div className="text-primary2 mg-b-5 text-left st-hhd">Create an account</div>
                        <p className="text-primary22 tx-16 mg-b-40 text-left">It's free to signup and only takes a minute.</p>
                        <div className="form-group">
                                <label className="text-primary22 st-label">FULL NAME</label>
                                <input 
                                onChange={this.handleChange}
                                name="name"
                                value={this.state.name}
                                autoFocus={true} 
                                type="text" 
                                required
                                className="form-control st-login-f" 
                                id="inlineFormInputGroup" placeholder="Enter your full name"/>
                            </div>
                            <div className="form-group">
                                <label className="text-primary22 st-label">EMAIL ADDRESS</label>
                                <input 
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                                type="email" 
                                required
                                className="form-control st-login-f" 
                                id="inlineFormInputGroup" placeholder="Enter your email address"/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label className="text-primary22 st-label">PHONE NUMBER</label>
                                    <input 
                                    onChange={this.handleChange}
                                    name="phone"
                                    value={this.state.phone}
                                    type="number" 
                                    required
                                    className="form-control st-login-f" 
                                    id="inlineFormInputGroup" placeholder="Enter your phone number"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                    <label className="text-primary22 st-label">SELECT GENDER</label>
                                    <select 
                                     style={{width:'87%'}}
                                    onChange={this.handleChange}
                                    name="gender"
                                    value={this.state.gender}
                                    type="gender" 
                                    required
                                    className="form-control st-login-f2" 
                                    id="inlineFormInputGroup">
                                        <option value="">SELECT GENDER</option>
                                        <option value="Male">MALE</option>
                                        <option value="Female">FEMALE</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-primary22 st-label">Password</label>
                                <input 
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                                required
                                 className="form-control st-login-f" 
                                 id="inlineFormInputGroup"
                                  placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                {this.state.loading ? 
                                <Spinner size={55} />
                            :
                            this.state.password.length > 0 && this.state.email.length > 0 ?
                            <button type="submit" className="btn btn-primary st-btn shadow btn-block"> LOGIN</button>
                            :
                            <button type="button" disabled={false} className="btn btn-primary st-btn shadow btn-block"> LOGIN</button>
                            }
                                
                            </div>
                            <div className="text-primary22 tx-13 mg-t-20 tx-center" style={{fontWeight:'900'}}>Already have an account? <Link to="/login">Sign In</Link></div>
                            {/* <div className="text-primary22 tx-13 mg-t-20 tx-center" style={{fontWeight:'900'}}>Don't have an account? <Link to="/register">Create an account</Link></div> */}
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (Register);
