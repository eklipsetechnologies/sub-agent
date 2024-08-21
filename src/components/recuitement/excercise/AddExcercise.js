import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import ViewExcercise from './ViewExcercise';

class AddExcercise extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            name2:"",
            loading:false,
            data:[],
            data2:[],
            department:"",
            level:"",
            questions:[],
            option:"",
            option2:"",
            option3:"",
            option4:"",
            options:[],
            job:"",
            fetching:false,
            modal:"",
            show:"",
            id:0,
            answer:"",
            answers:[]
        }
    }

    listPublishJobs=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listPublishJobs`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listExcercise`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({data:res.data,loading:false});
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
            this.setState({fetching:true})
            Axios.post(`${Home}auth/recuite/CreateExcercise`,{
                token:token,
                name:this.state.name2,
                period:this.state.level,
                publishedJob:this.state.job,
                questions:this.state.questions,
                options:this.state.options,
                answer:this.state.answers,
              })
               .then(res => {
                 console.log(res);
                 this.setState({fetching:false,});
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

     Delete(key){
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/recuite/deleteExcercise`,{
                token: token,
                id:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
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

    OpenModal=(name,id)=>{
        if (name.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({switch:name}), 600); 
        }else{
            this.setState({switch:name})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
    }

    Add=(event)=>{
        event.preventDefault();
        if(this.state.name.length > 2){
            let option  = {};
            option = {
                "option1":this.state.option,
                "option2":this.state.option2,
                "option3":this.state.option3,
                "option4":this.state.option4,
            }
            this.setState({
                questions:this.state.questions.concat(this.state.name),
                options:this.state.options.concat(option),
                answers:this.state.answers.concat(this.state.answer)
            });
            this.setState({
                name:"",
                option:"",
                option2:"",
                option3:"",
                option4:""
            })
        }
        
    }

    Remove=(index)=>{
        this.state.questions.splice(index,1);
        this.state.options.splice(index,1);
        this.setState({
            questions:this.state.questions,
            options:this.state.options,
        })
    }

    OpenModal2=(modal,id)=>{
        if (modal.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({modal:modal}), 600); 
        }else{
            this.setState({modal:modal})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
        
    }

     componentDidMount(){
         this.LoadData();
         this.listPublishJobs();
     }
    render() {
       
        return (
            
            <div>
            {this.state.modal === 'WHOCODED'?
                <ViewExcercise 
                display={this.state.modal==='WHOCODED'?'block':'none'}
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal2('',0)}
                id={this.state.id}
                // answer={d.options[this.state.id][d.answer[this.state.id]]}
                />
            :<span></span>}

            {this.state.switch === 'WHOCODED' ?
          <div className={`modal effect-super-scaled ${this.state.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.state.show ===""?'none':'#050404d4',overflow:'scroll'}}>
          <div className="modal-dialog modal-lg" role="document">
              <form onSubmit={this.Add} className="modal-content card explore-feature border-0 rounded bg-white shadow">
              <div className="modal-header">
                  <h5 className="modal-title">Add question</h5>
                  <button onClick={()=>this.OpenModal('',0)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  {this.state.laoding ?
                  <Spinner />
              :
              
              <>
                 
                <div className=" table-responsive">
                <div className="form-group">
                        <label>Question</label>
                        <input 
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="name" placeholder="Name" />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Option one</label>
                        <input 
                        required
                        value={this.state.option}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="option" />
                    </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Option two</label>
                        <input 
                        required
                        value={this.state.option2}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="option2" />
                    </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Option three</label>
                        <input 
                        required
                        value={this.state.option3}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="option3" />
                    </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                        <label>Option four</label>
                        <input 
                        required
                        value={this.state.option4}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="option4" />
                    </div>
                        </div>

                        <div className="col-md-12">
                        <div className="form-group">
                        <label>Answer </label>
                        <select 
                        required
                        value={this.state.answer}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="answer">
                            <option value="">Select</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                        </select>
                    </div>
                        </div>
                    </div>
                </div>
                </>
              }
              </div>
              <div className="modal-footer">
              {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
              <button type="submit" className="btn btn-primary" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Add question':'Decline'}`}</button>
                  <button onClick={()=>this.OpenModal('',0)} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              </form>
          </div>
          </div>  
        :''}
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Create a new excercise</h6>
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
                        <label>Excercise Title</label>
                        <input 
                        required
                        value={this.state.name2}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="name2" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label>Excercise period (in minutes)</label>
                        <input 
                        required
                        type="number"
                        value={this.state.level}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="level" placeholder="" />
                    </div>

                    <div className="form-group">
                        <label>Select published jobs</label>
                        <select 
                        required
                        value={this.state.job}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="job"
                        >
                            <option value="">Select one</option>
                            {this.state.data2.length > 0 ?
                          this.state.data2.map(dep=>
                          <option key={dep.id} value={dep.id}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Options</th>
                                    <th style={{width:'8%'}}></th>
                                </tr>
                            </thead>
                            {this.state.questions.length> 0 ?
                          <tbody>
                              {this.state.questions.map((qu,i)=>
                                <tr key={i}>
                                    <td>{qu}</td>
                                    <td>
                                    <span className="badge badge-primary m-1">{this.state.options[i].option1}</span>
                                    <span className="badge badge-primary m-1">{this.state.options[i].option2}</span>
                                    <span className="badge badge-primary m-1">{this.state.options[i].option3}</span>
                                    <span className="badge badge-primary m-1">{this.state.options[i].option4}</span>
                                    </td>
                                    <td>
                                    <button type="button" onClick={()=>this.Remove(i,)} className="btn btn-danger shadow"><Trash2 color="white" size={33} /></button>
                                    </td>
                                </tr>
                                )}
                          </tbody>  
                        :
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <span className="alert alert-warning text-center d-block">No question yet</span>
                                </td>
                            </tr>
                        </tbody>
                        
                        }
                        
                            <button type="button" onClick={()=>this.OpenModal('WHOCODED',0)} className="btn btn-warning mt-1 shadow">Add Questions</button>
                        
                        </table>
                    </div>
                    
                    <div className="form-group">
                        {this.state.fetching ?
                        <Spinner size={40} />
                    :
                    <button className="btn btn-primary2 shadow">Create portal</button>
                    }
                        
                    </div>
                </form>
                
                </div>
                
            </div>
            </BounceRight>


            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">List of excercises</h6>
                    </div>
                    <div className="col-md-7">
                        
                    </div>
                </div>
                </div>
                {this.state.loading ? 
                <div className="p-5">
                    <Spinner size={70} />
                </div>
                
            :
            this.state.data.length < 1 ?
                <div className="p-5">
                    <div className="alert alert-warning text-center">
                        No data yet
                    </div>
                </div>
            :
                <div className="table-responsive">
                    <table className="table mb-0 table-striped table-hover table-bordered" id="stephen">
                        <thead>
                            <tr>
                                <th style={{width:'7%'}}></th>
                                <th>Title</th>
                                <th>Period(minutes)</th>
                                <th>Job</th>
                                <th>Status</th>
                                <th style={{width:'10%'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>
                                    <Link color="#0567d2" size={45} />
                                    </td>
                                    <td>
                                    {dep.name}
                                    </td>
                                    <td>{dep.period}</td>
                                    <td>{dep.publishedJob}</td>
                                    <td>
                                    <span className={`badge badge-${dep.statusClass} badge-pill`}>{dep.statusName}</span>
                                    </td>
                                    <td>
                                        <div>
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button data-rh="view" onClick={()=>this.OpenModal2('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Eye color="white" size={35} /> </button>
                                                    {/* <button data-rh="deactivate" onClick={()=>this.Delete(dep.key)} className="btn btn-warning btn-sm m-1 shadow"><EyeOff color="#0567d2" size={35} /> </button> */}
                                                    <button data-rh="delete" onClick={()=>this.Delete(dep.id)} className="btn btn-danger btn-sm m-1 shadow"><Trash2 color="white" size={35} /> </button>
                                                </div>
                                                
                                            </FadeIn>
                                        </div>
                                    
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            }
                
                
                </div>
                
            
            </BounceRight>
            
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (AddExcercise);