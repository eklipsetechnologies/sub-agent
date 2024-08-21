import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp,BounceLeft, } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, List, ArrowLeft, Eye, Mail, Command, Send, Download, Calendar } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import img from '../../assets/svg/whocoded_avatar.svg'
import { open_right } from '../../store/actions/OpenRight';
import LeaveRequestDetails from './LeaveRequestDetails';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class ListLeave extends Component {
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
            show2:"",
            name2:"",
            startDate: new Date(),
            startDate2: new Date(),
            answer:""
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
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

    Delete(key){
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/exit/deleteExitRequest`,{
                token: token,
                id:key
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

    SentHR(key){
        if (window.confirm('❌ are you sure?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/exit/sentToHRExitRequest`,{
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

    Decline(key){
        if (window.confirm('❌ are you sure?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/leave/declineLeaveRequest`,{
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

    LoadData=(filter)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/leave/listLeaveRequest/${filter}`,{
             params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
           this.interval = setTimeout(() => this.props.dispatch(open_right('Close')), 2000); 
           
           })
        .catch(err =>console.log(err));
        }
    }
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    componentDidMount(){
        this.LoadData(this.props.data.params.length > 0 ? this.props.data.params[0] : 0)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.data.quick_params !== this.props.data.quick_params) {
            this.LoadData(this.state.filter);
        }
        if (nextProps.data.switch !== this.props.data.switch) {
            this.LoadData(this.state.filter)
        }
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
            fd.append('date2',`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`);
            fd.append('date',`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`);
            this.setState({loading:true})
            Axios.post(`${Home}auth/leave/sentToHRLeaveRequest`,fd,{
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.LoadData();
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

     ErrorHandler=(message)=>{
        //console.clear();
        console.log(message)
        this.setState({loading:false})
        toast.error('Error....',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
    }
    componentWillUnmount(){
        this.props.dispatch(open_right('Open'));
    }
    render() {
        // console.log(this.state);
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <LeaveRequestDetails
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
            :''}

{this.state.name2 === 'WHOCODED' ?
          <div className={`modal effect-super-scaled ${this.state.show2} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.state.show2 ===""?'none':'#050404d4',overflow:'scroll'}}>
          <div className="modal-dialog modal-lg" role="document">
              <form onSubmit={this.handleSubmit} className="modal-content card explore-feature border-0 rounded bg-white shadow">
              <div className="modal-header">
                  <h5 className="modal-title">Send Leave Request to HR</h5>
                  <button onClick={()=>this.OpenModal2('',0)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  {this.state.laoding ?
                  <Spinner />
              :
              
              <>
                 
                <div className=" table-responsive">
                    <div className="row">
                       

                        <div className="col-md-12">
                        <div className="form-group">
                        <label>Change Leave Date? </label>
                        <select 
                        required
                        value={this.state.answer}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="answer">
                            <option value="">Select</option>
                            <option value="1">YES</option>
                            <option value="2">NO</option>
                        </select>
                    </div>
                    {this.state.answer === '1'?
                    <>
                        <div className="form-group">
                                        <label>Change Leave Start Date</label>
                                        <DatePicker 
                                        maxDate={new Date('2020-12-31')}
                                        minDate={new Date()}
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Change Leave End Date</label>
                                        <DatePicker 
                                        maxDate={new Date('2020-12-31')}
                                        minDate={new Date(`${this.state.startDate}`)}
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate2} 
                                            onChange={date => this.onChange3(date)} />
                                    </div>
                    </>
                :''}

                    

                    
                        </div>
                    </div>
                </div>
                </>
              }
              </div>
              <div className="modal-footer">
              {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
              <button type="submit" className="btn btn-primary" data-dismiss="modal">Send to HR</button>
              <button onClick={()=>this.Decline(this.state.id)} type="button" className="btn btn-danger" data-dismiss="modal">Decline Request</button>
                  <button onClick={()=>this.OpenModal2('',0)} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              </form>
          </div>
          </div>  
        :''}
            
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                    <h6 class="lh-5 mg-b-0">List of leave request</h6>
                    </div>
                    <div className="col-md-8">
                        <div className="pull-right">
                        
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button data-rh="Leave Calender" onClick={()=>this.SwitchContent('leave_calender',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><Calendar color="white" size={35} /> Calender</button>
                        {/* <button onClick={()=>this.SwitchContent('leave_add',[0])} className="btn btn-primary2 btn-sm shadow"><PlusCircle color="white" size={35} /> New Exit Request</button> */}
                        {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary2 btn-sm shadow m-1"><List color="white" size={35} /> All</button> */}
                           {/* <button onClick={()=>this.Filter('approved')} className="btn btn-success btn-sm shadow m-1"><List color="white" size={35} /> Approved</button>
                           <button onClick={()=>this.Filter('declined')} className="btn btn-danger btn-sm shadow m-1"><List color="white" size={35} /> Declined</button> */}
                           <button onClick={()=>this.SwitchContent('',[0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
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
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>LM Confirmed</th>
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
                                    <td>{dep.first_name}</td>
                                    <td>{dep.middle_name}</td>
                                    <td>{dep.surname}</td>
                                    <td>{dep.notice_date}</td>
                                    <td>{dep.ef_date}</td>
                                    <td>
                                        <span className={`badge badge-${dep.confirmedClass} badge-pill`}>{dep.confirmedName}</span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                <Link to={dep.letter} data-rh="Download Leave Proof" onClick={()=>this.OpenModal2('WHOCODED',dep.id)} className="btn btn-warning btn-sm m-1 shadow"><Download color="#000000" size={35} /></Link>
                                                    {this.props.data.userDetails.lm ?
                                                    <button data-rh="Send to HR for approval" onClick={()=>this.OpenModal2('WHOCODED',dep.id)} className="btn btn-primary2 btn-sm m-1 shadow"><Send color="white" size={35} /> Send to HR </button>
                                                :''}
                                                 {this.props.data.userDetails.hr  || this.props.data.userDetails.em ?
                                                    <button data-rh="View Request Action" onClick={()=>this.OpenModal('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Command color="white" size={35} /> Request Action </button>
                                                :''}

                                                {this.props.data.userDetails.em ?
                                                    <button data-rh="Delete Request" onClick={()=>this.Delete(dep.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button>
                                                :''}
                                                    
                                                    
                                                    
                                                    
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

export default connect(mapStoreToProps) (ListLeave);