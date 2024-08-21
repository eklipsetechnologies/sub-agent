import React, { Component } from "react";
import { connect } from "react-redux";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import ListCategory from "./ListCategory";
// import ListDocuments from "./ListDocuments";
// import ListPayment from "./ListPayment";

class CatgeoryContainer extends Component {
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
        return <AddCategory />;
      case "edit_cat":
        return <EditCategory />;
    //   case "import":
    //     return <ImportDatabase />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListCategory />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(CatgeoryContainer);
