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
} from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img from "../../assets/svg/whocoded_avatar.svg";
import img2 from "../../assets/svg/file.svg";
import { open_right } from "../../store/actions/OpenRight";
import App from "../uploads/App";
import SearchStorage from "../search/SearchStorage";

class AdminStorage extends Component {
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
      modal: "",
      show: "",
      id: 0,
      data2: [],
      loading2: false,
      private: "0",
    };
    this.fileInput = React.createRef();
    this.updateData = this.updateData.bind(this)
  }
  updateData(data) {
    this.setState({
      data
    });
  }
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

  LoadData = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}auth/userFiles2/3`, {
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

  componentDidMount() {
    this.LoadData(this.state.filter);
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
  OpenModal2 = (modal, id) => {
    if (modal.length < 2) {
      this.setState({ show: "" });
      this.interval = setTimeout(() => this.setState({ modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let token = "";
    let fd = new FormData();
    if (this.fileInput.current && this.fileInput.current.files.length > 0) {
      fd.append(
        "sendimage",
        this.fileInput.current.files[0],
        this.fileInput.current.files[0].name
      );
    }

    const requestOptions = {
      method: "POST",
      body: fd,
      mode: "no-cors",
    };

    await fetch("http://st11252.ispot.cc/index.php", requestOptions);

    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));

      const data = new FormData();
      data.append("file", this.fileInput.current.files[0].name);
      data.append("token", token);
      data.append("name", this.state.name);
      data.append("type", 3);
      data.append("private", this.state.private);

      this.setState({ loading: true });
      Axios.post(`${Home}auth/up2`, data, {
        onUploadProgress: (ProgressEvent) => {
          let MyProgress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );

          // console.log('Progress: '+ Math.round(ProgressEvent.loaded/ProgressEvent.total *100)+" %");
          if (MyProgress < 99) {
            this.setState({ upload: MyProgress });
          } else {
            this.setState({ upload: 0 });
          }
        },
      })
        .then((res) => {
          //console.log(res);
          this.setState({ loading: false });
          if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.LoadData();
            this.OpenModal2("", 0);
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
          }
        })
        .catch((err) => this.ErrorHandler(err, "Error"));
    }
  };

  LoadFiles = (id) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading2: true });
      Axios.post(`${Home}auth/userFiles`, {
        token: token,
        id: id,
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading2: false, data2: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  OpenModal3 = (modal, id) => {
    if (id !== 0 || id > 0) {
      this.LoadFiles(id);
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
  render() {
    console.log(this.props);
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
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Upload Admin Files</h5>
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
                            <label>Title</label>
                            <input
                              type="text"
                              value={this.state.name}
                              onChange={this.handleChange}
                              className="form-control"
                              name="name"
                              placeholder="Name"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label> File</label>
                            <input
                              required
                              accept=".doc,.docx,application/msword,document,png,jpeg,.zip,.pdf"
                              ref={this.fileInput}
                              name="frontfile"
                              type="file"
                              className="form-control radius"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group mb-4">
                            <label>Privacy</label>
                            <select
                              style={{ width: "96%" }}
                              value={this.state.private}
                              onChange={this.handleChange}
                              className="form-control"
                              name="private"
                              placeholder="Name"
                              required
                            >
                              <option value="">Select file privacy</option>
                              <option value="1">PRIVATE</option>
                              <option value="0">PUBLIC</option>
                            </select>
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
                    Submit
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
              overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Uploaded Files</h5>
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
                  {this.state.laoding2 ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="p-3">
                        <div className="table-responsive">
                          <table
                            className="table mb-0 table-striped table-hover table-bordered"
                            id="stephen"
                          >
                            <thead>
                              <tr>
                                <th style={{ width: "7%" }}></th>
                                <th>File Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data2.length > 0 &&
                                this.state.data2.map((dep, i) => (
                                  <tr key={i}>
                                    <td>
                                      <img src={img2} className="img-fluid" />
                                    </td>
                                    <td>{dep.name}</td>
                                    <td>
                                      <div>
                                        <FadeIn
                                          duration="1s"
                                          timingFunction="ease-out"
                                        >
                                          <div className=" d-flex">
                                            <a
                                              target="_blank"
                                              href={dep.file}
                                              data-rh="Download Files"
                                              className="btn btn-primary btn-sm m-1 shadow"
                                            >
                                              Download File{" "}
                                            </a>
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
                    </>
                  )}
                </div>
                <div className="modal-footer">
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
                  <h6 class="lh-5 mg-b-0">Admin Saved Files</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      {this.props.data.userDetails &&
                        this.props.data.userDetails.type === 3 ? (
                        <button
                          onClick={() => this.OpenModal2("WHOCODED", 0)}
                          className="btn btn-primary m-1 shadow"
                        >
                          <PlusCircle color="white" size={35} /> New Document
                        </button>
                      ) : (
                        ""
                      )}

                      <button
                        onClick={() => this.SwitchContent("WHOCODED", 0)}
                        className="btn btn-danger m-1 shadow"
                      >
                        <ArrowLeft color="white" size={35} /> Return
                      </button>
                      {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary shadow m-1"><List color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('returned')} className="btn btn-success shadow m-1"><List color="white" size={35} /> Returned</button>
                           <button onClick={()=>this.Filter('unreturned')} className="btn btn-warning shadow m-1"><List color="#000" size={35} /> Pending</button> */}
                    </FadeIn>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5" />
                <div className="col-md-7">
                  <div className="pull-right">
                    <SearchStorage data={this.state.data} onLoadData={this.LoadData} stateSetter={this.updateData} />
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
                        <th style={{ width: "7%" }}></th>
                        <th>File Name</th>
                        <th style={{ width: "16%" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.length > 0 &&
                        this.state.data.map((dep, i) => (
                          <tr key={i}>
                            <td>
                              <img src={img2} className="img-fluid" />
                            </td>
                            <td>{dep.name}</td>
                            <td>
                              <div>
                                <FadeIn duration="1s" timingFunction="ease-out">
                                  <div className=" d-flex">
                                    <a
                                      target="_blank"
                                      href={dep.file}
                                      data-rh="Download Files"
                                      className="btn btn-primary btn-sm m-1 shadow"
                                    >
                                      Download File{" "}
                                    </a>
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

export default connect(mapStoreToProps)(AdminStorage);
