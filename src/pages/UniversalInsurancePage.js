import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
import UniversalContainer from "../components/universal_insurance/UniversalContainer";

class UniversalInsurancePage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("Universal"));
    this.props.dispatch(open_main_menu("Universal"));
    this.props.dispatch(change_breadcrum("Universal Insurance"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <UniversalContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(UniversalInsurancePage);
