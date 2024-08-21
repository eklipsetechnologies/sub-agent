import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import { open_right } from '../../../store/actions/OpenRight';
import img from '../../../assets/svg/whocoded_avatar.svg'

class Onbording extends Component {
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

    listPublishJobs=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listPublishJobs`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    Reload=(ex,status)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.get(`${Home}auth/recuite/listApplications/${ex}/${status}`,{
              params:{token: token}
            })
           .then(res => {
            console.log('Loaded',res);
           this.setState({data:res.data,loading:false});
           this.props.dispatch(open_right('Close'));
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData=(ex,status)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.get(`${Home}auth/recuite/listApplications/${ex}/${status}`,{
              params:{token: token}
            })
           .then(res => {
            console.log('Loaded',res);
           this.setState({data:res.data,loading:false});
           this.props.dispatch(open_right('Close'));
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
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/deleteExcercise`,{
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
        this.props.dispatch(open_right('Open'));
    }

     componentDidMount(){
         this.LoadData(this.state.type,this.state.type2);
         this.listPublishJobs();
     }
    render() {
       
        return (
            
            <div>
            

            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List of applied candidates </h6>
                    </div>
                    <div className="col-md-7">
                    <div className="pull-right">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                            <div className="input-group">
                            <select 
                                onChange={this.handleChange}
                                name="type2" value={this.state.type2}
                                 className="form-control form-control-sm mr-1">
                                <option value="3">All Status</option>
                                <option value="0">Pending</option>
                                <option value="1">Employed</option>
                                <option value="2">Declined</option>
                            </select>
                                <select 
                                onChange={this.handleChange}
                                name="type" value={this.state.type}
                                 className="form-control form-control-sm mr-1">
                                <option value="0">All Jobs (Published)</option>
                                {this.state.data2.length > 0 ?
                                this.state.data2.map(ma=>
                                    <option key={ma.id} value={ma.id}>{ma.name}</option>
                                    )
                            :''}
                                
                            </select>
                            <button onClick={()=>this.SwitchContent('home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                            </div>
                            
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
                                <th>Name</th>
                                <th>Job Title</th>
                                <th>Country</th>
                                <th>State</th>
                                <th>Local Gov. Area</th>
                                <th>Gender</th>
                                <th>Marital Status</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th style={{width:'5%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                    <img src={dep.picture === null ? img : dep.picture} className="img-fluid rounded-circle st-avatar" />
                                    </td>
                            <td>{dep.name}</td>
                                    <td>
                                    {dep.publishedJob}
                                    </td>
                                    <td>
                                        {dep.country}
                                        </td>
                                    <td>{dep.state}</td>
                                    <td>
                                        {dep.lgs}
                                        </td>
                            <td>{dep.gender}</td>
                            <td>{dep.marital_status}</td>
                            <td>{dep.date}</td>
                                    <td>
                                    <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button data-rh="View Application" onClick={()=>this.SwitchContent('rec_on_view',[dep.id])} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                                    {/* <button data-rh="deactivate" onClick={()=>this.Delete(dep.key)} className="btn btn-warning btn-sm m-1 shadow"><EyeOff color="#0567d2" size={35} /> </button> */}
                                                    {/* <button data-rh="delete" onClick={()=>this.Delete(dep.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button> */}
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
            
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (Onbording);