import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, AlertCircle, ArrowLeft } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            loading2:false,
            data:[],
            startDate: new Date(),
            startDate2: new Date(),
            name:"",
            show:"",
            id:"",
            switch:"",
            filter:"all",
            show2:"",
            name2:"",
            answer2:"",
            none:"",
            rec:[],
            note:""
        }
    }

    Delete(key){
        if (window.confirm('❌ are you sure you want to delete?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}auth/settings/deleteObjective`,{
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

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/perf/recommendResponsesFinal`,{
              params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }
    
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.setState({switch:event.target.value})
          }
        }
      }
      OpenModal2=(name,id)=>{
        if (name.length < 2) {
            this.setState({show2:""});
            this.interval = setTimeout(() => this.setState({name2:name}), 600); 
        }else{
            this.setState({name2:name})
            this.interval = setTimeout(() => this.setState({show2:"show"}), 100); 
        }
        this.setState({id:id})
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let token = ""; 
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            let fd = new FormData();
            fd.append('id',this.state.data[this.state.id].id)
            fd.append('token',token);
            fd.append('recommend',this.state.answer2)
            fd.append('note',this.state.note)
            this.setState({loading2:true})
            Axios.post(`${Home}auth/perf/GiveRecommendation`,fd,{
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading2:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.LoadData();
                   this.OpenModal2('',0)
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
                 
               })
                .catch(err =>{
                    console.log(err)
                    this.props.dispatch(launch_toaster('Error'));
                   this.props.dispatch(toast_trigger(false)); 
                }
                    // this.ErrorHandler(err,'Error')
               //console.log(err.response.data.message),
              );
        }         
     }

     LoadDataRecom=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listPerfRecommendation`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({rec:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    componentDidMount(){
        this.LoadData();
        this.LoadDataRecom();
    }
    render() {
        // console.log(this.props)
        return (
            <>
            {this.state.name2 === 'WHOCODED' ?
          <div className={`modal effect-super-scaled ${this.state.show2} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.state.show2 ===""?'none':'#050404d4',overflow:'scroll'}}>
          <div className="modal-dialog modal-lg" role="document">
              <form onSubmit={this.handleSubmit} className="modal-content card explore-feature border-0 rounded bg-white shadow">
              <div className="modal-header">
                  <h5 className="modal-title">Give a recommendation for {this.state.data[this.state.id].user} </h5>
                  <button onClick={()=>this.OpenModal2('',0)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  {this.state.laoding2 ?
                  <Spinner />
              :
              
              <>
                 
                <div className=" table-responsive">
                    <div className="row">
                       

                        <div className="col-md-12">
                        <div className="form-group">
                        <label>Recommendation</label>
                        <select 
                        value={this.state.answer2}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="answer2">
                            <option value="">Select</option>
                            {this.state.rec.length > 0 ?
                          this.state.rec.map(r=>
                          <option key={r.id} value={r.id}>{r.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Recommendation Note (Optional) </label>
                        <textarea
                        rows={8} 
                        value={this.state.note}
                        placeholder="Description"
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="note" />
                            
                    </div>
                   

                    

                    
                        </div>
                    </div>
                </div>
                </>
              }
              </div>
              <div className="modal-footer">
              {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
              {this.state.loading2 ?
              <Spinner size={20} />
            :
              <button type="submit" className="btn btn-primary" data-dismiss="modal">Save Changes</button>
            }
              {/* <button onClick={()=>this.Decline(this.state.id)} type="button" className="btn btn-danger" data-dismiss="modal">Decline Request</button> */}
                  <button onClick={()=>this.OpenModal2('',0)} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
                    <h6 class="lh-5 mg-b-0">List of KPI assesments</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
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
                                <th>Name</th>
                                <th>Key Performance Index/Indicator(KPI)</th>
                                <th>Recommendation</th>
                                <th style={{width:'30px'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dep,i)=>
                                <tr key={i}>
                                    <td>{dep.user}</td>
                                    <td>
                                    
                                        {dep.data.length > 0?
                                      <div className="d-flex">
                                          {dep.data.map((da,j)=>
                                        <div key={j}  className="st-box3 st-b2x bg-b shadow"> <span data-rh={`Scored ${da.key} on ${da.name}  here`} className="whocoded-box shadow">{da.key}</span> <span>{da.amount}%</span> </div>
                                        )}
                                      </div>  
                                    :
                                    <div className="alert alert-primary text-center">
                                        No KPI Yet
                                    </div>
                                    }
                                        
                                    </td>
                                    <td>
                                        {dep.recommendName}
                                    </td>
                                    <td>
                                        <div>
                                            {this.props.data.userDetails.lm?
                                            <FadeIn duration="1s" timingFunction="ease-out">
                                                <div className=" d-flex">
                                                    <button onClick={()=>this.OpenModal2('WHOCODED',i)} className="btn btn-primary2 btn-sm m-1 shadow"><Edit color="white" size={35} /> </button>
                                                   
                                                </div>
                                                
                                            </FadeIn>
                                        :''}
                                            
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
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (Recommendation);