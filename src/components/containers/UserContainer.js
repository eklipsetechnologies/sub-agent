import React, { Component } from "react";
import { connect } from "react-redux";
import ClientUsers from "./ClientUsers";
import ListUsers from "./ListUsers";

class UserContainer extends Component {
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
      case "client_users":
        return <ClientUsers />;
    //   case "exit_home":
    //     return <ListDatabase />;
    //   case "import":
    //     return <ImportDatabase />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListUsers />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(UserContainer);
