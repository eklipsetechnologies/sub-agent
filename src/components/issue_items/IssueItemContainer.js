import React, { Component } from "react";
import { connect } from "react-redux";
import AddIssueItem from "./AddIssueItem";
import EditIssueItem from "./EditIssueItem";
import ListExit from "../exit/ListExit";
import ListIssueItem from "./ListIssueItem";

class IssueItemContainer extends Component {
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
        return <AddIssueItem />;
      case "exit_home":
        return <ListIssueItem />;
      case "exit_edit":
        return <EditIssueItem />;
      default:
        return <ListIssueItem />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(IssueItemContainer);
