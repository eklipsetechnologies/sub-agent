import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../../store/actions/SwitchContent";
import { props_params } from "../../../store/actions/PropsParams";
import { PlusCircle, Edit, Trash2, AlertCircle, Eye } from "react-feather";
import Axios from "axios";
import { Home } from "../../../global/Home";
import Spinner from "../../../global/Spinner";
import { launch_toaster } from "../../../store/actions/IsToast";
import { toast_trigger } from "../../../store/actions/ToastTrigger";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { open_right } from "../../../store/actions/OpenRight";

class ListObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      data: [],
      startDate: new Date(),
      startDate2: new Date(),
      name: "",
      show: "",
      id: "",
      switch: "",
      filter: "all",
      show2: "",
      name2: "",
      answer2: "",
      answer3: "",
      answer4: "",
      none: "",
      questions: [],
      option: "",
      option2: "",
      option3: "",
      option4: "",
      options: [],
      job: "",
      fetching: false,
      modal: "",
      answer: "",
      answers: [],
    };
  }

  Delete(key) {
    if (window.confirm("❌ are you sure you want to delete?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/deleteObjective`, {
          token: token,
          id: key,
        })
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.LoadData();
            } else {
              this.setState({ loading: false });
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(false));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }

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
          this.props.dispatch(open_right("Close"));
        })
        .catch((err) => console.log(err));
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === "type") {
        this.setState({ switch: event.target.value });
      }
    }
  };
  OpenModal2 = (name, id) => {
    if (name.length < 2) {
      this.setState({ show2: "" });
      this.interval = setTimeout(() => this.setState({ name2: name }), 600);
    } else {
      this.setState({ name2: name });
      this.interval = setTimeout(() => this.setState({ show2: "show" }), 100);
    }
    this.setState({ id: id });
    if (name === "WHOCODED2" && this.state.data[id]) {
      this.setState({ options: this.state.data[id].options });
    }
  };

  Add = (event) => {
    event.preventDefault();
    if (3 > 2) {
      let option = {};
      option = {
        option1: this.state.option,
        option2: this.state.option2,
        option3: this.state.option3,
        option4: this.state.option4,
      };
      this.setState({
        // questions:this.state.questions.concat(this.state.name),
        options: this.state.options.concat(option),
        // answers:this.state.answers.concat(this.state.answer)
      });
      this.setState({
        name: "",
        option: "",
        option2: "",
        option3: "",
        option4: "",
      });
    }
  };

  Remove = (index) => {
    // this.state.questions.splice(index,1);
    this.state.options.splice(index, 1);
    this.setState({
      // questions:this.state.questions,
      options: this.state.options,
    });
  };

  handleSubmit = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ fetching: true });
      Axios.post(`${Home}auth/settings/AddContact`, {
        token: token,
        options: this.state.options,
        id: this.state.data[this.state.id].id,
      })
        .then((res) => {
          console.log(res);
          this.setState({ fetching: false });
          if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.SwitchContent("", [0]);
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
          }
        })
        .catch((err) =>
          // this.ErrorHandler(err,'Error')
          console.log(err)
        );
    }
  };

  componentDidMount() {
    this.LoadData();
  }
  componentWillUnmount() {
    this.props.dispatch(open_right("Open"));
  }
  render() {
    // console.log(this.props)
    return (
      <>
        {this.state.name2 === "WHOCODED" ? (
          <div
            className={`modal effect-super-scaled ${this.state.show2} `}
            id="exampleModalCenter"
            role="dialog"
            style={{
              display: "block",
              background: this.state.show2 === "" ? "none" : "#050404d4",
              overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Approve Objective</h5>
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.laoding ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className=" table-responsive">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Mid Year Accesibility? </label>
                              <select
                                required
                                value={this.state.answer}
                                onChange={this.handleChange}
                                className="form-control st-login-f"
                                name="answer"
                              >
                                <option value="">Select</option>
                                <option value="1">YES</option>
                                <option value="2">NO</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>End Of Year Accesibility? </label>
                              <select
                                required
                                value={this.state.answer3}
                                onChange={this.handleChange}
                                className="form-control st-login-f"
                                name="answer3"
                              >
                                <option value="">Select</option>
                                <option value="1">YES</option>
                                <option value="0">NO</option>
                              </select>
                            </div>
                            {this.state.answer === "1" ||
                            this.state.answer3 === "1" ? (
                              <>
                                {this.state.answer3 === "1" ? (
                                  <div className="form-group">
                                    <label>
                                      Enable End Of Year Self Grading{" "}
                                    </label>
                                    <select
                                      required
                                      value={this.state.answer4}
                                      onChange={this.handleChange}
                                      className="form-control st-login-f"
                                      name="answer4"
                                    >
                                      <option value="">Select</option>
                                      <option value="1">YES</option>
                                      <option value="0">NO</option>
                                    </select>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="form-group">
                                  <label>Who can comment? </label>
                                  <select
                                    required
                                    value={this.state.answer2}
                                    onChange={this.handleChange}
                                    className="form-control st-login-f"
                                    name="answer2"
                                  >
                                    <option value="">Select</option>
                                    <option value="1">Line Manager Only</option>
                                    <option value="2">Employee Only</option>
                                    <option value="3">
                                      Line Manager and Employee{" "}
                                    </option>
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Objective Description? </label>
                                  <textarea
                                    rows={8}
                                    required
                                    value={this.state.note}
                                    placeholder="Description"
                                    onChange={this.handleChange}
                                    className="form-control st-login-f"
                                    name="note"
                                  />
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Save Changes
                  </button>
                  {/* <button onClick={()=>this.Decline(this.state.id)} type="button" className="btn btn-danger" data-dismiss="modal">Decline Request</button> */}
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.name2 === "WHOCODED2" ? (
          <div
            className={`modal effect-super-scaled ${this.state.show2} `}
            id="exampleModalCenter"
            role="dialog"
            style={{
              display: "block",
              background: this.state.show2 === "" ? "none" : "#050404d4",
              overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.Add}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Contact Details</h5>
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.laoding ? (
                    <Spinner />
                  ) : (
                    <>
                      {(this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 1) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 0) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 5) ? (
                        <div className="">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Name</label>
                                <input
                                  required
                                  value={this.state.option4}
                                  onChange={this.handleChange}
                                  className="form-control st-login-f"
                                  name="option4"
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Department</label>
                                <input
                                  required
                                  value={this.state.option}
                                  onChange={this.handleChange}
                                  className="form-control st-login-f"
                                  name="option"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  required
                                  value={this.state.option2}
                                  onChange={this.handleChange}
                                  className="form-control st-login-f"
                                  name="option2"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                  required
                                  value={this.state.option3}
                                  onChange={this.handleChange}
                                  className="form-control st-login-f"
                                  name="option3"
                                />
                                <p
                                  style={{ fontSize: "12px" }}
                                  className="text-red"
                                >
                                  Each phone number should be separated by a
                                  comma(,)
                                </p>
                              </div>
                              <button
                                type="submit"
                                onClick={() => this.Add}
                                className="btn pull-right btn-warning mt-0 mb-2 shadow"
                              >
                                Add Contact
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="p-3">
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th style={{ width: "8%" }}></th>
                              </tr>
                            </thead>
                            {this.state.options.length > 0 ? (
                              <tbody>
                                {this.state.options.map((qu, i) => (
                                  <tr key={i}>
                                    <td>{this.state.options[i].option4}</td>
                                    <td>{this.state.options[i].option1}</td>
                                    <td>{this.state.options[i].option2}</td>
                                    <td>{this.state.options[i].option3}</td>
                                    {/* <td>
                                        <span className="badge badge-primary m-1">{this.state.options[i].option1}</span>
                                        <span className="badge badge-primary m-1">{this.state.options[i].option2}</span>
                                        <span className="badge badge-primary m-1">{this.state.options[i].option3}</span>
                                        <span className="badge badge-primary m-1">{this.state.options[i].option4}</span>
                                        </td> */}
                                    <td>
                                      <button
                                        type="button"
                                        onClick={() => this.Remove(i)}
                                        className="btn btn-danger shadow"
                                      >
                                        <Trash2 color="white" size={33} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            ) : (
                              <tbody>
                                <tr>
                                  <td colSpan={5}>
                                    <span className="alert alert-warning text-center d-block">
                                      No question yet
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
                  <button
                    type="button"
                    onClick={() => this.handleSubmit()}
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Save Changes
                  </button>
                  {/* <button onClick={()=>this.Decline(this.state.id)} type="button" className="btn btn-danger" data-dismiss="modal">Decline Request</button> */}
                  <button
                    onClick={() => this.OpenModal2("", 0)}
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        <BounceRight duration="1s" timingFunction="ease-out">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h6 class="lh-5 mg-b-0">List of Insurer Database</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.SwitchContent("skill_add", [0])}
                        className="btn btn-primary shadow"
                      >
                        <PlusCircle color="white" size={35} /> Add New
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
            {this.state.loading ? (
              <div className="p-5">
                <Spinner size={70} />
              </div>
            ) : this.state.data.length < 1 ? (
              <div className="p-5">
                <div className="alert alert-warning text-center">
                  No data yet
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="table-responsive">
                  <table
                    className="table mb-0 table-striped table-hover table-bordered"
                    id="stephen"
                  >
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Department</th>
                        <th>Account Name</th>
                        <th>Account Number</th>
                        <th>Account Bank</th>
                        <th style={{ width: "30px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          <td>{dep.companyName}</td>
                          <td>{dep.name}</td>
                          <td>{dep.phone}</td>
                          <td>{dep.email}</td>
                          <td>{dep.department}</td>
                          <td>{dep.accName}</td>
                          <td>{dep.accNo}</td>
                          <td>{dep.accBank}</td>
                          <td>
                            <div>
                              <FadeIn duration="1s" timingFunction="ease-out">
                                <div className=" d-flex">
                                  {/* <button
                                    data-rh="View company details"
                                    onClick={() =>
                                      this.SwitchContent("skill_view", dep)
                                    }
                                    className="btn btn-primary btn-sm m-1 shadow"
                                  >
                                    <Eye color="white" size={35} />{" "}
                                  </button> */}
                                  <button
                                    onClick={() =>
                                      this.SwitchContent("skill_edit", [dep.id])
                                    }
                                    className="btn btn-primary m-1 shadow"
                                  >
                                    <Edit color="white" size={35} />{" "}
                                  </button>
                                  {this.props.data.userDetails.hr ? (
                                    <button
                                      data-rh="Determin when Employee or Line Managers can see and comment from performance"
                                      onClick={() =>
                                        this.OpenModal2("WHOCODED", dep.id)
                                      }
                                      className="btn btn-success m-1 shadow"
                                    >
                                      <AlertCircle color="white" size={35} />{" "}
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                  <button
                                    onClick={() => this.Delete(dep.id)}
                                    className="btn btn-danger m-1 shadow"
                                  >
                                    <Trash2 color="white" size={35} />{" "}
                                  </button>
                                  <button
                                    data-rh="Add contact"
                                    onClick={() =>
                                      this.OpenModal2("WHOCODED2", i)
                                    }
                                    className="btn btn-warning m-1 shadow"
                                  >
                                    <PlusCircle color="white" size={35} />{" "}
                                  </button>
                                </div>
                              </FadeIn>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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

export default connect(mapStoreToProps)(ListObj);
