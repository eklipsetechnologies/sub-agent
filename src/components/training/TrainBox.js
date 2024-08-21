import React, { Component } from 'react';
import leav from '../../assets/svg/whocoded_leave.svg'
import perform from '../../assets/svg/whocoded_perform.svg'
import pay from '../../assets/svg/whocoded_pay.svg'
import exit from '../../assets/svg/whocoded_exit.svg'
import querry from '../../assets/svg/whocoded_querry.svg'
import profile from '../../assets/svg/whocoded_p.svg'


import alocate from '../../assets/svg/whocoded_alocate.svg'
import asses from '../../assets/svg/whocoded_asses.svg'
import train from '../../assets/svg/whocoded_train.svg'
import schedule from '../../assets/svg/whocoded_schedule.svg'
import calender from '../../assets/svg/whocoded_calender.svg'
import { connect } from 'react-redux';
import { BounceRight,FadeIn } from "animate-components";
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import answers from '../../assets/svg/whocoded_exam.svg'

class TrainBox extends Component {
    

    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    render() {
        return (
            <div>
                
                {/* <BounceRight duration="1s" timingFunction="ease-out">
                 <div className="card border-0 mb-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Our Training Boxes</h6>
                    </div>
                    <div className="col-md-7">
                        
                    </div>
                </div>
                </div>
                </div>
                </BounceRight> */}

                <FadeIn duration="1s" timingFunction="ease-out">
                    <div className="row no-gutters st-h-100">
                        <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('train_al',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={alocate} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Training Allocation</h3>
                                      <p>Click to open your training allocation </p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                            <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('train_list_course',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={train} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Create Training</h3>
                                      <p>Click to open your create training </p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('train_list_ex',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={asses} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">T. Assessments</h3>
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
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('train_calender',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={calender} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Training Calender</h3>
                                      <p>Click to open  training calendar</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('asess',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={answers} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Submitted Assts.</h3>
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
export default connect(mapStoreToProps) (TrainBox);