import React, { Component } from "react";
import { connect } from "react-redux";
import AddObj from "./AddObj";
import EditObj from "./EditObj";
import ListObj from "./ListObj";
import ViewObj from "./ViewObj";

class ObjectiveContainer extends Component {
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
      case "skill_add":
        return <AddObj />;
      case "skill_edit":
        return <EditObj />;
      case "skill_home":
        return <ListObj />;
      case "skill_view":
        return <ViewObj />;
      default:
        return <ListObj />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(ObjectiveContainer);
