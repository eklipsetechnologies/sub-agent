import React, { Component } from 'react';
import { BounceUp,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {ArrowLeft } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { quick_params } from '../../../store/actions/QuickParams';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import Toaster from '../../../global/Toaster';


class EmployeeEditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            details:"",
            type:"Employees",
            startDate: new Date(),
            religion:"",
            phone:"",
            email:"",
            p_address:"",
            r_address:"",
            languages:"",
            hobbies:"",
            height:"",
            weight:"",
            fetching:false,
            first_name:"",
            middle_name:"",
            surename:"",
            marital_status:""
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.LoadData();
              this.props.dispatch(quick_params(event.target.value))
          }
        }
      }


    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}${this.props.other === 'WHOCODED'?'auth/users/viewUser':'auth/profile/me'}`,{
               token: token,
               id:this.props.id?this.props.id:0
            })
           .then(res => {
            //console.log(res);
           this.setState({
            loading:false,
            details:res.data,
            religion:res.data.religion,
            phone:res.data.phone,
            email:res.data.email,
            p_address:res.data.p_address,
            r_address:res.data.r_address,
            languages:res.data.languages,
            hobbies:res.data.hobbies,
            height:res.data.height,
            weight:res.data.weight,
            first_name:res.data.first_name,
            middle_name:res.data.middle_name,
            surename:res.data.surname,
            marital_status:res.data.marital_status,
        });
           })
        .catch(err =>console.log(err));
        }
    }
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    HandleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true})
            Axios.post(`${Home}auth/profile/editWithoutApproval`,{
                token:token,
                religion:this.state.religion,
                phone:this.state.phone,
                email:this.state.email,
                p_address:this.state.p_address,
                r_address:this.state.r_address,
                languages:this.state.languages,
                hobbies:this.state.hobbies,
                height:this.state.height,
                weight:this.state.weight,
                id:this.props.id?this.props.id:null
              })
               .then(res => {
                 console.log(res);
                 this.setState({fetching:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.props.dispatch(quick_params(!this.props.data.quick_params)); 
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
               })
                .catch(err =>
                    this.ErrorHandler(err,'Error')
              );
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

     HandleSubmit2=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true})
            Axios.post(`${Home}auth/profile/req/createReqBasic`,{
                token:token,
                id:this.props.id?this.props.id:null,
                first_name:this.state.first_name,
                middle_name:this.state.middle_name,
                surename:this.state.surename,
                marital_status:this.state.marital_status,
                dob:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
              })
               .then(res => {
                // console.log(res);
                 this.setState({fetching:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.props.dispatch(quick_params(!this.props.data.quick_params)); 
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
               })
                .catch(err =>
                    this.ErrorHandler(err,'Error')
              );
        }         
     }

    componentDidMount(){
        this.props.dispatch(quick_params(this.state.type))
        this.LoadData()
    }
    render() {
        //console.log(this.props)
        return (
            <>
            <Toaster />
            <BounceUp duration="1s" timingFunction="ease-out">
                <div className="card border-0 mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Edit profile details</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={this.props.close} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Close Edit</button>
                            
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                </div>
                </div>
                

                {this.state.loading ? 
                <div className="p-5">
                    <Spinner size={70} />
                </div>
                
            :
            <>
            <FadeIn duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                    <form onSubmit={this.HandleSubmit} className="card-body">
                    <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">{this.props.other === 'WHOCODED' ? 'Basic Details (1st Section)':'Changes without approval'}</h6>
                    </div>
                    <div className="col-md-7">
                        
                    </div>
                </div>

                <form className="mt-4 row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Religion</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.religion}
                        name="religion"
                        onChange={this.handleChange}
                        placeholder="Religion"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Phone Number</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.phone}
                        name="phone"
                        onChange={this.handleChange}
                        placeholder="Phone Number"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Email Address</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.email}
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                        placeholder="Email Address"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Residential Address</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.r_address}
                        name="r_address"
                        type="address"
                        onChange={this.handleChange}
                        placeholder="Address"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Postal Address</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.p_address}
                        name="p_address"
                        type="address"
                        onChange={this.handleChange}
                        placeholder="Address"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Languages Known</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.languages}
                        name="languages"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Languages Known"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Hobbies</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.hobbies}
                        name="hobbies"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Languages Known"
                        />
                     </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Height</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.height}
                        name="height"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Height"
                        />
                     </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                        <label>Weight</label>
                        <input
                        className="form-control st-login-f"
                        value={this.state.weight}
                        name="weight"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Weight"
                        />
                     </div>
                    </div>
                    
                </form>
                <div className="form-group">
                {this.state.fetching?
                    <Spinner size={40} />
                      :
                 <button className="btn btn-primary2 btn-block shadow">Save Changes</button>
                                }
                                 
                </div>
                    </form>
                </div>
            </FadeIn>

<FadeIn duration="1s" timingFunction="ease-out">
<div className="card border-0 mt-4 mb-5">
    <form onSubmit={this.HandleSubmit2} className="card-body">
    <div className="row">
    <div className="col-md-5">
    <h6 class="lh-5 mg-b-0">{this.props.other === 'WHOCODED' ?'Basic details (2nd Section)':'Changes with approval'}</h6>
    </div>
    <div className="col-md-7">
        
    </div>
</div>

<form className="mt-4 row">
    <div className="col-md-4">
        <div className="form-group">
        <label>First Name</label>
        <input
        className="form-control st-login-f"
        value={this.state.first_name}
        name="first_name"
        onChange={this.handleChange}
        placeholder="First Name"
        />
     </div>
    </div>
    <div className="col-md-4">
        <div className="form-group">
        <label>Middle Name</label>
        <input
        className="form-control st-login-f"
        value={this.state.middle_name}
        name="middle_name"
        onChange={this.handleChange}
        placeholder="Middle Name"
        />
     </div>
    </div>
    <div className="col-md-4">
        <div className="form-group">
        <label>Surname</label>
        <input
        className="form-control st-login-f"
        value={this.state.surename}
        name="surename"
        onChange={this.handleChange}
        placeholder="SurName"
        />
     </div>
    </div>
    <div className="col-md-6">
        <div className="form-group">
        <label>Marital Status</label>
        <input
        className="form-control st-login-f"
        value={this.state.marital_status}
        name="marital_status"
        onChange={this.handleChange}
        placeholder="Marital Status"
        />
     </div>
    </div>
    <div className="col-md-6">
        <div className="form-group">
        <label>Date of birth</label>
        <DatePicker 
          required
          calendarClassName="rasta-stripes "
          className="red-border form-control"
          selected={this.state.startDate} 
          onChange={date => this.onChange2(date)} />
     </div>
    </div>
    
    
</form>
<div className="form-group">
{this.state.fetching?
    <Spinner size={40} />
      :
 <button className="btn btn-primary2 btn-block shadow">{this.props.other ==='WHOCODED'?'Save Changes':'Submit change request'}</button>
                }
                 
</div>
    </form>
</div>
<div className="p-5"></div>
</FadeIn>
</>
                
            }
                
               
                
            
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

export default connect(mapStoreToProps) (EmployeeEditProfile);