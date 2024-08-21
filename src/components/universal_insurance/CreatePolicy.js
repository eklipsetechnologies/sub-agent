import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import { InsuranceUrl } from "../../global/Home";
import Axios from "axios";
import Spinner from "../../global/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from "../../global/SearchUser";
import { convertToBase64, setAuthBase64 } from "./SharedMethods";

class CreatePolicy extends Component {
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
      Policy_Type: "",
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
    this.setState({ [event.target.name]: event.target.value });
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      UserID,
      GSM_Number,
      Insured_Number,
      Chasis_Number,
      RegistrationNo,
      Vehicle_Make,
      Vehicle_Model,
      Vehicle_Color,
      Year_of_Make,
      Email,
      Policy_Type,
    } = this.state;

    const userId = UserID;
    const apikey = "34FRGBXDVHCJALKOIBU876Q6K9";

    let token = convertToBase64(userId, apikey);

    try {
      if (token) {
        setAuthBase64(token);
      }
      const res = await Axios.post(
        `${InsuranceUrl}/Generate_Policy.aspx?UserID=${UserID}&GSM_Number=${GSM_Number}&Insured_Name=${Insured_Number}&Chasis_Number=${Chasis_Number}&RegistrationNo=${RegistrationNo}&Vehicle_Make=${Vehicle_Make}&Vehicle_Color=${Vehicle_Color}&Vehicle_Model=${Vehicle_Model}&Year_of_Make=${Year_of_Make}&Email=${Email}&Policy_Type=${Policy_Type}`
      );

      console.log(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

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
                  <h6 class="lh-5 mg-b-0">Create Policy</h6>
                </div>
                <div className="col-md-9">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("update_policy", [0])}
                        className="btn btn-success shadow"
                      >
                        <PlusCircle color="white" size={35} /> Update Policy
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
                      value={this.state.UserID}
                      name="UserID"
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
                      name="Vehicle_Model"
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
                    <label>Policy Type</label>
                    <input
                      value={this.state.Policy_Type}
                      name="Policy_Type"
                      required
                      placeholder="Enter Policy Type"
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

export default connect(mapStoreToProps)(CreatePolicy);
