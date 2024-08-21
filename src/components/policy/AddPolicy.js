import React, { Component } from "react";
import { BounceRight, FadeIn } from "animate-components";
import { connect } from "react-redux";
import { switch_content } from "../../store/actions/SwitchContent";
import { props_params } from "../../store/actions/PropsParams";
import { PlusCircle, ArrowLeft } from "react-feather";
import { toast } from "react-toastify";
import { launch_toaster } from "../../store/actions/IsToast";
import { toast_trigger } from "../../store/actions/ToastTrigger";
import { Home, flutterKey, formatAmount } from "../../global/Home";
import Axios from "axios";
import Spinner from "../../global/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchUser from "../../global/SearchUser";
import { Multiselect } from "multiselect-react-dropdown";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

let data = [
  {
    id:1,
    name:"Lexu 2012"
  },
  {
    id:2,
    name:"Infinity FX35"
  },
  {
    id:3,
    name:"Camery 2009"
  },
  {
    id:4,
    name:"Camery 2011"
  },
  {
    id:5,
    name:"Camery 2010"
  },
];


class AddPolicy extends Component {
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
      options: [
        {
          id:1,
          name:"Lexu 2012"
        },
        {
          id:2,
          name:"Infinity FX35"
        },
        {
          id:3,
          name:"Camery 2009"
        },
        {
          id:4,
          name:"Camery 2011"
        },
        {
          id:5,
          name:"Camery 2010"
        },
      ],
      selectedValues: [],
      options2: [],
      selectedValues2: [],
      options3: [],
      selectedValues3: [],
      selectedValue:[],
      seleted: [],
      hmoOptions:[],
      hmoDetail:null,
      config:{
        public_key: flutterKey,
        tx_ref: Date.now(),
        amount: 100,
        currency: 'NGN',
        payment_options: 'card',
        customer: {
          email: 'user@gmail.com',
           phone_number: '070********',
          name: 'john doe',
        },
        customizations: {
          title: 'Haba InsurTech',
          description: 'Payment for a cover',
          logo: 'https://res.cloudinary.com/haba-insure/image/upload/v1666552665/haba-assets/Haba_Logo_Icon_True_Colour_kd3sam.svg',
        }
      }
    }
    this.fileInput = React.createRef();
  }


  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedValue: selectedList });
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
          if (event.target.value == '0') {
            this.setState({options:data,selectedValue:[]})
          }else{
            this.setState({options:this.state.data,selectedValue:[]})
          }
        // if (this.state.details[event.target.value].lgas) {
        //   this.setState({ lg: this.state.details[event.target.value].lgas });
        // }
      }else if (event.target.name === "hmoDetail" && event.target.value !== "") {
        this.state.config.amount = parseInt(this.state.hmoOptions[event.target.value].price * this.state.selectedValue.length);
        this.setState({config:this.state.config})
      }
    }
  };

  SwitchContent = (name, id) => {
    this.props.dispatch(switch_content(name));
    this.props.dispatch(props_params(id));
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    return false
    let token = "";
    if (localStorage.getItem("userToken")) {
        token = JSON.parse(localStorage.getItem("userToken"));
        let fd = new FormData();
        fd.append("name", this.state.premium);
        fd.append("token", token);
        this.setState({ loading: true });
        Axios.post(`${Home}admin/addCategory`, fd, {
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

  LoadData=()=>{
    let token = "";
    if (localStorage.getItem('userToken')) {
        token = JSON.parse(localStorage.getItem('userToken'));
        this.setState({loading:true});
        Axios.get(`${Home}enter-ps/user/listUsers/Employees/1`,{
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        })
       .then(res => {
       console.log(res);
       this.setState({loading:false,data:res.data.payload});
       })
    .catch(err =>console.log(err));
    }
}

SubmitData=()=>{
  let token = "";
  if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      this.setState({loading:true});
      Axios.post(`${Home}enter-ps/hmo/buy`,{
        data:this.state.hmoOptions[this.state.hmoDetail],
        users:this.state.selectedValue
      },{
          headers: { 
              'Authorization': `Bearer ${token}`
          }
      })
     .then(res => {
     console.log(res);
     this.setState({loading:false,});
     })
  .catch(err =>{
    console.log(err)
    this.setState({loading:false,});
  });
  }
}

LoadHMOS=()=>{
  let token = "";
  if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      this.setState({loading:true});
      Axios.get(`${Home}get-hmos`,{
          headers: { 
              'Authorization': `Bearer ${token}`
          }
      })
     .then(res => {
     console.log(res);
     this.setState({loading:false,hmoOptions:res.data.payload});
     })
  .catch(err =>console.log(err));
  }
}

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
    this.LoadHMOS()
    // this.LoadData2();

    // if (this.props.data.params[0] !== 0) {
    //   this.LoadSingleData();
    // }
  }

  ParseBenefit=(benefit) =>{
    let data = [];
    if (benefit) {
      data = JSON.parse(benefit);
    }
    return data
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
    const fwConfig = {
      ...this.state.config,
      text: 'Purchase Now',
      callback: (response) => {
         console.log(response);
         this.SubmitData(response)
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {},
    };
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
                  <h6 className="lh-5 mg-b-0">
                    Add Policy
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
                

                <div className="col-md-12 mt-4">
                  <div className="form-group mt-4">
                    <label>Policy type</label>
                    <select
                      required
                      value={this.state.state}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ width: "1050px" }}
                      name="state"
                    >
                      <option value="">Select one</option>
                      <option value="1">HMO</option>
                      <option value="0">Vehicle Insurance</option>
                      {/* <option value="1">Hospicash</option> */}
                    </select>
                  </div>
                </div>

                <div className="col-md-12 mt-5">
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
                </div>

                {this.state.state === "1" && this.state.selectedValue.length > 0 &&(
                  <div className="col-md-12 mt-1">
                  <div className="form-group">
                    <label>HMO Plan</label>
                    <select
                      required
                      value={this.state.hmoDetail}
                      onChange={this.handleChange}
                      className="form-control"
                      style={{ width: "1050px" }}
                      name="hmoDetail"
                    >
                      <option value="">Select one</option>
                      {this.state.hmoOptions.length > 0 &&(
                        this.state.hmoOptions.map((list,index)=>
                          <option key={index} value={index}>{list.productType} {list.planName} ({formatAmount(list.price)})</option>
                          )
                      )}
                    </select>
                  </div>
                </div>
                )}
                

               


                <div className="col-md-12" style={{ marginTop: "3rem" }}>
                  

                 {this.state.hmoDetail ?
                   <div>
                   <table className="table table-sm table-primary table-bordered table-striped">
                     <tr>
                       <th style={{width:"30%"}}>Plan Name</th>
                       <td>{this.state.hmoOptions[this.state.hmoDetail].planName}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Price</th>
                       <td>{formatAmount(this.state.hmoOptions[this.state.hmoDetail].price)}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Plan Type</th>
                       <td>{this.state.hmoOptions[this.state.hmoDetail].planType}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Product Type</th>
                       <td>{this.state.hmoOptions[this.state.hmoDetail].productType}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Number of Months</th>
                       <td>{this.state.hmoOptions[this.state.hmoDetail].numberOfMonths}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Number of Persons</th>
                       <td>{this.state.hmoOptions[this.state.hmoDetail].numberOfPersons}</td>
                     </tr>
                     <tr>
                       <th style={{width:"30%"}}>Benefits</th>
                       <td>{this.ParseBenefit(this.state.hmoOptions[this.state.hmoDetail].planBenefits).map((list,index)=>
                         <span className="badge badge-primary badge-pill m-1" value={index}>{list}</span>
                         )}</td>
                     </tr>
                     
                   </table>
                 </div>
                 :''}

                 <div className="form-group">
                    {this.state.loading ? (
                      <Spinner size={40} />
                    ) :
                    <FlutterWaveButton className="btn st-btn2 btn-primary shadow" {...fwConfig} />
                    // <button className="btn st-btn2 btn-primary shadow">
                    //     Purchase Now
                    //   </button>
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

export default connect(mapStoreToProps)(AddPolicy);
