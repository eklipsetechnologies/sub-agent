import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import avatar from '../../assets/svg/whocoded_querry.svg'
import { toast } from 'react-toastify';
import Toaster from '../../global/Toaster';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { quick_params } from '../../store/actions/QuickParams';
import { BounceUp,FadeIn } from "animate-components";
import { Mail, AlignJustify, ThumbsUp, Send, Percent, Heart, CheckCircle } from 'react-feather';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';

class QueryDetails extends Component {
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
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
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

    GrantRequest(){
        if (window.confirm('❌ are you sure you want to grand this request?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/exit/acceptExitRequest`,{
                token: token,
                id:this.props.details.id
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.SwitchContent('rr',0);
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

    componentDidMount(){
        // this.LoadEditData();
        
          this.interval = setTimeout(() => this.changeStyle('show'), 500);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }

        
    
    render() {
        // console.log([this.props.details]);
        return (
            <div>
                <Toaster />
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Disciplinary Query</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                    <BounceUp duration="2s" timingFunction="ease-out">
                        <center>
                        <div className="avatar avatar-xxl">
                            <img className="roundercle shadow-lg sty" style={{borderRadius:'10px'}} src={avatar} />
                         </div>
                        </center>
                        </BounceUp>
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
                                      <th>Subject</th>
                                      <td>{this.props.details.subject}</td>
                                  </tr>
                                  <tr>
                                      <th>query body</th>
                                      <td>{this.props.details.note}</td>
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

export default connect(mapStateToProps) (QueryDetails);