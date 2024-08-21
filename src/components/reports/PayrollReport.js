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

class PayrollReports extends Component {
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
        this.LoadData(`${startDate.getFullYear()}-${startDate.getMonth()+1 < 10 ? `0${startDate.getMonth()+1}` : startDate.getMonth()+1}-${startDate.getDate() < 10 ? '0'+startDate.getDate() : startDate.getDate()}`,`${this.state.startDate2.getFullYear()}-${this.state.startDate2.getMonth()+1 < 10 ? `0${this.state.startDate2.getMonth()+1}` : this.state.startDate2.getMonth()+1}-${this.state.startDate2.getDate() < 10 ? '0'+this.state.startDate2.getDate() : this.state.startDate2.getDate()}`)
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
        this.LoadData(`${startDate2.getFullYear()}-${startDate2.getMonth()+1 < 10 ? `0${startDate2.getMonth()+1}` : startDate2.getMonth()+1}-${startDate2.getDate() < 10 ? '0'+startDate2.getDate() : startDate2.getDate()}`,`${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1 < 10 ? `0${this.state.startDate.getMonth()+1}` : this.state.startDate.getMonth()+1}-${this.state.startDate.getDate() < 10 ? '0'+this.state.startDate.getDate() : this.state.startDate.getDate()}`)
      }

    


    LoadData=(from ,to)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            axios.get(`${Home}auth/reports/InvoiceReport/${from}/${to}`,{
              params:{token: token}
            })
           .then(res => {
           console.log(res);
           this.setState({data:[

           ]});
           let da =  ['Name', 'Amount'];
           if (res.data.length > 0) {
            for (let index = 0; index < res.data.length; index++) {
                this.state.data.unshift(res.data[index]);
                }
                this.state.data.unshift(da)
             this.setState({loading:false,data:this.state.data});
           }else{
               this.setState({data:[],loading:false})
           }
           
           })
        .catch(err =>console.log(err));
        }
    }

  




    componentDidMount(){
        this.LoadData(1,1)
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
        // console.log(this.state.data2)
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="">

                        <div className="card border-0" style={{background:'#e5edfa'}}>
                        <div className="card-body">
    
                        
                            <div className="row">
                                <div className="col-md-4">
                                    <div>
                                    {/* <h6 class="lh-5 mg-b-0">Gender Report</h6> */}
                                        </div>
                                </div>
                                <div className="col-md-8">
                                <div id="dddd" className="pull-right">
                                       
                                           from
                                    <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate} 
                                            onChange={date => this.onChange2(date)} />
                                                to
                                            <DatePicker 
                                            required
                                            calendarClassName="rasta-stripes st-inline"
                                            className="red-border form-control st-inline"
                                            selected={this.state.startDate2} 
                                            onChange={date => this.onChange3(date)} />
                                           
                                      
                                    
                                     
                                             
                                             
                                    
                                          
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
                                chartType="AreaChart"
                                loader={
                                    <div className="mt-5 p-4">
                                    <Spinner size={170} />
                                </div> 
                                }
                                data={
                                    this.state.data[0] && this.state.data[0].length > 0 ? this.state.data:
                                    [
                                    
                                    ]
                                }
                                options={{
                                    // Material design options
                                    chart: {
                                        title: 'Payroll Report',
                                        subtitle: 'Report on payment invoice',
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





                </div>
              
                
                        </div>
                   
            
        );
    }
}

const mapStateToProps = store =>({
    data:store
});

export default connect(mapStateToProps) (PayrollReports);