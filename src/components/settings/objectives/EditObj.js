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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: "",
      name: "",
      companyName: "",
      email: "",
      phone: "",
      department: "",
      accName: "",
      accNo: "",
      accBank: "",
      fetching: false,
      loading: false,
      startDate: new Date(),
    };
  }
  onChange2 = (startDate) => {
    this.setState({ startDate });
  };
  LoadData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ fetching: true });
      Axios.post(`${Home}auth/settings/singleObjective`, {
        token: token,
        id: this.props.data.params[0],
      })
        .then((res) => {
          console.log(res);
          this.setState({ fetching: false });
          if (res.data.success) {
            const {
              name,
              phone,
              email,
              department,
              accName,
              accNo,
              accBank,
              companyName,
            } = res.data;
            this.setState({
              name,
              phone,
              email,
              department,
              accName,
              accNo,
              accBank,
              companyName,
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
    const {
      name,
      email,
      phone,
      department,
      companyName,
      accName,
      accBank,
      accNo,
    } = this.state;
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/editObjective`, {
        token: token,
        name,
        email,
        phone,
        department,
        companyName,
        accName,
        accBank,
        accNo,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
        // date:`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`
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
    // console.log(this.props.data.params[0]);
  }
  render() {
    return (
      <>
        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Edit skill</h6>
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
                    <label>Company Name</label>
                    <input
                      required
                      value={this.state.companyName}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="companyName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      required
                      value={this.state.name}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      required
                      value={this.state.phone}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="phone"
                      placeholder="Name"
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
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Name</label>
                    <input
                      required
                      value={this.state.accName}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="accName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Account No</label>
                    <input
                      required
                      value={this.state.accNo}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="accNo"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Bank</label>
                    <input
                      required
                      value={this.state.accBank}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="accBank"
                      placeholder="Name"
                    />
                  </div>

                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) : (
                      <button className="btn btn-primary2 shadow">
                        Save Changes
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

export default connect(mapStoreToProps)(EditObj);
