import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';
import avatar from '../../../../assets/img/profile.png'
import { toast } from 'react-toastify';
import Toaster from '../../../../global/Toaster';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import ImageUploading from "react-images-uploading";
import { Image } from 'react-feather';
import Uploader from '../../../../global/Uploader';
import { user_details } from '../../../../store/actions/UserDetails';
import { quick_params } from '../../../../store/actions/QuickParams';

const maxNumber = 1;
class UploadProfilePicture extends Component {
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
            picture2:[],
            upload:0
        }
    }
    onChangeImage = imageList => {
        this.setState({picture2:imageList[0].file})
        // console.log(imageList[0].file);
      }
    handleChange = (event)=>{

        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
        }
      }
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }


    LoadUserDetails=()=>{
        // alert(this.props.id)
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true})
            Axios.post(`${Home}${this.props.other === 'WHOCODED'?'enter-ps/user/viewUser':'auth/me'}`,{
               token: token,
               id:this.props.other === 'WHOCODED'?this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null
            },{
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            })
           .then(res => {
            console.log(res);
             this.props.dispatch(user_details(res.data));
           this.setState({details:res.data,laoding:false});
           })
        .catch(err =>console.log(err));
        }
    }


    handleSubmit=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            let data = new  FormData();
            data.append("image",this.state.picture2);
            data.append("id",this.props.other === 'WHOCODED'? this.props.id : null)
            Axios.post(`${Home}enter-ps/user/updatePicture`,data,{
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
              },
              {
                onUploadProgress: ProgressEvent =>{
                  let MyProgress = Math.round(ProgressEvent.loaded/ProgressEvent.total *100);
              
                   if(MyProgress < 99){
                     this.setState({upload:MyProgress})
                   }else{
                       this.setState({upload:0})
                   }
                }
                
            })
               .then(res => {
                 console.log(res);
                 this.setState({loading:false,});
                 if (res.data.success) {
                    this.props.dispatch(launch_toaster(res.data.message));
                   this.props.dispatch(toast_trigger(true)); 
                   this.props.dispatch(quick_params(!this.props.data.quick_params)); 
                   this.props.close()
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
        this.LoadUserDetails();
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
                        <h5 className="modal-title">Change profile picture</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Uploader number={this.state.upload} />
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                        <center>
                        <div className="form-group mb-2" id="st-up">
                                            <ImageUploading onChange={this.onChangeImage} maxNumber={maxNumber} multiple>
                                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                            // write your building UI
                                            <div>
                                            {this.state.picture2.length < 1 ?
                                            <>
                                            <button type="button" className="btn btn-primary shadow-sm d-flex" onClick={onImageUpload}>
                                              <Image size={40} color="#ffffff" icon="add" />
                                            </button>
                                                <div className="avatar avatar-xxl">
                                                    <img className="rounded-circle shadow-lg sty" src={this.state.details.picture === null ? avatar : this.state.details.picture} />
                                                    </div>
                                            </>
                                            :''
                                            }
                                                
                                            <div className="row">
                                                {imageList.map(image => (
                                                <div className="col-md-12 p-2" key={image.key}>
                                                <button type="button" className="btn btn-primary2 shadow-sm mt-2" onClick={image.onUpdate}>Change</button>
                                                    <div className="avatar avatar-xxl">
                                                    <img className="rounded-circle shadow-lg sty" src={image.dataURL} />
                                                    </div>
                                                    <div>
                                                
                                                    </div>
                                                    
                                                
                                                </div>
                                                
                                                ))}
                                            </div>
                                            </div>
                                            )}
                                    </ImageUploading>
                                    </div>
                        
                        </center>
                     
                      </>
                    }
                    </div>
                    <div className="modal-footer">
                        {this.state.loading?
                        <Spinner size={23} />
                    :
                    <button onClick={()=>this.handleSubmit()} type="button" className="btn btn-primary" data-dismiss="modal">Upload picture</button>
                    }
                    
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

export default connect(mapStateToProps) (UploadProfilePicture);