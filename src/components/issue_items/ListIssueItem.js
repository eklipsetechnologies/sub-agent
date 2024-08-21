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
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import { open_right } from "../../store/actions/OpenRight";

class ListIssueItem extends Component {
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
    if (window.confirm("❌ are you sure you want to delete?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/deleteInProduct`, {
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
      Axios.get(`${Home}auth/settings/listInProduct`, {
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
  render() {
    // console.log(this.props);
    return (
      <>
        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Insured Products</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      {(this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 1) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 0) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 5) ? (
                        <button
                          onClick={() => this.SwitchContent("exit_add", [0])}
                          className="btn btn-primary shadow"
                        >
                          <PlusCircle color="white" size={35} /> Add New
                        </button>
                      ) : (
                        ""
                      )}

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
                        {/* <th style={{width:'7%'}}></th> */}
                        <th>Company</th>
                        <th>Product</th>
                        {/* <th>Premium</th>
                        <th>Commission</th>
                        <th>Net Premium</th>
                        <th>MarkUp</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          {/* <td>
                                        <img src={img} className="img-fluid" />
                                    </td> */}
                          <td>{dep.company}</td>
                          <td>{dep.product}</td>
                          {/* <td>{dep.premium}</td>
                          <td>{dep.commision}</td>

                          <td>{dep.net_premium}</td>
                          <td>{dep.markup}</td> */}
                          <td>
                            <div>
                              <FadeIn duration="1s" timingFunction="ease-out">
                                <div className=" d-flex">
                                  {(this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 3) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 1) ||
                                  (this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 5) ? (
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

export default connect(mapStoreToProps)(ListIssueItem);
