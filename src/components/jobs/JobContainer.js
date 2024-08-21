import React, { Component } from "react";
import { connect } from "react-redux";
import AddJob from "./AddJob";
import EditJob from "./EditJob";
import ListJobs from "./ListJobs";
import ListJobSubmit from "./ListJobSubmit";

class JobContainer extends Component {
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
      case "edit_job":
        return <EditJob />;
      case "add_job":
        return <AddJob />;
      case "cred_files":
        return <ListJobSubmit />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListJobs />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(JobContainer);
