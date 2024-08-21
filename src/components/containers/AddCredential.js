import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft, Trash } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import { Home } from "../../global/Home";
import Axios from "axios";
import Spinner from "../../global/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from "../../global/SearchUser";

class AddCredential extends Component {
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
      dataf:[],
      seleted:[],
      steps:""
    };
    this.fileInput = React.createRef();
  }

  onChange2 = (startDate) => {
    this.setState({ startDate });
  };
  onChange3 = (startDate2) => {
    this.setState({ startDate2 });
  };

  SelectRole(name){
    let values = this.state.seleted.concat(name);
    let uniqueItems = Array.from(new Set(values));
    this.setState({seleted:uniqueItems,markup:""});
 }

 Remove=(name)=>{
     if (this.state.seleted.includes(name)) {
         let values = this.state.seleted;
         let index = values.indexOf(name);
         this.state.seleted.splice(index, 1);
         this.setState({seleted:this.state.seleted});
     }
  }

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
        this.setState({ loading: true });
        Axios.post(`${Home}enter-ps/user/updateCompany`, {
            name:this.state.name,
            address:this.state.address,
            phone_number:this.state.phone_number,
            id:this.props.data.params.name?this.props.data.params.id:null

        }, {
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
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
          .catch((err) => {
            this.setState({ loading: false });
            if (err.response) {
                const { data } = err.response
                this.props.dispatch(launch_toaster(data.message));
                this.props.dispatch(toast_trigger(false));
            }else{
                this.props.dispatch(launch_toaster(err.message));
                this.props.dispatch(toast_trigger(false));
            }
          });
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
    if (this.props.data.params.name) {
      this.setState({
        name:this.props.data.params.name,
        address:this.props.data.params.address,
        phone_number:this.props.data.params.phone_number
      })
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
        <FadeIn duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">
                    Add Company
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
                  <div className="form-group mt-5">
                    <label>Name</label>
                    <input
                      value={this.state.name}
                      name="name"
                      required
                      placeholder="Name"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>


                

                <div className="col-md-12">
                  <div className="form-group ">
                    <label>Addess</label>
                    <input
                      value={this.state.address}
                      name="address"
                      placeholder="Address"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group ">
                    <label>Phone Number</label>
                    <input
                      value={this.state.phone_number}
                      name="phone_number"
                      placeholder="Phone Numer"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>




                <div className="col-md-12" style={{ marginTop: "3rem" }}>
                  <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) :
                    <button className="btn st-btn2 btn-primary shadow">
                        Save Now
                      </button>
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </FadeIn>
      </>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(AddCredential);
