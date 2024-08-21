import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, Eye, Link2 } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Link } from 'react-router-dom';
import ViewInterviewQuestion from './ViewInterviewQuestion';

class ListInterviewQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            data2:[],
            modal:"",
            show:"",
            id:0
        }
    }

    Delete(key){
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/exit/deleteInterview`,{
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

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/exit/listInterview`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({data:res.data,loading:false});
           })
        .catch(err =>console.log(err));
        }
    }

   
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
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

    componentDidMount(){
        this.LoadData();
        // this.listPublishJobs()
    }
    render() {
        return (
            <>
            {this.state.modal === 'WHOCODED'?
                <ViewInterviewQuestion 
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
                    <h6 class="lh-5 mg-b-0">List of excercises</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('branch_add',[0])} className="btn btn-primary2 btn-sm shadow"><PlusCircle color="white" size={35} /> Add New</button>
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
                                <th>Exit Reason</th>
                                <th>Status</th>
                                <th style={{width:'10%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                    <Link2 color="#0567d2" size={45} />
                                    </td>
                                    <td>
                                    {dep.name}
                                    </td>
                                    <td>{dep.exitReason}</td>
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
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (ListInterviewQ);