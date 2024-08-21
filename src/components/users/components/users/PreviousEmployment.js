import React, { Component } from 'react';
import { Twitch, Briefcase } from 'react-feather';
import {FadeIn } from "animate-components";
import EditPreviousEmployment from './EditPreviousEmployment';
import { connect } from 'react-redux';
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import Spinner from '../../../../global/Spinner';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import empty from '../../../../assets/svg/whocoded_empty.svg'
import EmploymentModal from './EmploymentModal';


class PreviousEmployment extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loading:false,
            data:[],
            id:0,
            name:"",
            show:""
        }
    }
    
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/listEmpHistory`,{
               token: token,
               id:this.props.self === 'WHOCODED'?this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null
            })
           .then(res => {
           // console.log('TEQYUQWY',res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>this.ErrorHandler(err));
        }
    }

    ErrorHandler=(message)=>{
        //console.clear();
        console.log(message)
        this.setState({loading:false})
        toast.error('Error',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
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
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.data.quick_params !== this.props.data.quick_params) {
            if (nextProps.data.quick_param_name === 'EMPLOY') {
                this.LoadData();
            }
        }
    }
    
    Switcher=(name)=>{
        if (this.props.data.quick_switch === 'WHOCODED_PE_EDIT') {
            return <EditPreviousEmployment />
        }else {
            return <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                        <div className="card-body">
                            <h6 className="lh-5 mg-b-0"> Employment History 
                            <button onClick={()=>this.QuickSwitcher('WHOCODED_PE_EDIT')} className="btn btn-sm btn-outline-primary  pull-right">Add new</button>
                            
                             </h6>
                             {this.state.loading ?
                             <div className="p-4">
                                 <Spinner size={40} />
                             </div> 
                            :
                            this.state.data.length < 1 ?
                            <div className="mt-5">
                            <center>
                                <img className="img-fluid empty-width" title="No Data" src={empty} />
                            </center>
                            </div>
                            :
                            this.state.data.map((next,i)=>
                            <div onClick={()=>this.OpenModal('WHOCODED',0)} key={i} className="media mt-5">
                            <div className="wd-80 ht-80 bg-ui-04 bg-blue-light rounded d-flex align-items-center justify-content-center">
                              <Briefcase color="#365d7d" size={35} />
                            </div>

                            <div className="media-body pd-l-25">
                                <h5 className="mg-b-5">{next.title} in {next.company}</h5>
                             <p className="mg-b-3"><span className="tx-medium tx-color-02">{next.startDate} <strong> - </strong>{next.endDate}</span></p>
                                {/* <span className="d-block tx-13 tx-color-03">2002-2006</span> */}
                          </div>
                          {next.status === 1?
                              <div className="st-branch-current">
                                  <span className="badge badge-pill badge-success shadow">Current</span>
                              </div>
                            :''}
                        </div>
                                )}
        
                        </div>
                    </div>
                    </FadeIn>;
        }
    }
    render() {
        return (
            <div>
                {this.state.name === 'WHOCODED'?
                <div className="st-motion">
                <EmploymentModal 
                show={this.state.show}
                details={this.state.data[this.state.id]}
                close={()=>this.OpenModal('',0)}
                id={this.state.id} />
                </div>
            :''}
                 {this.Switcher()}
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (PreviousEmployment);