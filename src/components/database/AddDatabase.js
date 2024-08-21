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
import CurrencyInput from "react-currency-input-field";

class AddDatabase extends Component {
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
      from: "",
      to: "",
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
      class_insured: "",
      policy_number: "",
      period_cover: "",
      expiry_date: "",
      dob: "",
      email: "",
      telephone: "",
      sum_insured: "",
      premium_rate: "",
      interest: "",
      markup: "",
      reg: "",
      commission: "",
      product: "",
      duration: "",
      premium_type: "",
      make: "",
      business_indicator: "",
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

  formatAmount = (amount) => {
    return parseFloat(+amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value }, function () {
        const markup =
          +this.state.sum_insured * (+this.state.premium_rate / 100);
        const commission = +this.state.markup * (+this.state.reg / 100);
        this.setState({ commission, markup: this.state.markup || markup });
      });
      if (event.target.name === "state") {
        if (this.state.details[event.target.value].lgas) {
          this.setState({ lg: this.state.details[event.target.value].lgas });
        }
      }
    }
  };

  handle_Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let token = "";

    const { from, to } = this.state;
    const period_cover = `${from} - ${to}`;

    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      let fd = new FormData();
      fd.append("name", this.state.name);
      fd.append("product", this.state.product);
      fd.append("token", token);
      fd.append("class_insured", this.state.class_insured);
      fd.append("policy_number", this.state.policy_number);
      fd.append("period_cover", period_cover);
      fd.append("duration", this.state.duration);
      fd.append("expiry_date", this.state.expiry_date);
      fd.append("dob", this.state.dob);
      fd.append("email", this.state.email);
      fd.append("telephone", this.state.telephone);
      fd.append("sum_insured", this.state.sum_insured);
      fd.append("premium_rate", this.state.premium_rate);
      fd.append("interest", this.state.interest);
      fd.append("markup", this.state.markup);
      fd.append("reg", this.state.reg);
      fd.append("commission", this.state.commission);
      fd.append("premium_type", this.state.premium_type);
      fd.append("make", this.state.make);
      fd.append("business_indicator", this.state.business_indicator);
      this.setState({ loading: true });
      if (this.props.data.params[0] === 0) {
        Axios.post(`${Home}auth/settings/CreateDatabase`, fd)
          .then((res) => {
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.SwitchContent("", [0]);
              this.setState({ loading: false });
            } else {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(false));
            }
          })
          .catch((err) => this.ErrorHandler(err, "Error"));
      } else {
        const {
          name,
          class_insured,
          policy_number,
          period_cover,
          duration,
          expiry_date,
          dob,
          email,
          telephone,
          sum_insured,
          premium_rate,
          interest,
          markup,
          reg,
          commission,
          product,
          premium_type,
          make,
          business_indicator,
        } = this.state;
        Axios.post(`${Home}auth/settings/editDatabase`, {
          token,
          name,
          product,
          class_insured,
          policy_number,
          period_cover,
          duration,
          expiry_date,
          dob,
          email,
          telephone,
          sum_insured,
          premium_rate,
          interest,
          markup,
          reg,
          commission,
          premium_type,
          make,
          business_indicator,
          id: this.props.data.params[0],
        })
          .then((res) => {
            console.log(res);
            this.setState({ loading: false });
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.SwitchContent(" ", [0]);
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
    }
  };

  LoadData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ fetching: true });
      Axios.post(`${Home}auth/settings/singleDatabase`, {
        token: token,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
      })
        .then((res) => {
          this.setState({
            fetching: false,
          });
          if (res.data.success) {
            const {
              name,
              class_insured,
              policy_number,
              period_cover,
              expiry_date,
              dob,
              email,
              telephone,
              sum_insured,
              premium_rate,
              interest,
              markup,
              reg,
              commission,
              product,
              premium_type,
              make,
              business_indicator,
            } = res.data;
            console.log(res.data);
            this.setState({
              name,
              class_insured,
              policy_number,
              period_cover,
              expiry_date,
              dob,
              email,
              telephone,
              sum_insured,
              premium_rate,
              interest,
              markup,
              reg,
              commission,
              product,
              premium_type,
              make,
              business_indicator,
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

  LoadData2 = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.post(`${Home}auth/settings/listSkills`, {
        token: token,
      })
        .then((res) => {
          this.setState({ loading: false, data2: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    if (this.props.data.params[0] !== 0) {
      this.LoadData();
    }
    this.LoadData2();
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}auth/settings/listInProduct`, {
        params: { token: token },
      })
        .then((res) => {
          this.setState({ loading: false, data: res.data });
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
    // const commission = +this.state.markup * (+this.state.reg / 100);
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
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">
                    {this.props.data.params[0] === 0
                      ? "New Insured"
                      : "Edit Insured"}
                  </h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("dep_home", [0])}
                        className="btn btn-danger shadow"
                      >
                        <ArrowLeft color="white" size={35} /> Return
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className="mt-4 row">
                <div className="col-md-12">
                  <div className="form-group mt-4">
                    <label>
                      Product <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      value={this.state.product}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ maxWidth: "1050px" }}
                      name="product"
                    >
                      <option value="">Select a product</option>
                      {this.state.data.length > 0
                        ? this.state.data.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.product} ({dep.company})
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>Insured</label>
                    <input
                      value={this.state.name}
                      name="name"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>Class of Insured</label>
                    <input
                      value={this.state.class_insured}
                      name="class_insured"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Policy Number</label>
                    <input
                      value={this.state.policy_number}
                      name="policy_number"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row col-md-6">
                  <div className="form-group col">
                    <label>From</label>
                    <input
                      value={this.state.from}
                      type="date"
                      name="from"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-group col">
                    <label>To</label>
                    <input
                      value={this.state.to}
                      type="date"
                      name="to"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Duration</label>
                    <select
                      value={this.state.duration}
                      name="duration"
                      className="form-control mr-5"
                      style={{
                        width: "95%",

                        border: "1px solid #63c04c",
                      }}
                      onChange={this.handleChange}
                    >
                      <option value="">Select a duration</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Bi-annually">Bi-annually</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      value={this.state.expiry_date}
                      name="expiry_date"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>DOB</label>
                    <input
                      type="date"
                      value={this.state.dob}
                      name="dob"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Email address</label>
                    <input
                      value={this.state.email}
                      name="email"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Telephone Number</label>
                    <input
                      value={this.state.telephone}
                      name="telephone"
                      placeholder=""
                      maxLength="11"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sum Insured</label>
                    <input
                      value={this.state.sum_insured}
                      name="sum_insured"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Premium Rate(%)</label>
                    <input
                      value={this.state.premium_rate}
                      name="premium_rate"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Premium Type </label>
                    <select
                      value={this.state.premium_type}
                      name="premium_type"
                      style={{
                        width: "95%",
                        border: "1px solid #63c04c",
                      }}
                      className="form-control mr-5"
                      onChange={this.handleChange}
                    >
                      <option value="">Choose Premium Type</option>
                      <option value="PRORATED">Prorated</option>
                      <option value="NON-PRORATED">Non Prorated</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Make</label>
                    <input
                      value={this.state.make}
                      name="make"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Interest</label>
                    <input
                      value={this.state.interest}
                      name="interest"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Business Indicator</label>
                    <select
                      value={this.state.business_indicator}
                      name="business_indicator"
                      style={{
                        width: "95%",
                        border: "1px solid #63c04c",
                      }}
                      className="form-control mr-5"
                      onChange={this.handleChange}
                    >
                      <option value="">Choose Premium Type</option>
                      <option value="New">New</option>
                      <option value="Renewal">Renewal</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Premium(₦)</label>
                    <CurrencyInput
                      id="input-example"
                      name="markup"
                      prefix="₦"
                      placeholder="Enter Premium"
                      value={this.state.markup}
                      // defaultValue={}
                      decimalsLimit={2}
                      className="form-control st-login-f"
                      onValueChange={(value, name) =>
                        this.setState({ markup: value })
                      }
                    />
                    {/* <input
                    type="number"
                      value={this.state.markup}
                      name="markup"
                      min="0.01" step="0.01" max="2500"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handle_Change}
                    /> */}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Commission Rate(%)</label>
                    <input
                      value={this.state.reg}
                      name="reg"
                      placeholder=""
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Commission(₦)</label>
                    <CurrencyInput
                      id="input-example"
                      name="commission"
                      prefix="₦"
                      placeholder="Enter Commission"
                      value={this.state.commission}
                      // defaultValue={}
                      decimalsLimit={2}
                      className="form-control st-login-f"
                      onValueChange={(value, name) =>
                        this.setState({ commission: value })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) : (
                      <button className="btn st-btn btn-primary shadow">
                        Submit
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

export default connect(mapStoreToProps)(AddDatabase);
