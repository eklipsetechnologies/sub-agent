import React, { Component, Fragment } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../../store/actions/SwitchContent";
import { props_params } from "../../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft, MinusCircle } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../../store/actions/IsToast";
import { toast_trigger } from "../../../store/actions/ToastTrigger";
import { Home } from "../../../global/Home";
import Axios from "axios";
import Spinner from "../../../global/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: "",
      companyName: "",
      password: "",
      loading: false,
      startDate: new Date(),
      startDate2: new Date(),
      department: "",
      accName: "",
      accNumber: "",
      bank: "",
      email: "",
      phone: "",
      name: "",
      contactInfo: [{ name: "", phone: "", email: "", department: "" }],
      accountDetails: [{ accNumber: "", bank: "" }],
    };
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
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // const name = this.state.contactInfo
    //   .map((x) => x["name"])
    //   .toString()
    //   .replace(/,+/g, ",");
    // const phone = this.state.contactInfo
    //   .map((x) => x["phone"])
    //   .toString()
    //   .replace(/,+/g, ",");
    // const email = this.state.contactInfo
    //   .map((x) => x["email"])
    //   .toString()
    //   .replace(/,+/g, ",");
    // const department = this.state.contactInfo
    //   .map((x) => x["department"])
    //   .toString()
    //   .replace(/,+/g, ",");
    const accNumber = this.state.accountDetails
      .map((x) => x["accNumber"])
      .toString()
      .replace(/,+/g, ",");
    const bank = this.state.accountDetails
      .map((x) => x["bank"])
      .toString()
      .replace(/,+/g, ",");

    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/CreateObjective`, {
        token: token,
        companyName: this.state.companyName,
        name: this.state.name,
        department: this.state.department,
        accName: this.state.accName,
        accNumber,
        bank,
        email: this.state.email,
        phone: this.state.phone,
        date: `${this.state.startDate.getFullYear()}-${
          this.state.startDate.getMonth() + 1 < 10
            ? `0${this.state.startDate.getMonth() + 1}`
            : this.state.startDate.getMonth() + 1
        }-${
          this.state.startDate.getDate() < 10
            ? "0" + this.state.startDate.getDate()
            : this.state.startDate.getDate()
        }`,
        date2: `${this.state.startDate2.getFullYear()}-${
          this.state.startDate2.getMonth() + 1 < 10
            ? `0${this.state.startDate2.getMonth() + 1}`
            : this.state.startDate2.getMonth() + 1
        }-${
          this.state.startDate2.getDate() < 10
            ? "0" + this.state.startDate2.getDate()
            : this.state.startDate2.getDate()
        }`,
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

  addContactInfo = () => {
    // this.setState({ contactInfo: [...this.state.contactInfo, ""] });
    this.setState({
      contactInfo: [
        ...this.state.contactInfo,
        { name: "", phone: "", email: "", department: "" },
      ],
    });
  };

  removeContactInfo = (idx) => {
    if (this.state.contactInfo.length !== 1) {
      this.state.contactInfo.splice(idx, 1);

      console.log(this.state.contactInfo);

      this.setState({ contactInfo: this.state.contactInfo });
    }
  };

  contactChange = (e, idx) => {
    const values = [...this.state.contactInfo];
    values[idx][e.target.name] = e.target.value;

    this.setState({ contactInfo: values });
  };

  addAccFields = () => {
    this.setState({
      accountDetails: [
        ...this.state.accountDetails,
        { accNumber: "", bank: "" },
      ],
    });
  };

  removeAccFields = (idx) => {
    if (this.state.accountDetails.length !== 1) {
      this.state.accountDetails.splice(idx, 1);

      console.log(this.state.accountDetails);

      this.setState({ accountDetails: this.state.accountDetails });
    }
  };

  accChange = (e, idx) => {
    const values = [...this.state.accountDetails];
    values[idx][e.target.name] = e.target.value;

    this.setState({ accountDetails: values });
  };

  // bankChange = (e, idx) => {
  //   const values = [...this.state.banks];
  //   values[idx] = e.target.value;

  //   this.setState({ banks: values});
  // };

  render() {
    return (
      <>
        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">Add new objective</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("skill_home", [0])}
                        className="btn  btn-danger shadow"
                      >
                        <ArrowLeft color="white" size={35} /> Return
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className="mt-4 row">
                <div className="col-md-12">
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
                </div>
                <div className="col-md-12 mb-3">
                  <h6 class="lh-5 mg-b-0">Contact Info</h6>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      value={this.state.name}
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="phone"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={this.state.email}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="email"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      value={this.state.department}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="department"
                      placeholder="Department"
                    />
                  </div>
                </div>

                {/* {this.state.contactInfo.map((x, idx) => (
                  <Fragment key={idx}>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          required
                          value={x.name}
                          onChange={(e) => this.contactChange(e, idx)}
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
                          value={x.phone}
                          onChange={(e) => this.contactChange(e, idx)}
                          className="form-control st-login-f"
                          name="phone"
                          placeholder="Phone number"
                        />
                        <span className="text-red">
                          Each phone number should be separated by a comma (,)
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          required
                          value={x.email}
                          onChange={(e) => this.contactChange(e, idx)}
                          className="form-control st-login-f"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="position-relative">
                        <div className="form-group">
                          <label>Department</label>
                          <input
                            required
                            value={x.department}
                            onChange={(e) => this.contactChange(e, idx)}
                            className="form-control st-login-f"
                            name="department"
                            placeholder="Department"
                          />
                        </div>

                        <span
                          onClick={() => this.removeContactInfo(idx)}
                          className="btn remove-contact"
                          style={{ paddingLeft: 0 }}
                        >
                          <MinusCircle color="red" size={25} />
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <span
                  onClick={(e) => this.addContactInfo(e)}
                  className="btn"
                  style={{ paddingLeft: 15 }}
                >
                  <PlusCircle color="green" size={30} /> Add Contact Info
                </span> */}

                <div className="col-md-12">
                  <div className="form-group">
                    <label>Account Name</label>
                    <input
                      value={this.state.accName}
                      onChange={this.handleChange}
                      className="form-control st-login-f"
                      name="accName"
                      placeholder="Account Name"
                    />
                  </div>
                </div>

                {this.state.accountDetails.map((x, idx) => (
                  <Fragment key={idx}>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Account Number</label>
                        <input
                          value={x.accNumber}
                          onChange={(e) => this.accChange(e, idx)}
                          className="form-control st-login-f"
                          placeholder="Account Number"
                          name="accNumber"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="position-relative">
                        <div className="form-group">
                          <label>Bank Name</label>
                          <input
                            value={x.bank}
                            onChange={(e) => this.accChange(e, idx)}
                            className="form-control st-login-f"
                            name="bank"
                            placeholder="Bank Name"
                          />
                        </div>
                        <span
                          onClick={() => this.removeAccFields(idx)}
                          className="btn remove-contact "
                          style={{ paddingLeft: 0 }}
                        >
                          <MinusCircle color="red" size={25} />
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}

                <span
                  onClick={(e) => this.addAccFields(e)}
                  className="btn"
                  style={{ paddingLeft: 15 }}
                >
                  <PlusCircle color="green" size={25} /> Add More
                </span>

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

export default connect(mapStoreToProps)(AddObj);
