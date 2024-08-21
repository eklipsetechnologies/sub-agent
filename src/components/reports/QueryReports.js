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

class QueryReports extends Component {
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

    
      LoadData3=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/QueryReport3`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data3:[
           ]});
           let da =  ['Name', 'Number of Request'];
           for (let index = 0; index < res.data.length; index++) {
              this.state.data3.unshift(res.data[index]);
              }
              this.state.data3.unshift(da)
           this.setState({loading:false,data3:this.state.data3});
           })
        .catch(err =>console.log(err));
        }
    }


      LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/QueryReport`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data:[
           ]});
           let da =  ['Deciplinary Actions', 'Request'];
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
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/QueryReport2`,{
              params:{token: token}
            })
           .then(res => {
           console.log(',,.,.,,.',res);
           this.setState({loading:false,data2:res.data});
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
        // console.log(this.state.data3)
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 mb-4" style={{background:'#e5edfa'}}>
                            <div className="card-body">
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
                                        title: 'Report Per Department',
                                        subtitle: 'Number of leave request per leave type',
                                    },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                                />
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
                                width={'400px'}
                                height={'400px'}
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
                                        title: 'Report Per Exit Reason',
                                        subtitle: 'Number of leave request per exit reason',
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
                                      
                                    <div style={{height:'400px',width:'400px'}}>
                                    <ResponsivePie
                data={this.state.data2}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'Archived'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Unarchived'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'Deleted'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
                                   
                                    </div>   
                                     
                                             
                                             
                                    
                                          
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps) (QueryReports);