import React, { Component } from "react";
import { BounceRight, FadeIn, BounceUp, BounceLeft } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import {
  PlusCircle,
  Edit,
  Trash2,
  List,
  ArrowLeft,
  Eye,
  Mail,
  Command,
  CheckCircle,
  FileText,
  User,
  Database,
  DollarSign,
  Check,
  GitBranch,
  Edit2,
  EyeOff,
  Link,
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/car.svg";
import { open_right } from "../../store/actions/OpenRight";

class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      data: [],
      name: "",
      modal: "",
      show: "",
      id: 0,
      switch: "",
      filter: "all",
      detail:{}
    };
  }
  Filter = (filter) => {
    this.LoadData(filter);
    this.setState({ filter: filter });
  };
  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === "type") {
        this.setState({ switch: event.target.value });
      }
    }
  };

  Delete(key) {
    if (window.confirm("❌ are you sure you want to decline?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}admin/deleteCategory`, {
          id: key,
        },{
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        })
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.LoadData();
            } else {
              this.setState({ loading: false });
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(false));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }


  OpenModal = (name, id) => {
    if (name.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ name: name }), 600);
    } else {
      this.setState({ name: name });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id: id });
  };

  Returned(key) {
    if (window.confirm("Are you sure you want to mark this returned?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/returnIssueItems`, {
          token: token,
          id: key,
        })
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.LoadData(this.state.filter);
            } else {
              this.setState({ loading: false });
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(false));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

  LoadData = (filter) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}enter-ps/vehicle/getVehicles`, {
        headers: { 
            'Authorization': `Bearer ${token}`
        } 
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data.payload          });
        })
        .catch((err) => console.log(err));
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  componentDidMount() {
    this.LoadData(this.state.filter);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.quick_params !== this.props.data.quick_params) {
      this.LoadData(this.state.filter);
    }
    if (nextProps.data.switch !== this.props.data.switch) {
      this.LoadData(this.state.filter);
    }
  }

  OpenModal3 = (modal, id) => {
    if (id !== 0 || id > 0) {
      // this.LoadFiles(id);
    }
    if (modal.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ modal: modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ detail: id });
  };

  componentWillUnmount() {
    this.props.dispatch(open_right("Open"));
  }


  render() {
    
    return (
      <>
     
        <FadeIn duration="1s" timingFunction="ease-out">
          <div className="card border-0 mb-5">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Vehicle List</h6>
                </div> 
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                    <button
                    onClick={()=>this.SwitchContent("add_cat",[])}
                        //   onClixpck={() => this.OpenModal3("WHOCODED", '')}
                          className="btn btn-primary"
                        >
                          <PlusCircle color="white" size={35} /> Add New
                        </button>

                      {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('returned')} className="btn btn-success shadow m-1"><List color="white" size={35} /> Returned</button>
                           <button onClick={()=>this.Filter('unreturned')} className="btn btn-warning shadow m-1"><List color="#000" size={35} /> Pending</button> */}
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div>
            {this.state.loading ? (
              <div className="p-5">
                <Spinner size={70} />
              </div>
            ) : this.state.data.length < 1 ? (
              <div className="p-5">
                <center>
                  <img style={{width:"30%"}} className="img-fluid w-50" src={img}  />
                </center>
                <div className="pt-4 alert-secondry text-center">
                  No company setup yet. Please add your company details
                </div>
              </div>
            ) : (
              <div className="row mb-4">
                    
              {this.state.data.map((user,i)=>
                  <div key={i} className="col-md-3 mb-3">
                   <FadeIn duration="1s" timingFunction="ease-out">
                  <div className="card card-profile st-member">
                      {/* {user.status?
                       <span data-rh="Archived" className="st-box bg-success"></span>
                      :
                     <span data-rh="Archived" className="st-box bg-danger"></span>
                      } */}
              
                      <div className="card-body tx-13">
                          <center>
                          <div className="st-img-co">
                                        <img className="img-fluid st-img-h" src={img} />
                            </div>
                             {/* <h5><a href="#">{`${user.first_name} ${user.last_name}`}</a></h5>
                             <small>{user?.userProfile?.email}</small> <br />
                             <small>0{user.phone_number}</small>
                             <hr></hr>
                             <button onClick={()=>this.SwitchContent('user_profile',[user._id])} className="btn btn-primary m-1 btn-primary2 btn-sm shadow">View profile</button>
                             {this.state.loading2 ?
                            <Spinner size={10} />
                              :
                          user.status ?
                          <button onClick={()=>this.Delete(user._id)} data-rh="Archive User" type="button" className="btn btn-danger btn-icon btn-sm m-1">
                          <EyeOff color="white" size={48} />
                        </button>
                          :
                          <button onClick={()=>this.Activate(user._id)} data-rh="Activate User" type="button" className="btn btn-success btn-icon btn-sm m-1">
                               <Eye color="white" size={48} />
                            </button>
                          }
                              {!user?.companyDetails?
                              <button onClick={()=>this.LinkNow(user._id)} data-rh={`Match User to company`} type="button" className="btn btn-secondary btn-icon btn-sm m-1">
                              <Link color="white" size={48} />
                           </button>
                          :''}
                               */}
                             
                          </center>
                          
                      </div>
                      <div className="table-responsive">
                        <table className="table table-sm table-primary mb-0">
                          <tr>
                            <td>Vehicle Name:</td>
                            <td>{user.vehicleMake}</td>
                          </tr>
                          <tr>
                            <td>Vehicle Category:</td>
                            <td>{user.vehicleCategory}</td>
                          </tr>
                          <tr>
                            <td>Vehicle Model:</td>
                            <td >{user.vehicleModel}</td>
                          </tr>
                          {/* <tr>
                            <td>Chassis Number:</td>
                            <td>{user.chassisNumber}</td>
                          </tr> */}
                          <tr>
                            <td>Engine Number:</td>
                            <td>{user.engineNumber}</td>
                          </tr>
                          <tr>
                            <td style={{borderBottomLeftRadius:"13px"}}>Vehicle Price:</td>
                            <td style={{borderBottomRightRadius:"13px"}}>{user.engineNumber}</td>
                          </tr>
                        </table>
                      </div>
                      
                  </div>
                  </FadeIn>
              </div>
                  )}
         
  </div>
            )}
          </div>
        </FadeIn>
      </>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ListCategory);
