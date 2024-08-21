import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import axios from 'axios';
import { Home } from '../../global/Home';
import Spinner from '../../global/Spinner';
import { props_params } from '../../store/actions/PropsParams';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import img from '../../assets/svg/whocoded_avatar.svg'
import { Trash2, FileText, FilePlus, DollarSign,Search } from 'react-feather';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ResponsivePie } from '@nivo/pie'
import { BounceRight,FadeIn } from "animate-components";
import { Chart } from "react-google-charts";
import Axios from 'axios';

class RecruitmentReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9,10],
            current:"",
            loading:false,
            loading2:false,
            loading3:false,
            loadingg:false,
            loadingd:false,
            genders:[],
            branch:[],
            department:[],
            data:[],
            data2:[],
            data3:[],
            id:0,
            switch:"",
            filter:"ALL",
            startDate: new Date(),
            startDate2: new Date(),
            bool:false,
            gender:"0",
            type:"0",
            type2:"1",
        }
    }
   


      LoadData=(name)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/RecReport/${name}`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data:res.data,loading:false});
           this.setState({loading:false});
           })
        .catch(err =>console.log(err));
        }
    }


   



    componentDidMount(){
        this.LoadData()
        this.LoadData2();
        // pdf.write('pdfs/basics.pdf').then(() => {
        //     console.log(new Date() - now);
        // });
    }

    Switcher=(name,id)=>{
        this.setState({switch:name,id:id});
        if (name === '') {
            this.LoadData();
        }
    }

    handleChange = (event)=>{
        if (event.target.type !== 'files') {
          this.setState({[event.target.name]: event.target.value});
          if (event.target.name === 'type') {
              this.LoadData(event.target.value)
          }else if (event.target.name === 'type2') {
            // this.Reload(this.state.type,event.target.value);
            // this.props.dispatch(quick_params(event.target.value))
          }
        }
      }

      LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true})
            Axios.post(`${Home}auth/recuite/listPortal`,{
               token: token
            })
           .then(res => {
            //console.log(res);
           this.setState({data2:res.data,loading:false});
           if (res.data.length > 0) {
               this.LoadData(res.data[0].name)
           }
           })
        .catch(err =>console.log(err));
        }
    }

    

      
    
    render() {
        // console.log(this.state.data3)
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                    <div className="input-group mb-4">
                            
                            <select 
                            onChange={this.handleChange}
                            name="type" value={this.state.type}
                             className="form-control form-control-sm mr-1">
                            <option value="0">Select Portal</option>
                            {this.state.data2.length > 0 ?
                            this.state.data2.map(eee=>
                            <option key={eee.id} value={eee.name}>{eee.name}</option>
                                )  
                        :''}
                           
                        </select>
                        
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="">
                        <div className="card border-0" style={{background:'#e5edfa'}}>
                            <div className="card-header">
                             <h6 className="mg-b-0">{this.state.data.companyName}</h6>
                            </div>
                            <div className="card-body tx-center">
                                <h4 className="tx-normal tx-rubik tx-40 tx-spacing--1 mg-b-0">{this.state.data.totalApplicants}</h4>
                                <p className="tx-12 tx-uppercase tx-semibold tx-spacing-1 tx-color-02">Total Application</p>
                               
                            </div>
                        </div>

                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="">
                        <div className="card border-0" style={{background:'#e5edfa'}}>
                            <div className="card-header">
                             <h6 className="mg-b-0">{this.state.data.name}</h6>
                            </div>
                            <div className="card-body tx-center">
                                <h4 className="tx-normal tx-rubik tx-40 tx-spacing--1 mg-b-0">{this.state.data.totalJobs}</h4>
                                <p className="tx-12 tx-uppercase tx-semibold tx-spacing-1 tx-color-02">Total Jobs</p>
                               
                            </div>
                        </div>

                        </div>
                    </div>


                    <div className="col-md-6 mb-4">
                        <div className="">
                        <div className="card border-0" style={{background:'#e5edfa'}}>
                            <div className="card-header">
                             <h6 className="mg-b-0">{this.state.data.companyName}</h6>
                            </div>
                            <div className="card-body tx-center">
                                <h4 className="tx-normal tx-rubik tx-40 tx-spacing--1 mg-b-0">{this.state.data.totalDep}</h4>
                                <p className="tx-12 tx-uppercase tx-semibold tx-spacing-1 tx-color-02">Total Departments</p>
                               
                            </div>
                        </div>

                        </div>
                    </div>


                    <div className="col-md-6 mb-4">
                        <div className="">
                        <div className="card border-0" style={{background:'#e5edfa'}}>
                            <div className="card-header">
                             <h6 className="mg-b-0">{this.state.data.name}</h6>
                            </div>
                            <div className="card-body tx-center">
                                <h4 className="tx-normal tx-rubik tx-40 tx-spacing--1 mg-b-0">{this.state.data.exc}</h4>
                                <p className="tx-12 tx-uppercase tx-semibold tx-spacing-1 tx-color-02">Total Excecises</p>
                               
                            </div>
                        </div>

                        </div>
                    </div>





                </div>
              
                
                        </div>
                   
            
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (RecruitmentReport);