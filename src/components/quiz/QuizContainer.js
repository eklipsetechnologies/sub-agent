import React, { Component } from "react";
import { connect } from "react-redux";
import AddQuiz from "./AddQuiz";
import EditQuiz from "./EditQuiz";

import ListQuiz from "./ListQuiz";

class QuizContainer extends Component {
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
      case "add_quiz":
        return <AddQuiz />;
      case "edit_doc":
        return <EditQuiz />;
    //   case "import":
    //     return <ImportDatabase />;
    //   case "edit_database":
    //     return <EditDatabase />;
      default:
        return <ListQuiz />;
    }
  };

  render() {
    return <div>{this.Switcher()}</div>;
  }
}

const mapStateToProps = (store) => ({
  data: store,
});

export default connect(mapStateToProps)(QuizContainer);
