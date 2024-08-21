import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import avatar from '../../../assets/svg/whocoded_p.svg'
import { toast } from 'react-toastify';
import Toaster from '../../../global/Toaster';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';

class ApplicationQuickView extends Component {
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
            Axios.post(`${Home}hr/user/kin/create1`,{
                token:token,
                user_key:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                email:this.state.email,
                phone_number:this.state.phone,
                residential_address:this.state.address2,
                postal_address:this.state.address,
                first_name:this.state.fname,
                middle_name:this.state.mname,
                surname:this.state.sname,
                relationship:this.state.relationship
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.status) {
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
    
    render() {
        return (
            <div>
                <Toaster />
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Application Quick View</h5>
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
                            <img className="roundercle shadow-lg sty" style={{borderRadius:'10px'}} src={avatar} />
                         </div>
                        </center>
                      <div className=" table-responsive mt-5">
                          {this.state.switch === "WHOCODED"?
                          <form onSubmit={this.handleSubmit}>
                            
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
                                      <td>{this.props.details.phone_number}</td>
                                  </tr>
                                  <tr>
                                      <th>Postal Address</th>
                                      <td>{this.props.details.postal_address}</td>
                                  </tr>
                                  <tr>
                                      <th>Residential Address</th>
                                      <td>{this.props.details.residential_address}</td>
                                  </tr>
                                  
                              </tbody>
                          </table>
                }
                      </div>
                      </>
                    }
                    </div>
                    <div className="modal-footer">
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

export default connect(mapStateToProps) (ApplicationQuickView);