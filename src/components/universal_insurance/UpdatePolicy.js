import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import { Home } from "../../global/Home";
import Axios from "axios";
import Spinner from "../../global/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from "../../global/SearchUser";

class UpdatePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: "",
      name: "",
      loading: false,
      data: [],
      department: "",
      level: "",
      details: [],
      lg: [],
      lgs: "",
      state: "",
      country: "",
      address: "",
      startDate: new Date(),
      startDate2: new Date(),
      show: "",
      note: "",
      number: "",
      data2: [],
      markup: "",
      premium: "",
      net_premium: "",
      commission: "",
      company: "",
      UserID: "",
      GSM_Number: "",
      Insured_Number: "",
      Chasis_Number: "",
      RegistrationNo: "",
      Vehicle_Make: "",
      Vehicle_Color: "",
      Vehicle_Model: "",
      Year_of_Make: "",
      Email: "",
      Policy_Number: "",
    };
    this.fileInput = React.createRef();
  }

  onChange2 = (startDate) => {
    this.setState({ startDate });
  };
  onChange3 = (startDate2) => {
    this.setState({ startDate2 });
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
      if (event.target.name === "state") {
        if (this.state.details[event.target.value].lgas) {
          this.setState({ lg: this.state.details[event.target.value].lgas });
        }
      }
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
      let fd = new FormData();
      fd.append("compnay", this.state.company);
      fd.append("product", this.state.product);
      fd.append("commission", this.state.commission);
      fd.append("premium", this.state.premium);
      fd.append("net_premium", this.state.net_premium);
      fd.append("markup", this.state.markup);
      fd.append("token", token);
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/CreateInProduct`, fd, {})
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
        .catch((err) => this.ErrorHandler(err, "Error"));
    }
  };

  LoadData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/listObjective`, {
        token: token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  LoadData2 = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/listSkills`, {
        token: token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data2: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadData();
    this.LoadData2();
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      Axios.post(`${Home}auth/settings/listItems`, {
        token: token,
      })
        .then((res) => {
          console.log(res);
          this.setState({ data: res.data });
        })
        .catch((err) => console.log(err));
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
  render() {
    // console.log(this.state)
    return (
      <>
        {this.state.name === "WHOCODED" ? (
          <SearchUser
            show={this.state.show}
            display={this.state.name === "WHOCODED" ? "block" : "none"}
            close={() => this.OpenModal("", 0)}
          />
        ) : (
          ""
        )}
        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <h6 class="lh-5 mg-b-0">Update Policy</h6>
                </div>
                <div className="col-md-9">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("create_policy", [0])}
                        className="btn btn-success shadow"
                      >
                        <PlusCircle color="white" size={35} /> Create Policy
                      </button>
                    </FadeIn>
                  </div>
                  <div className="pull-right pr-3">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("verify_policy", [0])}
                        className="btn btn-success shadow"
                      >
                        <PlusCircle color="white" size={35} /> Verify Policy
                      </button>
                    </FadeIn>
                  </div>
                  <div className="pull-right pr-3">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() =>
                          this.SwitchContent("verify_registration", [0])
                        }
                        className="btn btn-success shadow"
                      >
                        <PlusCircle color="white" size={35} /> Verify
                        Registration
                      </button>
                    </FadeIn>
                  </div>
                  <div className="pull-right pr-3">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() =>
                          this.SwitchContent("confirm_vehicle", [0])
                        }
                        className="btn btn-success shadow"
                      >
                        <PlusCircle color="white" size={35} /> Confirm Vehicle
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className="row">
                <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>User ID</label>
                    <input
                      type="text"
                      value={this.state.UserID}
                      name="UserId"
                      required
                      placeholder="Enter User ID"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>GSM Number</label>
                    <input
                      value={this.state.GSM_Number}
                      name="GSM_Number"
                      required
                      placeholder="+234 ***********"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Insured Name</label>
                    <input
                      value={this.state.Insured_Number}
                      name="Insured_Number"
                      required
                      placeholder="Enter Name"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Chasis Number</label>
                    <input
                      value={this.state.Chasis_Number}
                      name="Chasis_Number"
                      required
                      placeholder="*******23re"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Registration No</label>
                    <input
                      value={this.state.RegistrationNo}
                      name="RegistrationNo"
                      required
                      placeholder="*******y35"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Vehicle Make</label>
                    <input
                      value={this.state.Vehicle_Make}
                      name="Vehicle_Make"
                      required
                      placeholder="Volvo, Benz"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Vehicle Color</label>
                    <input
                      value={this.state.Vehicle_Color}
                      name="Vehicle_Color"
                      required
                      placeholder="White, Grey, Red, ....."
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Vehicle Model</label>
                    <input
                      value={this.state.Vehicle_Model}
                      name="Vehicle_Color"
                      required
                      placeholder="Corolla, Nissan, ...."
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Year of Make</label>
                    <input
                      value={this.state.Year_of_Make}
                      name="Year_of_Make"
                      required
                      placeholder="White, Grey, Red, ....."
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Email Addess</label>
                    <input
                      type="email"
                      value={this.state.Email}
                      name="Email"
                      required
                      placeholder="example@mail.com"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Policy Number</label>
                    <input
                      value={this.state.Policy_Number}
                      name="Policy_Number"
                      required
                      placeholder="Enter Policy Number"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) : (
                      <button className="btn st-btn btn-primary shadow">
                        Save Now
                      </button>
                    )}
                  </div>
                </div>
              </form>
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

export default connect(mapStoreToProps)(UpdatePolicy);
