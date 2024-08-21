import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import ReactToPrint from "react-to-print";



 class  ViewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seleted:[],
            laoding:false,
            data:[],
            title:"",
            description:"",
            options: [],
            selectedValues: [],
            passgrade:"",
            finalgrade:"",
            desc:"",
            details:"",
            printing:false,
            fetching:false,
            data:[]
        }
        this.myRef = React.createRef();
    }


    SwitchContent=(name)=>{
        this.props.dispatch(switch_content(name))
    }
    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true});
            Axios.post(`${Home}auth/InvoicePaymentLog`,{
               token: token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
            })
           .then(res => {
            // console.log(res);
           this.setState({fetching:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/viewSingleInvoice`,{
               token: token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
            })
           .then(res => {
            // console.log(res);
           this.setState({
               laoding:false,
               details:res.data,
        });
           })
        .catch(err =>console.log(err));
        }
    }


     handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }

      handleSubmit=(event)=>{
        event.preventDefault();
        this.setState({laoding:true});
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(`${Home}auth/EditInCat`,{
                token:token,
                name:this.state.title,
                desc:this.state.desc,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
              })
               .then(res => {
                 //console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         this.SwitchContent('In_Cat_List');
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

    componentDidMount(){
        this.LoadData();
        this.LoadData2();
    }
    ErrorHandler=(err,message)=>{
        console.log(err);
        //console.clear();
        this.setState({loading:false})
        toast.error(message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
            });
    }
    render() {
       // console.log(this.state)
        return (
            <div className="">
               
                <div className="card border-0" ref={el => (this.myRef = el)}>
                        <div className="card-body">
                            {this.state.laoding ?
                            <div className="table-responsive">
                                <div className="p-5">
                                    <Spinner />
                                </div>
                            </div>
                        :
                        <>
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">View Invoice</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                        {this.state.printing ?'':
                                        <button onClick={()=>this.SwitchContent('Ex_In_List')} className="st-btn btn-danger shadow">
                                        <span className="d-flex">
                                          <MaterialIcon icon="keyboard_return" color="#ffffff" />
                                          <span className="text-white" style={{marginTop:'-3px'}}>return</span>
                                        </span>
                                        </button>
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>
                                           <h1>#{this.state.details.code}</h1> 
                                            </th>
                                            <th>
                                                <h1 style={{fontWeight:'900',color:this.state.details.statusColor}}>{this.state.details.status}</h1>
                                                {this.state.printing ?
                                                ''
                                            :
                                            <button className="btn btn-sm st-btn btn-primary2 text-light shadow">Pay Now</button>
                                            }
                                                
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                From <strong>{typeof(this.state.details.school) === 'object' ? this.state.details.school.name :''}</strong>
                                            </td>
                                            <td>TO  <strong>{this.state.details.student}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Phone N0: {typeof(this.state.details.school) === 'object' ? this.state.details.school.phone :''}</td>
                                            <td>Phone N0: {this.state.details.studentPhone}</td>
                                        </tr>
                                        <tr>
                                            <td>Email Address: {typeof(this.state.details.school) === 'object' ? this.state.details.school.email :''}</td>
                                            <td>Email Address: {this.state.details.studentEmail}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {typeof(this.state.details.details) === 'object' ?
                                        <>
                                        {this.state.details.details.st_0 && this.state.details.details.st_0 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_0}</td>
                                            <td>#{this.state.details.details.st2_0}</td>
                                        </tr>
                                    :''}
                                        {this.state.details.details.st_1 && this.state.details.details.st_1 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_1}</td>
                                            <td>#{this.state.details.details.st2_1}</td>
                                        </tr>
                                    :''}
                                    {this.state.details.details.st_2 && this.state.details.details.st_2 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_2}</td>
                                            <td>#{this.state.details.details.st2_2}</td>
                                        </tr>
                                    :''}
                                    {this.state.details.details.st_3 && this.state.details.details.st_3 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_3}</td>
                                            <td>#{this.state.details.details.st2_3}</td>
                                        </tr>
                                    :''}
                                    {this.state.details.details.st_4 && this.state.details.details.st_4 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_4}</td>
                                            <td>#{this.state.details.details.st2_4}</td>
                                        </tr>
                                    :''}
                                    {this.state.details.details.st_5 && this.state.details.details.st_5 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_5}</td>
                                            <td>#{this.state.details.details.st2_5}</td>
                                        </tr>
                                    :''}
                                    {this.state.details.details.st_6 && this.state.details.details.st_6 !=="" ?
                                        <tr>
                                            <td>{this.state.details.details.st_6}</td>
                                            <td>#{this.state.details.details.st2_6}</td>
                                        </tr>
                                    :''}
                                        </>
                                    :''}
                                        
                                    </tbody>
                                </table>

                                <table className="table table-boed">
                                    
                                    <tbody>
                                        <tr>
                                            <td style={{width:'50%'}}></td>
                                            <td>
                                                <table className="table table-sm table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <th>Total</th>
                                                            <td>{this.state.details.total}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Amount Paid</th>
                                                            <td>{typeof(this.state.details.payment) === 'object' ? this.state.details.payment.amountPaid :''}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Amount Pending</th>
                                                            <td>{typeof(this.state.details.payment) === 'object' ? this.state.details.payment.amountPending :''}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={2} style={{backgroundColor:this.state.details.dueColor}}>{this.state.details.due}</th>
                                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        </>
                   }
                        </div>
                    </div>
                    <ReactToPrint
                    bodyClass="pdf-width"
                    onBeforeGetContent={()=>this.setState({printing:true})}
                    onAfterPrint={()=>this.setState({printing:false})}
                    onBeforePrint={()=>this.setState({printing:true})}
                    documentTitle={`Invoice for ${this.state.details.student}`}
                    trigger={() => <a href="#" className="btn btn-primary2 st-btn shadow btn-sm text-light m-3">Print this out!</a>}
                    content={() => this.myRef}
                />

                <div className="card border-0">
                    <div className="card-body">
                    <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">Collection History</p></div>
                                </div>
                                <div className="col-md-8">
                                    
                                </div>
                            </div>

                    
                    {this.state.fetching ?
                  <div>
                      <Spinner />
                  </div>    
                :
                this.state.data.length < 1?
                <div className="alert alert-warning text-center">No Collection Yet</div>
                :
                <div className="table-responsive">
                                <table className="table mt-2 table-hover table-bordered">
                                <thead className="">
                                    <tr>
                                    <th scope="col">Amount </th>
                                    <th scope="col">Method</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Date</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(role=>
                                        <tr key={role.id}>
                                            
                                        <td scope="row">{role.amount}</td>
                                        <td scope="row">{role.method}</td>
                                        <td>{role.note}
                                    
                                        </td>
                                       
                                        <td scope="row">{role.date}</td>
                                        
                                        
                                        </tr>
                                    
                                    )}
                                    
                                </tbody>
                                </table>
                            </div>
                }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (ViewInvoice);
