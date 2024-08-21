import React, { Component } from 'react';
import { BounceUp,FadeIn,BounceBottom } from "animate-components";
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
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from '../../../global/SearchUser';


class AppraisalCommentsFinal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            loading2:false,
            data:[],
            department:"",
            level:"",
            details:[],
            lg:[],
            lgs:"",
            state:"",
            country:"",
            address:"",
            startDate: new Date(),
            startDate2: new Date(),
            show:"",
            note:"",
            subject:"",
            show2:"",
            name2:"",
            elements:[],
            seleted:[],
            rows:[],
            cols:[],
            answer:"1",
            answer2:"",
            rec:[],
            id:0,
            userId:"",
            number:0,
            scores:[]
        }
        this.fileInput = React.createRef();
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
      }

      LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/perf/responsesFinal/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}`,{
               params:{token:token},
            })
           .then(res => {
           console.log('COMMENT_Final',res);
           this.setState({
                loading:false,
                data:res.data
            });
            
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading1:true});
            Axios.post(`${Home}auth/SingleObjectiveFinal`,{
               token:token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
           console.log('Details',res);
           this.setState({
                loading1:false,
                details:res.data,
                comment:res.data.lastcomment
            });
            
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
          if (event.target.name === 'state') {
              if (this.state.details[event.target.value].lgas) {
                  this.setState({lg:this.state.details[event.target.value].lgas})
              }
          }
        }
      }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (this.state.comment.length < 1) {
            alert('Type a response');
            return false;
        }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            let fd = new FormData();
            fd.append('comment',this.state.comment);
            fd.append('id',this.props.data.params.length > 0 ? this.props.data.params[0] : 0);
            fd.append('token',token);
            this.setState({fetching:true})
            Axios.post(`${Home}auth/perf/PostCommentFinal`,fd,{
                
              })
               .then(res => {
                 console.log(res);
                 this.setState({fetching:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.LoadData();
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

     Approve=(id)=>{
         if (window.confirm('Wants to approve this response?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                let fd = new FormData();
                // fd.append('id',this.props.data.params.length > 0 ? this.props.data.params[0] : 0);
                fd.append('token',token);
                fd.append('id',id);
                this.setState({fetching:true})
                Axios.post(`${Home}auth/perf/ApproveRespone`,fd,{
                    
                  })
                   .then(res => {
                     console.log(res);
                     this.setState({fetching:false,});
                     if (res.data.success) {
                        this.props.dispatch(launch_toaster(res.data.message));
                       this.props.dispatch(toast_trigger(true)); 
                       this.LoadData();
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
                
     }

     LoadLocations=()=>{
        Axios.get(`${Home}locations`,
          )
         .then(res => {
           console.log('Locations',res);
         this.setState({details:res.data})
         
        })
      }

     componentDidMount(){
        //  this.LoadLocations();
         let token = "";
       this.LoadData();
       this.LoadData2();
     }
   

    OpenModal2=(name,id,userId)=>{
        this.setState({userId:userId})
        if (name.length < 2) {
            this.setState({show2:""});
            this.interval = setTimeout(() => this.setState({name2:name}), 600); 
        }else{
            this.setState({name2:name})
            this.LoadDataElem();
            this.LoadDataRecom();
            this.LoadDataGrading(this.props.data.params.length > 0 ? this.props.data.params[0] : 0,id,userId)
            this.interval = setTimeout(() => this.setState({show2:"show"}), 100); 
        }
        this.setState({id:id})
    }
    LoadDataElem=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true});
            Axios.post(`${Home}auth/settings/listPerformanceElement`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading2:false,elements:res.data});
           })
        .catch(err =>console.log(err));
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

    LoadDataGrading=(id,commentId,user_id)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            // this.setState({loading:true});
            Axios.post(`${Home}auth/perf/getGrade`,{
               token: token,
               id:id,
               commentId:commentId,
               user_id:user_id
            })
           .then(res => {
            console.log('Grading...: ',res);
            if (res.data.id) {
                this.setState({seleted:res.data.grading})
                this.ReturnNumber()
            }
        //    this.setState({rec:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    Add(name,id,number){
        this.setState({number:number});
        this.Remove(id)
        this.interval = setTimeout(() => this.AddRow(name), 100); 
     }

     AddRow(name){
        let values = this.state.seleted.concat(name);
        let uniqueItems = Array.from(new Set(values));
        this.setState({seleted:uniqueItems});
        this.ReturnNumber();
     }

     Remove=(name)=>{
         let data = name;
         if (this.state.seleted.includes(`${name}_1`) || this.state.seleted.includes(`${name}_2`) || this.state.seleted.includes(`${name}_3`) || this.state.seleted.includes(`${name}_4`) || this.state.seleted.includes(`${name}_5`)) {
             let values = this.state.seleted;
             let index = values.indexOf(name);
             this.state.seleted.splice(index, 1);
             this.setState({seleted:this.state.seleted});
         }
      }

      AddRow2(name){
        let values = this.state.seleted.concat(name);
        let uniqueItems = Array.from(new Set(values));
        this.setState({seleted:uniqueItems});
     }

     Remove2=(name)=>{
         let data = name;
         if (this.state.seleted.includes(`${name}_1`) || this.state.seleted.includes(`${name}_2`) || this.state.seleted.includes(`${name}_3`) || this.state.seleted.includes(`${name}_4`) || this.state.seleted.includes(`${name}_5`)) {
             let values = this.state.seleted;
             let index = values.indexOf(name);
             this.state.seleted.splice(index, 1);
             this.setState({seleted:this.state.seleted});
         }
      }

      handleSubmit2=(event)=>{
        event.preventDefault();
        let token = "";
        if (this.state.comment.length < 1) {
            alert('Type a response');
            return false;
        }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true})
            Axios.post(`${Home}auth/perf/PostGrade`,{
                'commentId':this.state.id,
                'id':this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
                'token':token,
                'grade':this.state.seleted,
                'rec':this.state.answer2,
                'userId':this.state.userId
              })
               .then(res => {
                 console.log(res);
                 this.setState({loading2:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.LoadData();
                }else{
                    this.props.dispatch(launch_toaster(res.data.message));
                  this.props.dispatch(toast_trigger(false)); 
                }
                 
               })
                .catch(err =>
                    {
                        this.ErrorHandler(err,'Error')
                        this.setState({loading2:false})
                    }
                    
               //console.log(err.response.data.message),
              );
        }         
     }


     ReturnNumber=()=>{
         let ReturnArray = [];
         if (this.state.seleted.length > 0) {
             this.state.seleted.map(li=>{
               let index = li.indexOf('_')
                if (index !== null && index > -1) {
                    let key = li.slice(index + 1,li.length + 1); 
                    let ids = li.slice(0,index);
                    let parsIds = parseInt(ids);
                    let parsKey = parseInt(key);
                    let data = {
                        id:parsIds,
                        key:parsKey
                    };
                    ReturnArray.push(data)
                    console.log(parsIds,parsKey);
                }
                    } )
         console.log('Returned: ',ReturnArray)
            let token = "";
             if (localStorage.getItem('userToken')) {
                 token = JSON.parse(localStorage.getItem('userToken'));
                 // this.setState({loading:true});
                 Axios.post(`${Home}auth/settings/singlePerformanceElement2`,{
                 token: token,
                 data:ReturnArray
                 })
             .then(res => {
                 console.log('Returned',res);
             this.setState({scores:res.data});
             })
             .catch(err =>console.log(err));
             }
         }
         
       
        
     }
    render() {
       console.log(this.state)
        return (
            <>
            {this.state.name2 === 'WHOCODED' ?
          <div className={`modal effect-super-scaled ${this.state.show2} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.state.show2 ===""?'none':'#050404d4',overflow:'scroll'}}>
          <div className="modal-dialog modal-lg" role="document">
              <form onSubmit={this.handleSubmit2} className="modal-content card explore-feature border-0 rounded bg-white shadow">
              <div className="modal-header">
        <h5 className="modal-title">{`${this.state.answer === '1' ?"You're viewing ":"Add or edit "}`}Performance grading</h5>
                  <button onClick={()=>this.OpenModal2('',-1,0)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  {this.state.loading2 ?
                  <Spinner />
              :
              
              <>
                 
                <div className=" table-responsive">
                    <div className="row">
                       

                        <div className="col-md-12">
                            {this.state.details.em ==1 && !this.state.details.selfGrade ?
                            ''
                            :
                            <div className="form-group">
                            <label>Grading action? </label>
                            <select 
                            required
                            value={this.state.answer}
                            onChange={this.handleChange}
                            className="form-control st-login-f"
                            name="answer">
                                <option value="1">VIEWING</option>
                                <option value="2">ADD/EDIT</option>
                            </select>
                        </div>

                            }
                        
                    {this.state.answer === '1'?
                    <>
                    {this.state.elements.length > 0 ?
                  <div className="">
                      <table className="table table-striped table-hover table-primary">
                          <thead>
                              <th>Perf. Elements</th>
                              <th>Elements grade</th>
                              {/* <th> Score </th> */}
                          </thead>
                          <tbody>
                              {this.state.elements.map(elem=>
                                <tr key={elem.id}>
                                    <td>{elem.name} <span className="badge badge-light">{elem.percent}</span></td>
                                    <td>
                                        <div  className="d-flex">
                                        <div  className={`st-box3 ${this.state.seleted.includes(`${elem.id}_1`) ? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>1</span>
                                         </div>
                                         <div  className={`st-box3 ${this.state.seleted.includes(`${elem.id}_2`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>2</span>
                                         </div>
                                         <div  className={`st-box3 ${this.state.seleted.includes(`${elem.id}_3`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>3</span>
                                         </div>
                                         <div  className={`st-box3 ${this.state.seleted.includes(`${elem.id}_4`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>4</span>
                                         </div>
                                         <div  className={`st-box3 ${this.state.seleted.includes(`${elem.id}_5`) ? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>5</span>
                                         </div>
                                        </div>
                                    
                                    </td>
                                   
                                </tr>
                                )}
                          </tbody>
                      </table>
                  </div>  
                
                :''}

                                   
                    </>
                :
                <>
                {this.state.elements.length > 0 ?
                  <div className="">
                      <table className="table table-striped table-hover table-primary">
                          <thead>
                              <th>Perf. Elements</th>
                              <th>Elements grade</th>
                              {/* <th>Score</th> */}
                          </thead>
                          <tbody>
                              {this.state.elements.map(elem=>
                                <tr key={elem.id}>
                                    <td>{elem.name}</td>
                                    <td>
                                        <div  className="d-flex">
                                        <div onClick={()=>this.Add(`${elem.id}_1`,elem.id,1)} className={`st-box3 ${this.state.seleted.includes(`${elem.id}_1`) ? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>1</span>
                                         </div>
                                         <div onClick={()=>this.Add(`${elem.id}_2`,elem.id,2)} className={`st-box3 ${this.state.seleted.includes(`${elem.id}_2`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>2</span>
                                         </div>
                                         <div onClick={()=>this.Add(`${elem.id}_3`,elem.id,3)} className={`st-box3 ${this.state.seleted.includes(`${elem.id}_3`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>3</span>
                                         </div>
                                         <div onClick={()=>this.Add(`${elem.id}_4`,elem.id,4)} className={`st-box3 ${this.state.seleted.includes(`${elem.id}_4`)? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>4</span>
                                         </div>
                                         <div onClick={()=>this.Add(`${elem.id}_5`,elem.id,5)} className={`st-box3 ${this.state.seleted.includes(`${elem.id}_5`) ? 'bg-dark':'bg-primary'} shadow`}>
                                            <span>5</span>
                                         </div>
                                        </div>
                                    
                                    </td>
                                    
                                </tr>
                                )}
                          </tbody>
                      </table>
                  </div>  
                
                :''}
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
                </>
                
                }

                    

                    
                        </div>
                    </div>
                </div>
                </>
              }
              {this.state.scores.length > 0 ?
              <div className="d-flex">
                  {this.state.scores.map(sc=>
                    <div key={sc.id} className={`st-box4 flex-1 bg-b shadow`}>
                    <span>{sc.amount}%</span>
                 </div>
                    )}
              </div>
            :''}
              </div>
              <div className="modal-footer">
              {this.state.loading2 ?
              <Spinner />
            :
            <button type="submit" className="btn btn-primary" data-dismiss="modal">Save Changes</button>
            }
              
              {/* <button onClick={()=>this.Decline(this.state.id)} type="button" className="btn btn-danger" data-dismiss="modal">Decline Request</button> */}
                  <button onClick={()=>this.OpenModal2('',-1,0)} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              </form>
          </div>
          </div>  
        :''}

<BounceUp duration="1s" timingFunction="ease-out">
                <form onSubmit={this.handleSubmit} className="card border-0 mt-4 mb-5">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Write your comment</h6>
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
            this.state.details.access?
            this.state.details.lm !== 1?
                <div className="table-responsive card-body">
                                        <div className="form-group">
                        <label>Comment </label>
                        <textarea
                        rows={8} 
                        required
                        value={this.state.comment}
                        placeholder="comment"
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="comment" />
                            
                    </div>
                <div className="form-group">
                    {this.state.fetching ?
                    <Spinner size={40} />
                :
                <button type="submite" className="btn btn-primary2 shadow">Post Comments</button>
                }
                    
                </div>
                </div>
                :
                <div className=" m-2 p-5 alert alert-primary text-center">
                    You dont have access to post or edit comment here
                </div>
                :
                <div className=" m-2 p-5 alert alert-primary text-center">
                    You dont have access to post or edit comment here
                </div>
            }
                
                
                </form>
                
            
            </BounceUp>
           
            <BounceUp duration="1s" timingFunction="ease-out">
                <div className="card border-0 s">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Objective Comments</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        {/* <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn> */}
                            
                        </div>
                        
                    </div>
                </div>
                <div className="mt-4">
                    
                {this.state.data.length > 0 ?
                        this.state.data.map((com,i)=>
                           com.type ?
                           <div key={com.id} className="st-rep mb-5 border-0 card smmm" style={{cursor:'default'}}>
                           <div className="card-body" style={{fontStyle:'italic'}}>
                           {com.parentComment.comment}
                           </div>
                           <div className=" bd pd-20 pd-lg-30  d-flex flex-column justify-content-end mb-5 border-0 ">
                                <p class="mg-b-20 text-white" style={{fontSize:'20px'}}>{com.comment}</p>
                                <a  href="#" class="tx-medium text-right pb-1 st-hr"><span className="text-muted">Comment by </span> <strong>Franklin</strong> <i class="icon  fa fa-user-circle mg-l-5 m-1"></i>
                                {/* <strong className="text-warning"> Reply </strong> <i class="icon text-warning  fa fa-share-square mg-l-5 m-1"></i> */}
                                </a>
                              
                           </div>
                       </div>
                           :
                            <div key={com.id} className="st-rep bd pd-20 pd-lg-30  d-flex flex-column justify-content-end mb-5 border-0 ">
                             <p class="mg-b-20 text-white" style={{fontSize:'20px'}}>{com.comment}</p>
                             <span className="d-flex st-hr">
                             
                             <a onClick={()=>this.OpenModal2('WHOCODED',com.id,com.user_id)} href="#" data-rh="View/add comment grading" className="flex-1">
                             <div className="st-box2 bg-primary">
                                
                                </div>
                                <div className="st-box2 bg-secondary">
                                
                                </div>
                                <div className="st-box2 bg-success">
                                
                                </div>
                                <div className="st-box2 bg-danger">
                                
                                </div>
                                <div className="st-box2 bg-warning">
                                
                                </div>
                                <div className="st-box2 bg-info">
                                
                                </div>
                                <div className="st-box2 bg-light">
                                
                                </div>
                                <div className="st-box2 bg-dark">
                                
                                </div>
                             </a>



                             <a  href="#" className="tx-medium text-right pb-1  text-light flex-1"><span className="text-warning">Response by </span> <strong>{com.user}</strong> | 
                             {/* {this.props.data.userDetails.hr?
                             com.lm === 1?
                              <strong className="text-success"> Comment Accepted </strong>
                              :
                              <strong onClick={()=>this.Approve(com.id)} className="text-warning"> Accept comment </strong>
                              :''}
                              {com.lm === 1?
                                <i class="icon text-success  fa fa-check-circle mg-l-5 m-1"></i>
                             :
                             <i class="icon text-warning  fa fa-check-circle mg-l-5 m-1"></i>
                            } */}
                               
                            
                             </a>
                             </span>
                             
                             
                           
                        </div>
                            )
                    :
                    this.state.loading ?
                    <Spinner size={160} />
                    :
                    <div className="m-2 p-5 alert alert-primary text-center">
                        No comment yet
                    </div>
                    }

                       
                   
                </div>
                
                </div>
                
            </div>
            </BounceUp>
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (AppraisalCommentsFinal);