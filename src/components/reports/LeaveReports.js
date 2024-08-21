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

class LeaveReports extends Component {
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
            type:"Employees",
            type2:"1",
        }
    }
    onChange2 = (startDate) =>{
        this.setState({ startDate });
        this.SearchFilter(`${startDate.getFullYear()}-${startDate.getMonth()+1 < 10 ? `0${startDate.getMonth()+1}` : startDate.getMonth()+1}-${startDate.getDate() < 10 ? '0'+startDate.getDate() : startDate.getDate()}`,`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`)
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
        this.SearchFilter(`${startDate2.getFullYear()}-${startDate2.getMonth()+1 < 10 ? `0${startDate2.getMonth()+1}` : startDate2.getMonth()+1}-${startDate2.getDate() < 10 ? '0'+startDate2.getDate() : startDate2.getDate()}`,`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`)
      }

    


    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/LeaveReport2`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data:[
           ]});
           let da =  ['Name', 'Days'];
           for (let index = 0; index < res.data.length; index++) {
              this.state.data.unshift(res.data[index]);
              }
              this.state.data.unshift(da)
           this.setState({loading:false,data:this.state.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true});
            axios.get(`${Home}auth/reports/LeaveReport`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data2:[
           ]});
           let da =  ['Name', 'Days'];
           for (let index = 0; index < res.data.length; index++) {
              this.state.data2.unshift(res.data[index]);
              }
              this.state.data2.unshift(da)
           this.setState({loading2:false,data2:this.state.data2});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData3=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading3:true});
            axios.get(`${Home}auth/reports/LeaveReport3`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data3:[
           ]});
           let da =  ['Name', 'Days'];
           for (let index = 0; index < res.data.length; index++) {
              this.state.data3.unshift(res.data[index]);
              }
              this.state.data3.unshift(da)
           this.setState({loading3:false,data3:this.state.data3});
           })
        .catch(err =>console.log(err));
        }
    }



    componentDidMount(){
        this.LoadData()
        this.LoadData2()
        this.LoadData3()
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

    

      
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="">

                        <div className="card border-0" style={{background:'#e5edfa'}}>
                        <div className="card-body">
    
                        
                            <div className="row">
                                <div className="col-md-8">
                                    <div>
                                    {/* <h6 class="lh-5 mg-b-0">Gender Report</h6> */}
                                        </div>
                                </div>
                                <div className="col-md-4">
                                    <div id="dddd" className="pull-right">
                                      
                                    <>
                                    
                                    </>    
                                    </div>
                                </div>
                            </div>
                            </div>
                            
                       
                            <div className="table-responsive">
                                <center>
                                    {this.state.loading ?
                                  <div className="mt-5 p-4">
                                      <Spinner size={170} />
                                  </div>  
                                :
                                <FadeIn duration="2s" timingFunction="ease-out">
                            <div>
                            <Chart
                                width={'900px'}
                                height={'500px'}
                                chartType="Bar"
                                loader={
                                    <div className="mt-5 p-4">
                                    <Spinner size={170} />
                                </div> 
                                }
                                data={
                                    this.state.data[0] && this.state.data[0].length > 0 ? this.state.data:
                                    [
                                    ['Year', 'Sales'],
                                    ['Ste', 1000],
                                    ['Ste', 1170],
                                    ['20m16', 660],
                                    ['2017', 1030],
                                    ]
                                }
                                options={{
                                    // Material design options
                                    chart: {
                                        title: 'Report Per Department',
                                        subtitle: 'Number of leave request per leave type',
                                    },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                                />
            </div>
            </FadeIn>
    }
            </center>
                            </div>
                        
                        </div>

                        </div>
                    </div>







                    <div className="col-md-6 mb-4">
                        <div className="">

                        <div className="card border-0" style={{background:'#e5edfa'}}>
                        <div className="card-body">
    
                        
                            <div className="row">
                                <div className="col-md-8">
                                    <div>
                                    {/* <h6 class="lh-5 mg-b-0">Department Report</h6> */}
                                        </div>
                                </div>
                                <div className="col-md-4">
                                    <div id="dddd" className="pull-right">
                                      
                                    <>
                                    <Chart
                                        width={'400px'}
                                        height={'350px'}
                                        chartType="PieChart"
                                        loader={
                                            <div className="mt-5 p-4">
                                            <Spinner size={170} />
                                        </div>
                                        }
                                        data={
                                            this.state.data2[0] && this.state.data2[0].length > 0 ? this.state.data2:
                                            [
                                            ['Year', 'Sales'],
                                            ['Ste', 1000],
                                            ['Ste', 1170],
                                            ['20m16', 660],
                                            ['2017', 1030],
                                            ]
                                        }
                                        options={{
                                            title: 'Leave Request Per Employee',
                                            // Just add this option
                                            is3D: true,
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                        />
                                   
                                    </>   
                                     
                                             
                                             
                                    
                                          
                                    </div>
                                </div>
                            </div>
                            </div>
                        
                        
                        </div>

                        </div>
                    </div>







                    <div className="col-md-6 mb-4">
                        <div className="">

                        <div className="card border-0" style={{background:'#e5edfa'}}>
                       
                            
                       
                            <div className="table-responsive card-body">
                                <center>
                                    {this.state.loadingg ?
                                  <div className="mt-5 p-4">
                                      <Spinner size={170} />
                                  </div>  
                                :
                                <FadeIn duration="2s" timingFunction="ease-out">
                           
                            <Chart
                                        width={'400px'}
                                        height={'350px'}
                                        chartType="Bar"
                                        loader={
                                            <div className="mt-5 p-4">
                                            <Spinner size={170} />
                                        </div> 
                                        }
                                        data={
                                            this.state.data3[0] && this.state.data3[0].length > 0 ? this.state.data3:
                                            [
                                            ['Year', 'Sales'],
                                            ['Ste', 1000],
                                            ['Ste', 1170],
                                            ['20m16', 660],
                                            ['2017', 1030],
                                            ]
                                        }
                                        options={{
                                            // Material design options
                                            chart: {
                                            title: 'Report Per Leave Types',
                                            subtitle: 'Number of leave request per leave type',
                                            },
                                        }}
                                        // For tests
                                        rootProps={{ 'data-testid': '2' }}
                                />
            
            </FadeIn>
    }
            </center>
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

export default connect(mapStateToProps) (LeaveReports);