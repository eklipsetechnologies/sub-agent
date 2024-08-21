import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import ReferralTransactions from '../components/referralTransactions/ReferralTransactions';

//import UserHMOTest from "../components/userhmodetails/UserHMOTest"

const ReferralTransactionsPage = (props) => {
  useEffect(() => {
    // This code will run when the component mounts (equivalent to componentDidMount)
    props.dispatch(open_menu('Transaction'));
    props.dispatch(open_main_menu('Transaction'));
    props.dispatch(change_breadcrum('Referral Transactions '));

    // Cleanup function (optional)
    return () => {
      // You can perform cleanup here if needed
    };
  }, []); // The empty dependency array means this effect only runs once (on mount)

  return (
    <div>
      <div className='mb-4'>
        <center>{/* <img src={data} className="img-fluid" /> */}</center>
      </div>
      <ReferralTransactions />
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(ReferralTransactionsPage);
