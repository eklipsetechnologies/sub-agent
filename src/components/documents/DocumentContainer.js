import React, { Component } from "react";
import { connect } from "react-redux";
import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";
// import ListCredential from "./ListCredential";
// import ListCredFiles from "./ListCredFiles";
import ListDocFiles from "./ListDocFiles";
import ListDocuments from "./ListDocuments";

class DocumentContainer extends Component {
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
        return <ListDocFiles />;
      case "edit_doc":
        return <EditDocument />;
    //   case "import":
    //     return <ImportDatabase />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListDocuments />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(DocumentContainer);
