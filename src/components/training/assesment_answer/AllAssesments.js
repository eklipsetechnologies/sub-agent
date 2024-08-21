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


class AllAssesments extends Component {
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
            job:""
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
            Axios.post(`${Home}auth/train/listExcercise`,{
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
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">View Assesments Answers from Training Assesments </h6>
                    </div>
                    <div className="col-md-7">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('d_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
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
                                <th>Title</th>
                                <th>Period(minutes)</th>
                                <th>Training/Course</th>
                                <th>Status</th>
                                <th style={{width:'5%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                    <tr key={i}>
                                        <td>
                                        <Link color="#0567d2" size={45} />
                                        </td>
                                        <td>
                                        {dep.name}
                                        </td>
                                        <td>{dep.period}</td>
                                        <td>{dep.assessment}</td>
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button data-rh="view quiz answers" onClick={()=>this.SwitchContent('asess_quiz',[dep.id])} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                                    {/* <button data-rh="deactivate" onClick={()=>this.Delete(dep.key)} className="btn btn-warning btn-sm m-1 shadow"><EyeOff color="#0567d2" size={35} /> </button> */}
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

export default connect(mapStoreToProps) (AllAssesments);