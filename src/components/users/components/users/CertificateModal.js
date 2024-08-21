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
import { Trash2, HelpCircle, BookOpen, Award } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FadeIn,BounceRight } from "animate-components";
import secured from '../../../../assets/svg/whocoded_p.svg'


class CertificateModal extends Component {
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
            switch:"",
            startDate: new Date(),
            startDate2: new Date(),
            qualification:"",
            degree:"",
            program:"",
            license:""
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
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
            Axios.post(`${Home}auth/profile/editCertificates`,{
                token:token,
                id:this.props.details.id,
                institution:this.state.fname,
                course:this.state.program,
                other:this.state.license,
                certificate:this.state.qualification,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
              })
               .then(res => {
                // console.log(res);
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
            Axios.post(`${Home}auth/profile/req/ReqcreateCertificates`,{
                token:token,
                id:this.props.details.id,
                institution:this.state.fname,
                course:this.state.program,
                other:this.state.license,
                type:2,
                certificate:this.state.qualification,
                date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
              })
               .then(res => {
                // console.log(res);
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
                fname:this.props.details.institution,
                program:this.props.details.course,
                license:this.props.details.license,
                qualification:this.props.details.certificate,
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
        <h5 className="modal-title">{this.state.switch === "WHOCODED"? this.props.data.userDetails.employee === 2 ? "Request Edit":' Edit' :''} Certification</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                        
                      <div className=" table-responsive">
                          {this.state.switch === "WHOCODED"?
                          this.props.data.userDetails.employee === 2 ?
                          
                          <form onSubmit={this.RequestNext} className="mt-5">
                          
                          <div className="form-group">
                              <label>Institutal body</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.fname} 
                              className="form-control" name="fname"
                               placeholder="Institution" />
                          </div>
                          <div className="form-group">
                              <label>Certification obtained</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.qualification} 
                              className="form-control" name="qualification"
                               placeholder="Certification" />
                          </div>
                          <div className="form-group">
                              <label>Field/Course</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.program} 
                              className="form-control" name="program"
                               placeholder="Program" />
                          </div>
                          <div className="form-group">
                              <label>License/Qualification date</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.license} 
                              className="form-control" name="license"
                               placeholder="" />
                          </div>
                          <div className="form-group">
                                 <label>Expiry Date </label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate} 
                                     onChange={date => this.onChange2(date)} />
                             </div>
                           
                          <div className="form-group">
                              {this.state.loading?
                              <Spinner size={40} />
                             :
                             <button className="btn btn-primary2 btn-block shadow">Submit Request</button>
                             }
                              
                          </div>
                      </form>
                          :

                          <form onSubmit={this.handleSubmit} className="mt-5">
                         <div className="form-group">
                              <label>Institutal body</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.fname} 
                              className="form-control" name="fname"
                               placeholder="Institution" />
                          </div>
                          <div className="form-group">
                              <label>Certification obtained</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.qualification} 
                              className="form-control" name="qualification"
                               placeholder="Certification" />
                          </div>
                          <div className="form-group">
                              <label>Field/Course</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.program} 
                              className="form-control" name="program"
                               placeholder="Program" />
                          </div>
                          <div className="form-group">
                              <label>License/Qualification date</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.license} 
                              className="form-control" name="license"
                               placeholder="" />
                          </div>
                          <div className="form-group">
                                 <label>Expiry Date </label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate} 
                                     onChange={date => this.onChange2(date)} />
                             </div>
                           
                          <div className="form-group">
                              {this.state.loading?
                              <Spinner size={40} />
                             :
                             <button className="btn btn-primary2 btn-block shadow">Add Now</button>
                             }
                              
                          </div>
                      </form>
                          
                        :
                        <div className="media">
                                 <div className="wd-80 ht-80 bg-ui-04 bg-blue-light rounded d-flex align-items-center justify-content-center">
                                   <Award color="#365d7d" size={35} />
                                 </div>

                                 <div className="media-body pd-l-25">
                                    <h5 className="mg-b-5">{this.props.details.certificate} in {this.props.details.institution}</h5>
                                    <p className="mg-b-3"><span className="tx-medium tx-color-02">{this.props.details.course}</span>,  ({this.props.details.license})</p>
                                    <span className="d-block tx-13 tx-color-03">{this.props.details.date}</span>
                              </div>
                             </div>
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

export default connect(mapStateToProps) (CertificateModal);