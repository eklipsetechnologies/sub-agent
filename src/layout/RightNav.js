import React, { Component } from 'react';
import MaterialIcon,{colorPalette} from 'material-icons-react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/st2.png'
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { LogOut, ArrowDownRight, ArrowRightCircle,Clock as Clocks, User, Calendar } from 'react-feather';
import { open_right } from '../store/actions/OpenRight';
import { BounceRight,FadeIn,BounceLeft } from "animate-components";
import Clock from 'react-digital-clock';
import uimg from '../assets/svg/whocoded_team.svg'
import profile from '../assets/svg/whocoded_p.svg'
import utrain from '../assets/svg/whocoded_train.svg'
import uleave from '../assets/svg/whocoded_leave.svg'
import uperform from '../assets/svg/whocoded_perform.svg'
import upay from '../assets/svg/whocoded_pay.svg'
import uexit from '../assets/svg/whocoded_exit.svg'
import uquery from '../assets/svg/whocoded_querry.svg'
import ucontrol from '../assets/svg/whocoded_control.svg'
import udash from '../assets/svg/whocoded_udash.svg'
import urec from '../assets/svg/whocoded_rec.svg'
import item from '../assets/svg/whocoded_items.svg'
import { animateScroll } from "react-scroll";
import Axios from 'axios';
import { Home } from '../global/Home';
import Spinner from '../global/Spinner';


class RightNav extends Component {
    constructor(props) {
        super(props);
        this.state ={
            drop:"",
            mobile:false,
            loading:false,
            data:[],
            loading2:false,
            data2:[],
            loading3:false,
            data3:[],
            loading4:false,
            data4:[]
        }
    }

    Image=()=>{
        if (this.props.data.menu === 'profile') {
            return <img src={profile} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'Users') {
            return <img src={uimg} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'training') {
            return <img src={utrain} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'leave') {
            return <img src={uleave} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'performance') {
            return <img src={uperform} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'payroll') {
            return <img src={upay} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'exit') {
            return <img src={uexit} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'query') {
            return <img src={uquery} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'Control') {
            return <img src={ucontrol} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'dashboard') {
            return <img src={udash} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'request') {
            return <img src={ucontrol} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'recuitment') {
            return <img src={urec} className="img-fluid whocoded-circle" />;
        }else if (this.props.data.menu === 'Items') {
            return <img src={item} className="img-fluid whocoded-circle" />;
        }
    }

    OpenMenu=(name,main_name)=>{
        this.props.dispatch(open_menu(name));
        this.props.dispatch(open_main_menu(main_name));
    }

    OpenRight = (name)=>{
        this.props.dispatch(open_right(name)); 
    }

    OpenMobileMenu=()=>{
        if (window.pageYOffset <= 700) {
            this.setState({mobile:!this.state.mobile})
        }
    }

    scrollToBottom() {
        
        animateScroll.scrollToBottom({
          containerId: "stephen-whocoded2"
        });
        // this.interval = setTimeout(() => this.scrollToTop(), 4000);
        // animateScroll.scrollMore({
        //     offset:300,
        //     smooth: true,
        //     containerId: "stephen-whocoded2"
        //   });
        // animateScroll.scrollTo(200,{containerId: "stephen-whocoded2"})
    }

    scrollToTop() {
        
        animateScroll.scrollToTop({
          containerId: "stephen-whocoded2"
        });
    }

    HoverHandle=()=>{
        // alert(1)
        this.interval = setTimeout(() => this.scrollToBottom(), 1000); 

        this.interval = setTimeout(() => this.scrollToTop(), 4000); 
    }

    LoadData=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading:true});
            Axios.post(`${Home}auth/settings/listPayrollElement`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading:false,data:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData2=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading2:true});
            Axios.get(`${Home}auth/settings/getPublicHoliday`,{
              params:{token: token}
            })
           .then(res => {
            console.log(res);
           this.setState({loading2:false,data2:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData3=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading3:true});
            Axios.post(`${Home}auth/settings/listDepartment`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading3:false,data3:res.data});
           })
        .catch(err =>console.log(err));
        }
    }

    LoadData4=()=>{
        let token = "";
        if (localStorage.getItem('userToken')) {
            token = JSON.parse(localStorage.getItem('userToken'));
            this.setState({loading4:true});
            Axios.post(`${Home}auth/settings/listBranch`,{
               token: token
            })
           .then(res => {
            console.log(res);
           this.setState({loading4:false,data4:res.data});
           })
        .catch(err =>console.log(err));
        }   
    }

    componentDidMount(){
        // this.scrollToBottom();
        this.HoverHandle();
        this.LoadData();
        this.LoadData2();
        this.LoadData3();
        this.LoadData4();
    }
    
    componentWillUnmount(){
       
    }
    render() {
      //  console.log(this.props);
      let d = new Date();
      let n = d.getUTCFullYear();
      let day = "";
      let month = "";
        if (d.getDay() === 0) {
        day = "Sun.";
        }else if (d.getDay() === 1) {
        day = "Mon.";
        }else if (d.getDay() === 2) {
        day = "Tue.";
        }else if (d.getDay() === 3) {
        day = "Wed.";
        }else if (d.getDay() === 4) {
        day = "Thu.";
        }else if (d.getDay() === 5) {
        day = "Friday";
        }else if (d.getDay() === 6) {
        day = "Sat.";
        }

        if (d.getMonth() === 0) {
            month = "January";
        }else if (d.getMonth() === 1) {
            month = "February"
        }else if (d.getMonth() === 2) {
            month = "March"
        }else if (d.getMonth() === 3) {
            month = "April"
        }else if (d.getMonth() === 4) {
            month = "May"
        }else if (d.getMonth() === 5) {
            month = "June"
        }else if (d.getMonth() === 6) {
            month = "July"
        }else if (d.getMonth() === 7) {
            month = "August"
        }else if (d.getMonth() === 8) {
            month = "September"
        }else if (d.getMonth() === 9) {
            month = "October"
        }else if (d.getMonth() === 10) {
            month = "Novermber"
        }else if (d.getMonth() === 11) {
            month = "December"
        }
        return (
            <>
            <FadeIn  duration="1s" timingFunction="ease-out">
                <aside  className={`aside-r ${this.props.data.Right !== 'Open' ? 'close-rightt ':' '} aside-fixed-r ${this.state.mobile?'mo-aside':'de-aside'}`}>
                

                <div id="stephen-whocoded2" className="aside-body aside-body-r st-scroll ps--active-y bg-r p-0">
                    <div>
                        <div className="p-3" style={{marginTop: '10px',}}>
                        <Calendar color="gray" size={18} /> <strong>{d.getUTCDate()} {day} {month} {n}</strong>
                        <div className="d-inline text-primary">
                         <strong><Clock /> </strong>
                        </div>
                        <div className="mt-4 mb-3">
                            {this.Image()}
                        </div>
                        </div>
                        

                    </div>
                    <span className="xt-" onClick={()=>this.OpenRight('Close')}>
                      <ArrowRightCircle color="#0567d2" size={29} />
                    </span>
                  
                </div>
            </aside>
            </FadeIn>
            
            </>
        );
    }
}

const mapStoreToProps = (store) =>{
    return{
       data:store
    }
  }

export default connect(mapStoreToProps) (RightNav);