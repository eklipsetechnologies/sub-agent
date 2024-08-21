import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { props_params } from '../../store/actions/PropsParams';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import MatchSalary from './MatchSalary';
import { BounceRight,FadeIn } from "animate-components";
import img from '../../assets/svg/whocoded_avatar.svg'
import { Eye, Airplay, Clipboard, DollarSign } from 'react-feather';

class ListPayroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"",
            laoding:false,
            data:[],
            id:0,
            switch:"",
            type:"Employees",
            type2:"1",
            
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
            axios.get(`${Home}auth/users/listUsers/${this.state.type}/${this.state.type2}`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }


    Switch=(name,id)=>{
        this.setState({id:id,switch:name});
    }

    componentDidMount(){
        this.LoadData();
    }
    
    render() {
       // console.log(this.props)
        return (
            <div>
                {this.state.switch === 'WHOCODED'?
                <MatchSalary 
                 id={this.state.id}
                 close={()=>this.Switch('',0)}
                />
              :
              
              ''}
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
                                    <div><p className="st-card-title">List of Payroll</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                        <button data-rh="View query" onClick={()=>this.SwitchContent('pay_salary_list')} className="btn btn-primary2 btn-sm m-1 shadow"><DollarSign color="white" size={35} /> Salary Base </button>
                                    {/* <button onClick={()=>this.SwitchContent('pay_salary_list')} className="st-btn btn-primary2 shadow m-1">
                                        <span className="d-flex">
                                          <MaterialIcon icon="monetization_on" color="#ffffff" />
                                          <span className="text-white">Salary Base</span>
                                        </span>
                                        </button>  */}
                                          
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                {this.state.data.length < 1 ?
                                <div className="table-responsive">
                                <div className="p-5">
                                    <div className="alert alert-warning shadow text-center">
                                        No data found
                                    </div>
                                </div>
                             </div>
                            :
                            
                            <table className="table mt-2 table-hover table-bordered">
                                <thead className="">
                                    <tr>
                                    <th scope="col" style={{width:'7%'}}></th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Salary Base</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col" style={{width:'33%'}}>Actions</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(role=>
                                        <tr key={role.id}>
                                        <td>
                                            <center>
                                                <div className="avatar avatar-xm">
                                                <img className="rounded-circle" src={role.picture === null ? img : role.picture} />
                                            </div>
                                            </center>
                                            
                                        </td>
                                        <td scope="row">{role.name}</td>
                                        <td scope="row">{role.gender}</td>
                                        <td> <strong>{role.salaryBase}</strong></td>
                                       <td>{role.gender}</td>
                                        <td>
                                        <div className="btn-toolbar">
                                            <div className="d-flex">
                                            <button data-rh="Add/Remove Employee Salary Base" onClick={()=>this.Switch('WHOCODED',role.id)} className="btn btn-primary2 btn-sm m-1 shadow"><Airplay color="white" size={35} />Add/Remove  </button>
                                            <button onClick={()=>this.SwitchContent('Add_Invoice',[role.id])} className="btn btn-primary2 btn-sm m-1 shadow"><DollarSign color="white" size={35} />Pay employee  </button>
                                            {/* <button data-rh="edit"   type="button" className="st-btn btn-warning btn-icon d-flex" style={{marginRight:'5px'}}>
                                                 <MaterialIcon icon="assignment_ind" color="#35357D" />
                                            </button> */}
                                            {/* <button data-rh="View query" onClick={()=>this.SwitchContent('pay_add',[role.id])} className="btn btn-primary2 btn-sm m-1 shadow"><Clipboard color="white" size={35} /> </button> */}
                                            {/* <button data-rh="delete"  onClick={()=>this.SwitchContent('pay_add',[role.id])} type="button" className="st-btn btn-primary2 btn-icon d-flex" style={{marginRight:'5px'}}>
                                                 <MaterialIcon icon="monetization_on" color="#ffffff" />
                                            </button> */}
                                            
                                            </div>
                                        </div>
                                        </td>
                                        
                                        </tr>
                                    
                                    )}
                                    
                                </tbody>
                                </table>
    }
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

export default connect(mapStateToProps) (ListPayroll);