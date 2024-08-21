import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
// import CredentialContainer from "../components/containers/CredentialContainer";
// import DocumentContainer from "../components/documents/DocumentContainer";
// import PaymentContainer from "../components/payments/PaymentContainer";
// import CategoryContainer from "../components/category/CategoryContainer";
import WithdrawContainer from "../components/withdraw/WithdrawContainer";

class WithdrawPage extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("withdraws"));
    this.props.dispatch(open_main_menu("withdraws"));
    this.props.dispatch(change_breadcrum("Withdraws"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          <center>{/* <img src={data} className="img-fluid" /> */}</center>
        </div>
        <WithdrawContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(WithdrawPage);
