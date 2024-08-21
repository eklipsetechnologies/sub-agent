import React, { Component } from "react";
import { connect } from "react-redux";
import ListLink from "./ListLink";
import ListDocs from "./ListDocs";
import CreateLink from "./CreateLink";

class InsuranceContainer extends Component {
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
      case "create_link":
        return <CreateLink />;
      case "list_link":
        return <ListLink />;
      case "list_docs":
        return <ListDocs />;
      default:
        return <ListLink />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(InsuranceContainer);
