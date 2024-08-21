import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../global/Home';
import Spinner from '../global/Spinner';
import avatar from '../assets/svg/whocoded_p.svg'
import { toast } from 'react-toastify';
import Toaster from '../global/Toaster';
import { launch_toaster } from '../store/actions/IsToast';
import { toast_trigger } from '../store/actions/ToastTrigger';
import { quick_params } from '../store/actions/QuickParams';
import { BounceRight,FadeIn } from "animate-components";
import {PlusCircle, Edit, Trash2, Eye, EyeOff, Search } from 'react-feather';
import { select_user } from '../store/actions/SelectUser';

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            details:"",
            laoding:false,
            fname:"",
            mname:"",
            sname:"",
            loading:false,
            email:"",
            phone:"",
            address:"",
            address2:"",
            relationship:"",
            switch:"",
            name:"",
            data:[]
        }
    }
    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }

    Approve=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/profile/req/activateBasic`,{
               token: token,
               id:this.props.details.id
            })
           .then(res => {
            //console.log(res)
           this.setState({details:res.data,laoding:false});
           
           })
        .catch(err =>console.log(err));
        }
    }

    Decline=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/profile/req/declineBasic`,{
               token: token,
               id:this.props.details.id
            })
           .then(res => {
            //console.log(res)
           this.setState({details:res.data,laoding:false});
           if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.props.dispatch(quick_params(true))
            }else{
                this.setState({loading:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
            }
           
           })
        .catch(err =>console.log(err));
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (this.state.name.length < 3) {
            alert('Character length must be atleat 3');
            return false;
        }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/searchUsers`,{
                token:token,
                name:this.state.name,
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,data:res.data});
               
               })
                .catch(err =>
                    this.ErrorHandler(err)
               //console.log(err.response.data.message),
              );
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
    ChangeSwitch=(name)=>{
        if (this.state.switch === 'WHOCODED') {
            this.setState({switch:""});
        }else{
            this.setState({switch:name});
        }
    }

    componentDidMount(){
        // this.LoadEditData();
        if (this.props.details && typeof(this.props.details)==='object') {
            this.setState({
                email:this.props.details.email,
                phone:this.props.details.phone_number,
                address:this.props.details.postal_address,
                address2:this.props.details.residential_address,
                fname:this.props.details.first_name,
                mname:this.props.details.middle_name,
                sname:this.props.details.surname,
                relationship:this.props.details.relationship,
            })
        }
          this.interval = setTimeout(() => this.changeStyle('show'), 500);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }

        Select=(index)=>{
            this.props.dispatch(select_user(this.state.data[index]));
        }

        
    
    render() {
        return (
            <div>
                <Toaster />
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Search for Users</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                       
                      <div className=" table-responsive mt-4">
                      <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <BounceRight duration="2s" timingFunction="ease-out">
                            <div className="input-group">
                            <input 
                            placeholder="Search User"
                            required
                                onChange={this.handleChange}
                                name="name" value={this.state.name}
                                 className="form-control st-login-f mr-1"/>
                                 {this.state.loading ?
                                 <Spinner size={30} />
                                :
                                <button className="btn btn-primary2 btn-sm shadow"><Search color="white" size={35} /> Search</button>
                                }
                           
                            </div>
                            
                        </BounceRight>
                            </div>
                        </form>
                          {this.state.switch === "WHOCODED"?
                          ''
                        :
                        this.state.data.length > 0 ?
                          <table className="table mt-2 table-hover table-bordered">
                             <tbody>
                                 {this.state.data.map((user,i)=>
                                    <tr>
                                        <th>{`${user.first_name} ${user.middle_name}`}</th>
                                        <td>{user.email}</td>
                                        <td>
                                            {(typeof(this.props.data.user) === 'object' && this.props.data.user !== null) &&  this.props.data.user.id === user.id ?
                                            <button className="btn btn-success shadow">Selected</button>
                                        :
                                        <button onClick={()=>this.Select(i)} className="btn btn-primary2 shadow">Select</button>
                                        }
                                            
                                        </td>
                                    </tr>
                                    )}
                             </tbody>
                          </table>
                          :
                          this.state.name.length > 2 ?
                          <div className="alert alert-warning text-center">No result</div>
                          :''
                          
                }
                      </div>
                      </>
                    }
                    </div>
                    
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

export default connect(mapStateToProps) (SearchUser);