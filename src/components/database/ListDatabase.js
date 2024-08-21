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
  File,
} from "react-feather";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import img2 from "../../assets/svg/file.svg";
import { open_right } from "../../store/actions/OpenRight";
import App from "../uploads/App";

class ListDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      data: [],
      name: "",
      show: "",
      id: "",
      switch: "",
      filter: "all",
      modal: "",
      show: "",
      id: 0,
      data2: [],
      loading2: false,
    };
    this.fileInput = React.createRef();
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

  Delete(key) {
    if (window.confirm("❌ are you sure you want to delete?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/deleteDatabase`, {
          token: token,
          id: key,
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

  LoadData = (filter) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}auth/settings/listDatabase`, {
        params: { token: token },
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data });
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

  componentDidUpdate() {
    //initialize datatable
    $(function () {
      $("#stephen").DataTable();
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.quick_params !== this.props.data.quick_params) {
      this.LoadData(this.state.filter);
    }
    if (nextProps.data.switch !== this.props.data.switch) {
      this.LoadData(this.state.filter);
    }
  }
  componentWillUnmount() {
    this.props.dispatch(open_right("Open"));
  }
  OpenModal2 = (modal, id) => {
    if (modal.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ modal: modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id: id });
  };

  LoadFiles = (id) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading2: true });
      Axios.post(`${Home}auth/userFiles`, {
        token: token,
        id: id,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading2: false, data2: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  OpenModal3 = (modal, id) => {
    if (id !== 0 || id > 0) {
      this.LoadFiles(id);
    }
    if (modal.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ modal: modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id: id });
  };
  render() {
    // console.log(this.props);
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
              <form
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Upload Files</h5>
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className=" table-responsive">
                        <App id={this.state.id} url="insure" />
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.modal === "WHOCODED2" ? (
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
              <form
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Uploaded Files</h5>
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.loading2 ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table
                          className="table mb-0 table-striped table-hover table-bordered"
                          id="stephen"
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "7%" }}></th>
                              <th>File Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data2.length > 0 &&
                              this.state.data2.map((dep, i) => (
                                <tr key={i}>
                                  <td>
                                    <img src={img2} className="img-fluid" />
                                  </td>
                                  <td>{dep.name}</td>
                                  <td>
                                    <div>
                                      <FadeIn
                                        duration="1s"
                                        timingFunction="ease-out"
                                      >
                                        <div className=" d-flex">
                                          <a
                                            target="_blank"
                                            href={dep.file}
                                            data-rh="Download Files"
                                            className="btn btn-primary btn-sm m-1 shadow"
                                          >
                                            Download File{" "}
                                          </a>
                                        </div>
                                      </FadeIn>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">List of insured</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      {(this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 1) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 5) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 4) ? (
                        <>
                          <button
                            onClick={() => this.SwitchContent("exit_add", [0])}
                            className="btn btn-primary m-1 shadow"
                          >
                            <PlusCircle color="white" size={35} /> Add New
                          </button>
                          <button
                            onClick={() => this.SwitchContent("import", [0])}
                            className="btn btn-primary m-1 shadow"
                          >
                            <File color="white" size={35} /> Import
                          </button>
                        </>
                      ) : (
                        ""
                      )}

                      {/* <button onClick={()=>this.SwitchContent('exit_add',[0])} className="btn btn-primary m-1 shadow"><PlusCircle color="white" size={35} /> Add New</button> */}

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
                <div className="">
                  <table
                    id="stephen"
                    className="table mb-0 table-striped table-hover table-bordered table-responsive"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Insured</th>
                        <th>Class of Insured</th>
                        <th>Policy Number</th>
                        <th>Period of cover</th>
                        <th>Duration</th>
                        <th>Expiry Date</th>
                        <th>DOB</th>
                        <th>Email address</th>
                        <th>Telephone Number</th>
                        <th>Sum Insured</th>
                        <th>Premium Rate</th>
                        <th>Interest</th>
                        <th>Make</th>
                        <th>Premium Type</th>
                        <th>Business Indicator</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          <td>{dep.name}</td>
                          <td>{dep.class_insured}</td>
                          <td>{dep.policy_number}</td>
                          <td>{dep.period_cover}</td>
                          <td>{dep.duration}</td>
                          <td>{dep.expiry_date}</td>
                          <td>{dep.dob}</td>
                          <td>{dep.email}</td>
                          <td>{dep.telephone}</td>
                          <td>{dep.sum_insured}</td>
                          <td>{dep.premium_rate}</td>
                          <td>{dep.interest}</td>
                          <td>{dep.make}</td>
                          <td>{dep.premium_type}</td>
                          <td>{dep.business_indicator}</td>
                          <td>
                            <span
                              className={`badge badge-${dep.statusClass} badge-pill`}
                            >
                              {dep.confirmedName}
                            </span>
                          </td>
                          <td>
                            <div>
                              <FadeIn duration="1s" timingFunction="ease-out">
                                <div className=" d-flex">
                                  <button
                                    data-rh="View uploaded Files"
                                    onClick={() =>
                                      this.OpenModal3("WHOCODED2", dep.id)
                                    }
                                    className="btn btn-primary btn-sm m-1 shadow"
                                  >
                                    <Eye color="white" size={35} />{" "}
                                  </button>

                                  <button
                                    data-rh="Upload Files"
                                    onClick={() =>
                                      this.OpenModal2("WHOCODED", dep.id)
                                    }
                                    className="btn btn-primary btn-sm m-1 shadow"
                                  >
                                    <CheckCircle color="white" size={35} />{" "}
                                  </button>
                                  {(this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 3) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 1) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 5) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 4) ? (
                                    <button
                                      data-rh="Edit "
                                      onClick={() =>
                                        this.SwitchContent("exit_add", [dep.id])
                                      }
                                      className="btn btn-primary btn-sm m-1 shadow"
                                    >
                                      <Edit color="white" size={35} />{" "}
                                    </button>
                                  ) : (
                                    ""
                                  )}

                                  {(this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 3) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 1) ? (
                                    <button
                                      data-rh="Delete"
                                      onClick={() => this.Delete(dep.id)}
                                      className="btn btn-danger btn-sm m-1 shadow"
                                    >
                                      <Trash2 color="white" size={35} />{" "}
                                    </button>
                                  ) : (
                                    ""
                                  )}
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
        </BounceRight>
      </>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ListDatabase);
