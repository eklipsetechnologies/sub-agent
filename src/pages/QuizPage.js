import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
// import CredentialContainer from "../components/containers/CredentialContainer";
// import DocumentContainer from "../components/documents/DocumentContainer";
import QuizContainer from "../components/quiz/QuizContainer";

class QuizPage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("quiz"));
    this.props.dispatch(open_main_menu("quiz"));
    this.props.dispatch(change_breadcrum("Manage Quiz Questions"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <QuizContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(QuizPage);
