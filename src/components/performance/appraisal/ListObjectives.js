import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, AlertCircle, ArrowLeft } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ListObjectives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            startDate: new Date(),
            startDate2: new Date(),
            name:"",
            show:"",
            id:"",
            switch:"",
            filter:"all",
            show2:"",
            name2:"",
            answer2:"",
            none:""
        }
    }
   

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/perf/listObjective`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.setState({switch:event.target.value})
          }
        }
      }
      OpenModal2=(name,id)=>{
        if (name.length < 2) {
            this.setState({show2:""});
            this.interval = setTimeout(() => this.setState({name2:name}), 600); 
        }else{
            this.setState({name2:name})
            this.interval = setTimeout(() => this.setState({show2:"show"}), 100); 
        }
        this.setState({id:id})
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let token = ""; 
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            let fd = new FormData();
            fd.append('type',this.state.answer);
            fd.append('id',this.state.id)
            fd.append('token',token);
            fd.append('answer',this.state.answer)
            fd.append('answer2',this.state.answer2)
            fd.append('note',this.state.note)
            this.setState({loading:true})
            Axios.post(`${Home}auth/settings/updateObjective`,fd,{
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.LoadData();
                   this.OpenModal2('',0)
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
                 
               })
                .catch(err =>{
                    console.log(err)
                    this.props.dispatch(launch_toaster('Error'));
                   this.props.dispatch(toast_trigger(false)); 
                }
                    // this.ErrorHandler(err,'Error')
               //console.log(err.response.data.message),
              );
        }         
     }

    componentDidMount(){
        this.LoadData()
    }
    render() {
        // console.log(this.props)
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List Mid Year Of Objectives</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
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
                                <th>Name</th>
                                <th>Mid Year Month</th>
                                <th>Accesibility</th>
                                <th style={{width:'30px'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>{dep.name}</td>
                                    <td>{dep.date}</td>
                                    <td data-rh="Accessiblity is used to know if Employee or Line Managers can see and comment from performance">
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button onClick={()=>this.SwitchContent('perf_comments',[dep.id])} className="btn btn-primary2 btn-sm m-1 shadow"><Edit color="white" size={35} /> </button>
                                                   
                                                    {/* <button onClick={()=>this.Delete(dep.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button> */}
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

export default connect(mapStoreToProps) (ListObjectives);