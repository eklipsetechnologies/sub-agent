import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { Home } from '../../global/Home';
import Axios from 'axios';
import Spinner from '../../global/Spinner';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { BounceRight,FadeIn } from "animate-components";
class AddSalaryBase extends Component {
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
            amount:""
        }
    }


    SwitchContent=(name)=>{
        this.props.dispatch(switch_content(name))
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/getTeachers`,{
               params:{token: token}
            })
           .then(res => {
             //console.log(res);
           this.setState({laoding:false,options:res.data});
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
            Axios.post(`${Home}auth/NewSalaryBase`,{
                token:token,
                name:this.state.title,
                desc:this.state.desc,
                amount:this.state.amount
              })
               .then(res => {
                 //console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         this.SwitchContent('Ex_In_List');
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
       // this.LoadData();
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
       // console.log(this.state)
        return (
            <div>
                <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                        <div className="card-body">
                            {this.state.laoding ?
                            <div className="table-responsive">
                                <div className="p-5">
                                    <Spinner />
                                </div>
                            </div>
                        :
                        <>
                            <div className="row">
                                <div className="col-md-4">
                                    <div><p className="st-card-title">Add Salary Base</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                    <button onClick={()=>this.SwitchContent('Ex_In_List')} className="btn btn-danger shadow">
                                        <span className="d-flex">
                                          <MaterialIcon icon="keyboard_return" color="#ffffff" />
                                          <span className="text-white" style={{marginTop:'-3px'}}>return</span>
                                        </span>
                                        </button>   
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <form className="dtm" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" 
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            className="form-control st-login-f" 
                                            name="title" 
                                            placeholder="Salary Base Name" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Amount</label>
                                            <input type="number" 
                                            value={this.state.amount}
                                            onChange={this.handleChange}
                                            className="form-control st-login-f" 
                                            name="amount" 
                                            placeholder="Amount" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group">
                                            <label>Description</label>
                                            <textarea 
                                            value={this.state.desc}
                                            onChange={this.handleChange}
                                            placeholder="description"
                                            className="form-control st-login-f" name="desc"
                                            ></textarea>
                                        </div>

                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    {this.state.laoding ?
                                    <Spinner />
                                :
                                <button className="btn btn-primary2 shadow">Add Salary Base</button>
                                }
                                
                                </div>
                                
                                </form>
                            </div>
                        </>
                   }
                        </div>
                    </div>
                    </BounceRight>
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (AddSalaryBase);