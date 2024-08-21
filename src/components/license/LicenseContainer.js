import React, { Component } from "react";
import { connect } from "react-redux";
// import AddCategory from "./AddCategory";
import AddLicense from "./AddLicense";
// import EditCategory from "./EditCategory";
import EditLicense from "./EditLicense";
// import ListCategory from "./ListCategory";
import ListLicense from "./ListLicense";
// import ListDocuments from "./ListDocuments";
// import ListPayment from "./ListPayment";

class LicenseContainer extends Component {
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
      case "add_cat":
        return <AddLicense />;
      case "edit_cat":
        return <EditLicense />;
    //   case "import":
    //     return <ImportDatabase />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListLicense />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(LicenseContainer);
