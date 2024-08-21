import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp,BounceLeft, } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, List, ArrowLeft, Eye, Mail, Command, CheckCircle, Award } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import img from '../../assets/svg/whocoded_avatar.svg'
import { open_right } from '../../store/actions/OpenRight';
import ExitPopBenefit from './ExitPopBenefit';

class ExitBenefits extends Component {
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

    Returned(key){
        if (window.confirm('Are you sure you want to mark this returned?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/settings/returnIssueItems`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData(this.state.filter);
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
            Axios.get(`${Home}auth/settings/listUserIssueItems/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}/${filter}`,{
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
        if (nextProps.data.switch !== this.props.data.switch) {
            this.LoadData(this.state.filter)
        }
    }

    componentWillUnmount(){
        this.props.dispatch(open_right('Open'));
    }
    render() {
        // console.log(this.props.data.params);
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <ExitPopBenefit
                show={this.state.show}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
            :''}
            
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List of issued items to user</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={()=>this.OpenModal('WHOCODED',0)} className="btn btn-primary2 btn-sm shadow"><Award color="white" size={35} /> Enter Exit Benefit</button>
                        <button onClick={()=>this.Filter('all')} className="btn btn-primary2 btn-sm shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('returned')} className="btn btn-success btn-sm shadow m-1"><List color="white" size={35} /> Returned</button>
                           <button onClick={()=>this.Filter('unreturned')} className="btn btn-warning btn-sm shadow m-1"><List color="#000" size={35} /> Pending</button>
                           
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
                                <th>Name</th>
                                <th>Item</th>
                                <th>Issued Date</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                        <img src={img} className="img-fluid" />
                                    </td>
                                    <td>{dep.user}</td>
                                    <td>{dep.item}</td>
                                    <td>{dep.date}</td>
                                    <td>{dep.date2}</td>
                                    
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    
                                                    {dep.status === 1 ?
                                                    <button data-rh="Item already returned" className="btn btn-success btn-sm m-1 shadow"><CheckCircle color="white" size={35} /> </button>
                                                :
                                                <button data-rh="Mark Returned" onClick={()=>this.Returned(dep.id)} className="btn btn-primary btn-sm m-1 shadow"><CheckCircle color="white" size={35} /> </button>
                                                }
                                                    
                                                    
                                                    
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

export default connect(mapStoreToProps) (ExitBenefits);