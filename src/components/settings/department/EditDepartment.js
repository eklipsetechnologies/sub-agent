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

class EditDepartment extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            fetching:false,
            loading:false,
            data:[],
            branch:"",
            data2:[],
            division:""
        }
    }
    LoadData22=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listDivision`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData1=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listBranch`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true});
            Axios.post(`${Home}auth/settings/singleDepartment`,{
               token: token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
            console.log(res);
           this.setState({fetching:false,
            });
            if (res.data.success) {
                this.setState({name:res.data.name,branch:res.data.branch});
            }else{
                  this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                  this.SwitchContent('',[0])
            }
           })
        .catch(err =>console.log(err));
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
            Axios.post(`${Home}auth/settings/editDepartment`,{
                token:token,
                name:this.state.name,
                branch:this.state.branch,
                division:this.state.division,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
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

     componentDidMount(){
         this.LoadData();
         this.LoadData1();
         this.LoadData22();
     }
    render() {
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Edit department</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                {this.state.fetching ?
                <Spinner size={70} />
            :
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
                        <label>Branch</label>
                        <select 
                        required
                        value={this.state.branch}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="branch">
                            <option value="">Select</option>
                            {this.state.data.length > 0 ?
                          this.state.data.map(da=>
                          <option key={da.id} value={da.id}>{da.name}</option>
                            )  
                        :''}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Division</label>
                        <select 
                        required
                        value={this.state.division}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="division">
                            <option value="">Select</option>
                            {this.state.data2.length > 0 ?
                          this.state.data2.map(da=>
                          <option key={da.id} value={da.id}>{da.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Save Changes</button>
                    }
                        
                    </div>
                </form>
            }
                
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

export default connect(mapStoreToProps) (EditDepartment);