import React, { Component, Fragment } from 'react';
import {PDFViewer,PDFDownloadLink} from '@react-pdf/renderer'
import Invoice from './Invoice'
import invoice from './data/invoice'
import MaterialIcon from 'material-icons-react';
import { switch_content } from '../../../../store/actions/SwitchContent';
import { Home } from '../../../../global/Home';
import Axios from 'axios';
import Spinner from '../../../../global/Spinner';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../../../store/actions/IsToast';
import { toast_trigger } from '../../../../store/actions/ToastTrigger';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        seleted:[],
        laoding:false,
        data:[],
        title:"",
        description:"",
        options: [],
        selectedValues: [],
        passgrade:"",
        finalgrade:"",
        desc:"",
        details:"",
        printing:false,
        fetching:false,
        data:[],
        list:[1,2,3,4]
    }
    this.myRef = React.createRef();
}


SwitchContent=(name)=>{
    this.props.dispatch(switch_content(name))
}

LoadData=()=>{
    let token = "";
    if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
        this.setState({laoding:true});
        Axios.post(`${Home}auth/viewSingleInvoice`,{
           token: token,
           id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
        })
       .then(res => {
         console.log(res);
       this.setState({
           laoding:false,
           details:res.data,
    });
       })
    .catch(err =>console.log(err));
    }
}


 handleChange = (event)=>{
    if (event.target.type !== 'files') {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    this.setState({laoding:true});
    let token = "";
    if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
        Axios.post(`${Home}auth/EditInCat`,{
            token:token,
            name:this.state.title,
            desc:this.state.desc,
            id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
          })
           .then(res => {
             //console.log(res);
             this.setState({laoding:false,});
             if (res.data.success) {
                 this.props.dispatch(launch_toaster(res.data.message));
                 this.props.dispatch(toast_trigger(true));
                     this.SwitchContent('In_Cat_List');
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



componentDidMount(){
  //this.getBase64Image('http://themepixels.me/demo/dashforge1.1/assets/img/home-1.png')
    this.LoadData();
    // this.LoadData2();
}
ErrorHandler=(err,message)=>{
    console.log(err);
    //console.clear();
    this.setState({loading:false})
    toast.error(message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false
        });
}
  render() {
    return (
      <div>
      <div className="card border-0">
        <div className="card-body">
        <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">View Invoice</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                        {this.state.printing ?'':
                                        <button onClick={()=>this.SwitchContent('Ex_In_List')} className="btn btn-danger shadow">
                                        <span className="d-flex">
                                          <MaterialIcon icon="keyboard_return" color="#ffffff" />
                                          <span className="text-white" style={{marginTop:'-3px'}}>return</span>
                                        </span>
                                        </button>
                                        }
                                       
                                    </div>
                                </div>
                            </div>
            {this.state.laoding ?
            <Spinner />
          :
          <>
          <Fragment>
            <PDFViewer width="1000" height="600" className="app" >
              
                <Invoice invoice={this.state.details}/>
                
            </PDFViewer>
        </Fragment>
        <div>
        <PDFDownloadLink document={<Invoice invoice={this.state.details}/>} fileName={`${this.state.details.name}(${this.state.details.student}).pdf`}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
        </div>
        </>
          }
          
        </div>
      </div>


      </div>
        
    );
  }
}


const mapStateToProps = store =>({
  data:store
});

export default connect(mapStateToProps) (App);