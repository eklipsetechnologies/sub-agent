import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff, Mail } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { Home } from '../../global/Home';
import Axios from 'axios';
import Spinner from '../../global/Spinner';
import img from '../../assets/svg/whocoded_done.svg'
import { open_right } from '../../store/actions/OpenRight';
import ReactQuill, { Quill, Mixin, Toolbar }from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { Multiselect } from 'multiselect-react-dropdown';
import ExitQuizPop from './ExitQuizPop';


class EndInterViewLink extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            data:[],
            interview:"",
            level:"",
            note:"",
            option:"",
            option2:"",
            option3:"",
            option4:"",
            id:0,
            show:"",
            text:"",
            rec:"",
            loading2:"",
            em:"",
            details:"",
            details2:"",
            loading3:false
        }
    }

    handleChange2=(value)=> {
        this.setState({ text: value });
      }


    LoadEmailData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true})
            Axios.get(`${Home}auth/recuite/emailAccount`,{
              params:{token: token}
            })
           .then(res => {
            console.log('Loaded',res);
           this.setState({em:res.data,loading2:false});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadLetterData=(userId)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true})
            Axios.post(`${Home}auth/recuite/singleAcceptLetter`,{
              token: token,
              id:userId
            })
           .then(res => {
            // console.log('Loaded',res);
           this.setState({data2:res.data,loading2:false});
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

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/exit/singleExitRequest`,{
                token:token,
                id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
           console.log(res);
           this.setState({
                loading:false,
                details:res.data
            });
            
           })
        .catch(err =>console.log(err));
        }
    }

      handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (typeof(this.state.details) !== 'object') {
            this.props.dispatch(launch_toaster('Unknown Exit Request.... Please try again Or contact Admin'));
            this.props.dispatch(toast_trigger(false));
            return false;
        }
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true})
            Axios.post(`${Home}auth/exit/sendInterviewLink`,{
                token:token,
                id:this.state.details.userId,
                reqId:this.state.details.id,
                note:this.state.note,
                interview:this.state.interview,
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
     
     LoadInterview=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/exit/listInterview`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({data:res.data,loading:false});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadInterviewQ=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading3:true})
            Axios.post(`${Home}auth/exit/LoadInterQuestion`,{
               token: token,
               id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
            console.log(res);
           this.setState({details2:res.data,loading3:false});
        //  this.OpenModal('WHOCODED',0)
           })
        .catch(err =>console.log(err));
        }
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

     componentDidMount(){
         this.LoadData();
         this.LoadInterview();
         if (this.props.data.userDetails.em) {
             this.LoadInterviewQ();
         }
     }
     componentWillUnmount(){
        this.props.dispatch(open_right('Open')); 
     }
    render() {
        // console.log(this.state)
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <ExitQuizPop
                show={this.state.show}
                details={this.state.details2}
                close={()=>this.OpenModal('',0)}
                id={this.props.data.params.length > 0 ? this.props.data.params[0] : 0} />
            :''}
            <BounceUp duration="1s" timingFunction="ease-out">
                <div className="cards border-0 mt-4">
                <div className="card-body text-center">
                    {this.state.loading2 ?
                 <Spinner size={40} />   
                :
                ''
                // <h3 className="d-inline colo-b st-w600 st-et">{this.state.em.amount} <span className="badge badge-primary badge-pill st-eb">Total email</span> </h3>
                }
               
                </div>
               
                </div>
                
            
            </BounceUp>


                {this.props.data.userDetails.em?
                
                <BounceRight duration="1s" timingFunction="ease-out">
            <form onSubmit={this.handleSubmit} className="card border-0 mt-4">
            <div className="card-body">
            <div className="row">
                <div className="col-md-5">
                <h6 class="lh-5 mg-b-0">Exit Interview Link</h6>
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
            {this.state.loading3 ? 
            <div className="p-5">
                <Spinner size={70} />
            </div>
            
        :
            <div className="table-responsive card-body">
                {typeof(this.state.details2)==='object' ?
                <BounceUp duration="2.5s" timingFunction="ease-out">
                    <center>
                        <img className=" img-fluid" style={{width:'60%'}} src={img} />
                        <button type="button" onClick={()=>this.OpenModal('WHOCODED',0)} className="btn btn-warning d-block btn-lg shadow mt-2">Open Interview</button>
                    </center>
                </BounceUp>
                        
                        :
                <div className="alert alert-warning text-center">
                    No interview sent yet
                </div>        
                }
            </div>
        }
            
            
            </form>
            
        
        </BounceRight>
            :
            <BounceRight duration="1s" timingFunction="ease-out">
                <form onSubmit={this.handleSubmit} className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Sent Interview Link</h6>
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
                <div className="table-responsive card-body">
                    <div className="form-group mb-5">
                        <label>Recipent *</label>
                        {typeof(this.state.details) ==='object' ?
                         <div className=" badge badge-warning badge-pill p-2 shadow m-2">{`${this.state.details.first_name} ${this.state.details.middle_name} ${this.state.details.surname}` }</div>  
                    :''}
                   
                                        </div>

                         <div className="form-group">
                        <label>Select exit interview</label>
                        <select 
                        required
                        value={this.state.interview}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="interview"
                        >
                            <option value="">Select one</option>
                            {this.state.data.length > 0 ?
                          this.state.data.map(dep=>
                          <option key={dep.id} value={dep.id}>{dep.name}</option>
                            )  
                        :''}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Note (Optional)</label>
                        <textarea 
                        value={this.state.note}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="note"
                        >
                        </textarea>
                    </div>
                <div className="form-group">
                    {this.state.fetching ?
                    <Spinner size={40} />
                :
                <button type="submit" className="btn btn-primary2 shadow">Send Message</button>
                }
                    
                </div>
                </div>
            }
                
                
                </form>
                
            
            </BounceRight>
            }
            
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (EndInterViewLink);

EndInterViewLink.modules = {}
EndInterViewLink.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  ['blockquote', 'code-block'],                  // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],                               // text align
  ['clean'], 
  ['link'],
  ['video'],  
  ['iframe'],                                     // remove formatting
]

/* 
 * Quill EndInterViewLink formats
 * See https://quilljs.com/docs/formats/
 */
EndInterViewLink.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'code-block', 'formula', 'video'
]