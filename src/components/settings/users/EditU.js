import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../../store/actions/SwitchContent";
import { props_params } from "../../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../../store/actions/IsToast";
import { toast_trigger } from "../../../store/actions/ToastTrigger";
import { Home } from "../../../global/Home";
import Axios from "axios";
import Spinner from "../../../global/Spinner";

class EditU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: "",
      name: "",
      fetching: false,
      loading: false,
      password: "",
      loading: false,
      first_name: "",
      middle_name: "",
      surename: "",
      dob: "",
      email: "",
      gender: "",
      surname: "",
    };
  }
  LoadData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ fetching: true });
      Axios.post(`${Home}auth/settings/listUserSingle`, {
        token: token,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
      })
        .then((res) => {
          console.log(res);
          this.setState({ fetching: false });
          if (res.data[0]) {
            this.setState({
              first_name: res.data[0].first_name,
              middle_name: res.data[0].middle_name,
              dob: res.data[0].dob,
              email: res.data[0].email,
              gender: res.data[0].gender,
              surname: res.data[0].surname,
              type: res.data[0].type,
            });
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
            this.SwitchContent("", [0]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  ErrorHandler = (message) => {
    //console.clear();
    console.log(message);
    this.setState({ loading: false });
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/EditUser`, {
        token: token,
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        surname: this.state.surname,
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob,
        type: this.state.type,
        password: this.state.password,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
          if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.SwitchContent("", [0]);
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
          }
        })
        .catch(
          (err) => this.ErrorHandler(err, "Error")
          //console.log(err.response.data.message),
        );
    }
  };

  componentDidMount() {
    this.LoadData();
  }
  render() {
    return (
      <>
        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Edit user</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("skill_home", [0])}
                        className="btn btn-danger btn-sm shadow"
                      >
                        <ArrowLeft color="white" size={35} /> Return
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
              {this.state.fetching ? (
                <Spinner size={70} />
              ) : (
                <form onSubmit={this.handleSubmit} className="mt-4">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      required
                      value={this.state.first_name}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="first_name"
                      placeholder="First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Middle Name</label>
                    <input
                      required
                      value={this.state.middle_name}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="middle_name"
                      placeholder="Middle Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Surname</label>
                    <input
                      required
                      value={this.state.surname}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="surname"
                      placeholder="SureName"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      required
                      value={this.state.email}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      required
                      type="date"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="dob"
                      placeholder="SureName"
                    />
                  </div>

                  <div className="form-group">
                    <label>Select a gender</label>
                    <select
                      required
                      value={this.state.gender}
                      onChange={this.handleChange}
                      className="form-control st-logi"
                      style={{ width: "1050px" }}
                      name="gender"
                    >
                      <option value="">Select one</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="mt-5 mb-5"></div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label>Account Type</label>
                    <select
                      required
                      value={this.state.type}
                      onChange={this.handleChange}
                      className="form-control st-logi"
                      style={{ width: "1050px" }}
                      name="type"
                    >
                      <option value="">Select one</option>
                      <option value="0">Admin</option>
                      <option value="1">HR</option>
                      <option value="2">LM</option>
                      <option value="3">Marketing</option>
                      <option value="4">Under-Writing</option>
                    </select>
                  </div>

                  <div className="mt-5 mb-5"></div>

                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) : (
                      <button className="btn st-btn btn-primary shadow">
                        Submit Now
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
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

export default connect(mapStoreToProps)(EditU);
