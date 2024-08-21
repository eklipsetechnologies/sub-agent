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

class EditQuiz extends Component {
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
      steps:"",
      question:"",
      answer:null
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
    let values = this.state.seleted.concat({
      id:this.state.seleted.length,
        label:name,
        value:name
    });
    let uniqueItems = Array.from(new Set(values));
    this.setState({seleted:uniqueItems,markup:""});
 }

 Remove=(index)=>{
    this.state.seleted.splice(index, 1);
    this.setState({seleted:this.state.seleted});
    //  if (this.state.seleted.includes(name)) {
    //      let values = this.state.seleted;
    //      let index = values.indexOf(name);
    //      this.state.seleted.splice(index, 1);
    //      this.setState({seleted:this.state.seleted});
    //  }
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
        let answer = {
            label: this.state.seleted.length > 0?this.state.seleted[this.state.answer].value:"",
            value: this.state.seleted.length > 0?this.state.seleted[this.state.answer].value:""
        }
        Axios.post(`${Home}admin/editQuiz`, {
            question:this.state.question,
            answer:answer,
            options:this.state.seleted,
            id:this.props.data.params.length > 0 ? this.props.data.params[0] : 0
        }, {
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        })
          .then((res) => {
            // console.log(res);
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

  LoadDataSingle = (filter) => {
    let token = "";
    if (localStorage.getItem("userToken")) {
      token = JSON.parse(localStorage.getItem("userToken"));
      this.setState({ loading: true });
      Axios.get(`${Home}admin/getSingleQuiz/${this.props.data.params.length > 0 ? this.props.data.params[0] : 0}`, {
        headers: { 
            'Authorization': `Bearer ${token}`
        } 
      })
        .then((res) => {
          console.log(res);
          this.setState({ loading: false,        });
          if (res.data.payload.length > 0) {
            let name = {
                label:res.data.payload[0].answer.value,
                value:res.data.payload[0].answer.value,
            }
    //          if (this.state.seleted.includes(name)) {
    //             let values = this.state.seleted;
    //             let index = values.indexOf(name);
    //             // this.state.seleted.splice(index, 1);
    //             this.setState({answer:index});
    //  }
            this.setState({
                question:res.data.payload[0].question,
                // answer:res.data.payload[0].answer.value,
                seleted:res.data.payload[0].options?res.data.payload[0].options:[],
            })
          }
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.LoadDataSingle()
    // this.LoadData();
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
                    Edit Question
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
                

                {/* <div className="col-md-12 mt-4">
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
                </div> */}

                <div className="col-md-12">
                  <div className="form-group mt-5">
                    <label>Question</label>
                    <input
                      value={this.state.question}
                      name="question"
                      required
                      placeholder="Question"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>



                <div className="col-md-12 mt-0">
               
                  <div className="form-group mt-4">
                    <label>Options</label>
                    <input
                      value={this.state.markup}
                      name="markup"
                      
                      placeholder="answer option"
                      className="form-control st-login-f22"
                      onChange={this.handleChange}
                    />
                    <button onClick={()=>this.SelectRole(this.state.markup)} className="btn btn-small btn-primary mt-2" type="button">Add option</button>
                  </div>

                {this.state.seleted.length > 0 ?
                  <table className="table table-primary table-sm mt-2 table-hover table-bordered">
                                <thead className="">
                                    <tr>
                                    {/* <th scope="col">Name</th> */}
                                    <th scope="col">Option Name</th>
                                    <th scope="col" style={{width:'20%'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.seleted.map((form,i)=>
                                        <tr key={i}>
                                        {/* <th scope="row">{form.name}..</th> */}
                                        <th>
                                        <div data-label="Click to select" className="df-example">
                                            <div className="row">
                                            <div className="col-md-3">
                                                    <span 
                                                    // onClick={()=>this.state.seleted.includes(`${form}.${i}`)?this.Remove(`${form}.${i}`) : this.SelectRole(`${form}.${i}`)} key={i} 
                                                    // className={`badgel badge-pillk st-cursor mb-2 ${this.state.seleted.includes(`${form}`)?'badge-primary':'st-bg-outline'} `}
                                                    >{form.value}</span>
                                                </div>
                                            
                                          </div>  
                                        </div>
                                        </th>

                                        <td>
                                        <button
                                        type="button"
                                        onClick={()=>this.Remove(`${form}`)}
                                        className="btn btn-danger btn-sm">
                                        <Trash color="white" size={35} /> remove
                                        </button>
                                        </td>
                                        
                                        
                                        </tr>
                                    
                                    )}
                                    
                                </tbody>
                                </table>
                                :''}
                </div>



                <div className="col-md-12">
                  <div className="form-group">
                    <label>Select an answer</label>
                    <select
                      required
                      value={this.state.answer}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ width: "1050px" }}
                      name="answer"
                    >
                      <option value="">Select one</option>
                      {this.state.seleted.length > 0 ?
                      this.state.seleted.map((dat,index)=>
                        <option key={index} value={index}>{dat.value}</option>
                        )
                    :''}
                      {/* <option value="Required">Required</option>
                      <option value="Optional">Optional</option> */}
                    </select>
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

export default connect(mapStoreToProps)(EditQuiz);
