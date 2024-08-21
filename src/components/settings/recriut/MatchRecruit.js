import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ViewRecruitmentJobs from './ViewRecruitmentJobs';


class MatchRecruit extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            data:[],
            data2:[],
            department:"",
            level:"",
            details:[],
            job:"",
            id:"",
            show:"",
            rec:""
        }
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }

      onChange = (startDate2) =>{
        this.setState({ startDate2 });
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

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}hr/recruitment/datatable`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data.data});
           })
        .catch(err =>console.log(err));
        }
    }
    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(`${Home}hr/job/datatable`,{
               token: token
            })
           .then(res => {
           // console.log(res);
           this.setState({data2:res.data.data});
           })
        .catch(err =>console.log(err));
        }
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
            Axios.post(`${Home}hr/recruitment/job/create`,{
                token:token,
                recruitment_key:this.state.rec,
                job_key:this.state.job,
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.status) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.OpenModal('WHOCODED',1)
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
   

     componentDidMount(){
         //this.LoadLocations();
         this.LoadData();
         this.LoadData2();
     }
    render() {
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <ViewRecruitmentJobs 
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
            :''}
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Match recruitment to a job</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={()=>this.OpenModal('WHOCODED',1)} className="btn btn-primary2 btn-sm shadow m-1"><PlusCircle color="white" size={35} /> View matched recruitment</button>
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="mt-4">
                    <div className="form-group">
                        <label>Recruitment</label>
                        <select 
                        required
                        value={this.state.rec}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="rec" placeholder="Name" >
                            <option value="">Select</option>
                            {this.state.data.length > 0 ?
                          this.state.data.map(re=>
                          <option key={re.key} value={re.key}>{re.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Jobs</label>
                        <select 
                        required
                        value={this.state.job}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="job" placeholder="Name" >
                            <option value="">Select</option>
                            {this.state.data2.length > 0 ?
                          this.state.data2.map(re=>
                          <option key={re.key} value={re.key}>{re.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                   
                   
                    
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Match recruitment to job</button>
                    }
                        
                    </div>
                </form>
                
                </div>
                
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

export default connect(mapStoreToProps) (MatchRecruit);