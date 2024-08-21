import React, { Component } from "react";
import { connect } from "react-redux";
import AddDatabase from "./AddDatabase";
import ListDatabase from "./ListDatabase";
import ImportDatabase from "./ImportDatabase";
import EditDatabase from "./EditDatabase";

class DatabaseContainer extends Component {
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
      case "exit_add":
        return <AddDatabase />;
      case "exit_home":
        return <ListDatabase />;
      case "import":
        return <ImportDatabase />;
      case "edit_database":
        return <EditDatabase />;
      default:
        return <ListDatabase />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(DatabaseContainer);
