import React, { Component } from "react";

import { PlusCircle } from "react-feather";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Toaster from "../../../global/Toaster";

class ViewObj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      true: false,
      password: "",
      password1: "",
      password2: "",
      loading: false,
    };
  }

  componentDidMount() {}

  convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  render() {
    const {
      companyName,
      name,
      phone,
      email,
      department,
      accName,
      accNo,
      accBank,
    } = this.props.data.params;
 

    return (
      <div className="card  border-0 mb-3">
        <Toaster />
        <div className="card-body">
          <div className="">
            <h4>{companyName}</h4>
            <div className="col-sm-6 col-md-5 col-lg mg-t-40">
              <label className="tx-sans tx-10 tx-semibold tx-uppercase tx-color-01 tx-spacing-1 mg-b-15">
                Contact Information
              </label>

              <div className="table-responsive">
                <table className="table mb-0 table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Account Name</th>
                      <th>Account No</th>
                      <th>Bank</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="pt-2 pb-2">
                      <td className="tx-color-02 pl-2">{name}</td>

                      <td className="tx-color-02 pl-2">{phone}</td>

                      <td className="tx-color-02 pl-2">{email}</td>

                      <td className="tx-color-02 pl-2">{department}</td>

                      <td className="tx-color-02 pl-2">{accName}</td>

                      <td className="tx-color-02 pl-2">{accNo}</td>

                      <td className="tx-color-02 pl-2">{accBank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ViewObj);
