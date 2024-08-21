import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
import SkillsContainer from "../components/settings/skills/SkillsContainer";
import RetailContainer from "../components/settings/retails/RetailContainer";
import { submenu } from "../store/actions/SubMenu";

class SettingsRetail extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("Partner"));
    this.props.dispatch(open_main_menu("Partner"));
    this.props.dispatch(change_breadcrum("Retail Partnership"));
    this.props.dispatch(submenu("19"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <RetailContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(SettingsRetail);
