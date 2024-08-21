import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
// import CredentialContainer from "../components/containers/CredentialContainer";
// import DocumentContainer from "../components/documents/DocumentContainer";
import JobContainer from "../components/jobs/JobContainer";

class JobsPage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("jobs"));
    this.props.dispatch(open_main_menu("jobs"));
    this.props.dispatch(change_breadcrum("Manage Jobs"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <JobContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(JobsPage);
