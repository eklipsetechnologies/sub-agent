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
import { Trash2, HelpCircle, BookOpen } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {FadeIn,BounceRight } from "animate-components";
import secured from '../../../../assets/svg/whocoded_p.svg'


class QualificationModal extends Component {
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
            startDate: new Date(),
            startDate2: new Date(),
            qualification:"",
            degree:"",
            program:""
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
            Axios.post(`${Home}auth/profile/editEduQualification`,{
                token:token,
                id:this.props.details.id,
                insti:this.state.fname,
                programm:this.state.program,
                qualification:this.state.qualification,
                degree:this.state.degree,
                startDate:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                endDate:`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`,
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
            Axios.post(`${Home}auth/profile/req/ReqcreateEduQualification`,{
                token:token,
                id:this.props.details.id,
                insti:this.state.fname,
                programm:this.state.program,
                qualification:this.state.qualification,
                degree:this.state.degree,
                type:2,
                startDate:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`,
                endDate:`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`,
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
                program:this.props.details.programm,
                degree:this.props.details.degree,
                qualification:this.props.details.qualification,
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
        <h5 className="modal-title">{this.state.switch === "WHOCODED"? this.props.data.userDetails.employee === 2 ? "Request Edit":' Edit' :''} Educational Qualification</h5>
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
                          
                          <form onSubmit={this.RequestNext} className="mt-3">
                              
                              <div className="form-group">
                              <label>Institution</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.fname} 
                              className="form-control" name="fname"
                               placeholder="Institution" />
                          </div>
                          <div className="form-group">
                                 <label>Starting Date</label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate} 
                                     onChange={date => this.onChange2(date)} />
                             </div>
                             <div className="form-group">
                                 <label> Date Ending</label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate2} 
                                     onChange={date => this.onChange3(date)} />
                             </div>
                             <div className="form-group">
                              <label>Program of study</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.program} 
                              className="form-control" name="program"
                               placeholder="Program" />
                          </div>
                          <div className="form-group">
                              <label>Qualification obtained</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.qualification} 
                              className="form-control" name="qualification"
                               placeholder="Qualification" />
                          </div>
                          <div className="form-group">
                              <label>Class of degree</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.degree} 
                              className="form-control" name="degree"
                               placeholder="" />
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

                          <form onSubmit={this.handleSubmit} className="mt-3">
                          
                         <div className="form-group">
                              <label>Institution</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.fname} 
                              className="form-control" name="fname"
                               placeholder="Institution" />
                          </div>
                          <div className="form-group">
                                 <label>Starting Date</label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate} 
                                     onChange={date => this.onChange2(date)} />
                             </div>
                             <div className="form-group">
                                 <label> Date Ending</label>
                                 <DatePicker 
                                     required
                                     calendarClassName="rasta-stripes "
                                     className="red-border form-control"
                                     selected={this.state.startDate2} 
                                     onChange={date => this.onChange3(date)} />
                             </div>
                             <div className="form-group">
                              <label>Program of study</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.program} 
                              className="form-control" name="program"
                               placeholder="Program" />
                          </div>
                          <div className="form-group">
                              <label>Qualification obtained</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.qualification} 
                              className="form-control" name="qualification"
                               placeholder="Qualification" />
                          </div>
                          <div className="form-group">
                              <label>Class of degree</label>
                              <input 
                              onChange={this.handleChange}
                              value={this.state.degree} 
                              className="form-control" name="degree"
                               placeholder="" />
                          </div>
                          <div className="form-group">
                              {this.state.loading?
                              <Spinner size={40} />
                             :
                             <button className="btn btn-primary2 btn-block shadow">Save changes</button>
                             }
                              
                          </div>
                      </form>
                          
                        :
                        <div className="media">
                                 <div className="wd-80 ht-80 bg-ui-04 bg-blue-light rounded d-flex align-items-center justify-content-center">
                                   <BookOpen color="#365d7d" size={35} />
                                 </div>

                                 <div className="media-body pd-l-25">
                                    <h5 className="mg-b-5">{this.props.details.qualification} in {this.props.details.programm}</h5>
                                    <p className="mg-b-3"><span className="tx-medium tx-color-02">{this.props.details.institution}</span>,  ({this.props.details.degree})</p>
                                    <span className="d-block tx-13 tx-color-03">{this.props.details.startDate} <strong> - </strong> {this.props.details.endDate}</span>
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

export default connect(mapStateToProps) (QualificationModal);