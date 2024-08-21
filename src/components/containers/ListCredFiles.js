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
  Check,
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import { open_right } from "../../store/actions/OpenRight";
import { Link } from "react-router-dom";

class ListCredFiles extends Component {
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
      let reason = window.prompt("Reason for decline");
      if (reason != null) {
        if (localStorage.getItem("userToken")) {
          token = JSON.parse(localStorage.getItem("userToken"));
          this.setState({ loading: true });
          Axios.post(`${Home}admin/declineCredential`, {
            id: key,
            reason:reason
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
  }

  Approve(key) {
    if (window.confirm("are you sure you want to approve?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}admin/approveCredential`, {
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
      let id = this.props.data.params && this.props.data.params[0]?this.props.data.params[0]:""
      Axios.get(`${Home}enter-ps/user/getCompany`, {
        headers: { 
            'Authorization': `Bearer ${token}`
        } 
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data          });
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
    // console.log(this.props)
    return (
      <>
      {this.state.modal === "WHOCODED" ? (
          <div
            className={`modal effect-super-scaled ${this.state.show} `}
            id="exampleModalCenter"
            role="dialog"
            style={{
              display: "block",
              background: this.state.show === "" ? "none" : "#050404d4",
              overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
              <div className="modal-body">
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <>
                    <div className="mt-4 mb-4">
                      <center>
                      <img src={this.state.detail.picture} className="img- shadow" />
                      </center>
                      
                    </div>
                       <div className="table-responsive">
                        <table
                          className="table mb-0 table-striped table-hover table-bordered"
                          id="stephen"
                        >
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <td>{this.state.detail.name}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{this.state.detail.email}</td>
                            </tr>
                            <tr>
                              <th>Mobile Number</th>
                              <td>{this.state.detail.phone_number}</td>
                            </tr>
                            <tr>
                              <th>State</th>
                              <td>{this.state.detail.state}</td>
                            </tr>
                            <tr>
                              <th>Address</th>
                              <td>{this.state.detail.address}</td>
                            </tr>
                            <tr>
                              <th>Zip Code</th>
                              <td>{this.state.detail.zip_code}</td>
                            </tr>
                            <tr>
                              <th>Gener</th>
                              <td>{this.state.detail.gender?this.state.detail?.gender?.value:''}</td>
                            </tr>
                            <tr>
                              <th>Latino</th>
                              <td>{this.state.detail.latino?this.state.detail?.latino?.value:''}</td>
                            </tr>
                          </tbody>
                    </table>
                    </div>

                    <h4 className="mt-3">User License</h4>
                            {this.state.detail.license && this.state.detail.license.length > 0 &&(
                              this.state.detail.license.map((list,index)=>
                              <div className="table-responsive mt-3 mb-3">
                            <table
                              className="table mb-0 table-striped table-primary table-hover table-bordered"
                              id="stephen"
                            >
                              <tbody>
                              <>
                              <tr key={index}>
                              <th style={{width:'30%'}}>license Number</th>
                              <td>{list[`licenseNumber_${index}`]}</td>
                            </tr>
                            <tr key={index}>
                              <th style={{width:'30%'}}>license State</th>
                              <td>{list[`issueState_${index}`]}</td>
                            </tr>

                            <tr key={index}>
                              <th style={{width:'30%'}}>Years of Experience</th>
                              <td>{list[`yearsExp_${index}`]}</td>
                            </tr>

                            <tr key={index}>
                              <th style={{width:'30%'}}>license Type</th>
                              <td>{list[`licenseType_${index}`]}</td>
                            </tr>
                            </>
                            </tbody>
                    </table>
                    </div>
                              )
                            )}
                            
                            
                         
                    
                    </>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    onClick={() => this.OpenModal3("", {})}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
                
                
             
            </div>
          </div>
        ) : (
          ""
        )}
        <FadeIn duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">{this.state.data[0]?this.state.data[0].name:''} Files</h6>
                </div> 
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                    <button
                          onClick={() => this.SwitchContent("", [0])}
                          className="btn btn-danger"
                        >
                          <ArrowLeft color="white" size={35} /> Return
                        </button>

                      {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('returned')} className="btn btn-success shadow m-1"><List color="white" size={35} /> Returned</button>
                           <button onClick={()=>this.Filter('unreturned')} className="btn btn-warning shadow m-1"><List color="#000" size={35} /> Pending</button> */}
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <div className="p-5">
                <Spinner size={70} />
              </div>
            ) : this.state.data.length < 1 ? (
              <div className="p-5">
                <div className="alert alert-warning text-center">
                  No data yet
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="table-responsive">
                  <table
                    className="table mb-0 table-striped table-hover table-bordered"
                    id="stephen"
                  >
                    <thead>
                      <tr>
                        <th style={{width:'5%'}}></th>
                        <th>Name</th>
                        <th>Option</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          <td>
                               <FileText />
                                    </td>
                          <td>{dep.name}</td>
                          <td>{dep.option}</td>
                          <td>
                            <span className={dep.statusClass}>{dep.statusName}</span>
                            </td>

                          <td>{dep.user?.name}</td>
                          <td>
                            <div>
                              <FadeIn duration="1s" timingFunction="ease-out">
                                <div className=" d-flex">
                                <a
                                target={"_blank"}
                                href={dep.file}
                                    //   data-rh="View Files submitted"
                                     
                                      className="btn btn-primary btn-sm m-1"
                                    >
                                      <Eye color="white" size={35} />{" Preview File "}
                                    </a>

                                    <button
                                      data-rh="View User"
                                      onClick={() => this.OpenModal3("WHOCODED",dep.user)}
                                      className="btn btn-primary btn-sm m-1"
                                    >
                                      <User color="white" size={35} />{" User"}
                                    </button>

                                    {dep.status == 0 ||dep.status == 1 ?
                                        <button
                                      data-rh="Decline"
                                      onClick={() => this.Delete(dep._id)}
                                      className="btn btn-danger btn-sm m-1"
                                    >
                                      <Trash2 color="white" size={35} />{" Decline"}
                                    </button>
                                    :''}
                                    
                                    {dep.status == 0 ||dep.status == 2 ?
                                        <button
                                      data-rh="Approve"
                                      onClick={() => this.Approve(dep._id)}
                                      className="btn btn-success btn-sm m-1"
                                    >
                                      <Check color="white" size={35} />{" Approve"}
                                    </button>
                                    :''}
                                </div>
                              </FadeIn>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default connect(mapStoreToProps)(ListCredFiles);
