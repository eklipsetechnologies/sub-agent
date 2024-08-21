import React, { Component } from 'react';
import BredCrum from '../global/BredCrum';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import MaterialIcon from 'material-icons-react';
import { Home } from '../global/Home';
import Axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import Spinner from '../global/Spinner';
import { switch_content } from '../store/actions/SwitchContent';
import { props_params } from '../store/actions/PropsParams';
import { Redirect } from 'react-router-dom';


class CalenderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laoding:false,
            data:[],
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
    }
    
    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({laoding:true});
            Axios.get(`${Home}auth/AllCalendarEvent`,{
               params:{token: token}
            })
           .then(res => {
             console.log(res);
           this.setState({laoding:false,data:res.data});
           })
        .catch(err =>this.setState({laoding:false}));
        }
    }
    handleDateClick = (arg) => { // bind with an arrow function
        alert('arg.dateStr')
       // console.log('yes')
      }

    handleEventClick=(event)=>{
        console.log(event.event);
        if (event.event.id.includes('events')) {
            this.props.dispatch(open_menu('Events'));
            this.props.dispatch(open_main_menu('Events'));
            this.props.dispatch(switch_content('Event_view'));
            this.props.dispatch(props_params([event.event.groupId]));
            this.props.history.push(`/events`)
        }else if(event.event.id.includes('newsboard')){
            this.props.dispatch(open_menu('Newsboard/Events'));
            this.props.dispatch(open_main_menu('Newsboard/Events'));
            this.props.dispatch(switch_content('News_view'));
            this.props.dispatch(props_params([event.event.groupId]));
            this.props.history.push(`/newsboard`);
        }
        
    }

    componentDidMount(){
        this.props.dispatch(open_menu('Calendar'));
        this.props.dispatch(open_main_menu('Calendar'));
        this.LoadData();
    }
    render() {
        if (!localStorage.getItem('userToken')) {
            if (JSON.stringify(localStorage.getItem('userToken')).length > 10) {
                return <Redirect to="/" />
            }
        }
       // console.log(this.state)
        return (
            <div>
                {/* <BredCrum bred="Calandar" /> */}
                <div className="card border-0">
                    <div className="card-body">
                        {this.state.laoding ?
                        <Spinner />
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
                            events={this.state.events}
                            forceEventDuration={true}
                            />
                            </div>
                    }
                    
                    </div>
                </div>
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
}

export default connect(mapStoreToProps) (CalenderPage);