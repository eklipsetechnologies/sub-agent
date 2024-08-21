import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, BookOpen, HelpCircle, UserMinus, Twitch, Briefcase, PhoneCall, Mail, Map, MapPin, ArrowLeft } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import img from '../../../assets/img/profile.png'
import { open_right } from '../../../store/actions/OpenRight';
import { change_breadcrum } from '../../../store/actions/Bredcrum';
import empty from '../../../assets/svg/whocoded_empty.svg'
import SecurityQuestions from '../components/users/SecurityQuestions';
import EducationalHistory from '../components/users/EducationalHistory';
import PreviousEmployment from '../components/users/PreviousEmployment';
import EmpoymentHistory from '../components/users/Dependant';
import UserBranches from '../components/users/UserBranches';
import { toast } from 'react-toastify';
import NextOfKin from '../components/users/NextOfKin';
import UploadProfilePicture from '../components/users/UploadProfilePicture';
import Certificates from '../components/users/Certificates';
import EmployeeEditProfile from './EmployeeEditProfile';
import { Link } from 'react-router-dom';

class SelfProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            details:"",
            branch:"",
            id:0,
            name:"",
            show:"",
            win:"",
            switcher:"person"
        }
    }


    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/me`,{
               token: token,
            })
           .then(res => {
            console.log('Profile',res);
           this.setState({loading:false,details:res.data});
          //  this.props.dispatch(open_right('Close')); 
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
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    componentDidMount(){
        //this.props.dispatch(change_breadcrum('Profile Page'));
        this.LoadData();
    }
    OpenModal=(name,id)=>{
      if (name.length < 2) {
          this.setState({show:""});
          this.interval = setTimeout(() => this.setState({name:name}), 600); 
      }else{
          this.setState({name:name})
          this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
      }
      this.setState({id:id,})
  }

  OpenEdit=(name)=>{
    this.setState({win:name})
  }
    componentWillUnmount(){
        this.props.dispatch(open_right('Open'));
    }

    Switcher=(switcher)=>{
      this.setState({switcher})
    }

    SwipeRender=()=>{
      if (this.state.switcher === 'person') {
        return  <div className="card  border-0 mb-3">
        <div className="card-body">
            <div className="">
                <div className="col-sm-3 col-md-2 col-lg">
                    <div onClick={()=>this.OpenModal('WHOCODED',0)} className="avatar avatar-xxl avatar-online st-click">
                      <img src={this.props.data.userDetails.picture === null ? img : this.props.data.userDetails.picture} className="rounded-circle" alt=""/>
                    </div>
                </div>


                <div className="col-sm-8 col-md-7 col-lg mg-t-20 mg-sm-t-0 mg-lg-t-25">
                  <h5 className="mg-b-2 tx-spacing--1">{`${this.state.details.name}`}</h5>
                  <p className="tx-color-03 mg-b-25">@{this.state.details.branch}</p>
                  <div className="d-flex mg-b-25">
                  <button onClick={()=>this.SwitchContent('user_pdf',[this.state.details.key])} className="btn btn-xs btn-outline-secondary flex-fill">View PDF</button>
                        <button onClick={()=>this.OpenEdit('EDIT_WHOCODED')} className="btn btn-xs btn-primary flex-fill mg-l-10">Edit</button>
                  </div>
                </div>

                <div className="col-sm-6 col-md-5 col-lg mg-t-40">
                   <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">Personal Information</label>
                   <table className="table table-striped table-bordered table-primary table-hover">
                     <tbody>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Name: </th>
                         <td className="tx-color-02 pl-2">{`${this.state.details.name}`}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                        <th className="st-color-g">DOB: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.dob}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">State of origin: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.state}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">LGA: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.lga} LGA</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Country: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.country}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Place of birth: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.place_birth}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Gender: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.gender}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Religion: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.religion}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Marital status: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.marital_status}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Email Address: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.email}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Phone Number: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.phone}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Blood group: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.blood_group}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Residentail address: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.r_address}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Postal address: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.p_address}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Languages known: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.languages}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Hobbies: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.hobbies}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Height: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.height}</td>
                       </tr>
                       <tr className="pt-2 pb-2">
                         <th className="st-color-g">Weight: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.weight}</td>
                       </tr>
                       </tbody>
                   </table>
                </div>

              
            </div>
        </div>
    </div>;
    
      }else if (this.state.switcher === 'contact') {
        return <div className="card border-0 mb-3">
        <div className="card-body">
        <div className="">
        <h6 className="lh-5 mg-b-0">Educational Information </h6>
                 
        <ul className="list-unstyled profile-info-list mt-5">
                       <li>
                        <MapPin color="#007bff" size={15} />
                         <span className="tx-color-03 pl-2">{this.state.details.p_address}</span>
                       </li>
                       <li>
                        <PhoneCall color="#007bff" size={15} />
                         <span className="tx-color-03 pl-2">{this.state.details.phone}</span>
                       </li>
                       <li>
                        <Mail color="#007bff" size={15} />
                         <span className="tx-color-03 pl-2">{this.state.details.email}</span>
                       </li>
                   </ul>
              </div>
        </div>
      </div>;
      }else if (this.state.switcher === 'edu') {
        return <><EducationalHistory self="" /> <Certificates self="" /> </>;
      }else if (this.state.switcher === 'nysc') {
        return <div className="card border-0 mb-3">
        <div className="card-body">
        <div className="">
        <h6 className="lh-5 mg-b-0">NYSC Information </h6>
                 
        <ul className="list-unstyled profile-info-list mt-5">
                   <li className="pt-2 pb-2">
                         <strong className="st-color-g">Status: </strong>
                         <span className="tx-color-02 pl-2">{this.state.details.nysc}</span>
                       </li>

                       <li className="pt-2 pb-2">
                         <strong className="st-color-g">Year: </strong>
                         <span className="tx-color-02 pl-2">{this.state.details.nysc_year}</span>
                       </li>
                       <li className="pt-2 pb-2">
                         <strong className="st-color-g">Certificate Number: </strong>
                  <span className="tx-color-02 pl-2">{this.state.details.nysc_number}</span>
                       </li>
                   </ul>
              </div>
        </div>
      </div>;
      }else if (this.state.switcher === 'next') {
        return <NextOfKin self="" />;
      }else if (this.state.switcher === 'dep') {
        return <EmpoymentHistory self="" />;
      }else if (this.state.switcher === 'sec') {
        return <SecurityQuestions emp={this.state.details.employee} self="" />;
      }else if (this.state.switcher === 'emp') {
        return <PreviousEmployment self="" />;
      }else if (this.state.switcher === 'branch') {
        return <UserBranches self="" />;
      }
    }
    render() {
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <UploadProfilePicture 
                show={this.state.show}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
            :''}
            {this.state.win === 'EDIT_WHOCODED' ?
            <div className="st-e-ful">
              <EmployeeEditProfile 
              close={()=>this.OpenEdit('')}
              />
              <div className="p5">
                <div className="m-5"></div>
              </div>
            </div>
          :''}
            
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card  border-0 mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 className="lh-5 mg-b-0">{this.state.loading ? 'Loading...':`${this.state.details.first_name} ${this.state.details.middle_name} ${this.state.details.surname}`} Profile</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        {/* <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('user_home',[0])} className="btn btn-danger btn-sm shadow"><PlusCircle color="white" size={35} /> Edit Profile</button>
                        </FadeIn> */}
                            
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
            <div style={{overflow:'scroll'}}>
            <ul className="nav nav-pills nav-fill mb-3" style={{width:'max-content'}}>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('person')} className={`nav-link ${this.state.switcher === 'person'?'active':''}`} to="#">Personal Information</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('contact')} className={`nav-link ${this.state.switcher === 'contact'?'active':''}`} to="#">Contact Information</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('edu')} className={`nav-link ${this.state.switcher === 'edu'?'active':''}`} to="#"> Educational/Certification qualifications</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('nysc')} className={`nav-link ${this.state.switcher === 'nysc'?'active':''}`} to="#">NYSC Information</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('next')} className={`nav-link ${this.state.switcher === 'next'?'active':''}`} to="#">Next of kin details</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('dep')} className={`nav-link ${this.state.switcher === 'dep'?'active':''}`} to="#">Dependent details </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('emp')} className={`nav-link ${this.state.switcher === 'emp'?'active':''}`} to="#">Employment History </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('sec')} className={`nav-link ${this.state.switcher === 'sec'?'active':''}`} to="#">Security Question </Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={()=>this.Switcher('branch')} className={`nav-link ${this.state.switcher === 'branch'?'active':''}`} to="#">Branch/Branch History </Link>
                      </li>
             </ul>
             </div>
                <div className="row">
                    <div className="col-md-12 mt-2">
                       {this.SwipeRender()}
                    </div>
                    
                    
                </div>
                </>
            }
                
               
                
            
            </BounceRight>
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (SelfProfile);