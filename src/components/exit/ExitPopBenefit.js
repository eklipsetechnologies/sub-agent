import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import avatar from '../../assets/svg/whocoded_p.svg'
import { toast } from 'react-toastify';
import Toaster from '../../global/Toaster';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { quick_params } from '../../store/actions/QuickParams';
import { BounceUp,FadeIn } from "animate-components";
import { Mail, AlignJustify, ThumbsUp, Send, Percent, Heart, CheckCircle } from 'react-feather';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';

class ExitPopBenefit extends Component {
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
            note:""
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


    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (this.state.note.length < 1) {
            alert('If benefit is empty, it means theres no benefit for employee.. You can change by re-posting with benefit provided the exit request is not approved')
        }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true})
            Axios.post(`${Home}auth/exit/ExitRequestBenefit`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[1] : 0,
                note:this.state.note,
              })
               .then(res => {
                //  console.log(res);
                 this.setState({fetching:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.SwitchContent('',0)
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
                        <h5 className="modal-title">Exit Benefit</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                    {/* <BounceUp duration="2s" timingFunction="ease-out">
                        <center>
                        <div className="avatar avatar-xxl">
                            <img className="roundercle shadow-lg sty" style={{borderRadius:'10px'}} src={avatar} />
                         </div>
                        </center>
                        </BounceUp> */}
                      <div className=" table-responsive mt-5">
                          {this.state.switch === "WHOCODED"?
                          ''
                        :
                        <BounceUp duration="2s" timingFunction="ease-out">
                          <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                  <label>Write benefit you employee will get</label>
                                  <textarea 
                                  rows={4}
                                  className="form-control st-login-f"
                                  placeholder="Benefit"
                                  name="note"
                                  value={this.state.note}
                                  ></textarea>
                              </div>
                              <div className="form-group">
                                  <button className="btn btn-primary2 shadow btn-block">Post Exit Benefit</button>
                              </div>
                          </form>
                          </BounceUp>
                }
                      </div>
                      </>
                    }
                    </div>
                    {/* <div className="modal-footer">
                        
                        <button onClick={this.props.close} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div> */}
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

export default connect(mapStateToProps) (ExitPopBenefit);