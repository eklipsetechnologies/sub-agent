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
import { BounceRight,FadeIn } from "animate-components";

class ListSalaryBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"",
            laoding:false,
            data:[]
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
            this.setState({laoding:true});
            axios.get(`${Home}auth/listSalaryBase`,{
               params:{token: token}
            })
           .then(res => {
            // console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    Delete(id){
        if (window.confirm('❌ are you sure you want to delete salary base?')) {
            let token = "";
            if (localStorage.getItem('userToken')) {
                token = JSON.parse(localStorage.getItem('userToken'));
                this.setState({laoding:true});
                axios.post(`${Home}auth/DeleteSalaryBase`,{
                token: token,
                id:id
                })
            .then(res => {
               // console.log(res);
             if (res.data.success) {
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(true));
                this.LoadData();
             }else{
                 this.setState({laoding:false})
                this.props.dispatch(launch_toaster(res.data.message));
                this.props.dispatch(toast_trigger(false));
             }
            })
            .catch(err =>console.log(err));
            }
            }
    }

    componentDidMount(){
        this.LoadData();
    }
    
    render() {
       // console.log(this.props)
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
                                    <div><p className="st-card-title">List of Salary Base</p></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="pull-right">
                                    <button onClick={()=>this.SwitchContent('pay_salary_add')} className="btn btn-primary2 shadow m-1">
                                        <span className="d-flex">
                                          <MaterialIcon size="20" icon="add" color="#ffffff" />
                                          <span className="text-white">New Salary Base</span>
                                        </span>
                                        </button> 
                                        <button onClick={()=>this.SwitchContent('In_home')} className="btn btn-danger shadow m-1">
                                        <span className="d-flex">
                                          <MaterialIcon size="20" icon="keyboard_return" color="#ffffff" />
                                          <span className="text-white">Return</span>
                                        </span>
                                        </button>   
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                {this.state.data.length > 0 ?
                                <table className="table mt-2 table-hover table-bordered">
                                <thead className="">
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" style={{width:'10%'}}>Actions</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(role=>
                                        <tr key={role.id}>
                                        <td scope="row">{role.name}</td>
                                        <td scope="row">{role.amount}</td>
                                        <td>{role.note}</td>
                                        <td>
                                        <div className="btn-toolbar">
                                            <div className="d-flex">
                                            {/* <button data-rh="edit"  onClick={()=>this.SwitchContent('Ex_In_edit',[role.id])} type="button" className="btn btn-primary2 btn-icon d-flex" style={{marginRight:'5px'}}>
                                                 <MaterialIcon size="20" icon="edit" color="#ffffff" />
                                            </button> */}
                                            <button data-rh="delete"  onClick={()=>this.Delete(role.id)} type="button" className="btn btn-danger btn-icon d-flex">
                                            <MaterialIcon size="20" icon="delete_forever" color="#ffffff" />
                                                </button>
                                            </div>
                                        </div>
                                        </td>
                                        
                                        </tr>
                                    
                                    )}
                                    
                                </tbody>
                                </table>
                            :
                            <div className="table-responsive">
                            <div className="p-5">
                                <div className="alert alert-warning shadow text-center">
                                    No data found
                                </div>
                            </div>
                         </div>
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

export default connect(mapStateToProps) (ListSalaryBase);