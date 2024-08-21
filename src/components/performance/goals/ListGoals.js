import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { props_params } from '../../../store/actions/PropsParams';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Link } from 'react-router-dom';
import img from '../../../assets/svg/whocoded_avatar.svg'
import { Trash2, FileText, FilePlus, DollarSign,Search, Plus, ArrowLeft, Eye, CheckCircle } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BounceRight,FadeIn,BounceUp,BounceLeft, } from "animate-components";
import ViewGoals from './ViewGoals';


class ListGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"",
            laoding:false,
            data:[],
            id:0,
            switch:"",
            filter:"ALL",
            startDate: new Date(),
            startDate2: new Date(),
            bool:false,
            modal:"",
            show:""
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
        this.SearchFilter(`${startDate.getFullYear()}-${startDate.getMonth()+1 < 10 ? `0${startDate.getMonth()+1}` : startDate.getMonth()+1}-${startDate.getDate() < 10 ? '0'+startDate.getDate() : startDate.getDate()}`)
      }


    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'filter') {
            this.LoadData(event.target.value);
            // this.props.dispatch(quick_params(event.target.value))
          }
        }
      }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            axios.get(`${Home}auth/perf/allGoals`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    SearchFilter=(year)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            axios.get(`${Home}auth/perf/allGoals/${year}`,{
               params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    Delete(id){
        if (window.confirm('❌ are you sure you want to delete1?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({laoding:true});
                axios.post(`${Home}auth/perf/deleteGoal`,{
                token: token,
                id:id
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.SearchFilter(`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`);
             }else{
                 this.setState({laoding:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }


    Approve(id){
        if (window.confirm('are you sure you want to approve?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({laoding:true});
                axios.post(`${Home}auth/perf/approveGoal`,{
                token: token,
                id:id
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.SearchFilter(`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`);
             }else{
                 this.setState({laoding:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }

    componentDidMount(){
        this.SearchFilter(`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`);
        // pdf.write('pdfs/basics.pdf').then(() => {
        //     console.log(new Date() - now);
        // });
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

    Switcher=(name,id)=>{
        this.setState({switch:name,id:id});
        if (name === '') {
            this.LoadData();
        }
    }
    
    render() {
    //    console.log(this.props)
        return (
            <div>
                {this.state.modal === 'WHOCODED'?
                <ViewGoals 
                display={this.state.modal==='WHOCODED'?'block':'none'}
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal2('',0)}
                id={this.state.id}
                // answer={d.options[this.state.id][d.answer[this.state.id]]}
                />
            :<span></span>}
              
                <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">List of goals</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div id="dddd" className="pull-right">
                                       
                                    <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                    <FadeIn duration="1s" timingFunction="ease-out">
                                    <button data-rh="Filter Payment" onClick={()=>this.SwitchContent('perf_goals_add',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><Plus color="white" size={35} /> New Goal</button>
                                        <button onClick={()=>this.SwitchContent('perf_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                                        </FadeIn>    
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                       
                            <div className="table-responsive">
                                <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                                <thead className="">
                                    <tr>
                                    <th scope="col" style={{width:'7%'}}></th>
                                    <th scope="col">Goals Title</th>
                                    <th scope="col">Percentage(%)</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Payment Date</th> */}
                                    <th scope="col" style={{width:'10%'}}>Actions</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((role,i)=>
                                        <tr key={role.id}>
                                            <td style={{cursor:'pointer'}} scope="row" >
                                            <center>
                                                <div className="avatar avatar-xm">
                                                <img className="rounded-circle" src={role.picture === null ? img : role.picture} />
                                            </div>
                                            </center>
                                                </td>
                                        <td scope="row">{role.name}</td>
                                        <td scope="row">{role.percent}</td>
                                        <td>{role.date}
                                    {/* <span className="d-block badge" style={{backgroundColor:role.statusColor}}>{role.payment.amountPaid}</span> */}
                                       </td>
                                       <td>
                                       <span className={`badge badge-${role.statusClass} badge-pill`}>{role.statusName}</span> 
                                       </td>
                                       <td>
                                        <div className="btn-toolbar">
                                            <div className="d-flex">
                                            <button data-rh="view" onClick={()=>this.OpenModal2('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                            {/* <button data-rh="View in PDF" onClick={()=>this.SwitchContent('View_Invoice',[role.id])} className="btn btn-primary2 btn-sm m-1 shadow"><FileText color="white" size={35} /> </button> */}
                                            {/* <button onClick={()=>this.SwitchContent('View_Invoice',[role.id])} type="button" className="st-btn btn-primary2 btn-icon d-flex" style={{marginRight:'5px'}}>
                                                 <MaterialIcon icon="monetization_on" color="#ffffff" />
                                            </button> */}
                                            {role.status === 0 && this.props.data.userDetails.lm || this.props.data.userDetails.hr ?
                                             <button data-rh="Approve this goal" onClick={()=>this.Approve(role.id)} className="btn btn-success btn-sm m-1 shadow"><CheckCircle color="white" size={35} /> </button>
                                            :''}
                                            {role.status === 0 && this.props.data.userDetails.id === role.userId ?
                                             <button onClick={()=>this.Delete(role.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button>
                                            :''}
                                           
                                            </div>
                                        </div>
                                        </td>
                                        
                                        </tr>
                                    
                                    )}
                                    
                                </tbody>
                                </table>
                            </div>
                        
                        </div>
                        </div>
                   
            
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (ListGoals);