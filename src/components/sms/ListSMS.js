import React, { Component } from "react";
import { BounceRight, FadeIn, BounceUp, BounceLeft } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import {
  PlusCircle,
  Edit,
  Trash2,
  List,
  ArrowLeft,
  Eye,
  Mail,
  Command,
  CheckCircle,
  MessageCircle,
  PenTool,
  Edit2,
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import { open_right } from "../../store/actions/OpenRight";
import { Multiselect } from "multiselect-react-dropdown";

class ListSMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      loading: false,
      data: [],
      name: "",
      show: "",
      id: "",
      switch: "",
      filter: "all",
      name: "",
      id: 0,
      draft: "",
      message: "",
      type: "",
      options: [],
      selectedValues: [],
      options2: [],
      selectedValues2: [],
      options3: [],
      selectedValues3: [],
      seleted: [],
    };
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValues: selectedList });
  };

  onRemove = (selectedList, removedItem) => {
    this.setState({ selectedValues: selectedList });
  };

  onSelect2 = (selectedList, selectedItem) => {
    this.setState({ selectedValues2: selectedList });
  };

  onRemove2 = (selectedList, removedItem) => {
    this.setState({ selectedValues2: selectedList });
  };
  onSelect3 = (selectedList, selectedItem) => {
    this.setState({ selectedValues3: selectedList });
  };

  onRemove3 = (selectedList, removedItem) => {
    this.setState({ selectedValues3: selectedList });
  };

  Filter = (filter) => {
    this.LoadData(filter);
    this.setState({ filter: filter });
  };

  handleChange = (event) => {
    if (event.target.type !== "files") {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === "type") {
        this.setState({ switch: event.target.value });
      }
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

  Returned(key) {
    if (window.confirm("Are you sure you want to mark this returned?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/settings/returnIssueItems`, {
          token: token,
          id: key,
        })
          .then((res) => {
            // console.log(res);
            if (res.data.success) {
              this.props.dispatch(launch_toaster(res.data.message));
              this.props.dispatch(toast_trigger(true));
              this.LoadData(this.state.filter);
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

  SaveNow(event) {
    event.preventDefault();
    // this.SaveNow1()
  }

  SaveNow1 = () => {
    if (window.confirm("Are you sure?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(
          `${Home}auth/settings/sms`,
          {
            draft: this.state.draft,
            id: this.state.data[this.state.id].id,
            token: token,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
          .then((res) => {
            console.log(res);
            this.props.dispatch(launch_toaster("Done"));
            this.props.dispatch(toast_trigger(true));
            this.LoadData(this.state.bool);
            this.setState({ loading: false });
          })
          .catch((err) => {
            this.props.dispatch(launch_toaster("Error..."));
            this.props.dispatch(toast_trigger(false));
            console.log(err);
          });
      }
    }
  };

  SaveNow2 = () => {
    if (window.confirm("Are you sure?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(
          `${Home}auth/settings/directSMS`,
          {
            message: this.state.message,
            select: this.state.selectedValues,
            type: this.state.message.includes("(#client_name#)")
              ? "referral"
              : "claim",
            token: token,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
          .then((res) => {
            console.log(res);
            this.props.dispatch(launch_toaster("Done"));
            this.props.dispatch(toast_trigger(true));
            this.LoadData(this.state.bool);
            this.OpenModal2("", 0);
            this.setState({ loading: false });
          })
          .catch((err) => {
            this.props.dispatch(launch_toaster("Error..."));
            this.props.dispatch(toast_trigger(false));
            console.log(err);
          });
      }
    }
  };

  LoadData = (filter) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}auth/settings/sms`, {
        params: { token: token },
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, data: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };

  OpenModal2 = (modal, id) => {
    if (this.state.data[id]) {
      this.setState({
        draft: this.state.data[id].draft,
        type: this.state.data[id].type,
      });
    }
    if (modal.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ modal: modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id: id });
  };

  LoadData2 = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}auth/settings/listDatabase`, {
        params: { token: token },
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false, options: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadData(this.state.filter);
    this.LoadData2();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.quick_params !== this.props.data.quick_params) {
      this.LoadData(this.state.filter);
    }
    if (nextProps.data.switch !== this.props.data.switch) {
      this.LoadData(this.state.filter);
    }
  }
  componentWillUnmount() {
    this.props.dispatch(open_right("Open"));
  }
  render() {
    // console.log(this.state);
    return (
      <>
        {this.state.modal === "WHOCODED" ? (
          <div
            className={`modal effect-super-scaled ${this.state.show} `}
            id="exampleModalCenter"
            role="dialog"
            style={{
              display: "block",
              background: this.state.show === "" ? "none" : "#050404d4",
              overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.SaveNow}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Edit SMS Draft</h5>
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
                      <div className="p-3">
                        <div className=" table-responsive">
                          <div className="form-group">
                            <label>Type</label>
                            <input
                              type="text"
                              value={this.state.type}
                              // onChange={this.handleChange}
                              className="form-control"
                              name="type"
                              readOnly={true}
                              placeholder="Name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>SMS Draft</label>
                            <textarea
                              type="text"
                              rows={10}
                              value={this.state.draft}
                              onChange={this.handleChange}
                              className="form-control"
                              name="draft"
                              placeholder="Name"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
                  <button
                    onClick={() => this.SaveNow1()}
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Save Now
                  </button>
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

        {this.state.modal === "WHOCODED2" ? (
          <div
            className={`modal effect-super-scaled ${this.state.show} `}
            id="exampleModalCenter"
            role="dialog"
            style={{
              display: "block",
              background: this.state.show === "" ? "none" : "#050404d4",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.SaveNow}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Send Direct SMS</h5>
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
                      <div className="p-3">
                        <div className="form-group">
                          <label>Choose Template</label>
                          <select
                            onChange={(e) =>
                              this.setState({ message: e.target.value })
                            }
                            className="form-control"
                            style={{ maxWidth: "740px" }}
                          >
                            <option value=""></option>
                            {this.state.data
                              .filter(
                                (d) =>
                                  d.type === "claim" || d.type === "referral"
                              )
                              .map((data) => (
                                <option key={data} value={data.draft}>
                                  {data.type}
                                </option>
                              ))}
                            {/* <option value="Referral">Referral</option> */}
                          </select>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="form-group">
                          <label>Insured</label>
                          <Multiselect
                            placeholder="Add class subjects"
                            closeOnSelect={false}
                            avoidHighlightFirstOption={true}
                            options={this.state.options} // Options to display in the dropdown
                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>

                        <div className="form-group pt-10">
                          <label>SMS Draft</label>
                          <textarea
                            type="text"
                            rows={10}
                            value={this.state.message}
                            onChange={this.handleChange}
                            className="form-control"
                            name="message"
                            placeholder="Type message"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {/* <button onClick={()=>this.OpenModal('WHOCODED',0)} type="button" className="btn btn-success" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Approve'}`}</button> */}
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={() => this.SaveNow2()}
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Send Now
                    </button>
                  )}

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
                  <h6 class="lh-5 mg-b-0">SMS</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      {(this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 1) ||
                      (this.props.data.userDetails &&
                        this.props.data.userDetails.type === 5) ? (
                        <button
                          onClick={() => this.OpenModal2("WHOCODED2", 0)}
                          className="btn btn-primary shadow"
                        >
                          <MessageCircle color="white" size={35} /> Send Direct
                          Message
                        </button>
                      ) : (
                        ""
                      )}

                      {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('returned')} className="btn btn-success shadow m-1"><List color="white" size={35} /> Returned</button>
                           <button onClick={()=>this.Filter('unreturned')} className="btn btn-warning shadow m-1"><List color="#000" size={35} /> Pending</button> */}
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
                        <th style={{ width: "4%" }}></th>
                        <th>Type</th>
                        <th>Draft</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((dep, i) => (
                        <tr key={i}>
                          <td>
                            <MessageCircle />
                          </td>
                          <td>{dep.type}</td>
                          <td>{dep.draft}</td>
                          <td>
                            {(this.props.data.userDetails &&
                              this.props.data.userDetails.type === 3) ||
                            (this.props.data.userDetails &&
                              this.props.data.userDetails.type === 1) ? (
                              <button
                                onClick={() => this.OpenModal2("WHOCODED", i)}
                                className="btn btn-sm btn-primary shadow"
                              >
                                <Edit2 color="white" size={35} />{" "}
                              </button>
                            ) : (
                              ""
                            )}
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

export default connect(mapStoreToProps)(ListSMS);
