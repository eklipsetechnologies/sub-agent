import React, { Component } from 'react';
import img1 from '../../assets/svg/1.png'
import img2 from '../../assets/svg/2.png'
import img3 from '../../assets/svg/3.png'
import img4 from '../../assets/svg/4.png'
import img5 from '../../assets/svg/5.png'
import img6 from '../../assets/svg/6.png'
// import img1 from '../../assets/svg/1.png'
import { connect } from 'react-redux';
import { BounceRight,FadeIn } from "animate-components";
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';


class LeaveBox extends Component {
    
    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    render() {
        return (
            <div>
            
                <FadeIn duration="1s" timingFunction="ease-out">
                    <div className="row no-gutters st-h-100">
                        <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('leave_add',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img1} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">New Leave Request</h3>
                                      <p>Click to open your training allocation</p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                            <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('leave_calender',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img2} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Leave Schedule</h3>
                                      <p>Click to open your create training </p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('leave_home',['pending'])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img3} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Pending Leave</h3>
                                      <p>Click to open your training assessments</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          {/* <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('req_perf',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={schedule} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Training Schedule</h3>
                                      <p>Click to open your performance request</p>
                                    </div>
                                </div>
                            </div>
                          </div> */}

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('leave_home',['approved'])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img4} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Approved Leave</h3>
                                      <p>Click to open  training calendar</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('leave_home',['declined'])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img5} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Declined Leave</h3>
                                      <p>Click to open submitted assessments</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('leave_report',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={img6} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Leave Reports</h3>
                                      <p>Click to open submitted assessments</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          {/* <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('req_pay',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={pay} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Payroll Request</h3>
                                      <p>Click to open your payroll request</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('req_exit',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={exit} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Exit Request</h3>
                                      <p>Click to open your exit request</p>
                                    </div>
                                </div>
                            </div>
                          </div> */}

                         


                         
                          
                        
                    </div>
                </FadeIn>
            </div>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }
export default connect(mapStoreToProps) (LeaveBox);