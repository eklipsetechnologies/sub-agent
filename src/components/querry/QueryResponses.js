import React, { Component } from 'react';
import { BounceUp,FadeIn,BounceBottom } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { Home } from '../../global/Home';
import Axios from 'axios';
import Spinner from '../../global/Spinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from '../../global/SearchUser';


class QueryResponses extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
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
            subject:""
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
            Axios.get(`${Home}auth/query/responses/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}`,{
               params:{token:token},
            })
           .then(res => {
           console.log('COMMENT',res);
           this.setState({
                loading:false,
                data:res.data
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
            Axios.post(`${Home}auth/query/PostResponse`,fd,{
                
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
       this.LoadData()
     }
     OpenModal=(name,id)=>{
        if (name.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({name:name}), 600); 
        }else{
            this.setState({name:name})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
    }
    render() {
       // console.log(this.state)
        return (
            <>
           
            <BounceUp duration="1s" timingFunction="ease-out">
                <div className="card border-0 s">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">New disciplinary querry</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                           <button onClick={()=>this.SwitchContent('dep_home',[0])} className="btn btn-danger btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="mt-4">
                    
                {this.state.data.length > 0 ?
                        this.state.data.map((com,i)=>
                           com.type ?
                           <div key={com.id} className="st-rep mb-5 border-0 card smmm">
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
                             <a  href="#" class="tx-medium text-right pb-1 st-hr text-light"><span className="text-warning">Response by </span> <strong>{com.user}</strong> <i class="icon  fa fa-user-circle mg-l-5 m-1"></i>
                             {/* {this.props.data.userDetails.name? <strong onClick={()=>this.OpenModal('WHOCODED2',i)} className="text-warning"> Reply </strong>:<strong onClick={()=>this.OpenModal('WHOCODED',i)} className="text-warning"> Reply </strong>} <i class="icon text-warning  fa fa-reply-all mg-l-5 m-1"></i> */}
                             </a>
                           
                        </div>
                            )
                    :
                    this.state.loading ?
                    <Spinner size={160} />
                    :
                    <div className="alert alert-light shadow-lg text-center smmm">
                        No comment yet
                    </div>
                    }

                        <form onSubmit={this.handleSubmit} className="smmm">
                            <div className="form-group">
                            <label className="text-white">Comment</label>
                            <textarea
                            className="form-control st-login-f"
                            required
                            onChange={this.handleChange}
                            name="comment"
                            value={this.state.comment}
                            placeholder="Write your comment"
                            >

                            </textarea>
                        </div>
                        <div className="form-group">
                            {this.state.fetching?
                            <Spinner size={40} />
                        :
                        <button  className="btn btn-primary shadow">Post Comment Now</button>
                        }
                            
                        </div>
                        </form>
                   
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

export default connect(mapStoreToProps) (QueryResponses);