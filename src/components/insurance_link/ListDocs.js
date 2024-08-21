import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import { PlusCircle, Trash2, File, ArrowLeft } from "react-feather";
import Axios from "axios";
import { Home } from "../../global/Home";
import Spinner from "../../global/Spinner";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import img2 from "../../assets/svg/file.svg";
import { open_right } from "../../store/actions/OpenRight";

class ListDocs extends Component {
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
      id: 0,
      data2: [],
      loading2: false,
      upload: "",
    };
    this.fileInput = React.createRef();
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

  Delete(key) {
    if (window.confirm("❌ are you sure you want to delete?")) {
      let token = "";
      if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        this.setState({ loading: true });
        Axios.post(`${Home}auth/delete/up2`, {
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
      Axios.post(`${Home}auth/settings/ListStorage1`, {
        token,
        link: this.props.data.params,
      })
        .then((res) => {
          this.setState({ loading: false, data: res.data });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: true });
        });
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
      this.interval = setTimeout(() => this.setState({ modal: modal }), 600);
    } else {
      this.setState({ modal: modal });
      this.interval = setTimeout(() => this.setState({ show: "show" }), 100);
    }
    this.setState({ id: id });
  };

  handleSubmit = async (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    let filename;
    let token = "";
    let fd = new FormData();
    filename = this.fileInput.current.files[0].name.replace(/ /g, "_");
    if (this.fileInput.current && this.fileInput.current.files.length > 0) {
      fd.append("sendimage", this.fileInput.current.files[0], filename);
    }

    const requestOptions = {
      method: "POST",
      body: fd,
      mode: "no-cors",
    };

    await fetch("https://st11252.ispot.cc/docs.php", requestOptions);

    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));

      const data = new FormData();
      data.append("file", filename);
      data.append("token", token);
      data.append("name", this.state.name);
      data.append("link", this.props.data.params);
      data.append("type", 4);

      Axios.post(`${Home}auth/up2`, data, {
        onUploadProgress: (ProgressEvent) => {
          let MyProgress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          // console.log(
          //   "Progress: " +
          //     Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
          //     " %"
          // );
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
            this.setState({ loading: false });
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
            this.setState({ loading: false });
          }
        })
        .catch((err) => console.log(err));
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
    // console.log(this.props.data.params);
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
              // overflow: "scroll",
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <form
                onSubmit={this.handleSubmit}
                className="modal-content card explore-feature border-0 rounded bg-white shadow"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Upload Files</h5>
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
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <>
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
                          <label>Select File</label>
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
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer justify-content-between">
                  {this.state.loading ? (
                    <Spinner />
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Upload
                      </button>
                      <button
                        onClick={() => this.OpenModal2("", 0)}
                        type="button"
                        className="btn btn-danger ml-2"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  )}
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
                  {this.state.loading2 ? (
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
                                              rel="noreferrer"
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
                  <h6 class="lh-5 mg-b-0">Saved Files</h6>
                </div>
                <div className="col-md-7">
                  <div className="pull-right">
                    <FadeIn duration="1s" timingFunction="ease-out">
                      <button
                        onClick={() => this.OpenModal2("WHOCODED", 0)}
                        className="btn btn-primary m-1 shadow"
                      >
                        <PlusCircle color="white" size={35} /> Upload File
                      </button>
                      <button
                        onClick={() => this.SwitchContent("list_link", [0])}
                        className="btn btn-danger shadow ml-3"
                      >
                        <ArrowLeft color="white" size={35} /> Back
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
                              <img src={img2} className="img-fluid" alt="img" />
                            </td>
                            <td>{dep.name}</td>
                            <td>
                              <div>
                                <FadeIn duration="1s" timingFunction="ease-out">
                                  <div className=" d-flex">
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={dep.file}
                                      data-rh="Download Files"
                                      className="btn btn-primary btn-sm m-1 shadow"
                                    >
                                      Download
                                    </a>
                                    {this.props.data.userDetails &&
                                    this.props.data.userDetails.type === 1 ? (
                                      <button
                                        data-rh="Delete"
                                        onClick={() => this.Delete(dep.id)}
                                        className="btn btn-danger btn-sm m-1 shadow"
                                      >
                                        <Trash2 color="white" size={35} />{" "}
                                      </button>
                                    ) : (
                                      ""
                                    )}
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

export default connect(mapStoreToProps)(ListDocs);
