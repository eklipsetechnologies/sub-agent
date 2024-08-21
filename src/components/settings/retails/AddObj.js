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
      partner: "",
      policy: "",
      insurer: "",
      email: "",
      phone: "",
      name: "",
      contactInfo: [{ name: "", phone: "", email: "" }],
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

    const name = this.state.contactInfo
      .map((x) => x["name"])
      .toString()
      .replace(/,+/g, ",");
    const phone = this.state.contactInfo
      .map((x) => x["phone"])
      .toString()
      .replace(/,+/g, ",");
    const email = this.state.contactInfo
      .map((x) => x["email"])
      .toString()
      .replace(/,+/g, ",");
    // const department = this.state.contactInfo
    //   .map((x) => x["department"])
    //   .toString()
    //   .replace(/,+/g, ",");
    // const accNumber = this.state.accountDetails
    //   .map((x) => x["accNumber"])
    //   .toString()
    //   .replace(/,+/g, ",");
    // const bank = this.state.accountDetails
    //   .map((x) => x["bank"])
    //   .toString()
    //   .replace(/,+/g, ",");

    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/CreateRetails`, {
        token: token,
        partner: this.state.partner,
        name,
        policy: this.state.policy,
        insurer: this.state.insurer,
        email,
        phone,
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
        { name: "", phone: "", email: "" },
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
                  <h6 class="lh-5 mg-b-0">Add new</h6>
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

                {this.state.contactInfo.map((x, idx) => (
                  <Fragment key={idx}>
                    <div className="col-md-12">
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
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="position-relative">
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
                        {this.state.contactInfo.length !== 1 && (
                          <span
                            onClick={() => this.removeContactInfo(idx)}
                            className="btn remove-contact"
                            style={{ paddingLeft: 0 }}
                          >
                            <MinusCircle color="red" size={25} />
                          </span>
                        )}
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
                </span>

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
