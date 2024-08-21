import React, { Component } from 'react';
import querry from '../../assets/svg/whocoded_querry.svg'
import onboard from '../../assets/svg/whocoded_leave.svg'
// import rec from '../../assets/svg/whocoded_goals.svg'
import { connect } from 'react-redux';
import { BounceRight,FadeIn } from "animate-components";
import { switch_content } from '../../store/actions/SwitchContent';
import { props_params } from '../../store/actions/PropsParams';
import con from '../../assets/svg/whocoded_connect.svg'
import exce from '../../assets/svg/whocoded_apraise.svg'
import calc from '../../assets/svg/whocoded_calc.svg'
import mail from '../../assets/svg/whocoded_message.svg'

class PerformanceHome extends Component {
    

    SwitchContent=(name,id)=>{
        this.props.dispatch(switch_content(name));
        this.props.dispatch(props_params(id));
    }
    render() {
        return (
            <div>
                
                <BounceRight duration="1s" timingFunction="ease-out">
                 <div className="card border-0 mb-5">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Our Performance Sections</h6>
                    </div>
                    <div className="col-md-7">
                        
                    </div>
                </div>
                </div>
                </div>
                </BounceRight>

                <FadeIn duration="1s" timingFunction="ease-out">
                    <div className="row no-gutters st-h-100">
                        <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c">
                                <div onClick={()=>this.SwitchContent('perf_goals',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={con} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Goals Settings</h3>
                                      <p>Click to open goals settings </p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                            <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('perf_obj',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={exce} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Mid year</h3>
                                      <p>Click to open  mid year appraisal </p>
                                    </div>
                                    
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('perf_obj_final',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={exce} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">End of year</h3>
                                      <p>Click to open end of year  appraisal</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-233">
                                <div onClick={()=>this.SwitchContent('perf_rec',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={calc} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">KPI</h3>
                                      <p>Click to open  KPI</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          {/* <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('rec_on_list',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={querry} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Onbording</h3>
                                      <p>Click to open your payroll request</p>
                                    </div>
                                </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="card shadow-none border-0 st-home-c bg-23">
                                <div onClick={()=>this.SwitchContent('rec_mail',[0])} className="card-body text-center">
                                    <div className="st-img-con">
                                        <img className="img-fluid st-img-h" src={mail} />
                                    </div>
                                    <div className="pt-5">
                                      <h3 class="d-inline colo-b st-w600">Mails</h3>
                                      <p>Click to open your payroll request</p>
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
export default connect(mapStoreToProps) (PerformanceHome);