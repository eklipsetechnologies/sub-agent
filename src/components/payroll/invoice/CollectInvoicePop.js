import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import MdIonic from 'react-ionicons/lib/MdIonic'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


class CollectInvoicePop extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            details:"",
            laoding:false,
            data:[],
            salary:"",
            startDate: new Date(),
            category:"",
            amount:"",
            desc:""
        }
    }
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
      } 

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/listSalaryBase`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadEditData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/getSingleInvoice`,{
               token: token,
               id:this.props.id
            })
           .then(res => {
            console.log(res)
           this.setState({details:res.data,salary:res.data.salaryBase,laoding:false});
           
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
            Axios.post(`${Home}auth/saveInvoicePayment`,{
                token:token,
                id:this.props.id,
                method:this.state.salary,
                note:this.state.desc,
                amount:this.state.amount,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
              })
               .then(res => {
                 //console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         this.LoadEditData();
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

    componentDidMount(){
        this.LoadEditData();
        this.LoadData();
          this.interval = setTimeout(() => this.changeStyle('show'), 5);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }
    
    render() {
       // console.log(this.state);
        return (
            <div>
                <div className={'modal effect-scale '+this.state.style} id="exampleModalCenter"  role="dialog" style={{display:'block',background:'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={this.handleSubmit} className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
                        <h5 className="modal-title"> <MdIonic rotate={true} fontSize="40px" color={this.state.details.statusColor} /> Collect Payment</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                        
                      <div className=" table-responsive mt-2">
                          <table className="table table-bordered table-sm">
                              <tbody>
                                  <tr>
                                      <th colSpan={2}>Invoice ID</th>
                                     <td colSpan={2}>{this.state.details.code}</td>
                                  </tr>
                                  <tr>
                                     <th>Total </th>
                                     <td>{this.state.details.total}</td>
                                     <th>Pending Amount</th>
                                     <td> {this.state.details.total}</td>
                                  </tr>
                              </tbody>
                          </table>
                          <div className="form-group">
                                            <label>Income Amount</label>
                                            <input type="number" 
                                            value={this.state.amount}
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            name="amount" 
                                            placeholder="Amount" required />
                                        </div>
                                        <div className="form-group" id="st">
                                            <label>Income Date</label>
                                             <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                        </div>
                          <div className="form-group">
                              <label>Select Payment Method</label>
                              <select 
                                            required
                                            onChange={this.handleChange}
                                            value={this.state.salary}
                                            className="form-control" 
                                            name="salary"
                                            >
                                                <option value="">Select One</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Credit Card">Credit Card</option>
                                                <option value="Cheque">Cheque</option>
                                            </select>
                          </div>

                          <div className="form-group">
                                            <label>Notes</label>
                                            <textarea 
                                            value={this.state.desc}
                                            onChange={this.handleChange}
                                            placeholder="description"
                                            className="form-control" name="desc"
                                            ></textarea>
                                        </div>
                      </div>
                      </>
                    }
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.props.close} type="button" className="st-btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" className="st-btn btn-primary2" data-dismiss="modal">Collect Payment</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (CollectInvoicePop);