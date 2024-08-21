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

class AddBranches extends Component {
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
            address:""
        }
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
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/settings/CreateBranch`,{
                token:token,
                name:this.state.name,
                country:this.state.country,
                state:this.state.details[this.state.state].id,
                address:this.state.address,
                lgs:this.state.lgs,
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
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

     LoadLocations=()=>{
        Axios.get(`${Home}locations`,
          )
         .then(res => {
           console.log('Locations',res);
         this.setState({details:res.data})
         
        })
      }

     componentDidMount(){
         this.LoadLocations();
         Axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(res => {
            console.log(res)
            const data = res.data;
            this.setState({ data });
        })
        .catch(err =>console.log(err));
     }
    render() {
       // console.log(this.state)
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Add new branch</h6>
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
                        <label>Select country</label>
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
                          <option key={dep.key} value={dep.name}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    {this.state.country == 'Nigeria' ?
                    <>
                    <div className="form-group">
                        <label>Select state</label>
                        <select 
                        required
                        value={this.state.state}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="state"
                        >
                            <option value="">Select one</option>
                            {this.state.details.length > 0 ?
                          this.state.details.map((dep,i)=>
                          <option key={dep.id} value={i}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select LGA</label>
                        <select 
                        required
                        value={this.state.lgs}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="lgs"
                        >
                            <option value="">Select </option>
                            {this.state.lg.length > 0 ?
                          this.state.lg.map((dep,i)=>
                          <option key={dep.id} value={dep.id}>{dep.name}</option>
                            )  
                        :
                        <option value="">Select State first</option>
                        }
                        </select>
                    </div>
                    </>
                :''}
                    
                    
                    <div className="form-group">
                        <label>Address</label>
                        <input 
                        required
                        type="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="address" placeholder="Address" />
                    </div>
                    
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Create new branch</button>
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

export default connect(mapStoreToProps) (AddBranches);