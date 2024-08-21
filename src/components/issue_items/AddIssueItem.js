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

class AddIssueItem extends Component {
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
    if (this.props.data.params[0] === 0) {
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        let fd = new FormData();
        fd.append("company", this.state.company);
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
    } else {
      console.log("clicked");
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));

        const { commission, company, product, premium, net_premium, markup } =
          this.state;

        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/editInProduct`, {
          token,
          id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
          commission,
          company,
          product,
          premium,
          net_premium,
          markup,
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
          .catch((err) => this.ErrorHandler(err, "Error"));
      }
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

  LoadSingleData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ fetching: true });
      Axios.post(`${Home}auth/settings/singleInProduct`, {
        token: token,
        id: this.props.data.params.length > 0 ? this.props.data.params[0] : 0,
      })
        .then((res) => {
          console.log(res);
          const { commision, markup, net_premium, premium } = res.data;
          this.setState({
            loading: false,
            commission: commision,
            markup,
            net_premium,
            premium,
          });
          if (res.data.success) {
            this.setState({ name: res.data.name });
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
            this.SwitchContent("", [0]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadData();
    this.LoadData2();

    if (this.props.data.params[0] !== 0) {
      this.LoadSingleData();
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
                      ? "New product Insured"
                      : "Edit product Insured"}
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
                <div className="col-md-12 pr-10">
                  <div className="form-group">
                    <label>Select a product</label>
                    <select
                      required
                      value={this.state.product}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ width: "1050px" }}
                      name="product"
                    >
                      <option value="">Select a product</option>
                      {this.state.data2.length > 0
                        ? this.state.data2.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>

                <div className="col-md-12 mt-4">
                  <div className="form-group mt-4">
                    <label>Select a company</label>
                    <select
                      required
                      value={this.state.company}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ width: "1050px" }}
                      name="company"
                    >
                      <option value="">Select one</option>
                      {this.state.data.length > 0
                        ? this.state.data.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.companyName}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>Premium</label>
                    <input
                      value={this.state.premium}
                      name="premium"
                      required
                      placeholder="Premium"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mt-5">
                    <label>Commission</label>
                    <input
                      value={this.state.commission}
                      name="commission"
                      required
                      placeholder="Commission"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group ">
                    <label>Net Premium</label>
                    <input
                      value={this.state.net_premium}
                      name="net_premium"
                      required
                      placeholder="Net Premium"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div> */}

                {/* <div className="col-md-6">
                  <div className="form-group ">
                    <label>MarkUp</label>
                    <input
                      value={this.state.markup}
                      name="markup"
                      required
                      placeholder="MarkUp"
                      className="form-control st-login-f"
                      onChange={this.handleChange}
                    />
                  </div>
                </div> */}

                <div className="col-md-12" style={{ marginTop: "3rem" }}>
                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) : this.props.data.params[0] !== 0 ? (
                      <button className="btn st-btn btn-primary shadow">
                        Update Now
                      </button>
                    ) : (
                      <button className="btn st-btn btn-primary shadow">
                        Match Now
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

export default connect(mapStoreToProps)(AddIssueItem);
