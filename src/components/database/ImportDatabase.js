import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { Home } from "../../global/Home";
import Axios from "axios";
import Spinner from "../../global/Spinner";
import { toast } from "react-toastify";
import { ArrowLeft } from "react-feather";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import { expand_students } from "../../store/actions/ExpandStudents";
import xlsxParser from "xls-parser";

const maxNumber = 1;
let parsedData = [];
class ImportDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleted: [],
      laoding: false,
      data: [],
      startDate: new Date(),
      students: [],
      class: "",
      clas2: "",
      fetching: false,
      errorNames: [],
    };
    this.fileInput = React.createRef();
  }

  SwitchContent = (name) => {
    this.props.dispatch(switch_content(name));
  };
  onChangeImage = (imageList) => {
    this.setState({ picture2: imageList });
    console.log(this.state.picture2);
  };
  onChange2 = (startDate) => {
    this.setState({ startDate });
  };

  LoadClasses = () => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ laoding: true });
      Axios.get(`${Home}auth/AllClasses`, {
        params: { token: token },
      })
        .then((res) => {
          //console.log(res);
          this.setState({ laoding: false, data: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  SelectRole(name) {
    let values = this.state.seleted.concat(name);
    let uniqueItems = Array.from(new Set(values));
    this.setState({ seleted: uniqueItems });
  }

  Delete = (index) => {
    this.state.students.splice(index, 1);
    this.setState({ students: this.state.students });
  };

  handleChange = (event) => {
    if (event.target.type !== "file") {
      if (event.target.name === "class") {
        if (this.state.data.length > 0) {
          let clas2 = this.state.data[event.target.value].name;
          this.setState({ clas2: clas2 });
        }
      }
      this.setState({ [event.target.name]: event.target.value });
    } else {
      if (this.fileInput.current && this.fileInput.current.files.length > 0) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event2) {
          // The file's text will be printed here
          //console.log(event2.target.result)
        };
        this.UpdateExcel(file);
        reader.readAsText(file);
      }
    }
  };

  UpdateExcel = (file) => {
    xlsxParser.onFileSelection(file).then((data) => {
      //console.log(data.Students);
      if (data.Students) {
        this.setState({ students: data.Students });
      } else {
        this.setState({ students: [] });
        alert("File must have all required Insured details");
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ fetching: true });
    if (this.state.students.length < 1) {
      alert("Cant import empty data");
      return false;
    }
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      Axios.post(`${Home}auth/settings/import`, {
        token: token,
        students: this.state.students,
      })
        .then((res) => {
          //console.log(res);
          this.setState({ fetching: false, students: [] });
          if (res.data.success) {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(true));
            this.setState({ errorNames: res.data.errorNames });
          } else {
            this.props.dispatch(launch_toaster(res.data.message));
            this.props.dispatch(toast_trigger(false));
            this.setState({ errorNames: res.data.errorNames });
          }
        })
        .catch(
          (err) => this.ErrorHandler(err, "Error")
          //console.log(err.response.data.message),
        );
    }
  };

  ExpandStudent = (bool) => {
    this.props.dispatch(expand_students(bool));
  };

  componentDidMount() {
    // this.LoadClasses();
  }

  ErrorLoading = (error, messgae) => {
    // console.log(error);
    this.props.dispatch(launch_toaster(messgae));
    this.props.dispatch(toast_trigger(false));
    this.SwitchContent();
  };
  ErrorHandler = (err, message) => {
    console.log(err);
    //console.clear();
    this.setState({ loading: false });
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };
  render() {
    // console.log(this.state)
    return (
      <div>
        <div className="card border-0">
          <div className="card-body">
            {this.state.laoding ? (
              <div className="table-responsive">
                <div className="p-5">
                  <Spinner />
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <p className="st-card-title">Import data</p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="pull-right">
                      <button
                        onClick={() => this.SwitchContent("Students_home")}
                        className="btn btn-danger shadow"
                      >
                        <ArrowLeft color="white" size={35} /> Return
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Choose a file</label>
                          <input
                            accept=".xls,.xlsx"
                            ref={this.fileInput}
                            name="pasfront"
                            type="file"
                            className="form-control"
                            style={{ paddingBottom: "2.5rem" }}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    {this.state.errorNames.length > 0 ? (
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            Something is wrong with these names
                          </h5>
                          {this.state.errorNames.map((err, i) => (
                            <div key={i} className="alert alert-danger">
                              {err}
                            </div>
                          ))}
                          <p className="text-danger">
                            To avoid error, Username,Password must be unique.
                            and Name must not be empty
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {this.state.students.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table mt-2 table-hover table-bordered mb-5">
                          <thead className="">
                            <tr>
                              <th>Insured</th>
                              <th>Product ID</th>
                              <th>Class of Insured</th>
                              <th>Policy Number</th>
                              <th>Period of cover</th>
                              <th>Expiry Date</th>
                              <th>Email address</th>
                              <th>Telephone Number</th>
                              <th>Sum Insured</th>
                              <th>Premium Rate</th>
                              <th>Interest</th>
                              <th>MarkUp</th>
                              <th>Registration No</th>
                              <th>Commission</th>
                              <th scope="col" style={{ width: "8%" }}>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.students.map((role, i) => (
                              <tr key={i}>
                                <td scope="row">{role.Insured}</td>
                                <td scope="row">{role.Product_ID}</td>
                                <td scope="row">{role.Class}</td>
                                <td>{role.Policy_Nuber}</td>
                                <td>{role.Period}</td>
                                <td>{role.Expire}</td>
                                <td>{role.Email}</td>
                                <td>{role.Telephone}</td>
                                <td>{role.Sum_Insured}</td>
                                <td>{role.Premium_Rate}</td>
                                <td>{role.Interest}</td>
                                <td>{role.MarkUp}</td>
                                <td>{role.Registration}</td>
                                <td>{role.Commission}</td>

                                <td>
                                  <button
                                    onClick={() => this.Delete(i)}
                                    type="button"
                                    className="btn btn-danger btn-icon shadow d-flex"
                                  >
                                    <MaterialIcon
                                      icon="delete_forever"
                                      color="#ffffff"
                                    />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      ""
                    )}

                    {this.state.fetching ? (
                      <button
                        type="button"
                        disabled={true}
                        className=" disabled st-btn btn-primary2 shadow"
                      >
                        Importing... Please wait
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary shadow">
                        Import
                      </button>
                    )}
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(ImportDatabase);
