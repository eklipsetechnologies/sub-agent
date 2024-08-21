import React, { Component } from 'react';
import { BounceRight,FadeIn,Zoom } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../store/actions/SwitchContent';
import { props_params } from '../store/actions/PropsParams';
import {PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../store/actions/IsToast';
import { toast_trigger } from '../store/actions/ToastTrigger';
import { Home } from '../global/Home';
import Axios from 'axios';
import Spinner from '../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import { Link } from 'react-router-dom';


class GetStarted extends Component {
    constructor(props) {
        super(props);
        this.state ={
            startDate: new Date(),
            switch:"",
            name:"",
            loading:false,
            data:[],
            data2:[],
            details:[],
            lg:[],
            lgs:"",
            department:"",
            level:"",
            step:1,
            first_name:"",
            middle_name:"",
            surname:"",
            email:"",
            number:"",
            gender:"",
            religion:"",
            m_status:"",
            blood_group:"",
            r_address:"",
            local:"",
            state:"",
            country:"",
            languages:"",
            hobbies:"",
            height:"",
            weigth:"",
            nysc:"yes",
            nysc_certificate:"",
            nysc_year:"",
            dob:"",
            postal_address:"",
            user:"",
            dep:[],
            dep2:""
        }
    }

    LoadDatae=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listDepartment`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({dep:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(`${Home}hr/department/datatable`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data:res.data.data});
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

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'state') {
            if (this.state.details[event.target.value].lgas) {
                this.setState({lg:this.state.details[event.target.value].lgas})
            }
        }
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    handleSubmit=(event)=>{
        event.preventDefault();         
     }

     mainHandleSubmit=()=>{
        this.setState({loading:true})
        setTimeout(()=>{
            this.props.dispatch(launch_toaster('Profile Updates'));
            this.props.dispatch(toast_trigger(true));
            this.setState({step:1})
        },100)
        return
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/users/createUser`,{
                token:token,
                first_name:this.state.first_name,
                middle_name:this.state.middle_name,
                surname:this.state.surname,
                email:this.state.email,
                phone:this.state.number,
                gender:this.state.gender,
                religion:this.state.religion,
                marital_status:this.state.m_status,
                blood_group:this.state.blood_group,
                dob:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                r_address:this.state.r_address,
                p_address:this.state.postal_address,
                lga:this.state.lgs,
                state:this.state.details[this.state.state].id,
                country:this.state.country,
                languages:this.state.languages,
                hobbies:this.state.hobbies,
                height:this.state.height,
                weight:this.state.weigth,
                nysc:this.state.nysc,
                nysc_year:this.state.nysc_year,
                dep2:this.state.dep2,
                nysc_number:this.state.nysc_certificate,
                em:this.state.user === '3'?'1':null,
                hr:this.state.user === '1'?'1':null,
                lm:this.state.user === '2'?'1':null,
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.SwitchContent('',[0]);
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
                 
               })
                .catch(err =>
                    this.ErrorHandler(err,'Error')
               //console.log(err.response.data.message),
              );
        }         
     }

     ChangeStep=(number)=>{
            this.setState({step:number})
     }
     LeftButton=()=>{
        if (this.state.step === 1) {
            return <li class="disabled" aria-disabled="true">
            <a href="#" className="text-white" role="menuitem">Previous</a>
        </li>;

        }else if (this.state.step === 2) {
            return <li onClick={()=>this.ChangeStep(1)}  aria-disabled="false">
            <a href="#" role="menuitem">Previous</a>
        </li>;
        }else if (this.state.step === 3) {
            return <li onClick={()=>this.ChangeStep(2)}  aria-disabled="false">
            <a href="#" className="text-white" role="menuitem">Previous</a>
        </li>;
        }else if (this.state.step === 4) {
            return <li onClick={()=>this.ChangeStep(3)}  aria-disabled="false">
            <a href="#" className="text-white" role="menuitem">Previous</a>
        </li>;
        }
     }


     RightButton=()=>{
        if (this.state.step === 1) {
            return <li onClick={()=>this.ChangeStep(2)} aria-disabled="false">
            <a href="#" className="text-white" role="menuitem">Next</a>
        </li>;

        }else if (this.state.step === 2) {
            return <li onClick={()=>this.ChangeStep(3)}  aria-disabled="false">
            <a href="#" className="text-white" role="menuitem">Next</a>
        </li>;
        }else if (this.state.step === 3) {
            return <li onClick={()=>this.ChangeStep(4)}  aria-disabled="false">
            <a href="#" className="text-white" role="menuitem">Next</a>
        </li>;
        }else if (this.state.step === 4) {
            if (this.state.loading) {
                return <li   aria-disabled="false">
                <Spinner size={40} />
            </li>;
            }else{
                return <li onClick={()=>this.mainHandleSubmit()}  aria-disabled="false">
                 <a href="#" className="text-white" role="menuitem">Submit Now</a></li>;
            }
            
        
        }
     }

     LoadLocations=()=>{
        Axios.get(`${Home}locations`,
          )
         .then(res => {
           //console.log('Locations',res);
         this.setState({details:res.data})
         
        })
      }

     componentDidMount(){
        this.props.dispatch(open_menu('get'));
        this.props.dispatch(open_main_menu('get'));
        this.props.dispatch(change_breadcrum('Get Started'));
     }
    render() {
        return (
            <>
            <FadeIn duration="1s"  timingFunction="ease-out">
                <div className="cad border-0 w80">
                <div className="carbody">
                
                <form onSubmit={this.handleSubmit} className="mt-4">
                    <div className="wizard clearfix" id="wizard2">
                        <div className="steps clearfix">
                            <ul className="steps">
                            <li className={`step-item ${this.state.step === 1?'active':''} ${this.state.step > 1 ? 'complete':''}`}>
                                <Link to={"#"} className="step-link">
                                <span className="step-number">1</span>
                                <span className="step-title">Company Details</span>
                                </Link>
                            </li>
                            <li className={`step-item ${this.state.step === 2?'active':''} ${this.state.step > 2 ? 'complete':''}`}>
                                <Link to={"#"} className="step-link">
                                <span className="step-number">2</span>
                                <span className="step-title">Contact Info</span>
                                </Link>
                            </li>
                            <li className={`step-item ${this.state.step === 3?'active':''} ${this.state.step > 3 ? 'complete':''}`}>
                                <Link to={"#"} className="step-link">
                                <span className="step-number">3</span>
                                <span className="step-title">Owners Details</span>
                                </Link>
                            </li>
                            <li className={`step-item ${this.state.step === 4?'active':''} ${this.state.step > 4 ? 'complete':''}`}>
                                <Link to={"#"} className="step-link">
                                <span className="step-number">4</span>
                                <span className="step-title">Account Info</span>
                                </Link>
                            </li>
                            </ul>
                        </div>

                        <div className="">
                            {this.state.step === 1 ?
                            
                        <FadeIn duration="1s"  className="content-w clearfix bg-light" timingFunction="ease-out">
                          <h4 id="wizard2-h-0" tabindex="-1" class="title current pl-0 pt-3 pb-3">Profile</h4>
                          <section className="body current">
                              {/* <p class="mg-b-20">Try the keyboard navigation by clicking arrow left or right!</p> */}
                              <div className="row">
                              <div className="col-md-6 pb-5">
                                    <div className="form-group">
                                    <h3 class="text-muted fs3">Company Name </h3>
                                    <h3 class="text-muted fs33">Ekplise Technologies </h3>
                                    </div>
                                  </div>

                                  <div className="col-md-6 pb-5">
                                    <div className="form-group">
                                    <h3 class="text-muted fs3">Country </h3>
                                    <h3 class="text-muted fs33">Nigeria </h3>
                                    </div>
                                  </div>

                                  <div className="col-md-6 pb-5">
                                    <div className="form-group">
                                    <h3 class="text-muted fs3">size </h3>
                                    <h3 class="text-muted fs33">5 - 10 </h3>
                                    </div>
                                  </div>

                                  <div className="col-md-6 pb-5">
                                    <div className="form-group">
                                    <h3 class="text-muted fs3">Category </h3>
                                    <h3 class="text-muted fs33">Technology </h3>
                                    </div>
                                  </div>

                                  <div className="col-md-6 pb-5">
                                    <div className="form-group">
                                    <h3 class="text-muted fs3">Business Type </h3>
                                    <h3 class="text-muted fs33">Startup </h3>
                                    </div>
                                  </div>

                                  


                              
                              </div>
                           </section>
                        </FadeIn>
                        :''}



                           {this.state.step === 2 ?
                            
                            <FadeIn duration="1s" className="content-w  clearfix " timingFunction="ease-out">
                              <h4 id="wizard2-h-0" tabindex="-1" class="title current pl-0 pt-3 pb-3">Contact</h4>
                              <section className="body current">
                                  {/* <p class="mg-b-20">Try the keyboard navigation by clicking arrow left or right!</p> */}
                                  <div className="row">

                                  

          

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>General Email</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Email" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Phone Number" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Office Country</label>
                                        <select 
                                        required
                                        value={this.state.m_status}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="m_status"
                                        >
                                            <option value="Nigerial">Nigeria</option>
                                            
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Office State</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Phone Number" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Phone Number" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>State Address</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Phone Number" />
                                    </div>
                                  </div>

{/*                        


                                  {this.state.country == 'Nigeria' ? 
                                  <div className="col-md-6">
                                <div className="form-group">
                                <label>Select state</label>
                                <select 
                                required
                                value={this.state.state}
                                onChange={this.handleChange}
                                className="form-control st-login-f"
                                name="state"
                                >
                                    <option value="">Select one</option>
                                    {this.state.details.length > 0 ?
                                  this.state.details.map((dep,i)=>
                                  <option key={dep.id} value={i}>{dep.name}</option>
                                    )  
                                :''}
                                </select>
                            </div>
                            </div>
                            :''} */}

                                  {/* {this.state.country == 'Nigeria' ? 
                                  <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Select Local Government</label>
                                        <select 
                                        required
                                        value={this.state.lgs}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="lgs"
                                        >
                                            <option value="">Select </option>
                                            {this.state.lg.length > 0 ?
                                        this.state.lg.map((dep,i)=>
                                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                                            )  
                                        :
                                        <option value="">Select State first</option>
                                        }
                                        </select>
                                    </div>
                                   
                                  </div>
                                :''} */}
                                  
                

                                  </div>
                               </section>
                            </FadeIn>
                            :''}




                          {this.state.step === 3 ?
                            
                            <FadeIn duration="1s" className="content-w  clearfix" timingFunction="ease-out">
                             <h4 id="wizard2-h-0" tabindex="-1" class="title current pl-0 pt-3 pb-3">Owner</h4>
                              <section className="body current">
                                  {/* <p class="mg-b-20">Try the keyboard navigation by clicking arrow left or right!</p> */}
                                  <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="" />
                                    </div>
                                  </div>



                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nationality</label>
                                        <select 
                                        required
                                        type="text"
                                        value={this.state.nysc}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc" placeholder="nysc">
                                            <option value="Nigerian">Nigerian</option>
                                            {/* <option value="no">No</option> */}
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input 
                                        required
                                        type="text"
                                        value={this.state.nysc_year}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc_year" placeholder="Year" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Business Document</label>
                                        <select 
                                        required
                                        type="text"
                                        value={this.state.nysc}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc" placeholder="nysc">
                                            <option value="CAC">CAC</option>
                                            {/* <option value="no">No</option> */}
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>RC. No</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="" />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Home Address</label>
                                        <input 
                                        required
                                        type="text"
                                        value={this.state.nysc_certificate}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc_certificate" placeholder="Certificate" />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Prof. of Address</label>
                                        <input 
                                        required
                                        type="file"
                                        value={this.state.nysc_certificate}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc_certificate" placeholder="Certificate" />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Business Documents</label>
                                        <input 
                                        required
                                        type="file"
                                        value={this.state.nysc_certificate}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc_certificate" placeholder="Certificate" />
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Identification Document (National ID Card)</label>
                                        <input 
                                        required
                                        type="file"
                                        value={this.state.nysc_certificate}
                                        onChange={this.handleChange}
                                        className="form-control st-login-f"
                                        name="nysc_certificate" placeholder="Certificate" />
                                    </div>
                                  </div>
                                   
                                   
                                  </div>
                               </section>
                            </FadeIn>
                            :''}



                    {this.state.step === 4 ?
                            
                            <FadeIn duration="1s" className="content-w  clearfix " timingFunction="ease-out">
                              <h4 id="wizard2-h-0" tabindex="-1" class="title current pl-0 pt-3 pb-3">Account</h4>
                              <section className="body current">
                                  {/* <p class="mg-b-20">Try the keyboard navigation by clicking arrow left or right!</p> */}
                                  <div className="row">

                                  

          


                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Bank Name</label>
                                        <select 
                                        required
                                        value={this.state.m_status}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="m_status"
                                        >
                                            <option value="Bank A">Bank A</option>
                                             <option value="Bank B">Bank B</option>
                                              <option value="Bank C">Bank C</option>
                                            
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Bank Account Number</label>
                                        <input 
                                        required
                                        value={this.state.blood_group}
                                        onChange={this.handleChange}
                                        className="form-control form-control-sm st-login-f"
                                        name="blood_group" placeholder="Account Number" />
                                    </div>
                                  </div>

 
                

                                  </div>
                               </section>
                            </FadeIn>
                            :''}
                           
                           
                        </div>

                        <div className="actions clearfix">
                            <ul>
                            {this.LeftButton()}

                            {this.RightButton()}
                            </ul>
                        </div>
                    </div>
                
                    
                    
                    
                </form>
                
                </div>
                
            </div>
            </FadeIn>
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (GetStarted);