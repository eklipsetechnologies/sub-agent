import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp,BounceLeft, } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, List, ArrowLeft, Eye, Mail, Command, Send, Download, Calendar, Link2 } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import img from '../../assets/svg/whocoded_avatar.svg'
import { open_right } from '../../store/actions/OpenRight';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class ListCourse extends Component {
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
        this.LoadData(startDate.getFullYear())
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

   

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/train/listCourse`,{
             params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
        //    this.interval = setTimeout(() => this.props.dispatch(open_right('Close')), 2000); 
           
           })
        .catch(err =>console.log(err));
        }
    }
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    componentDidMount(){
        let da = new Date()
        this.LoadData();
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
                    <h6 class="lh-5 mg-b-0">List of courses/training</h6>
                    </div>
                    <div className="col-md-8">
                        <div id="dddd" className="pull-right">
                        
                        <FadeIn duration="1s" timingFunction="ease-out">
                        {/* <button data-rh="Leave Calender" onClick={()=>this.SwitchContent('leave_calender',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><Calendar color="white" size={35} /> Calender</button> */}
                        <button onClick={()=>this.SwitchContent('train_add_course',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><PlusCircle color="white" size={35} /> New Training</button>
                        <DatePicker 
                        showYearPicker
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                        
                           <button onClick={()=>this.SwitchContent('')} className="btn btn-danger btn-sm shadow m-1"><ArrowLeft color="white" size={35} /> Return</button>
                           
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
                            <th>Course Name</th>
                                <th>Department</th>
                                <th>Budget</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                                
                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                   <td>{dep.name}</td>
                                    <td>{dep.department}</td>
                                    <td>{dep.budget}</td>
                                    <td>{dep.date}</td>
                                    <td>{dep.date2}</td>
                                    {/* <td>{dep.year}</td> */}
                                    <td>
                                        <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                <Link target="_blank" to={dep.letter} data-rh="Download Leave Prove" className="btn btn-warning btn-sm m-1 shadow"><Link2 color="#000000" size={35} /> Visit Link</Link>
                                                    
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

export default connect(mapStoreToProps) (ListCourse);