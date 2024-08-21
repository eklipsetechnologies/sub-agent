import React, { Component } from 'react';
import { connect } from 'react-redux';
import done from '../../../assets/svg/whocoded_done.svg'
import img from '../../../assets/svg/whocoded_control.svg'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { Upload } from 'react-feather';
import Spinner from '../../../global/Spinner';
import Uploader from '../../../global/Uploader';
import { Home } from '../../../global/Home';

class TakeAssessment extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            details:"",
            laoding:false,
            loading:false,
            option:[],
            question:[],
            start:false,
            name:"",
            count:0,
            answer:[],
            currentQuestion:"",
            currentOptions:[],
            percent:0,
            sub:"",
            p:false
        }
    }

    Checked=(name)=>{
        this.setState({name:name})
    }
   
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }

    LoadData=()=>{
        this.setState({loading:true})
        if (localStorage.getItem('userToken')) {
            let token = "";
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(Home+`auth/train/LoadTrainQuestion`,{
                token:token,
                id:this.props.id
           })
          .then(res => {
            // console.log('Train',res);
            if (res.data.success) {
                this.setState({
                    error:false,
                    loading:false,
                    details:res.data,
                    option:res.data.options,
                    question:res.data.questions,
                    count:res.data.period * 60
                });
                 this.setState({id:res.data.id});
            }else{
             this.setState({error:true,loading:false,details:res.data});
             toast.error('Quiz is no longer available ❌',{
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: false
                 });
            }
          })
       .catch(err =>console.log(err));
        }
           
     }

     SubmitQuiz=()=>{
        this.setState({loading:true})
        if (localStorage.getItem('userToken')) {
            let token = "";
            token = JSON.parse(localStorage.getItem('userToken'));
            Axios.post(Home+`auth/train/submitAssessment`,{
                token:token,
                requestId:this.props.id,
                answer:this.state.answer,
                time:this.state.count,
                exId:this.state.details.id
           })
          .then(res => {
            console.log(res);
            this.setState({loading:false,sub:"WHOCODED"})
            if (res.data.success) {
                toast.success(res.data.message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false
                    });
            }else{
            //  this.setState({error:true,loading:false,details:res.data});
             toast.error(res.data.message,{
                 position: "top-right",
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: false
                 });
            }
          })
       .catch(err =>console.log(err));
        }
           
     }


    ChangeSwitch=(name)=>{
        if (this.state.switch === 'WHOCODED') {
            this.setState({switch:""});
        }else{
            this.setState({switch:name});
        }
    }

    QuizSwitch=()=>{
        this.setState({p:false});
        let qlent = this.state.question.length;
        let alent = this.state.answer.length;
        let qIndex = qlent === this.state.question.length ? qlent - 1 : qlent;
        if (alent <= (this.state.option.length - 1)) {
            this.setState({
                currentOptions:this.state.option[alent],
                currentQuestion:this.state.question[alent],
                // name:"None"
            })
        }
        let percent = alent * 100 / qlent;
        this.setState({
            percent:percent
        })
        if (alent >= this.state.option.length) {
            this.SubmitQuiz()
        }
        
    }

    NextAnswer=(name,bool)=>{
    //     let values = this.state.answer.concat(this.state.name);
    //    let uniqueItems = Array.from(new Set(values));
        this.setState({
            answer:this.state.answer.concat(name),
            p:true
        })
        setTimeout(() => this.QuizSwitch(), 1500)
    }

    CountDown=()=>{
        if (this.state.count > 0 && this.state.start) {
            this.setState({count:this.state.count - 1})
        }else if (this.state.count <= 0 && this.state.start) {
            this.SubmitQuiz();
        }
    }

    StartQuiz=()=>{
        this.setState({start:true})
        this.QuizSwitch();
    }

    componentDidMount(){
        this.LoadData();
          this.interval = setTimeout(() => this.changeStyle('show'), 500);
          this.interval = setInterval(() => this.CountDown(), 1000);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }
    
    render() {
        // console.log(this.props)
        return (
            <div>
               
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:'block',background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    {this.state.loading ?
                    <div className="p-2">
                        <Spinner size={100} />
                    </div>
                :
                    !this.state.start? 
                    <div className="text-center">
                        <img className="img-fluid" src={img} />
                    <small className="text-muted text-center p-1">Click the button below to take your training assessment</small>
                        <div className="p-2">
                        <button onClick={()=>this.StartQuiz()} type="button" className="btn btn-primary2 shadow mt-2 btn-block" data-dismiss="modal">Start Now</button>
                        </div>
                        
                    </div>
                    :
                    this.state.sub === 'WHOCODED' ?
                    <div className="text-center">
                        <img className="img-fluid" src={done} />
                        <small className="text-muted text-center p-1">Your Answer  Is Submitted</small>
                        
                    </div>
                    :
                    <>
                    <div className="modal-body">
                        <h3 class="d-inline colo-b st-w600">{this.state.currentQuestion}</h3>
                        <span className="st-count">{this.state.count}</span>
                        <div className="p-5">
                            {this.state.currentOptions.option1 !==null ?
                            <>
                            <div className="form-group">
                            <div onClick={()=>this.Checked('None')} className="custom-control custom-radio custom-control-inline" style={{paddingLeft:'0px'}}>
                                            <label className="containerk">None
                                            <input 
                                            type="radio" value="1"  
                                            name="check" 
                                            className="ng-valid ng-dirty" 
                                            checked={this.state.name === 'None' ||this.state.name !==this.state.currentOptions.option1||this.state.name !==this.state.currentOptions.option2||this.state.name !==this.state.currentOptions.option3||this.state.name !==this.state.currentOptions.option4  ?true:false}/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        </div>
                                        <div className="form-group">
                            <div onClick={()=>this.Checked(this.state.currentOptions.option1)} className="custom-control custom-radio custom-control-inline" style={{paddingLeft:'0px'}}>
                                            <label className="containerk">{this.state.currentOptions.option1}
                                            <input 
                                            type="radio" value="1"  
                                            name="check" 
                                            className="ng-valid ng-dirty" 
                                            checked={this.state.name === this.state.currentOptions.option1?true:false}/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        </div>
                                        <div className="form-group">
                            <div onClick={()=>this.Checked(this.state.currentOptions.option2)} className="custom-control custom-radio custom-control-inline" style={{paddingLeft:'0px'}}>
                                            <label className="containerk">{this.state.currentOptions.option2}
                                            <input 
                                            type="radio" value="1"  
                                            name="check" 
                                            className="ng-valid ng-dirty" 
                                            checked={this.state.name === this.state.currentOptions.option2?true:false}/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        </div>
                                        <div className="form-group">
                            <div onClick={()=>this.Checked(this.state.currentOptions.option3)} className="custom-control custom-radio custom-control-inline" style={{paddingLeft:'0px'}}>
                                            <label className="containerk">{this.state.currentOptions.option3}
                                            <input 
                                            type="radio" value="1"  
                                            name="check" 
                                            className="ng-valid ng-dirty" 
                                            checked={this.state.name === this.state.currentOptions.option3?true:false}/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        </div>
                                        <div className="form-group">
                            <div onClick={()=>this.Checked(this.state.currentOptions.option4)} className="custom-control custom-radio custom-control-inline" style={{paddingLeft:'0px'}}>
                                            <label className="containerk">{this.state.currentOptions.option4}
                                            <input 
                                            type="radio" value="1"  
                                            name="check" 
                                            className="ng-valid ng-dirty" 
                                            checked={this.state.name === this.state.currentOptions.option4?true:false}/>
                                            <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        </div>
                                   
                        </>
                            :''
                        }
                        
                            <div className="form-group">
                                {this.state.answer.length >= this.state.option.length ?
                                this.state.p?
                                    <Spinner size={50} />
                                :
                                <button type="button" onClick={()=>this.NextAnswer(this.state.name,false)} className=" btn btn-warning shadow">Submit Now</button>
                            :
                            this.state.p?
                                    <Spinner size={30} />
                                :
                            <button type="button" onClick={()=>this.NextAnswer(this.state.name,true)} className=" btn btn-warning shadow">Next Question</button>
                            }
                            </div>
                        </div>
                    </div>
                     <Uploader number={this.state.percent} />
                     </>
      }    
                   
                    <div className="modal-footer">
                    {/* {this.props.data.userDetails.employee == 2 ?
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal"><Trash2 size={30} color="#ffffff" /> Delete</button>
                    :
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal">Request Delete</button>
                    } */}
                        <button onClick={this.props.close} type="button" className="btn btn-danger shadow" data-dismiss="modal">Close</button>
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

export default connect(mapStateToProps) (TakeAssessment);