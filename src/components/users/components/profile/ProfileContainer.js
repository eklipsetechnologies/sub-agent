import React, { Component } from "react";
import img from "../../../../assets/img/user.png";
import Axios from "axios";
import { Home } from "../../../../global/Home";
import { PlusCircle } from "react-feather";
import Spinner from "../../../../global/Spinner";
import { toast_trigger } from "../../../../store/actions/ToastTrigger";
import { launch_toaster } from "../../../../store/actions/IsToast";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Toaster from "../../../../global/Toaster";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      true: false,
      password: "",
      password1: "",
      password2: "",
      loading: false,
    };
  }

  LoadData2 = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/me`, {
        token: token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, details: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadData2();
  }

  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  submit = (event) => {
    event.preventDefault();
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/changePassword`, {
        token: token,
        id: this.state.details.id,
        password: this.state.password1,
        old: this.state.password,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
          if (res.data.success) {
            console.log(res.data.success);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
          } else {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  };

  render() {
    return (
      <div className="card  border-0 mb-3">
        <Toaster />
        <div className="card-body">
          {this.state.true ? (
            <div className="">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Change Password</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <button
                      onClick={() => this.setState({ true: false })}
                      className="btn btn-danger shadow"
                    >
                      <PlusCircle color="white" size={35} /> Close
                    </button>
                  </div>
                </div>
              </div>

              <form
                onSubmit={this.submit}
                className="col-sm-6 col-md-5 col-lg mg-t-40"
              >
                <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">
                  Personal Information
                </label>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="text"
                    className="form-control st-login-f"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Old password"
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    required
                    type="password"
                    className="form-control st-login-f"
                    name="password1"
                    value={this.state.password1}
                    onChange={this.handleChange}
                    placeholder="New password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    required
                    type="password"
                    className="form-control st-login-f"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    placeholder="Confirm password"
                  />
                </div>
                {this.state.loading ? (
                  <div className="form-group">
                    <Spinner />
                  </div>
                ) : (
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary shadow">
                      Submit now
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Profile Details</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <button
                      onClick={() => this.setState({ true: true })}
                      className="btn btn-primary shadow"
                    >
                      <PlusCircle color="white" size={35} /> Change Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-5 col-lg mg-t-40">
                <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">
                  Personal Information
                </label>
                <table className="table table-striped table-bordered table-success table-hover">
                  <tbody>
                    <tr className="pt-2 pb-2">
                      <th className="st-color-g">Name: </th>
                      <td className="tx-color-02 pl-2">{`${this.state.details.first_name} ${this.state.details.middle_name}`}</td>
                    </tr>

                    {/* <tr className="pt-2 pb-2">
                         <th className="st-color-g">State of origin: </th>
                         <td className="tx-color-02 pl-2">{this.state.details.state}</td>
                       </tr> */}

                    <tr className="pt-2 pb-2">
                      <th className="st-color-g">Gender: </th>
                      <td className="tx-color-02 pl-2">
                        {this.state.details.gender}
                      </td>
                    </tr>

                    <tr className="pt-2 pb-2">
                      <th className="st-color-g">Email Address: </th>
                      <td className="tx-color-02 pl-2">
                        {this.state.details.email}
                      </td>
                    </tr>
                    <tr className="pt-2 pb-2">
                      <th className="st-color-g">Phone Number: </th>
                      <td className="tx-color-02 pl-2">
                        {this.state.details.phone}
                      </td>
                    </tr>
                    <tr className="pt-2 pb-2">
                      <th className="st-color-g">Blood group: </th>
                      <td className="tx-color-02 pl-2">
                        {this.state.details.blood_group}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ProfileContainer);
