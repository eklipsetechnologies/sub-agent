import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, Eye, Trash2, Link, EyeOff, Mail, Award, Paperclip } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import { Home } from '../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../global/Spinner';
import { open_right } from '../../../store/actions/OpenRight';
import img from '../../../assets/svg/whocoded_avatar.svg'
import ReactQuill, { Quill, Mixin, Toolbar }from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import Toaster from '../../../global/Toaster';
import renderHTML from 'react-render-html';

class AcLetter extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            loading2:false,
            data:[],
            fetching:false,
            modal:"",
            show:"",
            id:0,
            answer:"",
            answers:[],
            type:"0",
            type2:"3",
            text:"",
            data2:"",
            userId:0
        }
    }
    handleChange2=(value)=> {
        this.setState({ text: value });
       
      }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/SinggleApplications`,{
              token: token,
              id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
            })
           .then(res => {
            // console.log('Loaded',res);
           this.setState({data:res.data,loading:false,userId:res.data.userId});
           this.LoadLetterData(res.data.userId);
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

      handleSubmit=(event)=>{
        event.preventDefault();
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({fetching:true})
            Axios.post(`${Home}auth/recuite/postAcceptLetter`,{
                token:token,
                id:this.state.data.userId,
                desc:this.state.text,
              })
               .then(res => {
                 console.log(res);
                 this.setState({fetching:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.SwitchContent('rec_on_view',[this.props.data.params.length > 0 ? this.props.data.params[0] : 0]);
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
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    componentWillUnmount(){
        // this.props.dispatch(open_right('Open'));
    }

     componentDidMount(){
         this.LoadData();
         
     }
    render() {
       //console.log(this.state)
        return (
            
            <div>
            <Toaster />

            <BounceRight duration="1s" timingFunction="ease-out">
                <form onSubmit={this.handleSubmit} className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-8">
                    <h6 class="lh-5 mg-b-0">Write {this.state.data.userId} Acceptance Letter For {`${this.state.data.first_name} ${this.state.data.middle_name} ${this.state.data.surname}`} </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="pull-right">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={()=>this.SwitchContent('rec_on_view',[this.props.data.params.length > 0 ? this.props.data.params[0] : 0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                            
                        </FadeIn>
                            
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                {this.state.loading ? 
                <div className="p-5">
                    <Spinner size={70} />
                </div>
                
            :
            
                <div className=" card-body table-responsive">
                    {/* <div className="p-4 text-center">
                    <img src={this.state.data.picture === null ? img :this.state.data.picture} className="rounded-circle st-img-200 shadow" alt=""/>
                    </div> */}
                    <div className="form-group">
                    <label className="d-block">Usable Variables</label>
                  <span data-rh="Returns Candidate's Full Name 🎯" className="badge badge-dark m-1">{`{FULL_NAME}`}</span>
                  <span data-rh="Returns Candidate's First Name 🎯" className="badge badge-dark m-1">{`{FIRST_NAME}`}</span>
                  <span data-rh="Returns Candidate's Phone Number 🎯" className="badge badge-dark m-1">{`{PHONE_NUMBER}`}</span>
                  <span data-rh="Returns Candidate's Email Address 🎯" className="badge badge-dark m-1">{`{EMAIL_ADDRESS}`}</span>
                    </div>
                    <div className="form-group">
                                            <label>News contents</label>
                                            <ReactQuill 
                                                value={this.state.text}
                                                onChange={this.handleChange2}
                                                theme={'snow'}
                                                modules={AcLetter.modules}
                                                formats={AcLetter.formats}
                                                
                                                />
                                        </div>
                    <div className="form-group">
                        {this.state.fetching?
                        <Spinner size={40} />
                    :
                    <button className="btn  btn-primary2 shadow">Post Letter Now</button>
                    }
                       
                    </div>
                </div>
            }
                
                
                </form>


                
            
            </BounceRight>




            <BounceRight duration="1s" timingFunction="ease-out">
                <form onSubmit={this.handleSubmit} className="card border-0 mt-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-8">
                    <h6 class="lh-5 mg-b-0">Write Acceptance Letter For {`${this.state.data.first_name} ${this.state.data.middle_name} ${this.state.data.surname}`} </h6>
                    </div>
                    <div className="col-md-4">
                    <div className="pull-right">
                    <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        <button onClick={()=>this.SwitchContent('rec_on_view',[this.state.data.id])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                            
                        </FadeIn>
                            
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                {this.state.loading2 ? 
                <div className="p-5">
                    <Spinner size={70} />
                </div>
                
            :
            
                <div className=" card-body table-responsive">
                   {this.state.data2.desc && this.state.data2.desc.length > 0 ?
                        renderHTML(this.state.data2.desc) 
                            :
                            <div className="alert alert-warning text-center">No Letter Yet</div>
                            }
                </div>
            }
                
                
                </form>


                
            
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

export default connect(mapStoreToProps) (AcLetter);

AcLetter.modules = {}
AcLetter.modules.toolbar = [
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
 * Quill AcLetter formats
 * See https://quilljs.com/docs/formats/
 */
AcLetter.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'code-block', 'formula', 'video'
]