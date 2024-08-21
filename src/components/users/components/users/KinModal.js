import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';
import avatar from '../../../../assets/svg/whocoded_avatar.svg'
import { toast } from 'react-toastify';
import Toaster from '../../../../global/Toaster';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import { Trash2 } from 'react-feather';

class KinModal extends Component {
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
            switch:""
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

    LoadEditData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}hr/user/kin/view`,{
               token: token,
               user_next_of_kin_key:this.props.id
            })
           .then(res => {
            console.log(res)
           this.setState({details:res.data,laoding:false});
           
           })
        .catch(err =>console.log(err));
        }
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/editNextOfKin`,{
                token:token,
                id:this.props.details.id,
                email:this.state.email,
                phone:this.state.phone,
                r_address:this.state.address2,
                p_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_NK_LIST');
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
               })
                .catch(err =>
                    this.ErrorHandler(err)
               //console.log(err.response.data.message),
              );
        }
        
     }


     RequestNext=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/req/ReqcreateNextOfKin`,{
                token:token,
                id:this.props.details.id,
                email:this.state.email,
                phone_number:this.state.phone,
                r_address:this.state.address2,
                p_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship,
                type:2
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.QuickSwitcher('WHOCODED_NK_LIST');
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
               })
                .catch(err =>
                    this.ErrorHandler(err)
               //console.log(err.response.data.message),
              );
        }
        
     }

     Delete(key){
        if (window.confirm('❌ are you sure you want to delete this?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}hr/job/delete`,{
                token: token,
                job_key:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.status) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData();
             }else{
                 this.setState({loading:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
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
                phone:this.props.details.phone,
                address:this.props.details.p_address,
                address2:this.props.details.r_address,
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
    
    render() {
        return (
            <div>
                <Toaster />
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
        <h5 className="modal-title">{this.state.switch === "WHOCODED"? this.props.data.userDetails.employee === 2 ? "Request Edit":' Edit' :''} Next of Kin</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                        <center>
                        <div className="avatar avatar-xxl">
                            <img className="rounded-circle shadow-lg sty" src={avatar} />
                         </div>
                        </center>
                      <div className=" table-responsive mt-5">
                          {this.state.switch === "WHOCODED"?
                          this.props.data.userDetails.employee === 2 ?
                          <form onSubmit={this.RequestNext}>
                          <div className="form-group">
                                 <label>First Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.fname} 
                                 className="form-control" name="fname"
                                  placeholder="First Name" />
                             </div>
                             <div className="form-group">
                                 <label>Middle Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.mname} 
                                 className="form-control" name="mname"
                                  placeholder="Middle Name" />
                             </div>
                             <div className="form-group">
                                 <label>SurName</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.sname} 
                                 className="form-control" name="sname"
                                  placeholder="SurName" />
                             </div>
                             <div className="form-group">
                                 <label>Email</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.email} 
                                 className="form-control" name="email"
                                  placeholder="Email" />
                             </div>
                             <div className="form-group">
                                 <label>Phone Number</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.phone} 
                                 className="form-control" name="phone"
                                  placeholder="Phone Number" />
                             </div>
                             <div className="form-group">
                                 <label>Relationship</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.relationship} 
                                 required
                                 className="form-control" name="relationship"
                                  placeholder="Relationship" />
                             </div>
                             <div className="form-group">
                                 <label>Postal Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address} 
                                 className="form-control" name="address"
                                  placeholder="Postal Address" />
                             </div>
                             <div className="form-group">
                                 <label>Resitendial Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address2} 
                                 className="form-control" name="address2"
                                  placeholder="Resitendial Address" />
                             </div>
                             <div className="form-group">
                                 {this.state.loading?
                                 <Spinner size={40} />
                                :
                                <button className="btn btn-primary2 btn-block shadow">Submit Changes</button>
                                }
                                 
                             </div>
                      </form>
                          :

                          <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                                 <label>First Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.fname} 
                                 className="form-control" name="fname"
                                  placeholder="First Name" />
                             </div>
                             <div className="form-group">
                                 <label>Middle Name</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.mname} 
                                 className="form-control" name="mname"
                                  placeholder="Middle Name" />
                             </div>
                             <div className="form-group">
                                 <label>SurName</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.sname} 
                                 className="form-control" name="sname"
                                  placeholder="SurName" />
                             </div>
                             <div className="form-group">
                                 <label>Email</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.email} 
                                 className="form-control" name="email"
                                  placeholder="Email" />
                             </div>
                             <div className="form-group">
                                 <label>Phone Number</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.phone} 
                                 className="form-control" name="phone"
                                  placeholder="Phone Number" />
                             </div>
                             <div className="form-group">
                                 <label>Relationship</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.relationship} 
                                 required
                                 className="form-control" name="relationship"
                                  placeholder="Relationship" />
                             </div>
                             <div className="form-group">
                                 <label>Postal Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address} 
                                 className="form-control" name="address"
                                  placeholder="Postal Address" />
                             </div>
                             <div className="form-group">
                                 <label>Resitendial Address</label>
                                 <input 
                                 onChange={this.handleChange}
                                 value={this.state.address2} 
                                 className="form-control" name="address2"
                                  placeholder="Resitendial Address" />
                             </div>
                             <div className="form-group">
                                 {this.state.loading?
                                 <Spinner size={40} />
                                :
                                <button className="btn btn-primary2 btn-block shadow">Save Now</button>
                                }
                                 
                             </div>
                      </form>
                          
                        :
                          <table className="table mt-2 table-hover table-bordered">
                              <tbody>
                                  <tr>
                                      <th>First Name</th>
                                      <td>{this.props.details.first_name}</td>
                                  </tr>
                                  <tr>
                                      <th>Middle Name</th>
                                      <td>{this.props.details.middle_name}</td>
                                  </tr>
                                  <tr>
                                      <th>SurName</th>
                                      <td>{this.props.details.surname}</td>
                                  </tr>
                                  <tr>
                                      <th>Relationship</th>
                                      <td>{this.props.details.relationship}</td>
                                  </tr>
                                  <tr>
                                      <th>Email</th>
                                      <td>{this.props.details.email}</td>
                                  </tr>
                                  <tr>
                                      <th>Phone Number</th>
                                      <td>{this.props.details.phone}</td>
                                  </tr>
                                  <tr>
                                      <th>Postal Address</th>
                                      <td>{this.props.details.p_address}</td>
                                  </tr>
                                  <tr>
                                      <th>Residential Address</th>
                                      <td>{this.props.details.r_address}</td>
                                  </tr>
                                  
                              </tbody>
                          </table>
                }
                      </div>
                      </>
                    }
                    </div>
                    <div className="modal-footer">
                    {/* {this.props.data.userDetails.employee == 2 ?
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal"><Trash2 size={30} color="#ffffff" /> Delete</button>
                    :
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal">Request Delete</button>
                    } */}
                    <button onClick={()=>this.ChangeSwitch('WHOCODED')} type="button" className="btn btn-primary" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Edit details'}`}</button>
                        <button onClick={this.props.close} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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

export default connect(mapStateToProps) (KinModal);