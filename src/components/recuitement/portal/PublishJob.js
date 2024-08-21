import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff, Globe } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class PublishJob extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            data:[],
            data2:[],
            data3:[],
            department:"",
            level:"",
            startDate: new Date(),
            number:"",
            job:"",
            degree:""
        }
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }

      listPublishJobs=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listPublishJobs`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data3:res.data,loading:false});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listPortal`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data:res.data,loading:false});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(`${Home}auth/settings/listJobs`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data2:res.data});
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
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/CreatePublishJobs`,{
                token:token,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                portalId:this.state.department,
                jobId:this.state.job,
                applicants:this.state.number,
                degree:this.state.degree
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

     Delete(key){
        if (window.confirm('❌ are you sure you want to delete this?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/deletePublishJobs`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.listPublishJobs();
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

     componentDidMount(){
         this.LoadData();
         this.LoadData2();
         this.listPublishJobs()
     }
    render() {
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Publish job to portal</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="mt-4">
                <div className="form-group">
                        <label>Select Portal</label>
                        <select 
                        required
                        value={this.state.department}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="department"
                        >
                            <option value="">Select one</option>
                            {this.state.data.length > 0 ?
                          this.state.data.map(dep=>
                          <option key={dep.id} value={dep.id}>https://hris/recuitement/{dep.name}/</option>
                            )  
                        :''}
                        </select>
                    </div>
                   
                    <div className="form-group">
                        <label>Select job</label>
                        <select 
                        required
                        value={this.state.job}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="job"
                        >
                            <option value="">Select one</option>
                            {this.state.data2.length > 0 ?
                          this.state.data2.map(dep=>
                          <option key={dep.id} value={dep.id}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                   
                    <div className="form-group">
                        <label>End Date</label>
                        <DatePicker 
                        required
                        calendarClassName="rasta-stripes "
                        className="red-border form-control"
                        selected={this.state.startDate} 
                        onChange={date => this.onChange2(date)} />
                    </div>
                    <div className="form-group">
                        <label>Job Degree</label>
                        <input 
                        required
                        value={this.state.degree}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="degree" placeholder="Degree required" />
                    </div>

                    <div className="form-group">
                        <label>Number</label>
                        <input 
                        required
                        value={this.state.number}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="number" placeholder="Number" />
                    </div>
                    
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Publish Job</button>
                    }
                        
                    </div>
                </form>
                
                </div>
                
            </div>
            </BounceRight>


            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List of published jobs</h6>
                    </div>
                    <div className="col-md-7">
                        
                    </div>
                </div>
                </div>
                {this.state.loading ? 
                <div className="p-5">
                    <Spinner size={70} />
                </div>
                
            :
            this.state.data.length < 1 ?
                <div className="p-5">
                    <div className="alert alert-warning text-center">
                        No data yet
                    </div>
                </div>
            :
                <div className="table-responsive">
                    <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                        <thead>
                            <tr>
                                <th style={{width:'7%'}}></th>
                                <th>Links</th>
                                <th>Job Title</th>
                                <th>Job Degree</th>
                                <th>Applications</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th style={{width:'5%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data3.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                    <Globe color="#0567d2" size={45} />
                                    </td>
                                    <td>
                                    https://hris/recuitement/<strong>{dep.portal}</strong>/    
                                    </td>
                                    <td>{dep.name}</td>
                                    <td>{dep.degree}</td>
                                    <td>{dep.applicants}</td>
                                    <td>{dep.date}</td>
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    {/* <button data-rh="view" onClick={()=>alert('Coming Soon')} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                                    <button data-rh="deactivate" onClick={()=>this.Delete(dep.key)} className="btn btn-warning btn-sm m-1 shadow"><EyeOff color="#0567d2" size={35} /> </button> */}
                                                    <button data-rh="delete" onClick={()=>this.Delete(dep.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button>
                                                </div>
                                                
                                            </FadeIn>
                                        </div>
                                    
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            }
                
                
                </div>
                
            
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

export default connect(mapStoreToProps) (PublishJob);