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

      partner: "",
      policy: "",
      insurer: "",
      email: "",
      phone: "",
      name: "",

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
      Axios.post(`${Home}auth/settings/SingleRetail`, {
        token: token,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
      })
        .then((res) => {
          console.log(res);
          this.setState({ fetching: false });
          if (res.data.success) {
            const { name, partner, phone, email, policy, insurer } = res.data;
            this.setState({ name, partner, phone, email, policy, insurer });
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
      Axios.post(`${Home}auth/settings/editRetail`, {
        token: token,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        partner: this.state.partner,
        policy: this.state.policy,
        insurer: this.state.insurer,
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
                <form onSubmit={this.handleSubmit} className="mt-4 row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Partner</label>
                      <input
                        required
                        value={this.state.partner}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="partner"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <h6 class="lh-5 mg-b-0">Contact Info</h6>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={this.state.name}
                        onChange={(e) => this.contactChange(e)}
                        className="form-control st-login-f"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        value={this.state.phone}
                        onChange={(e) => this.contactChange(e)}
                        className="form-control st-login-f"
                        name="phone"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="position-relative">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          required
                          value={this.state.email}
                          onChange={(e) => this.contactChange(e)}
                          className="form-control st-login-f"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Policy</label>
                      <input
                        required
                        value={this.state.policy}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="policy"
                        placeholder="Policy"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Insurer</label>
                      <input
                        required
                        value={this.state.insurer}
                        onChange={this.handleChange}
                        className="form-control st-login-f"
                        name="insurer"
                        placeholder="Insurer"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      {this.state.loading ? (
                        <Spinner size={40} />
                      ) : (
                        <button className="btn st-btn btn-primary shadow">
                          Submit Now
                        </button>
                      )}
                    </div>
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
