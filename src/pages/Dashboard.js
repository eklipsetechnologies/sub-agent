import React, { Component } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import { FadeIn } from 'animate-components';
import { Users, GitBranch, Truck, Heart } from 'react-feather';

import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import { formatAmount, Home } from '../global/Home';
import Axios from 'axios';
import Spinner from '../global/Spinner';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timelinePlugin from '@fullcalendar/timeline';
// import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import { toast } from 'react-toastify';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6],
      data: '',
      modal: '',
      show: '',
      info: '',
      title: '',
      loading: false,
      events: [
        {
          title: 'Sample Title here',
          start: '2023-05-10T01:00:00',
          end: '2023-06-01T02:00:00',
        },
      ],

      user_count: 0,
      policy_count: 0,
      claim_count: 0,
      sales_limits: [],
    };
  }

  SampleNavigator = (name) => {
    this.props.history.push(`/${name}`);
  };

  LoadStatisticData = (filter) => {
    let token = '';
    if (localStorage.getItem('userToken')) {
      token = JSON.parse(localStorage.getItem('userToken'));
      this.setState({ loading: true });
      Axios.get(`${Home}sub-agent/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.setState({
            loading: false,
            data: res.data.payload,

            user_count: res.data.payload.user_count,
            sales_limits: res.data.payload.sales_limits,
            policy_count: res.data.payload.policy_count,
          });
          console.log(this.state.sales_limit);
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.LoadStatisticData();
    this.props.dispatch(open_menu('dashboard'));
    this.props.dispatch(open_main_menu('dashboard'));
    this.props.dispatch(change_breadcrum('Your Dashboard'));
  }

  OpenModal2 = (modal, id, da) => {
    this.setState({ info: da });
    if (modal.length < 2) {
      this.setState({ show: '' });
      this.interval = setTimeout(() => this.setState({ modal }), 600);
    } else {
      this.setState({ modal });
      this.interval = setTimeout(() => this.setState({ show: 'show' }), 100);
    }
    this.setState({ id });
  };

  handleEventClick = (event) => {
    console.log(event.event);
    toast.warn(`${event.event.title}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  handleDateClick = (arg) => {
    // bind with an arrow function
    // alert('arg.dateStr')
    // console.log('yes')
    toast.warn('Our Holiday', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  render() {
    {
      this.state.data.deleted === 1 && localStorage.clear('userToken');
    }

    const PieData = [
      {
        id: 'Staff',
        label: 'Staff',
        value: this.state.user_count,
        color: 'hsl(196, 70%, 50%)',
      },
      {
        id: 'Vehicle',
        label: 'Vehicle',
        value: this.state.vehicle_count,
        color: 'hsl(340, 70%, 50%)',
      },
      {
        id: 'Policies',
        label: 'Policies',
        value: this.state.policy_count,
        color: 'hsl(298, 70%, 50%)',
      },
      {
        id: 'Claim',
        label: 'Claim',
        value: this.state.claim_count,
        color: 'hsl(309, 70%, 50%)',
      },
    ];

    // console.log(this.state.data);
    return (
      <>
        {this.state.modal === 'OPEN' && (
          <div
            className={`modal effect-super-scaled ${this.state.show} `}
            id='exampleModalCenter'
            role='dialog'
            style={{
              display: 'block',
              background: this.state.show === '' ? 'none' : '#050404d4',
              overflow: 'scroll',
            }}
          >
            <div className='modal-dialog modal-lg' role='document'>
              <form
                onSubmit={this.handleSubmit}
                className='modal-content card explore-feature border-0 rounded bg-white shadow'
              >
                <div className='modal-body'>
                  <div>
                    <h5>{this.state.info.name}</h5>
                    <span className='text-muted font-weight-bold'>
                      {this.state.info.created_at
                        ? this.state.info.created_at.slice(0, 10)
                        : ''}
                    </span>
                    <div className='pt-1'>
                      <p>{this.state.info.draft}</p>
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    onClick={() => this.OpenModal2('', 0, '')}
                    type='button'
                    className='btn btn-danger'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div>
          <FadeIn duration='1s' timingFunction='ease-out'>
            {/* <ComingSoon img={dash} /> */}
            <div className='row no-gutters'>
              {/* Staff Count start */}
              <div className='col-md-4 pr-3 mb-3'>
                <div
                  className='card card-custom shadow-none border-0 gutter-b'
                  style={{ background: '#662e91' }}
                >
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h4 className='d-inline text-white'>All Users</h4>
                    </div>
                  </div>
                  <div
                    id='kt_stats_widget_11_chart'
                    className='d-flex align-self-end'
                    data-color='success'
                    style={{
                      height: '100px',
                      minHeight: '100px',
                      // overflow: "hidden",
                      padding: '10px',
                    }}
                  >
                    <Users color='white' size={48} />
                    {this.state.loading ? (
                      <Spinner size={40} color='#ffffff' />
                    ) : (
                      <h2 className='text-right pt-2 pl-1 text-white'>
                        {this.state.user_count ? this.state.user_count : 0}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              {/* Staff Count End */}

              {/* Vehicles Count start */}

              {this.state.sales_limits?.map((limit) => (
                <div className='col-md-4 pr-3 mb-3'>
                  <div
                    className='card card-custom shadow-none border-0 gutter-b'
                    style={{ background: '#413e56' }}
                  >
                    <div className='card-body'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h4 className='d-inline text-white'>
                          {limit?.insurance_plan?.vendor_plan_id?.toUpperCase()}{' '}
                          Units Available
                        </h4>
                      </div>
                    </div>
                    <div
                      id='kt_stats_widget_11_chart'
                      className='d-flex align-self-end'
                      data-color='success'
                      style={{
                        height: '100px',
                        minHeight: '100px',
                        // overflow: "hidden",
                        padding: '10px',
                      }}
                    >
                      <Truck color='white' size={48} />
                      {this.state.loading ? (
                        <Spinner size={40} color='#ffffff' />
                      ) : (
                        ''
                      )}{' '}
                      <h2 className='text-right pt-2 pl-1 text-white'>
                        {limit?.point ? limit?.point : 0}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}

              {/* Vehicles Count end */}

              {/* Policies Count start */}
              <div className='col-md-4 pr-3 mb-3'>
                <div
                  className='card card-custom shadow-none border-0 gutter-b bg-danger'
                  style={{ background: '#e01515' }}
                >
                  <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h4 className='d-inline text-white'>
                        All Policies Purchased
                      </h4>
                    </div>
                  </div>

                  <div
                    id='kt_stats_widget_11_chart'
                    className='d-flex align-self-end'
                    data-color='success'
                    style={{
                      height: '100px',
                      minHeight: '100px',
                      // overflow: "hidden",
                      padding: '10px',
                    }}
                  >
                    <GitBranch color='white' size={48} />
                    {this.state.loading ? (
                      <Spinner size={40} color='#ffffff' />
                    ) : (
                      ''
                    )}{' '}
                    <h2 className='text-right pt-2 pl-1 text-white'>
                      {this.state.policy_count ? this.state.policy_count : 0}
                    </h2>
                  </div>
                </div>
              </div>
              {/* Policies Count End */}
            </div>

            {/* Full Calendar start */}
            <div className='row no-gutters mt-2'>
              <div className='col-md-12 pr-3 mb-3'>
                <div className='card card-body card-stretch gutter-b shadow-none border-0 st-home-c'>
                  <div
                    className='table-responsive alert-'
                    style={{ borderRadius: '5px' }}
                  >
                    <FullCalendar
                      eventBorderColor='#0467d2'
                      eventTextColor='#ffffff'
                      eventBackgroundColor='#0467d2'
                      eventClick={this.handleEventClick}
                      dateClick={this.handleDateClick}
                      defaultView='dayGridMonth'
                      plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timelinePlugin,
                      ]}
                      weekends={true}
                      events={this.state.data}
                      forceEventDuration={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Full Calendar start */}
          </FadeIn>
        </div>
      </>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(Dashboard);
