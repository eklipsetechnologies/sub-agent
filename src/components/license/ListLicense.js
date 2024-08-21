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
  Award,
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import { open_right } from "../../store/actions/OpenRight";

class ListLicense extends Component {
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
        Axios.post(`${Home}admin/deleteLicense`, {
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
      Axios.get(`${Home}admin/getLicense`, {
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
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">License Types</h6>
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
                        {/* <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Route Number</th>
                        <th>User</th>
                        <th>Status</th> */}
                        <th style={{width:'30%'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          <td>
                               <Award />
                                    </td>
                          <td>{dep.name}</td>
                         
                        

                         
                          <td>
                            <div>
                              <FadeIn duration="1s" timingFunction="ease-out">
                                <div className=" d-flex">
                                {dep.status == 0 || dep.status == 1 ? 
                                        <button
                                      data-rh="Delete"
                                      onClick={() => this.Delete(dep._id)}
                                      className="btn btn-danger btn-sm m-1"
                                    >
                                      <Trash2 color="white" size={35} />{" Delete License"}
                                    </button>
                                    :''}

                           
                                        <button
                                      data-rh="Delete"
                                      onClick={() => this.SwitchContent("edit_cat",[dep._id])}
                                      className="btn btn-primary btn-sm m-1"
                                    >
                                      <Edit2 color="white" size={35} />{" Edit License"}
                                    </button>
                                  
                                    
                                    

                                    {/* <button
                                      data-rh="Delete"
                                      onClick={() => this.Delete(dep.id)}
                                      className="btn btn-danger btn-sm m-1 shadow"
                                    >
                                      <Trash2 color="white" size={35} />{" "}
                                    </button> */}
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

export default connect(mapStoreToProps)(ListLicense);
