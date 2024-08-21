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
import { props_params } from '../../../store/actions/PropsParams';
import { ArrowLeft, Plus } from 'react-feather';
import { BounceRight,FadeIn,BounceUp,BounceLeft, } from "animate-components";


class AddGoal extends Component {
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
            selectedValues2: [],
            passgrade:"",
            finalgrade:"",
            desc:"",
            startDate: new Date(),
            startDate2: new Date(),
            category:"",
            amount:"",
            row:[],
            row2:[],
            values:[],
            values2:[],
            total:0,
            total2:0,
            id:"",
            type:"Employees",
            type2:"1",
            userDetails:"",
            applyNum:0,
            percent:0,
            ready:false
         
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

    TotalScore2=(id)=>{
        if (this.state.row2.length > 0) {
            let number = this.state.row2.length - 1;
            if (number > -1) {
                let sum = 0;
                let ss = this.state.row2;
                ss.map((s,index)=>
                    sum += parseInt(this.state.values2[`${'st2'}_${index}`]) === "" || isNaN(parseInt(this.state.values2[`${'st2'}_${index}`]))  ? 0 : parseInt(this.state.values2[`${'st2'}_${index}`])
                    );
                this.setState({total2:sum})
            
            }
        }
    }

    handleChange2(i,id, e) {
        console.log(i,id,e)
        this.setState({
          values: { ...this.state.values, [i]: e.target.value },
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
      }

      handleChange3(i,id, e) {
        //this.TotalScore(id);
        // console.log(i,id,e)
        this.setState({
          values2: { ...this.state.values2, [i]: e.target.value }
        });
        if (this.state.row2.length > 0) {
            let number = this.state.row2.length - 1;
            if (number > -1) {
                let sum = 0;
                let ss = this.state.row2;
                ss.map((s,index)=>
                    sum += parseInt(this.state.values2[`${'st2'}_${index}`]) === "" || isNaN(parseInt(this.state.values2[`${'st2'}_${index}`]))  ? 0 : parseInt(this.state.values2[`${'st2'}_${index}`])
                    );
                this.setState({total2:sum})
            
            }
        }
        this.interval = setTimeout(() => this.TotalScore2(id), 100);
        
        
        // console.log(this.state.values.comment_9);
      }
    onSelect=(selectedList, selectedItem)=> {
        this.setState({selectedValues:selectedList});
    }
  
    onRemove=(selectedList, removedItem)=> {
      this.setState({selectedValues:selectedList});
  }

  onSelect2=(selectedList, selectedItem)=> {
    this.setState({selectedValues2:selectedList});
    if (selectedItem.operation == '+') {
        this.setState({percent:this.state.percent + selectedItem.percent2})
    }else if (selectedItem.operation == '-') {
        this.setState({percent:this.state.percent - selectedItem.percent2})
    }else{
        alert('Somthing is wrong with selected payroll element...Contact admin')
    }
    this.CalculatePer();
    this.interval = setTimeout(() => this.CalculatePer(), 600);
  }

onRemove2=(selectedList, removedItem)=> {
  this.setState({selectedValues2:selectedList});
  if (this.state.percent < 1) {
    this.setState({percent:this.state.percent + removedItem.percent2})
  }else{
    this.setState({percent:this.state.percent - removedItem.percent2})
  }
  this.CalculatePer();
 this.interval = setTimeout(() => this.CalculatePer(), 600);
}

CalculatePer=()=>{
    let amount = this.state.userDetails.fullsalaryBase.amount2; 
    let perc   = this.state.percent / 100;
    let calc = perc * amount;
    this.setState({applyNum:calc})
    console.log(perc,calc);
    
 }



    onChange2 = (startDate) =>{
        this.setState({ startDate });
      } 
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
      } 

      SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/settings/listPayrollElement`,{
               token: token
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/users/listUsers/${this.state.type}/${this.state.type2}`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({loading:false,options:res.data});
           })
        .catch(err =>console.log(err));
        }
    }


     handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'category') {
            let mo = this.state.applyNum + this.state.total - this.state.total2;
            this.setState({applyNum:mo})
          }
        }
      }


      handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (this.state.row.length < 1) {
            this.props.dispatch(launch_toaster('Add goal activities'));
            this.props.dispatch(toast_trigger(false)); 
            return false;
        }
        
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/perf/newGoal`,{
                token:token,
                title:this.state.title,
                total:this.state.total,
                percent:this.state.percent,
                values:this.state.values,
                desc:this.state.descs,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                
              })
               .then(res => {
                // console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         this.SwitchContent('',0);
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


     addOne2=(id)=>{
        let idd = this.state.row2.length + 1;
        this.setState({row2:this.state.row2.concat(idd)})
     }

     DeleteOne2=(index)=>{
        this.state.row2.splice(index,1);
        this.setState({row2:this.state.row2});
     }

     LoadUser=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/users/viewUser`,{
               token: token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
           console.log(res)
           this.setState({userDetails:res.data,laoding:false});
           if (typeof(this.state.userDetails.fullsalaryBase) === 'object') {
               this.setState({applyNum:this.state.userDetails.fullsalaryBase.amount2})
           }else{
            this.setState({applyNum:0})
            
           }
           if (!this.state.userDetails.fullsalaryBase.amount2) {
            this.props.dispatch(launch_toaster('No salary base marched to this Employee yet'));
            this.props.dispatch(toast_trigger(false));
            this.SwitchContent('pay_list',[0])
           }
           
           })
        .catch(err =>console.log(err));
        }
    }


    componentDidMount(){
       this.LoadData();
       this.LoadData2();
       this.LoadUser();
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
    //   console.log(this.state)
        return (
            <BounceRight duration="1s" timingFunction="ease-out">
            <div>
                <div className="card border-0">
                        <div className="card-body">
                           
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">Create New Goal</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                        <button onClick={()=>this.SwitchContent('perf_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                                        </FadeIn>
                              
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <form className="dtm" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                    

                                        <div className="form-group">
                                            <label>Goal Title</label>
                                            <input type="text" 
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            className="form-control st-login-f" 
                                            name="title" 
                                            placeholder="Title" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Goal Percentage(%)</label>
                                            <input type="number" 
                                            value={this.state.percent}
                                            onChange={this.handleChange}
                                            className="form-control st-login-f" 
                                            name="percent" 
                                            placeholder="Percentage" required />
                                            <small className="text-muted">This is calculate to form your KPI. Make sure you enter a valid percentage of this goal only</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Goal Description</label>
                                            <textarea
                                            value={this.state.desc}
                                            onChange={this.handleChange}
                                            className="form-control st-login-f" 
                                            name="desc" 
                                            placeholder="Description" required />
                                        </div>

                                        
                                        </div>

                                        <div className="col-md-2">
                                           <label>Activities</label>
                                        </div>
                                        <div className="col-md-10">
                                        <button type="button" onClick={()=>this.addOne(1)} className="btn mb-1 btn-primary btn-sm pull-right shadow">
                                         <Plus color="white" size={35} /> Add activity
                                        </button>

                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        {/* <th>Amount</th> */}
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
                                                            className="form-control st-login-f" 
                                                            
                                                            placeholder="" required />
                                                            </div>
                                                        </td>
                                                        {/* <td>
                                                        <div>
                                                            <input type="number" 
                                                            // onBlur={()=>this.ApplyTotal()}
                                                            value={this.state.values[`${'st2'}_${i}`]}
                                                            onChange={this.handleChange2.bind(this, `${'st2'}_${i}`,rr)}
                                                            className="form-control st-login-f" 
                                                            
                                                            placeholder="" required />
                                                            </div>
                                                        </td> */}
                                                        <td>
                                                            <button type="button" onClick={()=>this.DeleteOne(i)}  className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                                                        </td>
                                                    </tr>
                                                    ) 
                                                :
                                                ''}
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>


                                        

                                        
                                        <div className="col-md-12">
                                        <div className="form-group" id="st">
                                            <label> Due Date</label>
                                             <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes "
                                            className="red-border form-control st-login-f"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                        </div>
                                        {/* <div className="form-group">
                                            <label>Status</label>
                                            <select 
                                            required
                                            onChange={this.handleChange}
                                            value={this.state.category}
                                            className="form-control st-login-f" 
                                            name="category"
                                            >
                                                <option value="">Select One</option>
                                                <option value="UNPAID">UNPAID</option>
                                                <option value="PAID">PAID</option>
                                               
                                            </select>
                                        </div> */}
                                        </div>

                                        
               
                                </div>
                                <div className="form-group">
                                    {this.state.laoding ?
                                    <Spinner />
                                :
                                <button className="btn btn-primary2 shadow">Create New Goal Now</button>
                                }
                                
                                </div>
                                
                                </form>
                            </div>
                      
                        </div>
                    </div>
            </div>
            </BounceRight>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (AddGoal);