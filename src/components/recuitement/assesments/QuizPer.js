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
import ViewAnswers from './ViewAnswers';
import { open_right } from '../../../store/actions/OpenRight';
import img from '../../../assets/svg/whocoded_avatar.svg'

class QuizPer extends Component {
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
            type:"0"
        }
    }

    LoadExData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listExcercise`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    Reload=(ex)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.get(`${Home}auth/recuite/listExcerciseAnswers/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}/${ex}`,{
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

    LoadData=(ex)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.get(`${Home}auth/recuite/listExcerciseAnswers/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}/${ex}`,{
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
            this.Reload(event.target.value);
            // this.props.dispatch(quick_params(event.target.value))
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
         this.LoadData(0);
         this.LoadExData();
     }
    render() {
       
        return (
            
            <div>
            {this.state.modal === 'WHOCODED'?
                <ViewAnswers 
                display={this.state.modal==='WHOCODED'?'block':'none'}
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal2('',0)}
                id={this.state.id}
                // answer={d.options[this.state.id][d.answer[this.state.id]]}
                />
            :<span></span>}

            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List of excercises answers </h6>
                    </div>
                    <div className="col-md-7">
                    <div className="pull-right">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                            <div className="input-group">
                            {/* <select 
                                onChange={this.handleChange}
                                name="type2" value={this.state.type2}
                                 className="form-control form-control-sm mr-1">
                                <option value="1">Active</option>
                                <option value="0">Archived</option>
                            </select> */}
                                <select 
                                onChange={this.handleChange}
                                name="type" value={this.state.type}
                                 className="form-control form-control-sm mr-1">
                                <option value="0">All Excercises</option>
                                {this.state.data2.length > 0 ?
                                this.state.data2.map(ma=>
                                    <option key={ma.id} value={ma.id}>{ma.name}</option>
                                    )
                            :''}
                                
                            </select>
                            <button onClick={()=>this.SwitchContent('asess',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
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
                                <th>Excercise</th>
                                <th>Total Time</th>
                                <th>Used Time</th>
                                <th>Job Title</th>
                                <th>Status</th>
                                <th style={{width:'10%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                    <img src={img} className="img-fluid" />
                                    </td>
                            <td>{dep.name}</td>
                                    <td>
                                    {typeof(dep.Ex)==='object'? dep.Ex.name:''}
                                    </td>
                                    <td>
                                        {typeof(dep.Ex)==='object'? dep.Ex.period:''}
                                        </td>
                                    <td>{dep.time}</td>
                                    <td>
                                        {/* {dep.publishedJob} */}
                                        {typeof(dep.Ex)==='object'? dep.Ex.publishedJob:''}
                                        </td>
                                    <td>
                                    <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button data-rh="view" onClick={()=>this.OpenModal2('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
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
            
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (QuizPer);