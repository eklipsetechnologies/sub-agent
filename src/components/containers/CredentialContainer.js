import React, { Component } from "react";
import { connect } from "react-redux";
import AddCredential from "./AddCredential";
import EditCredential from "./EditCredential";
import ListCredential from "./ListCredential";
import ListCredFiles from "./ListCredFiles";

class CredentialContainer extends Component {
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
      case "cred_files":
        return <ListCredFiles />;
      case "cered_add":
        return <AddCredential />;
      case "edit_cred":
        return <EditCredential />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListCredential />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(CredentialContainer);
