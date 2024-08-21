import React, { Component } from 'react';
import { connect } from 'react-redux';
class ViewTrainingAssesment extends Component {
    constructor(props) {
        super(props);
        this.state={
            style:"",
            details:"",
            laoding:false,
        }
    }
   
    
    changeStyle=(name)=>{
        this.setState({style:name})
    }


    ChangeSwitch=(name)=>{
        if (this.state.switch === 'WHOCODED') {
            this.setState({switch:""});
        }else{
            this.setState({switch:name});
        }
    }

    componentDidMount(){
        // this.LoadEditData();
          this.interval = setTimeout(() => this.changeStyle('show'), 500);
          
        }
      
        componentWillUnmount() {
          clearInterval(this.interval);
          this.setState({style:''});
        }
    
    render() {
        return (
            <div>
               
                <div className={`modal effect-super-scaled ${this.props.show} `} id="exampleModalCenter"  role="dialog" style={{display:this.props.display,background:this.props.show ===""?'none':'#050404d4',overflow:'scroll'}}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content card explore-feature border-0 rounded bg-white shadow">
                    <div className="modal-header">
        <h5 className="modal-title">{ this.props.details && this.props.details.name? this.props.details.name:''}</h5>
                        <button onClick={this.props.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.laoding ?
                        'Loading...'
                    :
                    
                    <>
                        
                        <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Options</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            {this.props.details && this.props.details.questions.length> 0 ?
                          <tbody>
                              {this.props.details.questions.map((qu,i)=>
                                <tr key={i}>
                                    <td>{qu}</td>
                                    <td>
                                    <span className="badge badge-primary m-1">{this.props.details.options[i].option1}</span>
                                    <span className="badge badge-primary m-1">{this.props.details.options[i].option2}</span>
                                    <span className="badge badge-primary m-1">{this.props.details.options[i].option3}</span>
                                    <span className="badge badge-primary m-1">{this.props.details.options[i].option4}</span>
                                    </td>
                                    <td>
                                      <span className="badge badge-success m-1">{this.props.details.options[i] ? this.props.details.options[i][this.props.details.answer[i]] :''}</span>
                                    </td>
                                </tr>
                                )}
                          </tbody>  
                        :
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <span className="alert d-block alert-warning text-center">No question yet</span>
                                </td>
                            </tr>
                        </tbody>
                        
                        }
                        
                        </table>
                    </div>
                      </>
                    }
                    </div>
                    <div className="modal-footer">
                    {/* {this.props.data.userDetails.employee == 2 ?
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal"><Trash2 size={30} color="#ffffff" /> Delete</button>
                    :
                    <button onClick={()=>this.Delete(0)} type="button" className="btn btn-danger" data-dismiss="modal">Request Delete</button>
                    } */}
                    {/* <button onClick={()=>this.ChangeSwitch('WHOCODED')} type="button" className="btn btn-primary" data-dismiss="modal">{`${this.state.switch === 'WHOCODED'?'Close Edit':'Edit details'}`}</button> */}
                        <button onClick={this.props.close} type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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

export default connect(mapStateToProps) (ViewTrainingAssesment);