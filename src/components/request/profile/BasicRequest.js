import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, List, ArrowLeft, Eye } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import img from '../../../assets/svg/whocoded_avatar.svg'
import PayrollDetails from '../payroll/PayrollDetails';
import PopBasic from './PopBasic';

class BasicRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            name:"",
            show:"",
            id:"",
            switch:"",
            filter:"all",
        }
    }
    Filter=(filter)=>{
        this.LoadData(filter);
        this.setState({filter:filter})
    }
    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.setState({switch:event.target.value})
          }
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

    Delete(key){
        if (window.confirm('❌ are you sure you want to delete this leave?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}hr/leave/delete`,{
                token: token,
                leave_key:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.status) {
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

    LoadData=(filter)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/profile/req/listReqBasic/${filter}`,{
             params:{token: token}
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

    componentDidMount(){
        this.LoadData(this.state.filter)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.data.quick_params !== this.props.data.quick_params) {
            this.LoadData(this.state.filter);
        }
    }
    render() {
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <PopBasic
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
                    <h6 class="lh-5 mg-b-0">List of profile request</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={()=>this.Filter('all')} className="btn btn-primary2 btn-sm shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('approved')} className="btn btn-success btn-sm shadow m-1"><List color="white" size={35} /> Approved</button>
                           <button onClick={()=>this.Filter('declined')} className="btn btn-danger btn-sm shadow m-1"><List color="white" size={35} /> Declined</button>
                           
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
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Surname</th>
                                <th>Date of birth</th>
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
                                    <td>{dep.first_name}</td>
                                    <td>{dep.middle_name}</td>
                                    <td>{dep.surname}</td>
                                    <td>{dep.dob}</td>
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button data-rh="view" onClick={()=>this.OpenModal('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                                    
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

export default connect(mapStoreToProps) (BasicRequest);