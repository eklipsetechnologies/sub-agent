import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { Home } from '../../global/Home';
import Axios from 'axios';
import Spinner from '../../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from '../../global/SearchUser';


class AddAllocation extends Component {
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
            lg:[],
            lgs:"",
            state:"",
            country:"",
            address:"",
            startDate: new Date(),
            startDate2: new Date(),
            show:"",
            amount:""
        }
        this.fileInput = React.createRef();
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
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
          if (event.target.name === 'state') {
              if (this.state.details[event.target.value].lgas) {
                  this.setState({lg:this.state.details[event.target.value].lgas})
              }
          }
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        // if (this.props.data.userDetails.hr) {
        //     if (this.props.data.user === null) {
        //         toast.error('message',{
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: false
        //             });
        //         this.OpenModal('WHOCODED',0);
        //         return false;
        //     }
        // }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            let fd = new FormData();
           
            fd.append('userId',this.state.country);
            fd.append('amount',this.state.amount);
            // fd.append('userId',this.props.data.user !== null && typeof(this.props.data.user) === 'object'? this.props.data.user.id :null);
            fd.append('token',token);
            this.setState({loading:true})
            Axios.post(`${Home}auth/train/CreateAllocation`,fd,{
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.SwitchContent('train_al',[0]);
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
                 
               })
                .catch(err =>{
                    console.log(err);
                    this.setState({loading:false})
                    toast.error('Error',{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false
                        });
                }
                    // this.ErrorHandler(err,'Error')
               //console.log(err.response.data.message),
              );
        }         
     }

     LoadLocations=()=>{
        Axios.get(`${Home}locations`,
          )
         .then(res => {
           console.log('Locations',res);
         this.setState({details:res.data})
         
        })
      }

     componentDidMount(){
        //  this.LoadLocations();
         let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.get(`${Home}auth/users/listUsers/Employees/1`,{
              params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({data:res.data});
           })
        .catch(err =>console.log(err));
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
    render() {
       // console.log(this.state)
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <SearchUser 
                show={this.state.show}
                display={this.state.name==='WHOCODED'?'block':'none'}
                close={()=>this.OpenModal('',0)}
                
                />
                :''
        }
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">New traing allocation</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('train_al',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="mt-4">
                    {/* <div className="form-group">
                        {this.props.data.userDetails.hr? 
                        <>
                        {this.props.data.user !== null && typeof(this.props.data.user) === 'object'?
                      <div className=" badge badge-warning badge-pill p-3 m-2">{`${this.props.data.user.name}` }</div>  
                    :''}
                        <button type="button" onClick={()=>this.OpenModal('WHOCODED',0)} className="btn btn-primary2 shadow">Select a user</button>
                    </>
                    :''}
                    </div> */}
                    <div className="form-group">
                        <label>Employee</label>
                        <select 
                        required
                        value={this.state.country}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="country"
                        >
                            <option value="">Select one</option>
                            {this.state.data.length > 0 ?
                          this.state.data.map(dep=>
                          <option key={dep.id} value={dep.id}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input 
                        required
                        value={this.state.amount}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="amount"
                        />
                    </div>
                   
                   
                    
                   
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Create Training Allocation</button>
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

export default connect(mapStoreToProps) (AddAllocation);