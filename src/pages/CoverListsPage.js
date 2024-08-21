import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { open_menu } from '../store/actions/OpenMenu';
import { open_main_menu } from '../store/actions/MainMenu';
import { change_breadcrum } from '../store/actions/Bredcrum';
import CoverListContainer from '../components/coverlists/CoverListContainer';

const CoverListsPage = (props) => {
  useEffect(() => {
    // This code will run when the component mounts (equivalent to componentDidMount)
    props.dispatch(open_menu('CoverList'));
    props.dispatch(open_main_menu('CoverList'));
    props.dispatch(change_breadcrum('CoverLists'));

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
      <CoverListContainer />
    </div>
  );
};

const mapStoreToProps = (store) => {
  return {
    data: store,
  };
};

export default connect(mapStoreToProps)(CoverListsPage);
