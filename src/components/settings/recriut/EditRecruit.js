import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class EditRecruit extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            data:[],
            department:"",
            level:"",
            details:[],
            state:"",
            country:"",
            address:"",
            startDate: new Date(),
            startDate2: new Date(),
            number:""
        }
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }

      onChange = (startDate2) =>{
        this.setState({ startDate2 });
      }

    ErrorHandler=(message)=>{
        //console.clear();
        console.log(message)
        this.setState({loading:false})
        toast.error(message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}hr/recruitment/create`,{
                token:token,
                name:this.state.name,
                budget:this.state.number,
                start_date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                end_date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.status) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.SwitchContent('',[0]);
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
         //this.LoadLocations();
     }
    render() {
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Edit recruitment</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="mt-4">
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label>Budget</label>
                        <input 
                        required
                        value={this.state.number}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="number" placeholder="Budget" />
                    </div>
                    <div className="form-group">
                                        <label>Start Date</label>
                                        <DatePicker 
                                         required
                                         calendarClassName="rasta-stripes "
                                         className="red-border form-control"
                                         selected={this.state.startDate} 
                                         onChange={date => this.onChange2(date)} />
                                    </div>

                                    <div className="form-group">
                                        <label>End Date</label>
                                        <DatePicker 
                                         required
                                         calendarClassName="rasta-stripes "
                                         className="red-border form-control"
                                         selected={this.state.startDate2} 
                                         onChange={date => this.onChange(date)} />
                                    </div>
                   
                    
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Create new recruitment</button>
                    }
                        
                    </div>
                </form>
                
                </div>
                
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

export default connect(mapStoreToProps) (EditRecruit);