import React, { Component } from 'react';
import { HelpCircle } from 'react-feather';
import {FadeIn } from "animate-components";
import { quick_switch } from '../../../../store/actions/QuickSwitch';
import EditSecurityQuestion from './EditSecurityQuestion';
import { connect } from 'react-redux';
import SecurityModal from './SecurityModal';
import Axios from 'axios';
import { Home } from '../../../../global/Home';
import Spinner from '../../../../global/Spinner';
import empty from '../../../../assets/svg/whocoded_empty.svg'


class SecurityQuestions extends Component {
    constructor(props) {
        super(props);
        this.state ={
            show:"",
            id:0,
            name:"",
            list:[1,2,3],
            loading:false,
            data:[]
        }
    }
    
    QuickSwitcher=(name)=>{
        this.props.dispatch(quick_switch(name))
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
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/profile/listSecurityAnswer`,{
               token: token,
               id:this.props.self === 'WHOCODED'?this.props.data.params.length > 0 ? this.props.data.params[0] : 0 :null
            })
           .then(res => {
            //console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.data.quick_params !== this.props.data.quick_params) {
            if (nextProps.data.quick_param_name === 'QU') {
                this.LoadData();
            }
        }
    }

    componentDidMount(){
        this.LoadData();
    }
    Switcher=()=>{
        if (this.props.data.quick_switch === 'WHOCODED_S_EDIT') {
            return <EditSecurityQuestion />
        }else {
            return  <FadeIn duration="1s" timingFunction="ease-out">
            <div className="card  border-0 mb-3">
                         <div className="card-body">
                             <h6 className="lh-5 mg-b-0 mb-2">Security Questions  <button onClick={()=>this.QuickSwitcher('WHOCODED_S_EDIT')} className="btn btn-sm btn-outline-primary  pull-right">Add new</button></h6>
                             {
                                 this.state.loading ?
                                 <Spinner size={70} />
                                 :
                             this.state.data.length > 0 ?
                             this.state.data.map((m,i)=>
                                <div onClick={()=>this.OpenModal('WHOCODED',i)} key={m.id} className="media mt-3">
                                 <div className="wd-80 ht-80 bg-ui-04 bg-blue-light rounded d-flex align-items-center justify-content-center">
                                   <HelpCircle color="#365d7d" size={35} />
                                 </div>

                                 <div className="media-body pd-l-25">
                                     <h5 className="mg-b-5">{m.question}</h5>
                                     <p className="mg-b-3"><span className="tx-medium tx-color-02">xxx xx xxx xxxx xxx</span></p>
                                    
                               </div>
                             </div>
                                )
                            :
                            
                              <div className="mt-5">
                            <center>
                                <img className="img-fluid empty-width" title="No Data" src={empty} />
                            </center>  
                            </div>
                            }
                         
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
                <SecurityModal 
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

export default connect(mapStoreToProps) (SecurityQuestions);