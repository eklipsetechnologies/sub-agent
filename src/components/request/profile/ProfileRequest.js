import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../../store/actions/SwitchContent';
import { props_params } from '../../../store/actions/PropsParams';
import {PlusCircle, Edit, Trash2, List, ArrowLeft, Eye } from 'react-feather';
import Axios from 'axios';
import { Home } from '../../../global/Home';
import Spinner from '../../../global/Spinner';
import { launch_toaster } from '../../../store/actions/IsToast';
import { toast_trigger } from '../../../store/actions/ToastTrigger';
import img from '../../../assets/svg/whocoded_avatar.svg'
import PayrollDetails from '../payroll/PayrollDetails';
import BasicRequest from './BasicRequest';
import NextOfKinRequest from './NextOfKinRequest';
import Certification from './Certification';
import DependantRequest from './DependantRequest';
import EducationalQualification from './EducationalQualification';

class ProfileRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List:[1,2,3,4,5,6,7,8,9],
            loading:false,
            data:[],
            name:"",
            show:"",
            id:"",
            switch:"basic"
        }
    }
    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.setState({switch:event.target.value})
          }
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

    Delete(key){
        if (window.confirm('❌ are you sure you want to delete this leave?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({loading:true});
                Axios.post(`${Home}hr/leave/delete`,{
                token: token,
                leave_key:key
                })
            .then(res => {
               // console.log(res);
             if (res.data.status) {
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

    
    Switcher=()=>{
        if (this.state.switch === 'basic') {
            return <BasicRequest />
        }else if (this.state.switch === 'nextOfKin') {
            return <NextOfKinRequest />
        }else if (this.state.switch === 'certification') {
            return <Certification />
        }else if (this.state.switch === 'dependant') {
            return <DependantRequest />
        }else if (this.state.switch === 'qualification') {
            return <EducationalQualification />
        }
    }
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }

    componentDidMount(){
       // this.LoadData()
    }
    render() {
        return (
            <>
            {this.state.name === 'WHOCODED'?
                <PayrollDetails
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
            :''}
            <BounceRight duration="1s" timingFunction="ease-out">
            <div className="card border-0 mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Viewing {this.state.type} request</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                            <div className="input-group">
                                <select 
                                onChange={this.handleChange}
                                name="type" value={this.state.type}
                                 className="form-control form-control-sm mr-1">
                                <option value="basic">Basic profile </option>
                                <option value="nextOfKin">Next of kin</option>
                                <option value="certification">Certification</option>
                                <option value="dependant">Dependant</option>
                                <option value="qualification">Qualification</option>
                            </select>
                            <button onClick={()=>this.SwitchContent('req_home',[0])} className="btn btn-danger btn-sm shadow m-1"><ArrowLeft color="white" size={35} /> Return</button>
                            </div>
                            
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                </div>
                </div>
            </BounceRight>
            
            {this.Switcher()}
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (ProfileRequest);