import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { BounceRight,FadeIn } from "animate-components";
import img from '../../assets/svg/whocoded_avatar.svg'

class MatchSalary extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            details:"",
            laoding:false,
            data:[],
            salary:""
        }
    }
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/listSalaryBase`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadEditData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.post(`${Home}auth/users/viewUser`,{
               token: token,
               id:this.props.id
            })
           .then(res => {
           console.log(res)
           this.setState({details:res.data,salary:res.data.salaryBase,laoding:false});
           
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
            Axios.post(`${Home}auth/matchStaffSalaryBase`,{
                token:token,
                id:this.props.id,
                salary:this.state.salary,
              })
               .then(res => {
                 //console.log(res);
                 this.setState({laoding:false,});
                 if (res.data.success) {
                     this.props.dispatch(launch_toaster(res.data.message));
                     this.props.dispatch(toast_trigger(true));
                         //this.props.close
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
        this.LoadEditData();
        this.LoadData();
          this.interval = setTimeout(() => this.changeStyle('show'), 5);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }
    
    render() {
        return (
            <div>
                <div className={'modal effect-scale '+this.state.style} id="exampleModalCenter"  role="dialog" style={{display:'block',background:'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog " role="document">
                    <form onSubmit={this.handleSubmit} className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Match Employee To A Salary Base</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        <Spinner />
                    :
                    
                    <>
                        <center>
                        <div className="avatar avatar-xxl">
                            <img className="rounded-circle shadow-lg sty" src={this.state.details.picture === null ? img : this.state.details.picture} />
                         </div>
                        </center>
                      <div className=" table-responsive mt-5">
                          <div className="form-group">
                              <label>Select Salary Base</label>
                              <select 
                                            required
                                            onChange={this.handleChange}
                                            value={this.state.salary}
                                            className="form-control" 
                                            name="salary"
                                            >
                                                <option value="">Select One</option>
                                                {this.state.data.length > 0 ?
                                              this.state.data.map(cat=>
                                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                )  
                                            :''}
                                               
                                            </select>
                          </div>
                      </div>
                      </>
                    }
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.props.close} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary2" data-dismiss="modal">Match Now</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (MatchSalary);