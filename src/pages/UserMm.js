import React, { Component } from "react";
import { connect } from "react-redux";
import { open_menu } from "../store/actions/OpenMenu";
import { open_main_menu } from "../store/actions/MainMenu";
import { change_breadcrum } from "../store/actions/Bredcrum";
import SkillsContainer from "../components/settings/skills/SkillsContainer";
import { submenu } from "../store/actions/SubMenu";
import UsersContainer from "../components/settings/users/UsersContainer";

class UserMm extends Component {
  componentDidMount() {
    this.props.dispatch(open_menu("Control"));
    this.props.dispatch(open_main_menu("Control"));
    this.props.dispatch(change_breadcrum("Manage User"));
    this.props.dispatch(submenu("20"));
  }
  render() {
    return (
      <div>
        <div className="mb-4">
          {/* <div className="">
                        <h1>Coming Soon</h1>
                    </div> */}
        </div>
        <UsersContainer />
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(UserMm);
