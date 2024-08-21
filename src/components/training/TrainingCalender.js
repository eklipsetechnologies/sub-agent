import React, { Component } from 'react';
import { BounceRight,FadeIn,BounceUp } from "animate-components";
import { connect } from 'react-redux';
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import {PlusCircle, ArrowLeft, List, Calendar } from 'react-feather';
import { toast } from 'react-toastify';
import { launch_toaster } from '../../store/actions/IsToast';
import { toast_trigger } from '../../store/actions/ToastTrigger';
import { Home } from '../../global/Home';
import Axios from 'axios';
import Spinner from '../../global/Spinner';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import { Redirect } from 'react-router-dom';
import Toaster from '../../global/Toaster';


class TrainingCalender extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switch:"",
            name:"",
            loading:false,
            data:[],
            department:"",
            level:"",
            details:[],
            lg:[],
            lgs:"",
            state:"",
            country:"",
            address:"",
            startDate: new Date(),
            startDate2: new Date(),
            filter:"all",
            show:"",
            events: [
                {
                  title  : 'Sample Title here',
                  start  : new Date('2020-03-04 15:30:44'),
                  allDay : true
                },
                {
                    title  : 'Stephen Title',
                    start  : new Date('2020-07-04T15:30:44+00:00'),
                    allDay : true
                  },
                {
                  title  : 'Another Sample Title here',
                  start  : new Date(),
                  allDay : true
                },
                {
                  title  : 'Sample Title',
                  start  : "2020-04-04 05:37:36",
                  allDay : true // will make the time show
                }
              ],
              calendarWeekends: true,
        }
        this.fileInput = React.createRef();
    }

    handleDateClick = (arg) => { // bind with an arrow function
        // alert('arg.dateStr')
       // console.log('yes')
       toast.warn('Our Holiday',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
        });
      }

    handleEventClick=(event)=>{
        console.log(event.event);
        toast.warn(`${event.event.title}`,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
        // if (event.event.id.includes('events')) {
        //     this.props.dispatch(open_menu('Events'));
        //     this.props.dispatch(open_main_menu('Events'));
        //     this.props.dispatch(switch_content('Event_view'));
        //     this.props.dispatch(props_params([event.event.groupId]));
        //     this.props.history.push(`/events`)
        // }else if(event.event.id.includes('newsboard')){
        //     this.props.dispatch(open_menu('Newsboard/Events'));
        //     this.props.dispatch(open_main_menu('Newsboard/Events'));
        //     this.props.dispatch(switch_content('News_view'));
        //     this.props.dispatch(props_params([event.event.groupId]));
        //     this.props.history.push(`/newsboard`);
        // }
        
    }

    onChange2 = (startDate) =>{
        this.setState({ startDate });
      }
      onChange3 = (startDate2) =>{
        this.setState({ startDate2 });
      }

    
    ErrorHandler=(message)=>{
        //console.clear();
        console.log(message)
        this.setState({loading:false})
        toast.error(message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
            });
    }

    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/settings/getPublicHoliday`,{
              params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=(filter)=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.get(`${Home}auth/train/listCourseCalender/${filter}`,{
             params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
        //    this.interval = setTimeout(() => this.props.dispatch(open_right('Close')), 2000); 
           
           })
        .catch(err =>console.log(err));
        }
    }
    Filter=(filter)=>{
        this.LoadData2(filter);
        this.setState({filter:filter})
    }
   

     componentDidMount(){
         this.LoadData();
         this.LoadData2(this.state.filter)
     }
     OpenModal=(name,id)=>{
        if (name.length < 2) {
            this.setState({show:""});
            this.interval = setTimeout(() => this.setState({name:name}), 600); 
        }else{
            this.setState({name:name})
            this.interval = setTimeout(() => this.setState({show:"show"}), 100); 
        }
        this.setState({id:id,})
    }
    render() {
       // console.log(this.state)
        return (
            <>
           {/* <Toaster /> */}
            <BounceUp duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Our Training Calender</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="1s" timingFunction="ease-out">
                        {/* <button onClick={()=>this.Filter('all')} className="btn btn-primary2 btn-sm shadow m-1"><Calendar color="white" size={35} /> All</button>
                           <button onClick={()=>this.Filter('approved')} className="btn btn-success btn-sm shadow m-1"><Calendar color="white" size={35} /> Approved</button>
                           <button onClick={()=>this.Filter('declined')} className="btn btn-danger btn-sm shadow m-1"><Calendar color="white" size={35} /> Declined</button> */}
                           <button onClick={()=>this.SwitchContent('',[0])} className="btn btn-danger m-1 btn-sm shadow"><ArrowLeft color="white" size={35} /> Return</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>
                
                {this.state.loading ?
                        <Spinner size={40} />
                    :
                    <div className="table-responsive alert-" style={{borderRadius:'5px'}}>
                    <FullCalendar
                            eventBorderColor="#0467d2"
                            eventTextColor="#ffffff"
                            eventBackgroundColor="#0467d2"
                            eventClick={this.handleEventClick}
                            dateClick={this.handleDateClick}
                            defaultView="dayGridMonth"
                            plugins={[dayGridPlugin,interactionPlugin]}
                            weekends={true}
                            events={this.state.data}
                            forceEventDuration={true}
                            />
                            </div>
                    }
                
                </div>
                
            </div>
            </BounceUp>
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (TrainingCalender);