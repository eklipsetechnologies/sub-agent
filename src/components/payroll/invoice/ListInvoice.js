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
import CollectInvoicePop from './CollectInvoicePop';
import { Link } from 'react-router-dom';
import img from '../../../assets/svg/whocoded_avatar.svg'
import { Trash2, FileText, FilePlus, DollarSign,Search } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class ListInvoice extends Component {
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
            bool:false
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
        this.SearchFilter(`${startDate.getFullYear()}-${startDate.getMonth()+1 < 10 ? `0${startDate.getMonth()+1}` : startDate.getMonth()+1}-${startDate.getDate() < 10 ? '0'+startDate.getDate() : startDate.getDate()}`,`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`)
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
        this.SearchFilter(`${startDate2.getFullYear()}-${startDate2.getMonth()+1 < 10 ? `0${startDate2.getMonth()+1}` : startDate2.getMonth()+1}-${startDate2.getDate() < 10 ? '0'+startDate2.getDate() : startDate2.getDate()}`,`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`)
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
            axios.get(`${Home}auth/allInvoice`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    SearchFilter=(from,to)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            axios.get(`${Home}auth/allInvoice/${from}/${to}`,{
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
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({laoding:true});
                axios.post(`${Home}auth/deleteInvoice`,{
                token: token,
                id:id
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.SearchFilter();
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
        this.SearchFilter(1,1);
        // pdf.write('pdfs/basics.pdf').then(() => {
        //     console.log(new Date() - now);
        // });
    }

    Switcher=(name,id)=>{
        this.setState({switch:name,id:id});
        if (name === '') {
            this.LoadData();
        }
    }
    
    render() {
       // console.log(this.props)
        return (
            <div>
              
                <div className="card border-0">
                        <div className="card-body">
    
                        
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">Payment Slip</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div id="dddd" className="pull-right">
                                        {this.state.bool?
                                    <>
                                           from
                                    <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                                to
                                            <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate2} 
                                            onChange={date => this.onChange3(date)} />
                                            <button data-rh="Close Filter" onClick={()=>this.setState({bool:!this.state.bool})} className="btn m-1 btn-danger btn-sm shadow"><Search color="white" size={35} /> Close Filter</button>
                                    </>    
                                    :
                                    <>
                                    <button data-rh="Filter Payment" onClick={()=>this.setState({bool:!this.state.bool})} className="btn m-1 btn-primary2 btn-sm shadow"><Search color="white" size={35} /> Filter Payment</button>
                                    <button data-rh="Filter Payment" onClick={()=>this.SwitchContent('pay_salary_list',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><DollarSign color="white" size={35} /> Salary Base</button>
                                    <button onClick={()=>this.SwitchContent('pay_list',[0])} className="btn m-1 btn-primary2 btn-sm shadow"><FilePlus color="white" size={35} /> New Payment</button>
                                    </>
                                    }
                                     
                                             
                                             
                                    
                                          
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                       
                            <div className="table-responsive">
                                <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                                <thead className="">
                                    <tr>
                                    <th scope="col" style={{width:'7%'}}></th>
                                    <th scope="col">Payment To</th>
                                    <th scope="col">Payment Total</th>
                                    <th scope="col">Invoice Total</th>
                                    <th scope="col">Payment Date</th>
                                    <th scope="col" style={{width:'10%'}}>Actions</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(role=>
                                        <tr key={role.id}>
                                            <td style={{cursor:'pointer'}} scope="row" >
                                            <center>
                                                <div className="avatar avatar-xm">
                                                <img className="rounded-circle" src={role.picture === null ? img : role.picture} />
                                            </div>
                                            </center>
                                                </td>
                                        <td scope="row">{role.employee}</td>
                                        <td scope="row">{role.name}</td>
                                        <td>₦{role.applyNum}
                                    {/* <span className="d-block badge" style={{backgroundColor:role.statusColor}}>{role.payment.amountPaid}</span> */}
                                        </td>
                                        
                                        <td scope="row">{role.date}</td>
                                        <td>
                                        <div className="btn-toolbar">
                                            <div className="d-flex">
                                            <button data-rh="View in PDF" onClick={()=>this.SwitchContent('View_Invoice',[role.id])} className="btn btn-primary2 btn-sm m-1 shadow"><FileText color="white" size={35} /> </button>
                                            {/* <button onClick={()=>this.SwitchContent('View_Invoice',[role.id])} type="button" className="st-btn btn-primary2 btn-icon d-flex" style={{marginRight:'5px'}}>
                                                 <MaterialIcon icon="monetization_on" color="#ffffff" />
                                            </button> */}
                                            <button onClick={()=>this.Delete(role.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button>
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

export default connect(mapStateToProps) (ListInvoice);