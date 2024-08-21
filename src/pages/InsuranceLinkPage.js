import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
import InsuranceContainer from "../components/insurance_link/InsuranceContainer";

class InsuranceLinkPage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("Links"));
    this.props.dispatch(open_main_menu("Links"));
    this.props.dispatch(change_breadcrum("Certificates"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <InsuranceContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(InsuranceLinkPage);
