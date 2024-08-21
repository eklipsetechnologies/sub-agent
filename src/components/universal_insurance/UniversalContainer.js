import React, { Component } from "react";
import { connect } from "react-redux";
import ConfirmVehicle from "./ConfirmVehicle";
import CreatePolicy from "./CreatePolicy";
import UpdatePolicy from "./UpdatePolicy";
import VerifyPolicy from "./VerifyPolicy";
import VerifyRegistration from "./VerifyRegistration";

class UniversalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      current: "List",
    };
  }

  Switcher = () => {
    let current = this.props.data.switch;
    switch (current) {
      case "create_policy":
        return <CreatePolicy />;
      case "verify_policy":
        return <VerifyPolicy />;
      case "confirm_vehicle":
        return <ConfirmVehicle />;
      case "verify_registration":
        return <VerifyRegistration />;
      case "update_policy":
        return <UpdatePolicy />;
      default:
        return <CreatePolicy />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(UniversalContainer);
