import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff, Mail, Award, Paperclip, CheckCircle } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import { open_right } from '../../../store/actions/OpenRight';
import img from '../../../assets/svg/whocoded_avatar.svg'

class ViewCandidateApplication extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            name2:"",
            loading:false,
            data:[],
            data2:[],
            department:"",
            level:"",
            questions:[],
            option:"",
            option2:"",
            option3:"",
            option4:"",
            options:[],
            job:"",
            fetching:false,
            modal:"",
            show:"",
            id:0,
            answer:"",
            answers:[],
            type:"0",
            type2:"3"
        }
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/SinggleApplications`,{
              token: token,
              id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
            // console.log('Loaded',res);
           this.setState({data:res.data,loading:false});
        //    this.interval = setTimeout(() => this.props.dispatch(open_right('Close')), 2000); 
           })
        .catch(err =>console.log(err));
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
          if (event.target.name === 'type') {
            this.Reload(event.target.value,this.state.type2);
        }else if (event.target.name === 'type2') {
            this.Reload(this.state.type,event.target.value);
          }
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
   

     Delete(key){
        if (window.confirm('❌ are you sure you want to decline?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/DeclineApplications`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData();
             }else{
                 this.setState({loading:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }


    Activate(key){
        if (window.confirm('are you sure you want to activate?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/ActivateApplications`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData();
             }else{
                 this.setState({loading:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }

    Employ(key){
        if (window.confirm('are you sure you want to employ now?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/EmployApplications`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData();
             }else{
                 this.setState({loading:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }

    OpenModal=(name,id)=>{
        if (name.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({switch:name}), 600); 
        }else{
            this.setState({switch:name})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
    }


    OpenModal2=(modal,id)=>{
        if (modal.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({modal:modal}), 600); 
        }else{
            this.setState({modal:modal})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
        
    }
    componentWillUnmount(){
        // this.props.dispatch(open_right('Open'));
    }

     componentDidMount(){
         this.LoadData();
     }
    render() {
       
        return (
            
            <div>
            

            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-3">
                    <h6 class="lh-5 mg-b-0">Single Application </h6>
                    </div>
                    <div className="col-md-9">
                    <div className="pull-right">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                            {this.state.data.status !== 1 ?
                            <>
                            {this.state.data.status === 2 ?
                                <>
                                <button type="button" className="btn btn-danger m-1 btn-sm shadow"><Trash2 color="white" size={35} /> Declined</button>
                                <button onClick={()=>this.Activate(this.props.data.params.length > 0 ? this.props.data.params[0] : 0)}  className="btn btn-success m-1 btn-sm shadow"><Award color="white" size={35} />Activate Now</button>
                            </>
                            :
                            <>
                            <button onClick={()=>this.Delete(this.props.data.params.length > 0 ? this.props.data.params[0] : 0)} className="btn btn-danger m-1 btn-sm shadow"><Trash2 color="white" size={35} /> Decline</button>
                            <button onClick={()=>this.Employ(this.props.data.params.length > 0 ? this.props.data.params[0] : 0)}  className="btn btn-success m-1 btn-sm shadow"><Award color="white" size={35} /> Employe Now</button>
                            </>
                            }
                             <button onClick={()=>this.SwitchContent('can_letter',[this.props.data.params.length > 0 ? this.props.data.params[0] : 0])} className="btn btn-primary m-1 btn-sm shadow"><Paperclip color="white" size={35} /> Acceptance Letter</button>
                            </>
                        :
                        <button onClick={()=>alert('contact admin if you want to undo this action')} disabled={true} className="btn btn-success m-1 btn-sm shadow"><CheckCircle color="white" size={35} />Candidate already employed</button>
                        }
                        
                        
                        <button onClick={()=>this.SwitchContent('rec_mail',[this.props.data.params.length > 0 ? this.props.data.params[0] : 0])} className="btn btn-primary m-1 btn-sm shadow"><Mail color="white" size={35} /> Send Email</button>
                        <button onClick={()=>this.SwitchContent('rec_on_list',[0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                            
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
            
                <div className="table-responsive">
                    <div className="p-4 text-center">
                    <img src={this.state.data.picture === null ? img :this.state.data.picture} className="rounded-circle st-img-200 shadow" alt=""/>
                    </div>
                    <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                       
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{this.state.data.first_name}</td>
                            </tr>
                            <tr>
                                <th>Middle Name</th>
                                <td>{this.state.data.middle_name}</td>
                            </tr>
                            <tr>
                                <th>Surname</th>
                                <td>{this.state.data.surname}</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{this.state.data.gender}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{this.state.data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{this.state.data.phone}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td>{this.state.data.dob}</td>
                            </tr>
                            <tr>
                                <th>Marital Status</th>
                                <td>{this.state.data.marital_status}</td>
                            </tr>
                            <tr>
                                <th> Home Address</th>
                                <td>{this.state.data.address}</td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td>{this.state.data.country}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{this.state.data.state}</td>
                            </tr>
                            <tr>
                                <th>Local Government Area</th>
                                <td>{this.state.data.lgs}</td>
                            </tr>
                            <tr>
                                <th>Area of Specialization</th>
                                <td>{this.state.data.special}</td>
                            </tr>
                            <tr>
                                <th>Educational Level</th>
                                <td>{this.state.data.education}</td>
                            </tr>
                            <tr>
                                <th>Grade Level</th>
                                <td>{this.state.data.grade}</td>
                            </tr>
                            <tr>
                                <th>Years of experience</th>
                                <td>{this.state.data.years}</td>
                            </tr>
                            <tr>
                                <th>Cover Letter</th>
                                <td>
                                    <a href={this.state.data.cover_letter}>Download Cover Letter</a>
                                   </td>
                            </tr>
                            <tr>
                                <th>Resume File</th>
                                <td><a href={this.state.data.resume}>Download Resume File</a></td>
                            </tr>
                            <tr>
                                <th>Certificate</th>
                                <td><a href={this.state.data.certificate}>Download Certificate</a></td>
                            </tr>
                            

                        </tbody>
                    </table>
                </div>
            }
                
                
                </div>
                
            
            </BounceRight>


            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">First Refreee </h6>
                    </div>
                    <div className="col-md-7">
                    <div className="pull-right">
                    <div className="pull-right">
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
            
                <div className="table-responsive">
                    
                    <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                       
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{this.state.data.r_name}</td>
                            </tr>
                            <tr>
                                <th>Organization</th>
                                <td>{this.state.data.organisation}</td>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <td>{this.state.data.position}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{this.state.data.phone}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{this.state.data.mail}</td>
                            </tr>
                            <tr>
                                <th>Years Known</th>
                                <td>{this.state.data.known}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            }
                
                
                </div>
                
            
            </BounceRight>


            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Second Refreee </h6>
                    </div>
                    <div className="col-md-7">
                    <div className="pull-right">
                    <div className="pull-right">
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
            
                <div className="table-responsive">
                    
                    <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                       
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{this.state.data.r_name2}</td>
                            </tr>
                            <tr>
                                <th>Organization</th>
                                <td>{this.state.data.organisation2}</td>
                            </tr>
                            <tr>
                                <th>Position</th>
                                <td>{this.state.data.position2}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{this.state.data.phone2}</td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td>{this.state.data.mail2}</td>
                            </tr>
                            <tr>
                                <th>Years Known</th>
                                <td>{this.state.data.known2}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            }
                
                
                </div>
                
            
            </BounceRight>
            
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (ViewCandidateApplication);