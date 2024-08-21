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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';


class AddInvoice extends Component {
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
            startDate: new Date(),
            startDate2: new Date(),
            category:"",
            amount:"",
            row:[],
            values:[],
            total:0,
            id:""
        }
    }

    TotalScore=(id)=>{
        if (this.state.row.length > 0) {
            let number = this.state.row.length - 1;
            if (number > -1) {
                let sum = 0;
                let ss = this.state.row;
                ss.map((s,index)=>
                    sum += parseInt(this.state.values[`${'st2'}_${index}`]) === "" || isNaN(parseInt(this.state.values[`${'st2'}_${index}`]))  ? 0 : parseInt(this.state.values[`${'st2'}_${index}`])
                    );
                this.setState({total:sum})
            
            }
        }
    }

    handleChange2(i,id, e) {
        //this.TotalScore(id);
        console.log(i,id,e)
        this.setState({
          values: { ...this.state.values, [i]: e.target.value }
        });
        if (this.state.row.length > 0) {
            let number = this.state.row.length - 1;
            if (number > -1) {
                let sum = 0;
                let ss = this.state.row;
                ss.map((s,index)=>
                    sum += parseInt(this.state.values[`${'st2'}_${index}`]) === "" || isNaN(parseInt(this.state.values[`${'st2'}_${index}`]))  ? 0 : parseInt(this.state.values[`${'st2'}_${index}`])
                    );
                this.setState({total:sum})
            
            }
        }
        this.interval = setTimeout(() => this.TotalScore(id), 100);
        
        
        // console.log(this.state.values.comment_9);
      }
    onSelect=(selectedList, selectedItem)=> {
        this.setState({selectedValues:selectedList});
    }
  
    onRemove=(selectedList, removedItem)=> {
      this.setState({selectedValues:selectedList});
  }
    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/listAllStudents`,{
               params:{token: token}
            })
           .then(res => {
            // console.log('Teachers',res);
           this.setState({laoding:false,options:res.data});
           })
        .catch(err =>console.log(err));
        }
    }


    onChange2 = (startDate) =>{
        this.setState({ startDate });
      } 
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
      } 

    SwitchContent=(name)=>{
        this.props.dispatch(switch_content(name))
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/listExCat`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
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
        let token = "";
        if (this.state.row.length < 1) {
            this.props.dispatch(launch_toaster('Add invoice details'));
            this.props.dispatch(toast_trigger(false)); 
            return false;
        }else if (this.state.selectedValues.length <1 ) {
            this.props.dispatch(launch_toaster('Please select a student'));
            this.props.dispatch(toast_trigger(false)); 
            return false;
        }
        
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/newInvoice`,{
                token:token,
                title:this.state.title,
                total:this.state.total,
                category:this.state.category,
                students:this.state.selectedValues,
                value:this.state.values,
                id:this.state.id,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                date2:`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`,
              })
               .then(res => {
                // console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         this.SwitchContent('Ex_home');
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

     addOne=(id)=>{
        let idd = this.state.row.length + 1;
        this.setState({row:this.state.row.concat(idd)})
     }

     DeleteOne=(index)=>{
        this.state.row.splice(index,1);
        this.setState({row:this.state.row});
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
            <div>
                <div className="card border-0">
                        <div className="card-body">
                           
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">Add Invoice</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                    <button onClick={()=>this.SwitchContent('Invoice_home')} className="st-btn btn-danger shadow">
                                        <span className="d-flex">
                                          <MaterialIcon icon="keyboard_return" color="#ffffff" />
                                          <span className="text-white" style={{marginTop:'-3px'}}>return</span>
                                        </span>
                                        </button>   
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <form className="dtm" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                    <div className="form-group">
                                            <label>Invoice ID</label>
                                            <input type="text" 
                                            value={this.state.id}
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            name="id" 
                                            placeholder="ID" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Invoice Title</label>
                                            <input type="text" 
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            name="title" 
                                            placeholder="Title" required />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label>Add students</label>
                                            <Multiselect
                                                placeholder="Add students"
                                                closeOnSelect={false}
                                                avoidHighlightFirstOption={true}
                                                options={this.state.options} // Options to display in the dropdown
                                                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                onSelect={this.onSelect} // Function will trigger on select event
                                                onRemove={this.onRemove} // Function will trigger on remove event
                                                displayValue="name" // Property name to display in the dropdown options
                                                />
                                                <small className=" text-muted">Selecting multiple students will generate seperate invoice for each one</small>
                                        </div>
                                        </div>

                                        <div className="col-md-2">
                                           <label>Expense Date</label>
                                        </div>
                                        <div className="col-md-10">
                                        <button type="button" onClick={()=>this.addOne(1)} className="st-btn btn-primary pull-right shadow">
                                        <span className="d-flex">
                                          <MaterialIcon icon="add" color="#ffffff" />
                                          <span className="text-white" style={{marginTop:'-3px'}}>Add new row</span>
                                        </span>
                                        </button>

                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Amount</th>
                                                        <th style={{width:'5%'}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.row.length > 0 ?
                                                   this.state.row.map((rr,i)=>
                                                    <tr key={i}>
                                                        <td>
                                                            <div>
                                                            <input type="text" 
                                                            value={this.state.values[`${'st'}_${i}`]}
                                                            onChange={this.handleChange2.bind(this, `${'st'}_${i}`,rr)}
                                                            className="form-control" 
                                                            
                                                            placeholder="" required />
                                                            </div>
                                                        </td>
                                                        <td>
                                                        <div>
                                                            <input type="number" 
                                                            value={this.state.values[`${'st2'}_${i}`]}
                                                            onChange={this.handleChange2.bind(this, `${'st2'}_${i}`,rr)}
                                                            className="form-control" 
                                                            
                                                            placeholder="" required />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button type="button" onClick={()=>this.DeleteOne(i)}  className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                                                        </td>
                                                    </tr>
                                                    ) 
                                                :
                                                ''}
                                                {this.state.row.length > 0 ?
                                              <tr>
                                                  <th>Total</th>
                                                <th colSpan={2}>₦{this.state.total}</th>
                                              </tr>  
                                            :''}
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                        <div className="col-md-12">
                                        <div className="form-group" id="st">
                                            <label> Date</label>
                                             <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                        </div>

                                        <div className="form-group" id="st">
                                            <label>Due Date</label>
                                             <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control"
                                            selected={this.state.startDate2} 
                                            onChange={date => this.onChange3(date)} />
                                        </div>

                                        <div className="form-group">
                                            <label>Status</label>
                                            <select 
                                            required
                                            onChange={this.handleChange}
                                            value={this.state.category}
                                            className="form-control" 
                                            name="category"
                                            >
                                                <option value="">Select One</option>
                                                <option value="UNPAID">UNPAID</option>
                                                <option value="PAID">PAID</option>
                                               
                                            </select>
                                        </div>
                                        </div>
                                        
               
                                </div>
                                <div className="form-group">
                                    {this.state.laoding ?
                                    <Spinner />
                                :
                                <button className="st-btn btn-primary2 shadow">Add New Invoice</button>
                                }
                                
                                </div>
                                
                                </form>
                            </div>
                      
                        </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (AddInvoice);