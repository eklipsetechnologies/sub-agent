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
import Autocomplete from "react-google-autocomplete";
import moment from "moment";

class AddJob extends Component {
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
    console.log("Starting...",moment(startDate).format("YYYY-MM-DD hh:mm:ss"))
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
        let fd = new FormData();
        fd.append("name", this.state.premium);
        fd.append("step", this.state.steps);
        fd.append("validation", this.state.company);
        fd.append("desc", this.state.desc);
        fd.append("options", this.state.seleted);
        fd.append("token", token);
        this.setState({ loading: true });
        Axios.post(`${Home}admin/saveJob`, {
            title:this.state.premium,
            amount:this.state.steps,
            category:this.state.company,
            desc:this.state.desc,
            start:moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
            end:moment(this.state.startDate2).format("YYYY-MM-DD HH:mm:ss"),
            people:this.state.number,
            location:this.state.location,
            lat:this.state.lat,
            long:this.state.long,
            address2:this.state.address2,

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

  LoadData = (filter) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}admin/getCategory`, {
        headers: { 
            'Authorization': `Bearer ${token}`
        } 
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data.payload          });
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
    // this.LoadData2();

    // if (this.props.data.params[0] !== 0) {
    //   this.LoadSingleData();
    // }
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
                    Add Job
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
                    <label>Job Title</label>
                    <input
                      value={this.state.premium}
                      name="premium"
                      required
                      placeholder="Name"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group pr-4">
                    <label>Category</label>
                    <select
                      required
                      value={this.state.company}
                      onChange={this.handleChange}
                      className="form-control st-login-f2"
                      style={{ width: "95%" }}
                      name="company"
                    >
                      <option value="">Select one</option>
                      {this.state.data.length > 0 ?
                      this.state.data.map(lis=>
                        <option key={lis._id} value={lis._id}>{lis.name}</option>
                        )
                    :''}
                      
                    </select>
                  </div>
                </div> 


                <div className="col-md-6">
                  <div className="form-group">
                    <label>Amount per hr</label>
                    <input
                      value={this.state.steps}
                      name="steps"
                      type="number"
                      placeholder="Steps"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

              

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Start Time ({moment(this.state.startDate).format("YYYY-MM-DD hh:mm:ss")})</label>
                        <DatePicker 
                                        // maxDate={new Date('2020-12-31')}
                                        // minDate={new Date()}
                                        timeFormat="HH:mm"
                                        // dateFormat="MMMM d, yyyy h:mm aa"
                                            required
                                            showTimeSelect
                                            showTimeInput
                                            timeIntervals={5}
                                            calendarClassName="rasta-stripes "
                                            className="red-border st-login-f22 form-control"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group ">
                    <label>End  Time ({moment(this.state.startDate2).format("YYYY-MM-DD hh:mm:ss")})</label>
                    <DatePicker 
                                        // maxDate={new Date('2020-12-31')}
                                        minDate={new Date(this.state.startDate)}
                                        timeFormat="HH:mm"
                                        // dateFormat="MMMM d, yyyy h:mm aa"
                                            required
                                            showTimeSelect
                                            showTimeInput
                                            timeIntervals={5}
                                            calendarClassName="rasta-stripes "
                                            className="red-border st-login-f22 form-control"
                                            selected={this.state.startDate2} 
                                            onChange={date => this.onChange3(date)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Job Location</label>
                    {/* <input
                      value={this.state.location}
                      name="location"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    /> */}
                    
                    <Autocomplete
                    apiKey={"AIzaSyCr3FYiPyCXjAHl218A2r7fVLAOr08E544"}
                    onPlaceSelected={(place) => {
                        // console.log(place)
                        this.setState({
                            location:place.formatted_address                            ,
                            lat:place.geometry.location.lat(),
                            long:place.geometry.location.lng()
                        })
                        // console.log(place.geometry.location.lat())
                    }}
                />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Actual Address</label>
                    <input
                      value={this.state.address2}
                      name="address2"
                    //   placeholder="Steps"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Number of people needed </label>
                    <input
                      value={this.state.number}
                      name="number"
                    //   placeholder="Steps"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>



                <div className="col-md-6">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={this.state.desc}
                      name="desc"
                    //   placeholder="Steps"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                </div>



                <div className="col-md-12" style={{ marginTop: "1rem" }}>
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

export default connect(mapStoreToProps)(AddJob);
